// Description:
// Verify that header, nav, content, and footer are defined using CSS Grid properties.
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

test("Verify that header, nav, content, and footer are defined using CSS Grid properties.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let header = body.querySelector(".header");
    let nav = body.querySelector(".nav");
    let footer = body.querySelector(".footer");
    let content = body.querySelector(".content");

    let flag = false;
    if (
      window.getComputedStyle(header).gridArea ===
        "header / header / header / header" &&
      window.getComputedStyle(nav).gridArea === "nav / nav / nav / nav" &&
      window.getComputedStyle(content).gridArea ===
        "content / content / content / content" &&
      window.getComputedStyle(footer).gridArea ===
        "footer / footer / footer / footer"
    ) {
      flag = true;
    }
    return flag;
  }, body);

  expect(check).toBeTruthy();
});
