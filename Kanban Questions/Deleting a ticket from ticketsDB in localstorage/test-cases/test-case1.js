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

test("Verify that deleting the ticket from UI, also deletes it from the ticketsDB in localstorage", async () => {
  let page = await browser.newPage();
  page.on("dialog", async (dialog) => {
    //get alert message
    // let alertMsg = dialog.message();
    // console.log(alertMsg);
    // if (alertMsg == "delete button has been activated") {
    //   flag = true;
    // }
    await dialog.accept();
  });

  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const removeBtn = await page.$("div.remove-btn");
  await removeBtn.click();

  const ticket = await page.$(".ticket-cont");
  await ticket.click();

  // Check if the ticketsDB localStorage item contains the correct values
  const ticketsDBData = await page.evaluate(() => {
    let obj = JSON.parse(localStorage.getItem("ticketsDB"));
    return !(obj[0].ticketID.includes("dGSUFjfiq"));
  });

  expect(ticketsDBData).toBe(true);
});
