const currentDate = document.querySelector('.current-date');
const days = document.querySelector('.days');
const icons = document.querySelectorAll('.arrows i');

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();


const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];



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
}
icons.forEach(icon =>{
    icon.addEventListener('click', () => {
        currMonth = icon.className === 'bx bx-left-arrow-alt' ? currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11){
            let date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        }else{

        }
        renderCalendar();
    })
})
renderCalendar();
