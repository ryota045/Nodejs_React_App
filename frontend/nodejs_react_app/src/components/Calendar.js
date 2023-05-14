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
  height: 90vh;
  width: 100%;
  background-color: red;
`;

const CalendarGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 80%;
  height: 80%;
  margin-top: 10%;
  margin: auto;
`;
/*
const Day = styled.div`
  background-color: #eee;  
  text-align: center;
  position: relative;
  font-weight: bold;

  flex-basis: calc(100% / 7 - 2.5%);
  height:calc(100% / 6 -5%);
  margin-left: 2%;   
  margin-top:1.5%;  
  border-radius: 8%;    

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  box-shadow: ${(props) =>
    props.currentMonth
      ? `inset 0 -3em 3em rgba(0,0,0,0.1),
        0 0  0 2px rgb(255,255,255),
        0.3em 0.3em 1em rgba(0,0,0,0.3)`
      : `inset 0 -3em 3em rgba(0,0,0,0.1),
        0.3em 0.3em 1em rgba(0,0,0,0.3)`};
}
  ${(props) =>
    props.currentMonth &&
    css`
      &:hover {
        cursor: pointer;
        border-radius: 3px;
        animation: ${fadeIn} 0.5s forwards;
        z-index: ${props.isModalVisible ? 0 : 10};
      }
    `}
`;*/

// 画像のスタイル定義
const DayImage = styled.img`
  flex: 1;
  object-fit: cover;
  max-width: 50%;
  max-height: 50%;
  margin: auto;
`;
/*
// Day コンポーネントの定義
const DayComponent = ({ date, currentMonth, isModalVisible, onMouseOver, onMouseOut}) => {
  return (
    <Day currentMonth={currentMonth} isModalVisible={isModalVisible} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <span>{date}</span>
      
    </Day>
  );
};
*/

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
  return tournamentList;
}

function getTournamentImageList(tournamentList){
  const imageList = [];
  tournamentList.map((tournament) => {
    imageList.push(tournament.images.url);
  })
  return imageList;
}

//animation: ${fadeIn} 0.5s forwards;
function Calendar({ tournamentData }) {
  const hoveredDay = useRef(null); // 変更
  const [modalVisible, setModalVisible] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null); // 追加

  const [animationStartPosition, setAnimationStartPosition] = useState({
    x: 0,
    y: 0,
  });

  console.log(getTournamentList(tournamentData, 6));

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

      const newTimeout = setTimeout(() => {
        if (hoveredDay.current === day) {
          // 変更
          setModalVisible(true);
        }
      }, 1000);
      setHoverTimeout(newTimeout);
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
      <h2 style={{ marginBottom: "24px", backgroundColor: "red" }}>
        Game Tournament Calendar
      </h2>
      <CalendarGrid>
        {calendarDays.map((day, index) => (
          <DayComponent
            key={index}
            date={day.day}
            currentMonth={day.currentMonth}
            onMouseOver={(event) => handleMouseOver(event, day.day)}
            onMouseOut={handleMouseOut}   
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
