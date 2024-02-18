const currentDate = document.querySelector('.current-date');
const days = document.querySelector('.days');
const icons = document.querySelectorAll('.arrows i');
const clickedDay = document.querySelector('.clicked-date');
const addEventBtn = document.querySelector('.add-event-btn');
const form = document.querySelector('.event-form');
const eventList = document.querySelector('.events');

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();


const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const tasks = [];

clickedDay.innerHTML = `${date.getDate()} ${months[currMonth]} ${currYear}`;

const renderCalendar = function () {

    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
    let lastDayOfMonth = new Date(currYear, currMonth + 1, 0).getDay();

    let liDays = '';
    for (let i = firstDayOfMonth; i > 0; i--) {
        liDays += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }
    for (let i = 1 ; i <= lastDateOfMonth; i++){
        let today = i === date.getDate() && currMonth === date.getMonth() && currYear === date.getFullYear() ? "active":'';
        liDays += `<li class="${today}">${i}</li>`;
    }
    for (let i = lastDayOfMonth; i < 6; i++){
        liDays += `<li class='inactive'>${i - lastDayOfMonth + 1}</li>`;
    }
    days.innerHTML = liDays;
    currentDate.innerHTML = `${months[currMonth]} ${currYear}`;
    let selectedDay = null;
    days.childNodes.forEach(day => day.addEventListener('click', (event) =>
    {
        const clickedDate = `${event.target.textContent} ${months[currMonth]} ${currYear}`;
        clickedDay.innerHTML = clickedDate;
        if (selectedDay) {
            selectedDay.style.textDecoration = 'none';
        }
        event.target.style.textDecoration = 'underline solid #b284b3 2px';
        selectedDay = event.target;
        const tasksForDate = tasks.filter(task => task.date === clickedDate);
        renderTasksForDate(tasksForDate);
    }));
}
icons.forEach(icon =>{
    icon.addEventListener('click', () => {
        currMonth = icon.className === 'bx bx-left-arrow-alt' ? currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11){
            let date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        }
        renderCalendar();
    })
})
renderCalendar();

let isFormVisible = false;
addEventBtn.addEventListener('click', ()=>{

    if (isFormVisible){
        form.style.display = 'none';
    }else {
        form.style.display = 'block'
    }
    isFormVisible = !isFormVisible;
})
const newEvent = document.querySelector('.event-name');


document.querySelector('.event-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const newTask = {
        date: clickedDay.textContent,
        name: newEvent.value
    };
    if(newTask.name) {
        tasks.push(newTask);
        newEvent.value = '';
    }
    const tasksForDate = tasks.filter(task => task.date === clickedDay.textContent);
    renderTasksForDate(tasksForDate);
});
function renderTasksForDate(tasksForDate) {

    eventList.innerHTML = '';
    tasksForDate.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task.name;
        eventList.appendChild(listItem);
    });
}
