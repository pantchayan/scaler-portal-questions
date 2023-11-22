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

test("Verify that Storage Object 'ticketsDB' is created in localstorage. ", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  // Check if the ticketsDB localStorage item exists
  const ticketsDBExists = await page.evaluate(() => {
    return !!localStorage.getItem("ticketsDB");
  });

  expect(ticketsDBExists).toBe(true);

  // Check if the ticketsDB localStorage item contains the correct values
  // const ticketsDBData = await page.evaluate(() => {
  //   return JSON.parse(localStorage.getItem('ticketsDB'));
  // });

  // expect(ticketsDBData).toEqual({
  //   ticketTask: 'Task 1',
  //   ticketColor: 'lightpink',
  //   ticketID: 0,
  // });

  await browser.close();
});
