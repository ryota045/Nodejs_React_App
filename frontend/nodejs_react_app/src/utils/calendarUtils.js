export function getCalendarDays() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  const firstDayOfWeek = firstDayOfMonth.getDay();
  const lastDayOfWeek = lastDayOfMonth.getDay();

  const daysBefore = [...Array(firstDayOfWeek).keys()].map((i) => {
    const day = new Date(currentYear, currentMonth, -i);
    return { day: day.getDate(), currentMonth: false };
  });

  const daysAfter = [...Array(6 - lastDayOfWeek).keys()].map((i) => {
    const day = new Date(currentYear, currentMonth + 1, i + 1);
    return { day: day.getDate(), currentMonth: false };
  });

  const daysInMonth = [...Array(lastDayOfMonth.getDate()).keys()].map((i) => {
    return { day: i + 1, currentMonth: true };
  });

  return [...daysBefore.reverse(), ...daysInMonth, ...daysAfter];
}

/* const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const firstWeekday = firstDayOfMonth.getDay();
  const lastWeekday = lastDayOfMonth.getDay();

  const previousMonthDays = [];
  for (let i = 0; i < firstWeekday; i++) {
    const day = new Date(year, month, -i);
    previousMonthDays.unshift(day.getDate());
  }

  const currentMonthDays = [];
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    currentMonthDays.push(i);
  }

  const nextMonthDays = [];
  for (let i = 1; i <= 6 - lastWeekday; i++) {
    nextMonthDays.push(i);
  }

  return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
}*/
