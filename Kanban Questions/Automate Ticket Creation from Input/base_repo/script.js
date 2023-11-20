let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let taskArea = document.querySelector(".textArea-cont");

let colors = ["lightpink", "lightgreen", "lightblue", "black"];
let allPriorityColors = document.querySelectorAll(".priority-color");

let modalPriorityColor = colors[colors.length - 1];
let ticketID = 0;

// TICKET IS CREATED WHEN SHIFT IS PRESSED
modalCont.addEventListener("keydown", function (e) {
  let key = e.key;

  if (key == "Shift") {
    createTicket(taskArea.value, modalPriorityColor);
    modalCont.style.display = "none";
    addFlag = false;
    taskArea.value = "";
  }
});

// ADDING TICKET TO DOM
function createTicket(ticketTask, ticketColor) {
  // Write code here ==
}
