// Description:
// Hidden Test Case 2
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

test("Hidden Test Case 2", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const html = await page.$("html");

  const check = await page.evaluate((html) => {
    let scriptContent = html.querySelector("#solution").innerHTML;

    let functionBody = scriptContent.substring(
      scriptContent.indexOf("{") + 1,
      scriptContent.lastIndexOf("}")
    );

    // Create a function and pass it the input array
    let runCode = new Function("obj", "func", functionBody);
    let func = function () {
      return `First value is ${this.value1} second value is ${this.value2}`;
    };
    let obj = {
      value1: "A",
      value2: "B",
    };

    // Call the function with the input array
    let resultString = runCode(obj, func);

    // let scriptContent = html.querySelector("body").innerText;
    return {
      resultString,
      check: resultString === "First value is A second value is B",
    };
  }, html);
  console.log(check.resultString);
  expect(check.check).toBeTruthy();
});
