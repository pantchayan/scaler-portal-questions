// Description:
// Test-case 2: [5, 10, 15, 20, 25]
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

test("Test-case 2", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  await page.evaluate((body) => {
    let questionDiv = body.querySelector("div.question");
    questionDiv.innerText = "5, 10, 15, 20, 25";
  }, bodyHandle);

  await page.click("button");
  const check = page.evaluate((body) => {
    let ansDiv = body.querySelector("div.solution").innerText;
    return ansDiv == "150";
  }, bodyHandle);

  await expect(check).toBeTruthy();
});
