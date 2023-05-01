// Description:
// Verify that when the delete button is inactive, clicking on a ticket does nothing.
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

test("Verify that when the delete button is inactive, clicking on a ticket does nothing.", async () => {
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
  await removeBtn.click();

  const ticket = await page.$(".ticket-cont");
  await ticket.click();

  const check = await page.evaluate((body) => {
    let ticket = body.querySelector(".ticket-cont");
    return ticket.querySelector(".ticket-id").innerText == "dGSUFjfiq";
  }, bodyHandle);

  expect(check).toBeTruthy();
});