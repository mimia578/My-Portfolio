// Get elements from the HTML by their ID
const input = document.getElementById("tasks");
const addButton = document.getElementById("addbutton");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");

const emptyIcon = document.getElementById("emptyIcon");
const emptyText1 = document.getElementById("emptyText1");
const emptyText2 = document.getElementById("emptyText2");

// Load tasks from localStorage or use an empty array if none exist
let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

// Function to display all tasks on the page
function renderTasks() {
  // Clear current list
  taskList.innerHTML = "";

  // Loop through each task and add it to the list
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    // Add the HTML content of the task with checkbox and delete button
    li.innerHTML = `
      <label class="checkbox-label">
        <input type="checkbox" ${task.completed ? "checked" : ""} data-index="${index}">
        <span class="task-text ${task.completed ? "completed" : ""}">${task.text}</span>
      </label>
      <button class="delete-button" data-index="${index}">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;

    // Add this list item to the main task list
    taskList.appendChild(li);
  });

  // Update the progress bar and empty message
  updateProgress();
  updateEmptyState();

  // Attach event listeners to each checkbox and delete button
  attachEventListeners();
}

// Function to handle clicks on checkboxes and delete buttons
function attachEventListeners() {
  taskList.addEventListener("click", (e) => {
    const target = e.target;

    // If a checkbox is clicked, toggle its completed state
    if (target.type === "checkbox") {
      const index = target.getAttribute("data-index");
      tasks[index].completed = target.checked;
      saveTasks();     // Save changes to localStorage
      renderTasks();   // Re-render the task list
    }

    // If a delete button is clicked, remove the task
    if (target.closest(".delete-button")) {
      const index = target.closest(".delete-button").getAttribute("data-index");
      tasks.splice(index, 1);  // Remove task from array
      saveTasks();             // Save updated list
      renderTasks();           // Re-render the task list
    }
  });
}

// Function to add a new task
function addTask() {
  const taskText = input.value.trim(); // Remove extra spaces

  // Do nothing if the input is empty
  if (taskText === "") return;

  // Add task to the array
  tasks.push({ text: taskText, completed: false });
  input.value = ""; // Clear the input field
  saveTasks();      // Save the new task
  renderTasks();    // Show the updated list
}

// Function to update the progress bar
function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  progressBar.style.width = percent + "%"; // Update visual width
}

// Function to show or hide "No tasks" message
function updateEmptyState() {
  const hasTasks = tasks.length > 0;
  emptyIcon.style.display = hasTasks ? "none" : "block";
  emptyText1.style.display = hasTasks ? "none" : "block";
  emptyText2.style.display = hasTasks ? "none" : "block";
}

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

// When the page first loads, show the existing tasks
renderTasks();

// Event listener: add task when "+" button is clicked
addButton.addEventListener("click", addTask);

// Event listener: add task when Enter key is pressed
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
