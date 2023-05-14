// Description:
// Verify that the webpage has ids of 'name', 'email', 'find', and 'message'.

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

test("Verify that the webpage has ids of 'name', 'email', 'find', and 'message'.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const formHandle = await page.$("form");

  const check = await page.evaluate((form) => {
    let nameID = form.querySelector("#name");
    let emailID = form.querySelector("#email");
    let findID = form.querySelector("#find");
    let messageID = form.querySelector("#message");

    if (nameID && emailID && findID && messageID) {
      return true;
    } else {
      console.log("Some ID is missing");
      return false;
    }
  }, formHandle);

  expect(check).toBeTruthy();
});
