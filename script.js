// Retrieve DOM elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const categorySelect = document.getElementById('category-select');
const taskList = document.getElementById('task-list');

function createTaskItem(task, category) {
  const li = document.createElement('li');
  const taskText = document.createElement('span');
  taskText.textContent = task;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-button');

  deleteButton.addEventListener('click', function (event) {
    event.stopPropagation(); // Stop event propagation
    li.remove(); // Remove the parent list item
  });

  const upButton = document.createElement('button');
  upButton.textContent = 'Up';
  upButton.classList.add('move-button', 'up-button');

  const downButton = document.createElement('button');
  downButton.textContent = 'Down';
  downButton.classList.add('move-button', 'down-button');

  upButton.addEventListener('click', function () {
    moveTaskUp(li);
  });

  downButton.addEventListener('click', function () {
    moveTaskDown(li);
  });

  li.appendChild(taskText);
  li.appendChild(upButton);
  li.appendChild(downButton);
  li.appendChild(deleteButton);

  // Apply category styles
  if (category === 'urgent') {
    li.classList.add('urgent-task');
  } else if (category === 'non-urgent') {
    li.classList.add('non-urgent-task');
  }

  taskList.appendChild(li);
}

  
// Event listener for form submission
taskForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  const task = taskInput.value.trim(); // Get task value and remove leading/trailing spaces
  const category = categorySelect.value; // Get selected category

  if (task !== '') {
    createTaskItem(task, category); // Create new task item with category
    taskInput.value = ''; // Clear task input field
  }
});

// Function to move task item up
function moveTaskUp(taskItem) {
    const previousSibling = taskItem.previousElementSibling;
    if (previousSibling) {
      taskList.insertBefore(taskItem, previousSibling);
    }
  }
  
  // Function to move task item down
function moveTaskDown(taskItem) {
    const nextSibling = taskItem.nextElementSibling;
    if (nextSibling) {
      taskList.insertBefore(taskItem, nextSibling.nextElementSibling);
    }
  }
  
  // Event listener for up button click
taskList.addEventListener('click', function (e) {
    if (e.target.classList.contains('up-button')) {
      const taskItem = e.target.closest('li');
      moveTaskUp(taskItem);
    }
  });
  
  // Event listener for down button click
  taskList.addEventListener('click', function (e) {
    if (e.target.classList.contains('down-button')) {
      const taskItem = e.target.closest('li');
      moveTaskDown(taskItem);
    }
  });

  //Function to mark task item as completed
  function markTaskCompleted(taskItem){
    taskItem.classList.toggle('completed');
  }

  //Event listener for task item click
  taskList.addEventListener('click', function(e){
    if(e.target.tagName === 'SPAN'){
      const taskItem = e.target.parentNode;
      markTaskCompleted(taskItem);
    }
  });
  



  