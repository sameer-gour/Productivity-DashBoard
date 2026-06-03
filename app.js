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

      <h5 style="text-decoration:${elem.completed ? "line-through" : "none"}">
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
    if (
      TaskInput.value.trim() === ""
      
    ) {
      return;
    }

    currentTask.push({
  task: TaskInput.value,
  details: TaskDetailsInput.value,
  completed: false
});

    TaskInput.value = "";
    TaskDetailsInput.value = "";

    randertask();
  });
}

todoapk();
