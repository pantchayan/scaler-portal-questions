// Description:
// Verify that the webpage has a proper structure using the <html>, <head>, and <body> tags.

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

test("has a proper structure utilising <html>, <head> and <body> tag", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const htmlHandle = await page.$("html");
  const headHandle = await page.$("head");
  const bodyHandle = await page.$("body");
  expect(htmlHandle).toBeTruthy();
  expect(headHandle).toBeTruthy();
  expect(bodyHandle).toBeTruthy();
});
