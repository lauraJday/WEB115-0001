//  Array to store tasks entered by user
let tasks = [];

// Each user needed a unique ID
function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

// Formating for date
function formatDate(dateObj) {
  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dd = String(dateObj.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// Event Listenters for 'DOMContentLoaded' and 'submit' button
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Acquire info entered by user
    const name = document.getElementById('taskName').value.trim();
    const priority = document.getElementById('taskPriority').value;
    const isImportant = document.getElementById('taskImportant').checked;
    const isCompleted = document.getElementById('taskCompleted').checked;
    const date = formatDate(new Date());

    // Validate info entered by user
    if (!name) {
      alert('Task name cannot be empty.');
      return;
    }
    if (!priority) {
      alert('Please select a priority.');
      return;
    }

    // Create new task and store in the variable newTask
    const newTask = {
      id: generateId(),
      name,
      priority,
      isImportant,
      isCompleted,
      date
    };

    tasks.push(newTask);
    logTasks();
    renderTasks();

    // Resets for after submit button is pressed
    this.reset();
  });

  renderTasks();
});

// Render tasks in #taskmanager
function renderTasks() {
  const manager = document.getElementById('taskmanager');
  manager.innerHTML = '';
  if (tasks.length === 0) {
    manager.innerHTML = "<p style='text-align:center;color:#aaa;'>No tasks yet.</p>";
    return;
  }
  tasks.forEach(task => {
    let classes = ['task-item'];
    if (task.isImportant) {
      classes.push('important');
      classes.push(`priority-${task.priority.toLowerCase()}`);
    }

    // Adds newTask object to the end of the tasks array
    if (task.isCompleted) {
      classes.push('completed');
    }
    const taskDiv = document.createElement('div');
    taskDiv.className = classes.join(' ');

    // Task info
    const infoDiv = document.createElement('div');
    infoDiv.className = 'task-info';
    infoDiv.textContent = `${task.name} [${task.priority}]`;

    // In general the  <span> element, used below,  is used for styling, identification, and scripting purposes
    const dateSpan = document.createElement('span');
    dateSpan.className = 'task-date';
    dateSpan.textContent = `Added: ${task.date}`;

    //Toggle
    const completeBox = document.createElement('input');
    completeBox.type = 'checkbox';
    completeBox.checked = task.isCompleted;
    completeBox.title = 'Mark as completed';
    completeBox.addEventListener('change', () => toggleCompleted(task.id));

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    //Put it all together
    infoDiv.appendChild(dateSpan);
    taskDiv.appendChild(completeBox);
    taskDiv.appendChild(infoDiv);
    taskDiv.appendChild(deleteBtn);

    manager.appendChild(taskDiv);
  });
}

// For completed tasks
function toggleCompleted(taskId) {
  const idx = tasks.findIndex(t => t.id === taskId);
  if (idx !== -1) {
    tasks[idx].isCompleted = !tasks[idx].isCompleted;
    logTasks();
    renderTasks();
  }
}

// Delete Task
function deleteTask(taskId) {
  tasks = tasks.filter(t => t.id !== taskId);
  logTasks();
  renderTasks();
}

// Utility: Log tasks to console
function logTasks() {
  console.log(JSON.stringify(tasks));
}