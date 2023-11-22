// Description:
// Verify that when the delete button is active, clicking on a ticket removes it from UI.
const puppeteer = require("puppeteer");

let browser;

beforeAll(async () => {
  browser = await puppeteer.launch({
    executablePath: process.env.CHROMIUM_PATH,
    args: ["--no-sandbox"], // This was important. Can't remember why
  });
});

afterAll(async () => {
  await browser.close();
});

test("Verify that the tickets are created in the UI based on the values in the ticketsDB", async () => {
  let page = await browser.newPage();

  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const check = await page.evaluate((body) => {
    let ticketContArr = body.querySelectorAll("div.ticket-cont");
    let idArr = [];
    ticketContArr.forEach((ticketCont) => {
      idArr.push(ticketCont.querySelector(".ticket-id").innerText);
    });
    return (
      ticketContArr.length === 4 &&
      idArr[0] === "dGSUFjfiq" &&
      idArr[1] === "ay8dQS0o1" &&
      idArr[2] === "fOqBFgQtx" &&
      idArr[3] === "fOqBFgQtx"
    );
  }, bodyHandle);

  expect(check).toBe(true);
});
