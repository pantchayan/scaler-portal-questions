// Description:
// Verify <h1> tag is used with the text mentioned in the question.
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

test("Verify <h1> tag is used with the text mentioned in the question.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  const check = await page.evaluate((body) => {
    let h1Tag = body.querySelector("h1");
    return h1Tag.innerText === 'Scaler Academy';
  }, bodyHandle);

  expect(check).toBeTruthy();
});
