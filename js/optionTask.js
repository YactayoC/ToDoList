// Variables
const form = document.querySelector('#dataInput'),
    listTasks = document.querySelector('.main__list'),
    divContent = document.querySelector('.main__content');

const message = document.querySelector('.main__message');
const clearTasks = document.querySelector('.main__options-clear')

const count = document.querySelector('.main__options-items');

divContent.classList.add('d-none');
message.classList.add('d-none');

let tasks = [];

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addTask)

    clearTasks.addEventListener("click", function () {
        tasks = localStorage.removeItem('tasks') || [];
        createHTML();
    })

    document.addEventListener("DOMContentLoaded", () => {
        tasks = JSON.parse(localStorage.getItem('tasks') || []);
        createHTML();
    })
}

function addTask(e) {
    e.preventDefault();
    const task = document.querySelector(".main__field").value;
    if (task.trim() === '' || task === '') {
        message.classList.remove('d-none');
        setTimeout(() => {
            message.classList.add('d-none');
        }, 3000)
        return;
    }

    const taskObj = {
        id: Date.now(),
        task: task
    }

    tasks = [...tasks, taskObj];
    createHTML();
    form.reset();

}

function createHTML() {
    clearHTML();

    if (tasks.length > 0) {
        divContent.classList.remove('d-none');
        
        tasks.forEach(task => {
            const divCheckbox = document.createElement('div');
            const inputCheckbox = document.createElement('input');
            inputCheckbox.type = 'checkbox';
            inputCheckbox.classList.add('main__checkbox', 'checkbox__option');
            divCheckbox.appendChild(inputCheckbox);

            const label = document.createElement('label');
            label.classList.add('main__text');
            label.innerHTML = task.task;

            const btnDelete = document.createElement('button');
            btnDelete.classList.add('main__button', 'main__button-color');
            btnDelete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash main__button-color" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <line x1="4" y1="7" x2="20" y2="7"></line> <line x1="10" y1="11" x2="10" y2="17"></line> <line x1="14" y1="11" x2="14" y2="17"></line> <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path> <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path> </svg>'

            btnDelete.onclick = () => {
                deleteTask(task.id);
            }

            const li = document.createElement('li');

            li.classList.add('main__element');
            li.appendChild(divCheckbox);
            li.appendChild(label);
            li.appendChild(btnDelete);
            listTasks.appendChild(li);
        });
        count.innerHTML = `${tasks.length} items left`
    } else {
        divContent.classList.add('d-none');
        count.innerHTML = `0 items left`
    }
    addStorage();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    createHTML();
}

function clearHTML() {
    while (listTasks.firstChild) {
        listTasks.removeChild(listTasks.firstChild);
    }
}

function addStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



