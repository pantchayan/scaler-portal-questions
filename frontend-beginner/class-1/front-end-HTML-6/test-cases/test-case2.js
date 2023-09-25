// Description:
// Verify "online transformative" is wrapped in <strong>
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

test("Verify 'online transformative' is wrapped in <strong>", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  const check = await page.evaluate((body) => {
    let strongTag = body.querySelector("strong");
    return strongTag.innerText.includes("online transformative");
  }, bodyHandle);

  expect(check).toBeTruthy();
});
