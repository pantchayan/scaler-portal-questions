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
    let runCode = new Function("arr1", "arr2", "finalArr", functionBody);

    const arr1 = ["Steve", "Falcon", "Bucky"];
    const arr2 = ["Iron Man", "Spider Man", "Rhodey"];
    let finalArr = [];

    // Call the function with the input array
    let resultArr = runCode(arr1, arr2, finalArr);

    let testArr = [];
    testArr.push.apply(testArr, [...arr1, ...arr2]);
    // let scriptContent = html.querySelector("body").innerText;
    return {
      resultArr,
      testArr,
      check: JSON.stringify(resultArr) === JSON.stringify(testArr),
    };
  }, html);
  // console.log(check.resultArr);
  // console.log(check.testArr);
  expect(check.check).toBeTruthy();
});
