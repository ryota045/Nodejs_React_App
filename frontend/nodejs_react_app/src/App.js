import React, { useState, useEffect } from 'react';
import Calendar from "./components/Calendar";
import axios from "axios";
import "./App.css";
import styled from "styled-components";
import ResponsiveComponent from './components/ResponsiveComponent';
import Loading from './components/Loading';
import SearchModal from './components/SearchModal'; // SearchModalコンポーネントをインポート
import { getCurrentInfo } from './utils/calendarUtils';
//const [searchValue, setSearchValue] = useState("");
//import { getCalendarDays } from "./utils/calendarUtils";

//const [currentDate, setCurrentDate] = useState(new Date());
//const currentYear = currentDate.getFullYear();
//const currentMonth = currentDate.getMonth();

//const search = async () => {
 // const response = await axios.get(`http://localhost:5000/search?query=${searchValue}`);
  // responseを使用して何かを行う
//};

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
  padding: 3%;
  background-color:red;
`;

function App() {
  //const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  /*
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  */
const currentInfo = getCurrentInfo();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      const result = await response.json();
      setData(result.tournaments.nodes);
      setIsLoading(false);
      console.log("success set Data");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    isLoading ?
    <Loading></Loading> :
    <div className="App">      
      <CalendarHeader>
        <button onClick={handlePrevMonthClick}>&lt;</button>        
        <button onClick={handleNextMonthClick}>&gt;</button>
      </CalendarHeader>
      <ResponsiveComponent 
        tournamentData = {data}
      />
    </div>    
  );
}

export default App;
