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
  var AllFullElem = document.querySelectorAll('.fullElem');
  var BackBtn = document.querySelectorAll('.fullElem .BackBtn')
  
  
  // open new page 
  AllElem.forEach((elem) => {
    elem.addEventListener("click", () => {
      
      AllFullElem[elem.id].style.display = 'block';
      
      
    });
  });
  
  // close new page 
  BackBtn.forEach(function(back){
    back.addEventListener('click',function () {
      AllFullElem[back.id].style.display='none'
    })
});
}
OpenPage();

let currentTask = []

if (localStorage.getItem('currentTask')) {
  currentTask = JSON.parse(localStorage.getItem('currentTask'))
}else{
  console.log("task list is emty");
  
}

function randertask() {
  let AllTask = document.querySelector('.alltask');

  let sum = '';

  currentTask.forEach(elem => {
    sum += `
      <div class="task">
        <input type="checkbox" class="checkBox" id="checkBox" >
        <h5>${elem.task}</h5>
        <button class="deleteBtn">Delete</button>
      </div>
    `;
  });

  AllTask.innerHTML = sum;
}

randertask();

let form = document.querySelector('.addtask form');
let TaskInput = document.querySelector('.addtask form input');
let TaskDetailsInput = document.querySelector('.addtask form textarea');

form.addEventListener('submit', (e) => {
  
  e.preventDefault();
   if (
  TaskInput.value.trim() === '' ||
  TaskDetailsInput.value.trim() === ''
) {
  return;
}

  currentTask.push({
    task: TaskInput.value,
    details: TaskDetailsInput.value
  });
localStorage.setItem('currentTask',JSON.stringify(currentTask))
  TaskInput.value = '';
  TaskDetailsInput.value = '';

  randertask();
 
});

let checked = document.querySelectorAll('.task .checkBox');



checked.forEach(checkbox => {
  checkbox.addEventListener('change', () => {

    let h5 = checkbox.parentElement.querySelector('h5');
    let index = checkbox.dataset.index;

    if (checkbox.checked) {
      h5.style.textDecoration = "line-through";
      currentTask[index].completed = true;
    } else {
      h5.style.textDecoration = "none";
      currentTask[index].completed = false;
    }

    localStorage.setItem(
      "tasks",
      JSON.stringify(currentTask)
    );

  });
});

let AllTask = document.querySelector('.alltask');

AllTask.addEventListener('click', (e) => {

  if (e.target.classList.contains('deleteBtn')) {

    let index = e.target.dataset.index;

    currentTask.splice(index, 1);

    localStorage.setItem(
      'tasks',
      JSON.stringify(currentTask)
    );

    randertask();
  }

});