// Description:
// Verify first row items use th and not td
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

test("Verify first row items use th and not td", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  const check = await page.evaluate((body) => {
    let trTag = body.querySelector("tr");
    return (
      trTag.innerHTML.includes("th") == true &&
      trTag.innerHTML.includes("td") == false
    );
  }, bodyHandle);

  expect(check).toBeTruthy();
});
