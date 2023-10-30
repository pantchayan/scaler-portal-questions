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
    
    let runCode = new Function("a", "b", functionBody);
    let result;
    try {
      result = runCode(10, 2); // 5

      // runCode(8, 0); // Division by zero
    } catch (error) {
      result = error.message;
    }
    return {
      ans: result,
      flag: result === 5,
    };
  }, html);
  console.log(check.ans);
  expect(check.flag).toBeTruthy();
});
