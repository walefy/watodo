const btnSubmit = document.querySelector('#btn-submit');
const formTodo = document.querySelector('#todo-form');
const listOfTodoElement = document.querySelector('#list-of-todo');
let listOfTodo = [];
let isFirstTime = true;

formTodo.addEventListener('submit', (event) => {
  event.preventDefault();

  const todo = document.querySelector('#GET-todo');

  if (listOfTodo.includes(todo.value)) return;
  if (todo.value.trim() === '') {
    // alert('Type anything...');
    todo.value = ''; // reset todo value if user typed space
    todo.placeholder = 'type anything...'; // change placeholder
    return;
  }
  
  todo.placeholder = '';

  listOfTodo.push(todo.value.trim());
  storage(); // update the local storage
  addItemInTodoElement(todo.value);
  todo.value = '';
});

window.addEventListener('load', () => {
  init();

  if (isFirstTime) {
    localStorage.setItem('listStorage', JSON.stringify([]));
    return;
  }

  const listStorage = JSON.parse(localStorage.getItem('listStorage'));
  listOfTodo = listOfTodo.concat(listStorage);

  listOfTodo.forEach(str => {
    addItemInTodoElement(str);
  });
});

function storage() {
  localStorage.setItem('listStorage',  JSON.stringify(listOfTodo));
}

function addItemInTodoElement(todo) {
  const liId = `li-${listOfTodo.indexOf(todo)}`; // create li id
  const checkboxId = `checkbox-${listOfTodo.indexOf(todo)}`; // create checkbox id
  const li = document.createElement('li'); // create li element
  const checkbox = document.createElement('input'); // create input element

  li.id = liId; // set id of li element
  li.textContent = todo; // set the text content in li element

  checkbox.type = 'checkbox'; // set type of input to checkbox
  checkbox.id = checkboxId; // set checkbox id
  checkbox.addEventListener('change', (event) => {
    const liElement = event.target.parentNode; // get the li element that contains the checkbox
    liElement.classList.toggle('completed');
    storage(); // update local storage


    // listOfTodo.splice(listOfTodo.indexOf(liElement.textContent), 1);
  });

  li.appendChild(checkbox); // append the checkbox element into li element
  listOfTodoElement.appendChild(li); // append li element to ul element
}

function init() {
  if (!localStorage.getItem('isFirstTime')) {
    localStorage.setItem('isFirstTime', 'true');
    return; 
  }

  isFirstTime = false;
  console.log('Não é a primeira vez');
}