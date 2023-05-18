// Description:
// Verify that the text '(Menu)' in h1 span has text-decoration set to 'overline' and font-size of '15px'

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

test("Verify that the text '(Menu)' in h1 span has text-decoration set to 'overline' and font-size of '15px'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let h1 = body.querySelector(".card h1 span");
    return (
      window.getComputedStyle(h1).textDecoration.includes("overline") &&
      window.getComputedStyle(h1).fontSize === "15px"
    );
  }, body);

  expect(check).toBeTruthy();
});
