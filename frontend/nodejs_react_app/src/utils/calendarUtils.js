export function getCalendarDays(year, month) {
  /*
  const currentDate = new Date(); 
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  */
 //初期処理
  if (month === 12 ){
    month = 0;
    year = year + 1;
  }else if (month === -1) {
    month = 11;
    year = year - 1;
  }

  console.log(year, month);

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const firstDayOfWeek = firstDayOfMonth.getDay();
  const lastDayOfWeek = lastDayOfMonth.getDay();
  console.log(lastDayOfMonth.getDate());

  const daysBefore = [...Array(firstDayOfWeek).keys()].map((i) => {
    const prevMonth = ( month == 0 ) ? 12 : month; // 先月用
    const day = new Date(year, prevMonth-1, -i);
    return { day: day.getDate(), displayMonth: false , month: month+1, dayOfWeek: day.getDay()};
  });

  const daysAfter = [...Array(6 - lastDayOfWeek).keys()].map((i) => {
    const day = new Date(year, month + 1, i + 1);
    return { day: day.getDate(), displayMonth: false, month: month+1, dayOfWeek: day.getDay()};
  });

  const daysInMonth = [...Array(lastDayOfMonth.getDate()).keys()].map((i) => {
    const day = new Date(year, month, i + 1);
    return { day: day.getDate(), displayMonth: true, month: month+1, dayOfWeek: day.getDay()};
  });

  return [...daysBefore.reverse(), ...daysInMonth, ...daysAfter];
}

export function getCurrentInfo() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();  
  const day = date.getDate();
  return { year, month, day};
}

export function getNextDispDate(year, month) {
  if (month === 12 ){
    month = 0;
    year = year + 1;
  }else if (month === -1) {
    month = 11;
    year = year - 1;
  }
  const day = 1;
  const sDate = new Date(year, month, day).getTime()/1000;
  console.log(sDate);
  const day2 = new Date(year, month+1, 0);
  const eDate= day2.getTime()/1000;
  
  return {year, month, day, sDate, eDate};
}