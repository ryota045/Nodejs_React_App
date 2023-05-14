import React from 'react';
import TournamentItem from './TournamentItem';
import { getCalendarDays } from '../utils/calendarUtils';
import styled from "styled-components";

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

const TournamentDayWrapper = styled.div`
  padding:15px;
  background-color:red;
  margin:15px 30px;
  background-color: #eee; 
  box-shadow:inset 0 -3em 3em rgba(0,0,0,0.1),
  0 0  0 2px rgb(255,255,255),
  0.3em 0.3em 1em rgba(0,0,0,0.3);
  border-radius:15px;

`

function TournamentListComponent({ tournamentData, isMobileView}) {
  const calendarDays = getCalendarDays(); 
  const today = new Date().getDate();
  const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  const TournamentDay = ({ day, tournaments }) => (
    ((tournaments[0] != null && day.currentMonth) && today <= day.day) &&
    <div>
      <TournamentDayWrapper>
      <h2>{day.month}/{day.day}({dayOfWeek[day.dayOfWeek]})</h2>
      {tournaments.map((tournament) => (
        <TournamentItem key={tournament.id} tournament={tournament} isMobileView={isMobileView}/>
      ))}
      </TournamentDayWrapper>
    </div>
  );  


  return (
    <>
    <div>
      <p>TournamentInfo</p>
    </div>    
    {calendarDays.map((day, index) => (
      <div>
        <TournamentDay day={day} tournaments={getTournamentList(tournamentData, day.day)} isMobileView={isMobileView}>
        </TournamentDay>
      </div>      
    ))}    
    
    </>
  );
}

export default TournamentListComponent;
