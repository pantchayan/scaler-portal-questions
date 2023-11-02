// Description:
// Verify that the color of the card changes when double clicked (class of desired color is added)
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

test("Verify that clicking on a specific li, deletes it. ", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  // Click a button by its CSS selector
  await page.click(`#Item-1 a`);

  const check = await page.evaluate((body) => {
    // CHECK HERE===
    let li = body.querySelectorAll("li");
    let a = body.querySelector("a");
    return {
      flag: li.length == 4 && li[0].id == 'Item-2' && a.innerText == "second item",
    };
  }, body);
  // console.log(check.ans);
  expect(check.flag).toBeTruthy();
});
