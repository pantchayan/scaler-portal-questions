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

  const check = await page.evaluate(async (html) => {
    let scriptContent = html.querySelector("#solution").innerHTML;

    let functionBody = scriptContent.substring(
      scriptContent.indexOf("{") + 1,
      scriptContent.lastIndexOf("}")
    );

    // Create a function and pass it the input array
    let runCode = new Function("fn", functionBody);

    const exampleFn = function (a, b, cb) {
      cb(a + b);
    };
    const promisified = runCode(exampleFn);

    let result;
    promisified(5, 15).then((res) => {
      result = res;
    });

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(1000);
    // let scriptContent = html.querySelector("body").innerText;
    return result === 20;
  }, html);
  expect(check).toBeTruthy();
});
