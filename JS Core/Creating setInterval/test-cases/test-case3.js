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

  const check = await page.evaluate(async (html) => {
    let scriptContent = html.querySelector("#solution").innerHTML;

    let functionBody = scriptContent.substring(
      scriptContent.indexOf("{") + 1,
      scriptContent.lastIndexOf("}")
    );

    let runCode = new Function(
      "intervalTime",
      "endTime",
      "message",
      "arr",
      functionBody
    );
    let arr = [];
    let intervalTime = 10;
    let endTime = 20;
    runCode(intervalTime, endTime, "Namaste", arr);

    let finalArr = [];
    let intervalFunc = setInterval(function () {
      finalArr.push(JSON.stringify(arr));
    }, intervalTime);

    // let scriptContent = html.querySelector("body").innerText;

    let expectedArr = ['["Namaste"]', '["Namaste"]', '["Namaste","Namaste"]'];
    let result;
    result = await setTimeout(() => {
      clearInterval(intervalFunc);
    }, intervalTime + endTime);
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(intervalTime + endTime + 100);

    return {
      result: finalArr,
      check: JSON.stringify(finalArr) == JSON.stringify(expectedArr),
    };
  }, html);
  // console.log(check.resultArr)
  console.log(check.result);
  expect(check.check).toBeTruthy();
});
