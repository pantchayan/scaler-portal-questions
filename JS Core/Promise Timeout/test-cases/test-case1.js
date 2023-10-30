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

    let runCode = new Function("promise", "duration", functionBody);

    function fakeFetch(latency) {
      return new Promise((resolve, reject) => {
        // Simulate an asynchronous operation that resolves after `latency`.
        setTimeout(() => {
          resolve('Data successfully fetched!');
        }, latency);
      });
    }
    const response = await runCode(fakeFetch(10), 20);


    return {
      ans: response,
      flag: response === 'Data successfully fetched!',
    };
  }, html);
  console.log(check.ans);
  expect(check.flag).toBeTruthy();
});