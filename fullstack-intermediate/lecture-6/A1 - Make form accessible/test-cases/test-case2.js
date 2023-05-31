// Description:
// Verify that all the 4 inputs have tabindex attribute specified.
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

test("Verify that all the 4 inputs have tabindex attribute specified.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");
  const check = await page.evaluate((body) => {
    let input1 = body.querySelector("input#name");
    let input2 = body.querySelector("input#email");
    let input3 = body.querySelector("select#how");
    let input4 = body.querySelector("textarea#message");
    return (
      input1.getAttribute("tabindex") &&
      input2.getAttribute("tabindex") &&
      input3.getAttribute("tabindex") &&
      input4.getAttribute("tabindex")
    );
  }, body);

  expect(check).toBeTruthy();
});
