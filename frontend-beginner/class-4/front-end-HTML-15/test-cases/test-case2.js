// Description:
// Verify the CSS properties are as mentioned in the question
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

test("Verify the CSS properties are as mentioned in the question", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let div = body.querySelector("div.styled-box");
    let flag = true;
    let message = "";
    if (
      window.getComputedStyle(div).width != "200px" ||
      window.getComputedStyle(div).height != "100px"
    ) {
      flag = false;
      message = "Height and Width of div aren't 200px";
    }

    if (window.getComputedStyle(div).backgroundColor != "rgb(255, 0, 0)") {
      flag = false;
      message = "Color of div isn't red";
    }

    if (window.getComputedStyle(div).margin != "20px") {
      flag = false;
      message = "Margin isn't 20px";
    }

    if (window.getComputedStyle(div).padding != "10px") {
      flag = false;
      message = "Padding isn't 10px";
    }

    if (window.getComputedStyle(div).border != "5px solid rgb(0, 0, 0)") {
      flag = false;
      message =
        "Border of div isnt 'solid border with a 5px width and black color.'";
    }

    return { flag: flag, message: message };
  }, body);
  console.log(check.message);
  expect(check.flag).toBeTruthy();
});
