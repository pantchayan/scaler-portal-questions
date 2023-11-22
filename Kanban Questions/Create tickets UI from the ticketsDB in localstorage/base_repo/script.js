// WRITE CODE HERE ===========================================

// ADDING TICKET TO DOM
function createTicket(ticketTask, ticketColor, ticketID) {
  let id = ticketID || shortid();
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");

  ticketCont.innerHTML = `<div class="ticket-color ${ticketColor}"></div>
       <div class="ticket-id">${id}</div>
       <div class="task-area">${ticketTask}</div>`;

  let mainCont = document.querySelector(".main-cont");
  mainCont.append(ticketCont);
}