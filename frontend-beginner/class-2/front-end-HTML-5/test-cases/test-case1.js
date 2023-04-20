// Description:
// Verify if the form has input fields of following ids: name, age, male, female, cook. Along with select tag with id as 'food', textarea and submit button at last.  


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

test("checking for all the inputs and ids", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const formHandle = await page.$("form");

  const check = await page.evaluate((form) => {
    let nameField = form.querySelector("input#name");
    let ageField = form.querySelector("input#age");
    let maleField = form.querySelector("input#male");
    let femaleField = form.querySelector("input#female");
    let cookField = form.querySelector("input#cook");

    let dropDown = form.querySelector("select#food");

    let textArea = form.querySelector("textarea");

    let submitButton = form.querySelectorAll("input");

    let submitCheck = submitButton[submitButton.length - 1].type === "submit";

    if (
      nameField &&
      ageField &&
      maleField &&
      femaleField &&
      cookField &&
      dropDown &&
      textArea &&
      submitButton &&
      submitCheck
    ) {
      return true;
    } else {
      return false;
    }
  }, formHandle);

  expect(check).toBeTruthy();
});
