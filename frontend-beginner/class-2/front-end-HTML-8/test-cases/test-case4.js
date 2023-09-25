// Description:
// Verify rowspan according to the table. (Vikhayat and Ayush's field/td should have rowspan of 2)
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

test("Verify rowspan according to the table. (Vikhayat and Ayush's field/td should have rowspan of 2)", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  const check = await page.evaluate((body) => {
    let trTags = body.querySelectorAll("tr");
    return (
      trTags[1].querySelector("td").rowSpan === 2 &&
      trTags[3].querySelector("td").rowSpan === 2
    );
  }, bodyHandle);

  expect(check).toBeTruthy();
});
