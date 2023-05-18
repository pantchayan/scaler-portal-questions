// Description:
// Verify that the items in div.container-parent are aligned in center using justify-content and align-items properties. 
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

test("Verify that the items in div.container-parent are aligned in center using justify-content and align-items properties", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let div = body.querySelector(".container-parent");
    return (
      window.getComputedStyle(div).justifyContent === "center" &&
      window.getComputedStyle(div).alignItems === "center"
    );
  }, body);

  expect(check).toBeTruthy();
});
