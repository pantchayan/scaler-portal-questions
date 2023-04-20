// Description:
// Verify if the table has the correct structure with table, thead, tbody, tr, and td elements.

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

test("has the correct structure with table, thead, tbody, tr, and td elements.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const tableHandle = await page.$("table");
  const theadHandle = await page.$("thead");
  const tbodyHandle = await page.$("tbody");
  const trHandle = await page.$("tr");
  const tdHandle = await page.$("td");
  expect(tableHandle).toBeTruthy();
  expect(theadHandle).toBeTruthy();
  expect(tbodyHandle).toBeTruthy();
  expect(trHandle).toBeTruthy();
  expect(tdHandle).toBeTruthy();
});
