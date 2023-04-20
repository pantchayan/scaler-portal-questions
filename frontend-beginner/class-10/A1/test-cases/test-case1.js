// Description:
// Test-case 1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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

test("Test-case 1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  await page.evaluate((body) => {
    let questionDiv = body.querySelector("div.question");
    questionDiv.innerText = "1, 2, 3, 4, 5, 6, 7, 8, 9, 10";
  }, bodyHandle);

  await page.click("button");
  const check = page.evaluate((body) => {
    let ansDiv = body.querySelector("div.solution").innerText;
    return ansDiv == "90";
  }, bodyHandle);

  await expect(check).toBeTruthy();
});
