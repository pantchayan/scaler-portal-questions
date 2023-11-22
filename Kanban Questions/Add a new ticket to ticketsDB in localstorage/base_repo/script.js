let ticketsArr = [];

let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let taskArea = document.querySelector(".textArea-cont");

let colors = ["lightpink", "lightgreen", "lightblue", "black"];
let allPriorityColors = document.querySelectorAll(".priority-color");

let modalPriorityColor = colors[colors.length - 1];
let ticketID = 0;

// fn to add to ticket to the UI
function createTicket(ticketTask, ticketColor) {
  let id = ticketID++;
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");

  ticketCont.innerHTML = `<div class="ticket-color ${ticketColor}"></div>
  <div class="ticket-id">#${id}</div>
  <div class="task-area">${ticketTask}</div>
  <div class="ticket-lock">
  <i class="fa-solid fa-lock"></i>
  </div>`;
  mainCont.append(ticketCont);

  // WRITE CODE HERE=============================================
}

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

let addBtn = document.querySelector(".add-btn");
let addFlag = true;

addBtn.addEventListener("click", function () {
  addFlag = !addFlag;

  if (addFlag == true) {
    modalCont.style.display = "flex";
  } else {
    modalCont.style.display = "none";
  }
});
