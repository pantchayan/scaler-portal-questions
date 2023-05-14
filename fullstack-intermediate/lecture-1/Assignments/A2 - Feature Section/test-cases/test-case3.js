// Description:
// Verify that the webpage has a <h1> tag that contains the heading 'Awesome Features'.

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

test("has a <h1> tag that contains the heading 'Awesome Features'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const h1Handles = await page.$("h1");
  const headingEnclosed = await page.evaluate(
    (a) => a.innerText === "Awesome Features",
    h1Handles
  );

  expect(headingEnclosed).toBeTruthy();
});
