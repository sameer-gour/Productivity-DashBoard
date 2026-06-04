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