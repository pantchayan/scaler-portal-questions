// Description:
// Verify that the webpage has <form> tag with 4 <input> tags, 1 <select> tag and 1 <textarea> tags.

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

test("Verify that the webpage has <form> tag with 4 <input> tags, 1 <select> tag and 1 <textarea> tags.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const formHandle = await page.$("form");

  const check = await page.evaluate((form) => {
    let inputTags = form.querySelectorAll("input");

    let textArea = form.querySelector("textarea");
    let selectTag = form.querySelector("select");

    if (inputTags.length === 4 && textArea && selectTag) {
      return true;
    } else {
      return false;
    }
  }, formHandle);

  expect(check).toBeTruthy();
});
