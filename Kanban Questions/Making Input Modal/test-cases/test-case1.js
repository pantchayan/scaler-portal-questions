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

test("Verify that .modal-cont has correct CSS", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const check = await page.evaluate((body) => {
    let modalContainer = body.querySelector(".modal-cont");
    return (
      window.getComputedStyle(modalContainer).height === "300px" &&
      window.getComputedStyle(modalContainer).width === "500px" &&
      window.getComputedStyle(modalContainer).display === "flex"
    );
  }, bodyHandle);

  expect(check).toBeTruthy();
});
