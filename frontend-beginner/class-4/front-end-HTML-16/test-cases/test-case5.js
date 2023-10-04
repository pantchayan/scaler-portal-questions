// Description:
// Verify the top and left position for div.elements2 to be 10px

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

test("Verify the top and left position for div.elements2 to be 10px", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");
  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let div2 = body.querySelector("div.element2");

    return (
      window.getComputedStyle(div2).top === "10px" &&
      window.getComputedStyle(div2).left === "10px"
    );
  }, body);

  expect(check).toBeTruthy();
});
