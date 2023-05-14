import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import TournamentListComponent from './TournamentListComponent';

function ResponsiveComponent({tournamentData}) {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobileView ? <TournamentListComponent tournamentData = {tournamentData} isMobileView={isMobileView}/> : <Calendar tournamentData = {tournamentData}/>;
}

export default ResponsiveComponent;
