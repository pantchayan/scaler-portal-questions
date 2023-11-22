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

test("Verify that the new ticket's data is added to the ticketsDB in localstorage.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  await page.type("textarea.textArea-cont", "task 1");
  await page.click("textarea.textArea-cont");

  page.keyboard.press("Shift");

  // Check if the ticketsDB localStorage item exists
  const ticketsDBExists = await page.evaluate(() => {
    return !!localStorage.getItem("ticketsDB");
  });

  expect(ticketsDBExists).toBe(true);

  // Check if the ticketsDB localStorage item contains the correct values
  const ticketsDBData = await page.evaluate(() => {
    let obj = JSON.parse(localStorage.getItem("ticketsDB"));
    return obj[0].ticketTask.includes("task 1");
  });

  expect(ticketsDBData).toBe(true);

  await browser.close();
});
