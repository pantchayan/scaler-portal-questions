// WRITE CODE HERE ===========================================
let ticketsArr = JSON.parse(localStorage.getItem('ticketsDB'));

// CALLING createTicket() function for each value in ticketsArr
ticketsArr.forEach(function (ticket) {
  createTicket(ticket.ticketTask, ticket.ticketColor, ticket.ticketID);
});

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