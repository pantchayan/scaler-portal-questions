// Description:
// Verify that increment input field is working.
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

test("Verify that increment input field is working.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  await page.focus("input");
  await page.keyboard.press("Delete");
  await page.keyboard.type("5");

  const addBtn = await page.$("button#add");
  await addBtn.click();
  await addBtn.click();
  const check = await page.evaluate((body) => {
    let spanNum = body.querySelector("span#number");
    return spanNum.innerText == "10";
  }, bodyHandle);
  expect(check).toBeTruthy();
});
