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

test("Verify that .ticket-id has correct CSS", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const check = await page.evaluate((body) => {
    let ticketId = body.querySelectorAll(".ticket-id");
    return (
      window.getComputedStyle(ticketId).backgroundColor === "rgb(255, 255, 0)"
    );
  }, bodyHandle);

  expect(check).toBeTruthy();
});
