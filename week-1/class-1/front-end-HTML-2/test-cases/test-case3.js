// Description:
// Verify that the webpage has an image using the <img> tag with 'src' and 'alt' attributes

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

test("has an image with src and alt attributes", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const imgHandle = await page.$("img");
  expect(imgHandle).toBeTruthy();
  const src = await page.evaluate((img) => img.getAttribute("src"), imgHandle);
  const alt = await page.evaluate((img) => img.getAttribute("alt"), imgHandle);
  expect(src).toBeTruthy();
  expect(alt).toBeTruthy();
});
