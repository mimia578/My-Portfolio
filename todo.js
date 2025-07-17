const input = document.getElementById("tasks");
const addButton = document.getElementById("addbutton");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");

const emptyIcon = document.getElementById("emptyIcon");
const emptyText1 = document.getElementById("emptyText1");
const emptyText2 = document.getElementById("emptyText2");

let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    li.innerHTML = `
      <label class="checkbox-label">
        <input type="checkbox" ${task.completed ? "checked" : ""} data-index="${index}">
        <span class="task-text ${task.completed ? "completed" : ""}">${task.text}</span>
      </label>
      <button class="delete-button" data-index="${index}">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;

    taskList.appendChild(li);
  });

  updateProgress();
  updateEmptyState();
  attachEventListeners();
}

function attachEventListeners() {
  // Checkbox toggles
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener("change", (e) => {
      const index = e.target.getAttribute("data-index");
      tasks[index].completed = e.target.checked;
      saveTasks();
      renderTasks();
    });
  });

  // Delete buttons
  document.querySelectorAll(".delete-button").forEach(button => {
    button.addEventListener("click", (e) => {
      const index = e.currentTarget.getAttribute("data-index");
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });
  });
}

function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  progressBar.style.width = percent + "%";
}

function updateEmptyState() {
  const hasTasks = tasks.length > 0;
  emptyIcon.style.display = hasTasks ? "none" : "block";
  emptyText1.style.display = hasTasks ? "none" : "block";
  emptyText2.style.display = hasTasks ? "none" : "block";
}

function saveTasks() {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

// Initial load
renderTasks();

// Add button and Enter key
addButton.addEventListener("click", addTask);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
