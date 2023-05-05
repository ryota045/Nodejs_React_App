import React, { useState, useEffect } from 'react';
import Calendar from "./components/Calendar";
import "./App.css";
import styled from "styled-components";
//import { getCalendarDays } from "./utils/calendarUtils";

//const [currentDate, setCurrentDate] = useState(new Date());
//const currentYear = currentDate.getFullYear();
//const currentMonth = currentDate.getMonth();

const handlePrevMonthClick = () => {
  setCurrentDate((prevDate) => {
    const newDate = new Date(prevDate);
    newDate.setMonth(prevDate.getMonth() - 1);
    return newDate;
  });
};
const handleNextMonthClick = () => {
  setCurrentDate((prevDate) => {
    const newDate = new Date(prevDate);
    newDate.setMonth(prevDate.getMonth() + 1);
    return newDate;
  });
};

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      const result = await response.json();
      setData(result.tournaments.nodes);
      console.log("success set Data");
    } catch (error) {
      console.error(error);
    }
  };

  const changeTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月は0から始まるので、1を足す
    const day = date.getDate();

    return year + "年" + month + "月" + day + "日";
  }
  return (
    <div className="App">
      <h1>Data</h1>
      <ul>
        {data.map((tournament) => (
          <>
          <li> {changeTimestampToDate(tournament.startAt)}</li>   
          <img src={tournament.images[0].url} alt="画像の説明" height="400" width="400" />  
          <li>{tournament.images[0].url} </li>    
          </>
        ))}
      </ul>
      <CalendarHeader>
        <button onClick={handlePrevMonthClick}>&lt;</button>
        <button onClick={handleNextMonthClick}>&gt;</button>
      </CalendarHeader>
      <Calendar />
    </div>
  );
}

export default App;
