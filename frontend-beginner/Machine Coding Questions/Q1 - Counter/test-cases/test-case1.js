// Description:
// Verify that add button is working.
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

test("Verify that add button is working.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");
  const bodyHandle = await page.$("body");

  const addBtn = await page.$("button#add");
  await addBtn.click();

  await addBtn.click();
  
  const check = await page.evaluate((body) => {
    let spanNum = body.querySelector("span#number");
    return spanNum.innerText == "2";
  }, bodyHandle);

  expect(check).toBeTruthy();
});
