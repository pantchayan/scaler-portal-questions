// Description:
// Sample Test Case 1
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

test("Sample Test Case 1", async () => {
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
    let runCode = new Function("arr", "reducer", functionBody);

    let arr = [2, 3, 4, 5];
    // Call the function with the input array
    let result = runCode(arr, (a, b) => {
      return a + b;
    });

    let wantedResult = 14;
    // let scriptContent = html.querySelector("body").innerText;
    return {
      result,
      check: wantedResult === result,
    };
  }, html);
  console.log(check.result);
  expect(check.check).toBeTruthy();
});
