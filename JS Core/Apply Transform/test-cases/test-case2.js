// Description:
// Hidden Test Case 1
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

test("Hidden Test Case 1", async () => {
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
    let runCode = new Function("arr", "fn", functionBody);

    // Call the function with the input array
    let arr = [1,2,3];
    let fn = function plusI(n, i) {
      return n + i;
    };
    let resultArr = runCode(arr, fn);

    let wantedArr = [1,3,5];
    // let scriptContent = html.querySelector("body").innerText;
    return {
      resultArr,
      check: JSON.stringify(resultArr) === JSON.stringify(wantedArr),
    };
  }, html);
  // console.log(check.resultArr);
  expect(check.check).toBeTruthy();
});
