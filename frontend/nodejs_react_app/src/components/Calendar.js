import React, { useState, useCallback, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import DayModal from "./DayModal";
import DayComponent from "./DayComponent";
import { getCalendarDays } from "../utils/calendarUtils";

const fadeIn = keyframes`
  0% {
    opacity: 0;        
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(1.5);
  }
`;

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 94vh;
  width: 100%;
  background-color: #333;
`;

const CalendarGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 80%;
  height: auto;
  margin: auto;
`;

//全てのトーナメント情報データリストから指定した日のトーナメントデータ情報をリストとして返す。
function getTournamentList(data, day) {

  const changeTimestampToDate = (startAt,endAt) => {
    const date1 = new Date(startAt * 1000);    
    const day1 = date1.getDate();
    const date2 = new Date(endAt * 1000);    
    const day2 = date2.getDate();

    const generateRange = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);
    return generateRange(day1, day2);
  }

  // dayと一致するトーナメント情報を詰めるリスト
  const tournamentList = [];

  //全てのトーナメント情報リストから各トーナメント情報に対して処理
  data.map((tournament) => {
    // トーナメントの日付をリストで取得
    const tournamentDate = changeTimestampToDate(tournament.events[0].startAt, tournament.endAt);

    tournamentDate.map((tmpDay) => {
      if (tmpDay === day) {
        tournamentList.push(tournament);
      }
    })
  })

  //sort by attendees
  tournamentList.sort(function(a, b) {
    if (a.numAttendees > b.numAttendees) {
      return -1;
    } else {
      return 1;
    }
  })

  return tournamentList;
}

function getTournamentImageList(tournamentList){
  const imageList = [];
  tournamentList.map((tournament) => {
    imageList.push(tournament.images.url);
  })
  return imageList;
}

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeekdaysStyle = styled.div`
background-color: skyBlue;  
text-align: center;
position: relative;
font-weight: bold;

flex-basis: calc(100% / 7 - 2.5%);
height:calc(100% / 6 -5%);
margin-left: 2%;   
margin-top:1.5%;  
margin-bottom:1.5%;
border-radius: 7px;    

display: flex;
flex-wrap: wrap;
justify-content: center;
`;

//animation: ${fadeIn} 0.5s forwards;
function Calendar({ tournamentData }) {
  const hoveredDay = useRef(null); // 変更
  const [modalVisible, setModalVisible] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null); // 追加

  const [animationStartPosition, setAnimationStartPosition] = useState({
    x: 0,
    y: 0,
  });

  const calendarDays = getCalendarDays(); // 追加

  const handleMouseOver = useCallback(
    (event, day) => {
      // 変更
      hoveredDay.current = day; // 変更

      const rect = event.currentTarget.getBoundingClientRect();
      const left = rect.left;
      const top = rect.top;
      const bottom = rect.bottom;
      const right = rect.right;
      const x = left - (right - left);
      const y = bottom - (bottom - top);

      setAnimationStartPosition({ x, y });
      //setSelectedDate(day);

      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }

      if (event.type === 'click') {
        setModalVisible(true);
      } else {
        const newTimeout = setTimeout(() => {
          if (hoveredDay.current === day) {
            setModalVisible(true);
          }
        }, 700);
        setHoverTimeout(newTimeout);
      }
    },
    [hoverTimeout]
  );

  const handleMouseOut = () => {
    if (modalVisible) return; // 追加

    setModalVisible(false);
    hoveredDay.current = null;

    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };

  return (
    <CalendarWrapper>
      <CalendarGrid>
        {weekdays.map((day) => (
          <WeekdaysStyle day={day}>{day}</WeekdaysStyle>
        ))}
        
        {calendarDays.map((day, index) => (
          <DayComponent
            key={index}
            date={day.day}
            currentMonth={day.currentMonth}
            onMouseOver={(event) => handleMouseOver(event, day.day)}
            onMouseOut={handleMouseOut}   
            onClick={(event) => handleMouseOver(event, day.day)} // ここを追加
            tournamentList={getTournamentList(tournamentData,day.day)}         
            imageUrls={getTournamentImageList(getTournamentList(tournamentData,day.day))}  
            isModalVisible={modalVisible && day.day === hoveredDay.current}
        >           
        </DayComponent>
        ))}
      </CalendarGrid>
      {modalVisible && (
        <DayModal
          day={hoveredDay.current} // 修正
          onClose={() => {
            setModalVisible(false);
            hoveredDay.current = null;
          }}
          animationStartPosition={animationStartPosition}
          tournamentList={getTournamentList(tournamentData, hoveredDay.current)}
        />
      )}
    </CalendarWrapper>
  );
}

export default Calendar;
