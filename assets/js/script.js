var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    var taskDataObject = {
        name: taskNameInput,
        type: taskTypeInput
    };

    createTaskEl(taskDataObject);
}

var createTaskEl = function(taskDataObject) {
    // CREATE LIST ITEM
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // CREATE <div> TO HOLD TASK INFO AND ADD TO LIST ITEM
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";         
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObject.name + "</h3><span class='task-type'>" + taskDataObject.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // ADD ENTIRE LIST ITEM TO LIST
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", taskFormHandler);