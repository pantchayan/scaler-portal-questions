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

    let runCode = new Function("callback", "timeInterval", functionBody);

    let str = "";
    // t = 0:
    let id= runCode(() => {
      str += "1";
    }, 100);
    // t = 10: i is 1
    // t = 20: i is 2
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    await delay(1000);
    clearTimeout(id);
    return {
      ans: str,
      flag: str === "1111111111",
    };
  }, html);
  console.log(check.ans);
  expect(check.flag).toBeTruthy();
});
