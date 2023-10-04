// Description:
// Verify that div.element2 has height and width of 80px

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

test("Verify that div.element2 has height and width of 80px", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");
  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let div2 = body.querySelector("div.element2");

    return (
      window.getComputedStyle(div2).height === "80px" &&
      window.getComputedStyle(div2).width === "80px"
    );
  }, body);

  expect(check).toBeTruthy();
});
