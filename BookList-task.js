const inputText = document.querySelector('#add-book input');
const link = document.querySelector('.button');

const ul = document.querySelector('ul');

ul.addEventListener('click', function (e) {
    if (e.target.className === 'delete') {
        e.target.parentElement.remove();
        removeFormLocalStorage(e.target.parentElement.children[0].textContent);

    }
})


function removeFormLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = localStorage.getItem('tasks').split(',');
    }
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i] === task) {
            tasks.splice(i, 1);
        }
    }
    if (tasks.length === 0) {
        localStorage.clear();
    } else {

        localStorage.setItem('tasks', tasks);
    }

}


const checkbox = document.querySelector('#hide input');

checkbox.addEventListener('change', function (e) {
    if (checkbox.checked === true) {
        ul.style.display = 'none';
    } else {
        ul.style.display = 'block';

    }
    e.preventDefault();

})





const searchbox = document.querySelector('#search-books input')

searchbox.addEventListener('keyup', function (e) {

    // book = li 
    for (let book of ul.children) {
        if (book.firstElementChild.textContent.indexOf(searchbox.value) !== -1) {
            book.style.display = 'block';
        } else {
            book.style.display = 'none'
        }
    }
})





const buttondelete = `<button class ="delete">حذف</button>`;

link.addEventListener('click', function (e) {
    const spanName = document.createElement('span');
    spanName.className = 'name';
    spanName.innerHTML = inputText.value;

    const li = document.createElement('li');
    li.appendChild(spanName);
    li.innerHTML += buttondelete;

    ul.appendChild(li);

    e.preventDefault();

    storeToLocalStorage(inputText.value);

    inputText.value = '';

})

document.addEventListener('DOMContentLoaded', function (e) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {

        tasks = [];

    }
    else {
        tasks = localStorage.getItem('tasks').split(',');
    }
    for (let item of tasks) {

        const spanName = document.createElement('span');
        spanName.className = 'name';
        spanName.innerHTML = item;

        const li = document.createElement('li');
        li.appendChild(spanName);
        li.innerHTML += buttondelete;

        ul.appendChild(li);

    }
})

// localStorage.clear()

function storeToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = localStorage.getItem('tasks').split(',');
    }

    tasks.push(task);
    localStorage.setItem('tasks', tasks)
}