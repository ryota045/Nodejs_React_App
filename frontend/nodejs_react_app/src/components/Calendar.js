import React, { useState, useCallback, useRef, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import DayModal from "./DayModal";
import DayComponent from "./DayComponent";
import axios from "axios";
import { getCalendarDays, getCurrentInfo, getNextDispDate } from "../utils/calendarUtils";

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
  position:relative;  
  background-color: #333;
`;

const CalendarGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;  
  width: 60%;
  height: auto;
`;

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

const CurrentInfo = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size: 24px;
font-weight: bold;
padding: 10px 0;
color:white;
text-shadow: 1px 1px 1.5px #ffffff;
`;

const ArrowButton = styled.button`
display: flex;
align-items: center;
justify-content: center;
width: 50px;
height: 50px;
border-radius: 50%;
background-color: #ddd;
border: none;
cursor: pointer;
font-size: 20px;
position: absolute;
${props => props.flag ? 
  `right: 10%` :
  `left : 10%`
}; // to place the button to the left of the calendar
z-index: 1; // to bring the button to front
top: 42%;
transform: translateY(-50%);

&:before {
  content: ${props => props.flag ? 
  `"▶"`:
  `"◀"`
};  
}
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

//animation: ${fadeIn} 0.5s forwards;
function Calendar({ tournamentData }) {
  const hoveredDay = useRef(null); // 変更
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null); // 追加
  const [displayDate, setDisplayDate] = useState(getCurrentInfo());
  const [calendarDays, setCalendarDays] = useState(getCalendarDays(displayDate.year, displayDate.month));    
  const [tournaments, setTournaments] = useState(tournamentData);
  const [searchValue, setSearchValue] = useState(null);
  const [animationStartPosition, setAnimationStartPosition] = useState({
    x: 0,
    y: 0,
  });

  const search = async () => {    
  try {
    const response = await fetch('/api/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchValue),
    });
    console.log(response);
    // レスポンスの処理
    if (response.ok) {
      const responseData = await response.json();      
      tournamentData = responseData;
      console.log(responseData);
      console.log(tournamentData);
      setTournaments(tournamentData);
      setIsLoading(!isLoading);
      // レスポンスデータの処理
    } else {
      // エラーレスポンスの処理
    }
  } catch (error) {
    // エラーハンドリング
    console.log(error); 
  }
 // tournamentData = await axios.get(`http://localhost:5000/search?query=${searchValue}`);
  }

  //let calendarDays = getCalendarDays(displayDate.year, displayDate.month); // 追加

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

  const changeMonth = (y, m, flag) => {
    let newMonth = flag ? m + 1 : m - 1; 
    setDisplayDate(getNextDispDate(y, newMonth));   
  };

  useEffect(() => {
    setSearchValue({"sDate" : displayDate.sDate, "eDate" : displayDate.eDate});    
  }, [displayDate]);

  useEffect(() => {        
    console.log(searchValue);
    search();
  }, [searchValue]);

  useEffect(() => {
    setCalendarDays(getCalendarDays(displayDate.year, displayDate.month));
  }, [isLoading]);

  const prevMonth = displayDate.month === 1 ? 12 : displayDate.month - 1;
  const nextMonth = displayDate.month === 12 ? 1 : displayDate.month + 1;
  return (
    <CalendarWrapper>
      <CurrentInfo>{displayDate.year}年{displayDate.month+1}月</CurrentInfo>      
      <CalendarGrid>
        {weekdays.map((day) => (
          <WeekdaysStyle day={day}>{day}</WeekdaysStyle>
        ))}        
        {calendarDays.map((day, index) => (
          <DayComponent
            key={index}
            date={day.day}
            currentMonth={day.displayMonth}
            onMouseOver={(event) => handleMouseOver(event, day.day)}
            onMouseOut={handleMouseOut}   
            onClick={(event) => handleMouseOver(event, day.day)} // ここを追加
            tournamentList={getTournamentList(tournaments,day.day)}
            imageUrls={getTournamentImageList(getTournamentList(tournaments,day.day))}  
            isModalVisible={modalVisible && day.day === hoveredDay.current}
        >           
        </DayComponent>
        ))}
      </CalendarGrid>
      <ArrowButton month={prevMonth} flag={true} onClick={() => changeMonth(displayDate.year, displayDate.month, true)}/>
      <ArrowButton month={nextMonth} flag={false} onClick={() => changeMonth(displayDate.year, displayDate.month, false)}/>
      {modalVisible && (
        <DayModal
          day={hoveredDay.current} // 修正
          onClose={() => {
            setModalVisible(false);
            hoveredDay.current = null;
          }}
          animationStartPosition={animationStartPosition}
          tournamentList={getTournamentList(tournaments, hoveredDay.current)}
        />
      )}
    </CalendarWrapper>
  );
}

export default Calendar;
