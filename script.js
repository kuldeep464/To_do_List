const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks on page load
window.onload = () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach((task) => addTaskToDOM(task));
};

// Add button event
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  const newTask = { text, completed: false };
  saveTask(newTask);
  addTaskToDOM(newTask);
  taskInput.value = "";
});

// Save task in localStorage
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete task from localStorage
function deleteTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Toggle complete status in localStorage
function toggleCompleteInStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((t) => {
    if (t.text === taskText) {
      t.completed = !t.completed;
    }
    return t;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task to DOM
function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.textContent = task.text;

  if (task.completed) {
    li.classList.add("complete");
  }

  // div for buttons
  const divBox = document.createElement("div");

  // Complete button
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✅";
  completeBtn.addEventListener("click", () => {
    li.classList.toggle("complete");
    if (li.classList == "complete") {
      Swal.fire("Congratulations!", "Your task has been completed.", "success");
    }
    toggleCompleteInStorage(task.text);
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.addEventListener("click", () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This task will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        li.remove();
        deleteTask(task.text);
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  });

  li.appendChild(divBox);
  divBox.appendChild(completeBtn);
  divBox.appendChild(delBtn);
  taskList.appendChild(li);
}
