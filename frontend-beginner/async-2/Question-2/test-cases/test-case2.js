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

    let runCode = new Function("delay", functionBody);

    // t = 0:

    let str = "";
    // Test Cases
    await runCode(500)
      .then((result) => (str += result)) // Expected output after 2000ms: "Promise resolved after 1000 milliseconds"
      .catch((error) => (str += error));

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    await delay(500);

    return {
      ans: str,
      flag: str === "Promise resolved after 500 milliseconds",
    };
  }, html);
  console.log(check.ans);
  expect(check.flag).toBeTruthy();
});
