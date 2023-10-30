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

test("Test Case 1", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const html = await page.$("html");

  const check = await page.evaluate(async (html) => {
    let scriptContent = html.querySelector("#solution").innerHTML;

    let functionBody = scriptContent.substring(
      scriptContent.indexOf("{") + 1,
      scriptContent.lastIndexOf("}")
    );

    let runCode = new Function("key", "value", "duration", functionBody);

    let key = 1;
    let value = 42;
    let duration = 1000;
    let result = runCode(key, value, duration);

    return {
      ans: result,
      flag:
        result.setOutput === false &&
        result.getOutput === 42 &&
        result.countOutput === 1,
    };
  }, html);
  console.log(check.ans);
  expect(check.flag).toBeTruthy();
});
