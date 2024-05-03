const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventInterval = document.querySelector(".event-interval"),
  addEventDescription = document.querySelector(".event-description"),
  addEventType = document.querySelector(".event-description"),
  addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const eventsArr = [];
getEvents();

function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;
  date.innerHTML = months[month] + " " + year;
  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }

  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
  var monthMap = {
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12
  };

  var parts = document.querySelector(".date").textContent.split(" ");
  var monthName = parts[0];
  eventsArr.forEach((event) => {
    const alldays = document.querySelectorAll(".day");
    alldays.forEach((day) => {
      if (parseInt(day.textContent.trim()) === event.day && monthMap[monthName] === event.month && !day.classList.contains("event")) {
        event.events.forEach((event) => {
          if (event.Type === "Every Year") {
            day.classList.add("event");
          }
        });
      }
    });

  });
  const alldays = document.querySelectorAll(".day");
  alldays.forEach((day) => {
    if (!day.classList.contains("active") && !day.classList.contains("next-date") && !day.classList.contains("prev-date") && parseInt(day.textContent.trim()) === activeDay) {
      day.classList.add("active");
      getActiveDay(parseInt(day.textContent.trim()))
    } else if (!day.classList.contains("active") && !day.classList.contains("next-date") && !day.classList.contains("prev-date") && (activeDay === 30 || activeDay === 31 || activeDay === 28 || activeDay === 27)) {
      activeDay = lastDate
    }

  })

}

function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
  updateEvents(activeDay)
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      activeDay = Number(e.target.innerHTML);
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      days.forEach((day) => {
        day.classList.remove("active");
      });
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.getDay();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const fullDayName = dayNames[dayName];
  eventDay.innerHTML = fullDayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    event.events.forEach((event) => {
      if (event.Type === "One Time") {
        if (
          date === event.dayE &&
          month + 1 === event.monthE &&
          year === event.yearE
        ) {
            var timeString = event.time;
            var times = timeString.split(" - ");
            var startTime = times[0];
            var endTime = times[1];
            events += `<div class="event">
                <div style="display:flex; flex-direction:row; align-items:center;"><div><i class="fas fa-circle"></i></div>
                <div class="title">
                  <h3 class="event-title">${event.Name}</h3>
                  <div class="event-time">
                  <span class="event-time">${event.time}</span>
                </div>
                </div></div>
                <div><button style="margin-right:10px;" onclick="deleteItem('${event.Id}','${event.Name}', '${event.Description}')"><i class="fas fa-trash" style='font-size:18px'></i></button>
                <button onclick="rewriteItem('${event.Id}', '${event.Name}', '${event.Description}', '${startTime}', '${endTime}','${event.Interval}', '${event.Type}')"><i class="fas fa-pen" style='font-size:18px'></i></button></div>
    
            </div>`;
  
        }

      } else if (event.Type === "Every Year") {
        var monthMap = {
          "January": 1,
          "February": 2,
          "March": 3,
          "April": 4,
          "May": 5,
          "June": 6,
          "July": 7,
          "August": 8,
          "September": 9,
          "October": 10,
          "November": 11,
          "December": 12
        };
  
        var parts = document.querySelector(".date").textContent.split(" ");
        var monthName = parts[0];
        if (
          activeDay === event.dayE &&
          monthMap[monthName] === event.monthE
        ) {
            var timeString = event.time;
            var times = timeString.split(" - ");
            var startTime = times[0];
            var endTime = times[1];
            events += `<div class="event">
                <div style="display:flex; flex-direction:row; align-items:center;"><div><i class="fas fa-circle"></i></div>
                <div class="title">
                  <h3 class="event-title">${event.Name}</h3>
                  <div class="event-time">
                  <span class="event-time">${event.time}</span>
                </div>
                </div></div>
                <div><button style="margin-right:10px;" onclick="deleteItem('${event.Id}','${event.Name}', '${event.Description}')"><i class="fas fa-trash" style='font-size:18px'></i></button>
                <button onclick="rewriteItem('${event.Id}', '${event.Name}', '${event.Description}', '${startTime}', '${endTime}','${event.Interval}', '${event.Type}')"><i class="fas fa-pen" style='font-size:18px'></i></button></div>
    
            </div>`;  
        }

      }
      if (
        date === event.day &&
        month + 1 === event.month &&
        year === event.year &&
        event.events.length === 0) {
        events = `<div class="no-event">
        <h3>No Events</h3>
    </div>`;
      }
    });
  });
  eventsContainer.innerHTML = events;
  saveEvents();
}

addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});

addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;
  const eventDescription = addEventDescription.value;
  const eventInterval = addEventInterval.value;
  const form = document.getElementById(`formRadio`);
  const selectedOption = form.querySelector(`input[name="typeradio"]:checked`);
  var answer = "";
  if (selectedOption) {
    answer = selectedOption.value;
  }
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Please fill all the fields");
    return;
  }

  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Invalid Time Format");
    return;
  }

  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitle) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("Event already added");
    return;
  }
  const newEvent = {
    Id: getRandomInt(1, 82346894),
    Name: eventTitle,
    Description: eventDescription,
    time: timeFrom + " - " + timeTo,
    Interval: eventInterval,
    Type: answer,
    dayE: activeDay,
    monthE: month + 1,
    yearE: year
  };
  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  addEventWrapper.classList.remove("active");
  addEventTitle.value = "";
  addEventDescription.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  addEventInterval.value = "";
  updateEvents(activeDay);
  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }
});
function deleteItem(id, title, description) {
  if (confirm("Are you sure you want to delete this event?")) {
    eventsArr.forEach((event) => {
      if (
        event.day === activeDay &&
        event.month === month + 1 &&
        event.year === year
      ) {
        event.events.forEach((item, index) => {
          if (parseInt(item.Id) === parseInt(id) && item.Name === title && item.Description === description) {

            event.events.splice(index, 1);
          }
        });
        //if no events left in a day then remove that day from eventsArr
        if (event.events.length === 0) {
          eventsArr.splice(eventsArr.indexOf(event), 1);
          //remove event class from day
          const activeDayEl = document.querySelector(".day.active");
          if (activeDayEl.classList.contains("event")) {
            activeDayEl.classList.remove("event");
          }
        }
      }
    });
    updateEvents(activeDay);
  }
}

function rewriteItem(Id, title, description, start, end, interval, type) {

  document.querySelector(".rewrite-event-wrapper").innerHTML = `<div class="add-event-header">
<div class="title">Event</div>
<i class="fas fa-times" onclick="closerewrite()" ></i>
</div>
<div class="add-event-body">
<div class="add-event-input">
    <input type="text" placeholder="Event Name" class="event-name" id="eventName"/>
</div>
<div class="add-event-input">
    <input type="text" placeholder="Event Description" class="event-name" id="eventDesc"/>
</div>
<div class="add-event-input">
    <input type="text" placeholder="Event Time From" class="event-time-from" id="eventTimeFrom"/>
</div>
<div class="add-event-input">
    <input type="text" placeholder="Event Time To" class="event-time-to" id="eventTimeTo"/>
</div>
<div class="add-event-input">
    <input type="text" placeholder="Interval To Notify" class="event-time-to" id="eventInterval"/>
</div>
<form action="/action_page.php" class= "radioBox" id="radioBoxEdit">
<div class="form-check">
  <input type="radio" class="form-check-input" id = "first" name="optradio" value="One Time" checked>
  <label class="form-check-label" for="radio1" style="color: #b3b3b3;">One Time</label>
</div>
<div class="form-check" style="margin-right: 10%;">
  <input type="radio" class="form-check-input" id="second" name="optradio" value="Every Year">
  <label class="form-check-label" for="radio2" style="color: #b3b3b3;">Every Year</label>
</div>
</form>
</div>
<div class="add-event-footer">
<button class="edit-event" onclick="editEvent('${Id}')">Edit Event</button>
</div>`;
  document.querySelector(".rewrite-event-wrapper").classList.toggle("active");
  document.getElementById('eventName').value = title
  document.getElementById('eventDesc').value = description
  document.getElementById('eventTimeFrom').value = start
  document.getElementById('eventTimeTo').value = end
  document.getElementById('eventInterval').value = interval
  if (document.getElementById('first').value === type) {
    document.getElementById('first').checked = true;
  } else {
    document.getElementById('second').checked = true;
  }
}
function closerewrite() {
  document.querySelector(".rewrite-event-wrapper").classList.remove("active");
}

function editEvent(id) {
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((item, index) => {
        if (parseInt(item.Id) === parseInt(id)) {
          item.Name = document.getElementById('eventName').value
          item.Description = document.getElementById('eventDesc').value
          item.time = document.getElementById('eventTimeFrom').value + " - " + document.getElementById('eventTimeTo').value
          item.Interval = document.getElementById('eventInterval').value
          const form = document.getElementById(`radioBoxEdit`);
          const selectedOption = form.querySelector(`input[name="optradio"]:checked`);
          var answer = "";
          if (selectedOption) {
            answer = selectedOption.value;
          }
          item.Type = answer;
        }
      });
      document.querySelector(".rewrite-event-wrapper").classList.remove("active");
    }
  });
  updateEvents(activeDay);
}

eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {

  }
});

function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

function getEvents() {
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

function convertTime(time) {
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}

const currentDate = new Date();

const cyear = currentDate.getFullYear();
const cmonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
const cday = String(currentDate.getDate()).padStart(2, '0');

const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');
const seconds = String(currentDate.getSeconds()).padStart(2, '0');

const currentDateTime = `${cyear}-${cmonth}-${cday}T${hours}:${minutes}:${seconds}`;

eventsArr.forEach((event) => {

  if (
    parseInt(activeDay) === parseInt(cday) &&
    parseInt(month + 1) === parseInt(cmonth) &&
    parseInt(year) === parseInt(cyear)
  ) {

    if (event.events.length > 0) {
      event.events.forEach((item) => {
        var timeString = item.time;
        var times = timeString.split(" - ");
        var start = times[0].slice(0, -3);;
        var end = times[1].slice(0, -3);;
        const [shour, sminute] = start.split(":").map(Number);
        const [ehour, eminute] = end.split(":").map(Number);

        if (parseInt(hours) >= parseInt(shour) && parseInt(hours) <= parseInt(ehour)) {
          const startTime = new Date(`${item.year}-${item.month}-${item.day}T${start}:00`);
          const endTime = new Date(`${item.year}-${item.month}-${item.day}T${end}:00`);
          const interval = parseFloat(item.Interval) * 60 * 1000;

          function showAlert() {
            const title = "Title of the Alert";
            const description = "This is the description of the alert.";

            const alertMessage = item.Name + "\n\n" + item.Description;

            alert(alertMessage);
          }

          function alertEveryMinute() {
            if (currentDate >= endTime) {
              clearInterval(intervalId); 
            } else {
              showAlert();
            }
          }

          // Start the interval
          //const intervalId = setInterval(alertEveryMinute, interval); // 60000 milliseconds = 1 minute
          // const intervalId = setInterval(() => {
          //    showAlert();
          //    currentTime.setTime(currentTime.getTime() + interval);

          //   //  if (currentDateTime >= endTime) {
          //   //      clearInterval(intervalId);
          //   //  }
          // }, interval);
        }
      });
    }
  }
});


