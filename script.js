const currentDate = document.querySelector('.current-date');


let date = new Date();
currYear = date.getFullYear();
currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

(function () {
    currentDate.innerHTML = `${months[currMonth]} ${currYear}`;
})();