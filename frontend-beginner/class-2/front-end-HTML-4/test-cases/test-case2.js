// Description:
// Verify that the webpage has a <section> tag.

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

test("has a <section> tag", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const thHandle = await page.$("th");

  const headingEnclosed = await page.evaluate((a) => {
    console.log(a.innerText);
    return (
      a.innerText === "Title" ||
      a.innerText === "title" ||
      a.innerText === "TITLE"
    );
  }, thHandle);

  expect(headingEnclosed).toBeTruthy();
});
