let date = new Date();

const clickdiv = () => {
    alert('hi');
}

const renderCalendar = () => {
    const thisYear = date.getFullYear();
    const thisMonth = date.getMonth();
    var preLast, thisLast;
    document.querySelector('.year-month').innerHTML = `${thisYear}년 ${thisMonth + 1}월`;
    
    preLast = new Date(thisYear, thisMonth, 0);
    thisLast = new Date(thisYear, thisMonth+1, 0);
    
    // Date.getDate() => 날짜일, Date.getDat() => 해당 요일(0:일요일.)
    const PLDate = preLast.getDate();
    const PLDay = preLast.getDay();
    
    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();
    
    var preDates = [];
    var thisDates = [...Array(TLDate + 1).keys()].slice(1);
    var nextDates = [];
    
    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
          preDates.unshift(PLDate - i);
        }
      }
      
      for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
      }
    var dates = preDates.concat(thisDates, nextDates);
    
    // Dates 정리
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);

    dates.forEach((date, i) => {
    const condition = i >= firstDateIndex && i < lastDateIndex + 1
                      ? 'this'
                      : 'other';
    dates[i] = `<div class="date" onclick="document.getElementById('myModal').style.display='block'"><span class="${condition}">${date}</span></div>`;
    //dates[i] = `<div class="date" onclick="clickdiv()"><span class="${condition}">${date}</span></div>`;
  })
    
    document.querySelector('.dates').innerHTML = dates.join('');
    // 오늘 날짜 그리기
  const today = new Date();
  if (thisMonth === today.getMonth() && thisYear === today.getFullYear()) {
    for (let date of document.querySelectorAll('.this')) {;
      if (+date.innerText === today.getDate()) {
        date.classList.add('today');
        break;
      }
    }
  }
}

renderCalendar();

const preMonth = () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
}
const nextMonth = () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
}
const goToday = () => {
    date = new Date();
    renderCalendar();
}
