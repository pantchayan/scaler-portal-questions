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

test("Verify that div.modal-cont is visible when div.add-btn is clicked. ", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  // const addBtn = await page.$("body");

  const check = await page.evaluate((body) => {
    let addBtn = body.querySelector("div.add-btn");
    addBtn.click();
    let modalContainer = body.querySelector("div.modal-cont");
    return (
      window.getComputedStyle(modalContainer).display === "flex"
    );
  }, bodyHandle);

  expect(check).toBeTruthy();
});