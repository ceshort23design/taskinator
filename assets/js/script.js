// Global Variables
var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");

// REQUIRE FORM IS FILLED OUT AND CREATE TASK OBJECT
var taskFormHandler = function(event) {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    var isEdit = formEl.hasAttribute("data-task-id");

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId)
    }
    else {
        var taskDataObject = {
            name: taskNameInput,
            type: taskTypeInput
        };

        createTaskEl(taskDataObject);
    }

    formEl.reset();
};

// CREATE THE TASK ELEMENT
var createTaskEl = function(taskDataObject) {
    // CREATE LIST ITEM
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // ADD TASK ID AS A CUSTOM ATTTRIBUTE
    listItemEl.setAttribute("data-task-id", taskIdCounter)

    // CREATE <div> TO HOLD TASK INFO AND ADD TO LIST ITEM
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";         
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObject.name + "</h3><span class='task-type'>" + taskDataObject.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskAction(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    
    // ADD ENTIRE LIST ITEM TO LIST
    tasksToDoEl.appendChild(listItemEl);

    // INCREASE TASK COUNTER FOR NEXT UNIQUE ID
    taskIdCounter++;
};

// CREATE THE TASK ACTIONS
var createTaskAction = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // CREATE EDIT BUTTON
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // CREATE DELETE BUTTON
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // CREATE STATUS SELECT MENU
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // CREATE OPTION ELEMENT
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

// MANAGE THE TASK ACTIONS AND GO TO FUNCTION FOR EACH ACTION
var taskButtonHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

// EDIT A TASK  
var editTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
}

var completeEditTask = function(taskName, taskType, taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

// DELETE A TASK
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

// EVENT LISTENERS 
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);