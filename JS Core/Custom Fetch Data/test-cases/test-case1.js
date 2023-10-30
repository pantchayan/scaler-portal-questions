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

    let runCode = new Function("promises", functionBody);

    let i = 1;
    let ans = "";
    let func1 = () => {
      setTimeout(() => {
        ans += `setTimeout called for ${i++} - `;
      }, Math.random * 100);
    };

    await runCode([func1(), func1(), func1()]);

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(500);

    return {
      ans: ans,
      flag:
        ans ==
        `setTimeout called for 1 - setTimeout called for 2 - setTimeout called for 3 - `,
    };
  }, html);
  console.log(check.ans);
  expect(check.flag).toBeTruthy();
});
