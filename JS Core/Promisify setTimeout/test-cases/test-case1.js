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

    let runCode = new Function("milliseconds", "message", functionBody);

    let response;
    // let bool = false;
    runCode(50, "Task completed").then((message) => {
      response = message; // Should print "Task completed" after a 2-second delay
    });

    // if (!response) {
    //   bool = true;
    // }

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(100);

    return {
      ans: response,
      flag: response === "Task completed",
    };
  }, html);
  console.log(check.ans);
  expect(check.flag).toBeTruthy();
});
