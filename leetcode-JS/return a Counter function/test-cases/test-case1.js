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
    let runCode = new Function("n", functionBody);

    let startNumber = 10;
    // Call the function with the input array
    let counterFunc = runCode(startNumber);

    let resultArr = [];
    resultArr.push(counterFunc());
    resultArr.push(counterFunc());
    resultArr.push(counterFunc());

    let wantedArr = [10, 11, 12];
    // let scriptContent = html.querySelector("body").innerText;
    return {
      resultArr,
      check: JSON.stringify(resultArr) === JSON.stringify(wantedArr),
    };
  }, html);
  // console.log(check.resultArr)
  expect(check.check).toBeTruthy();
});
