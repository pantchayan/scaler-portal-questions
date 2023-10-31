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

    let runCode = new Function("iterable", functionBody);

    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("p1");
      }, 100);
    });
    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("p2");
      }, 20);
    });

    const ans = await runCode([p1, p2]);

    return {
      ans: ans,
      flag: ans == `p1`,
    };
  }, html);
  console.log(check.ans);
  expect(check.flag).toBeTruthy();
});
