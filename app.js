// // custer cursor
// function cursor() {

// // couser custem
// var cursor = document.querySelector(".cursor");
// document.addEventListener("mousemove", function (dets) {
//   cursor.style.left = dets.x + "px";
//   cursor.style.top = dets.y + "px";
// });
// }
// cursor();

//new page fechers
function OpenPage() {
  var AllElem = document.querySelectorAll(".elem");
  var AllFullElem = document.querySelectorAll(".fullElem");
  var BackBtn = document.querySelectorAll(".fullElem .BackBtn");

  // open new page
  AllElem.forEach((elem) => {
    elem.addEventListener("click", () => {
      AllFullElem[elem.id].style.display = "block";
    });
  });

  // close new page
  BackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      AllFullElem[back.id].style.display = "none";
    });
  });
}
OpenPage();

function todoapk() {
  let currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("task list is emty");
  }

  function randertask() {
    localStorage.setItem("currentTask", JSON.stringify(currentTask));
    let AllTask = document.querySelector(".alltask");

    let sum = "";

    currentTask.forEach((elem, index) => {
      sum += `
    <div class="task">
      <input
        type="checkbox"
        class="checkBox"
        data-index="${index}"
        ${elem.completed ? "checked" : ""}>

      <h5 style="text-decoration:${elem.completed ? "line-through " : "none"}">
        ${elem.task}
      </h5>

      <button class="deleteBtn" id="${index}">Delete</button>
    </div>
  `;
    });
    AllTask.innerHTML = sum;

    document.querySelectorAll(".checkBox").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        let index = checkbox.dataset.index;

        currentTask[index].completed = checkbox.checked;

        localStorage.setItem("currentTask", JSON.stringify(currentTask));

        randertask();
      });
    });

    document.querySelectorAll(".task button").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentTask.splice(btn.id, 1);
        randertask();
      });
    });
  }

  randertask();

  let form = document.querySelector(".addtask form");
  let TaskInput = document.querySelector(".addtask form input");
  let TaskDetailsInput = document.querySelector(".addtask form textarea");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (TaskInput.value.trim() === "") {
      return;
    }

    currentTask.push({
      task: TaskInput.value,
      details: TaskDetailsInput.value,
      completed: false,
    });

    TaskInput.value = "";
    TaskDetailsInput.value = "";

    randertask();
  });
}

todoapk();

function DailyPlaner() {
  let dpboxInputData = JSON.parse(localStorage.getItem("dayPlanner")) || {};

  let hours = Array.from({ length: 20 }, (_, idx) => {
    let start = (5 + idx) % 24;
    let end = (start + 1) % 24;

    let startPeriod = start >= 12 ? "PM" : "AM";
    let endPeriod = end >= 12 ? "PM" : "AM";

    start = start % 12 || 12;
    end = end % 12 || 12;

    return `${start}:00 ${startPeriod} - ${end}:00 ${endPeriod}`;
  });

  let wholeDaySum = "";

  hours.forEach((elem, idx) => {
    let saveData = dpboxInputData[idx] || "";

    wholeDaySum += `
    <div class="dpbline">
      <h5>${elem}</h5>
      <input
        id="${idx}"
        type="text"
        placeholder="..."
        value="${saveData}"
      >
    </div>
  `;
  });

  document.querySelector(".dpbox").innerHTML = wholeDaySum;

  let dpbox_input = document.querySelectorAll(".dpbox input");

  dpbox_input.forEach((elem) => {
    elem.addEventListener("input", () => {
      dpboxInputData[elem.id] = elem.value;

      localStorage.setItem("dayPlanner", JSON.stringify(dpboxInputData));
    });
  });
}

DailyPlaner();

async function fatchQuets() {
  let quotes = document.querySelector(".quoteBody p");
  let authors = document.querySelector(".authorName h5");

  let respose = await fetch(
    "https://random-quotes-freeapi.vercel.app/api/random",
  );

  let data = await respose.json();
  quotes.innerHTML = data.quote;
  authors.innerHTML = data.author;
}
fatchQuets();

function pomodoroTimer() {


    let timer = document.querySelector('.pomo-timer h1')
    var startBtn = document.querySelector('.pomo-timer .start-timer')
    var pauseBtn = document.querySelector('.pomo-timer .pause-timer')
    var resetBtn = document.querySelector('.pomo-timer .reset-timer')
    var session = document.querySelector('.pomodoroPage .session')
    var isWorkSession = true

    let totalSeconds = 25 * 60
    let timerInterval = null

    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = totalSeconds % 60

        timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }

    function startTimer() {
        clearInterval(timerInterval)

        if (isWorkSession) {

            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = false
                    clearInterval(timerInterval)
                    timer.innerHTML = '05:00'
                    session.innerHTML = 'Take a Break'
                    session.style.backgroundColor = 'var(--blue)'
                    totalSeconds = 5 * 60
                }
            }, 10)
        } else {


            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = true
                    clearInterval(timerInterval)
                    timer.innerHTML = '25:00'
                    session.innerHTML = 'Work Session'
                    session.style.backgroundColor = 'var(--green)'
                    totalSeconds = 25 * 60
                }
            }, 10)
        }

    }

    function pauseTimer() {
        clearInterval(timerInterval)
    }
    function resetTimer() {
        totalSeconds = 25 * 60
        clearInterval(timerInterval)
        updateTimer()

    }
    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)



}

pomodoroTimer()




function weatherFunctionality() {


    
    var apiKey = '600d82f6570045ea8d075449261006';
    var city = 'Roorkee'



    var header1Time = document.querySelector('.header1 h1')
    var header1Date = document.querySelector('.header1 h2')
    var header2Temp = document.querySelector('.header2 h2')
    var header2Condition = document.querySelector('.header2 h4')
    var precipitation = document.querySelector('.header2 .precipitation')
    var humidity = document.querySelector('.header2 .humidity')
    var wind = document.querySelector('.header2 .wind')

    var data = null

    async function weatherAPICall() {
        var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        data = await response.json()

        header2Temp.innerHTML = `${data.current.temp_c}°C`
        header2Condition.innerHTML = `${data.current.condition.text}`
        wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`
        humidity.innerHTML = `Humidity: ${data.current.humidity}%`
        precipitation.innerHTML = `Heat Index : ${data.current.heatindex_c}%`
    }

    weatherAPICall()


    function timeDate() {
        const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var date = new Date()
        var dayOfWeek = totalDaysOfWeek[date.getDay()]
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        var tarik = date.getDate()
        var month = monthNames[date.getMonth()]
        var year = date.getFullYear()

        header1Date.innerHTML = `${tarik} ${month}, ${year}`

        if (hours > 12) {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} PM`

        } else {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} AM`
        }
    }

    setInterval(() => {
        timeDate()
    }, 1000);

}

weatherFunctionality()



function changeTheme() {

    var theme = document.querySelector('.theme')
    var rootElement = document.documentElement

    var flag = 0
    theme.addEventListener('click', function () {

        if (flag == 0) {
            rootElement.style.setProperty('--pri', '#222831')
            rootElement.style.setProperty('--sec', '#393E46')
            rootElement.style.setProperty('--tri1', '#00ADB5')
            rootElement.style.setProperty('--tri2', '#EEEEEE')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--pri', '#39B1D1')
            rootElement.style.setProperty('--sec', '#D6FB61')
            rootElement.style.setProperty('--tri1', '#F6850C')
            rootElement.style.setProperty('--tri2', '#DE3E3E')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--pri', '#F9F7F7')
            rootElement.style.setProperty('--sec', '#DBE2EF')
            rootElement.style.setProperty('--tri1', '#3F72AF')
            rootElement.style.setProperty('--tri2', '#112D4E')
            flag = 0
        }

    }) 

}

changeTheme()

