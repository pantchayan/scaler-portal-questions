// Description:
// Verify colspan according to the table. (Total:12's td tag should have colspan of 3)
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

test("Verify colspan according to the table. (Total:12's field/td should have colspan of 3)", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  const check = await page.evaluate((body) => {
    let trTags = body.querySelectorAll("tr");
    return trTags[5].querySelector("td").colSpan === 3;
  }, bodyHandle);

  expect(check).toBeTruthy();
});
