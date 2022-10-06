let input = document.querySelector(".input");
let add = document.querySelector(".add");
let showArea = document.querySelector(".tasks");
let deleteBtn = document.querySelector(".delete");
let clearAll = document.querySelector(".clearAll");

if (localStorage.getItem(`localItem`) !== null) {
  showTasks();
}

add.addEventListener("click", () => {
  let localItems = JSON.parse(localStorage.getItem(`localItem`));
  let taskList = [];
  if (localItems === null) {
    taskList = [];
  } else {
    taskList = localItems;
  }

  if (input.value !== "") {
    taskList.push({
      id: parseInt(Math.random() * 1000000000000),
      title: input.value,
    });

    window.localStorage.setItem("localItem", JSON.stringify(taskList));
    input.value = "";
  }
  showTasks();
});

function showTasks() {
  let obj = JSON.parse(localStorage.getItem(`localItem`));
  let outPut = ``;
  if (obj !== null) {
    for (let i = 0; i < obj.length; i++) {
      outPut += `<div class="task">
                  <div class="taskText">${obj[i]["title"]}</div>
                  <button onClick="deleteTask(${i})" class="delete">Done</button>
                </div>`;
    }
  }
  showArea.innerHTML = outPut;
}

function deleteTask(index) {
  let taskList = JSON.parse(localStorage.getItem(`localItem`));
  taskList.splice(index, 1);
  localStorage.setItem("localItem", JSON.stringify(taskList));
  showTasks();
}

clearAll.onclick = function () {
  localStorage.clear();
  showTasks();
};
