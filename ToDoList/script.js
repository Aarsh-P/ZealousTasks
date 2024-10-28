function addTask() {
    const title = document.getElementById("task").value;
    const due = document.getElementById("date").value;
    const now = new Date();
    const errorMessage = document.getElementById("errMsg");

    if (!title || !due) {
      errorMessage.textContent ="Please enter both task title and due date.";
      return;
    }
    errorMessage.textContent = "";

    // Add task to table
    addTaskToTable(title, due, false);

    //Adding task to local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ title: title, due: due, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("task").value = "";
    document.getElementById("date").value = "";
  }

  function addTaskToTable(title, due, isCompleted) {
    const table = document.getElementById("table");
    const row = table.insertRow();
    const now = new Date();

    const task = row.insertCell(0);
    const date = row.insertCell(1);
    const action = row.insertCell(2);

    task.textContent = title;
    date.textContent = due;
    task.className = "";
    date.className = "";

    if (isCompleted) {
      task.classList.add("completed");
      date.classList.add("completed");
    } else if (new Date(due) < now) {
      task.classList.add("incompleted");
      date.classList.add("incompleted");
    }

    const completeBtn = document.createElement("button");
    completeBtn.textContent = isCompleted ? "Completed" : "Complete";
    completeBtn.disabled = isCompleted;
    completeBtn.onclick = function () {
      if (confirm("Are you sure you want to mark this task as complete?")) {
        task.className = "";
        date.className = "";
        task.classList.add("completed");
        date.classList.add("completed");
        completeBtn.textContent = "Completed";
        completeBtn.disabled = true;

        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((taskObj) => {
          if (taskObj.title === title) {
            taskObj.completed = true;
          }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
      if (confirm("Are you sure you want to delete this task?")) {
        table.deleteRow(row.rowIndex);
        
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter((taskObj) => taskObj.title !== title);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    };

    action.appendChild(completeBtn);
    action.appendChild(deleteBtn);
  }

  function loadTasksFromLocalStorage() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach((taskObj) => {
      addTaskToTable(taskObj.title, taskObj.due, taskObj.completed);
    });
  }

  window.onload = function () {
    loadTasksFromLocalStorage();
  };