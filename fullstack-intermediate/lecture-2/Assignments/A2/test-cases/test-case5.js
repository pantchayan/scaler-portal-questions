// Description:
// Verify that the box-shadow property for div.container is set to '0 10px 22px 10px rgba(27, 38, 49, 0.1)'

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

test("Verify that the box-shadow property for div.container is set to '0 10px 22px 10px rgba(27, 38, 49, 0.1)'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let div = body.querySelector(".container");
    return (
      window.getComputedStyle(div).boxShadow ==
      "rgba(27, 38, 49, 0.1) 0px 10px 22px 10px"
    );
  }, body);

  expect(check).toBeTruthy();
});
