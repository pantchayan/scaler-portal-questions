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

  const check = await page.evaluate((html) => {
    let scriptContent = html.querySelector("#solution").innerHTML;

    let functionBody = scriptContent.substring(
      scriptContent.indexOf("{") + 1,
      scriptContent.lastIndexOf("}")
    );

    // Create a function and pass it the input array
    let runCode = new Function("x", "y", "fn", functionBody);

    let x = 10;
    let y = 4;
    // Call the function with the input array
    let result1 = runCode(x, y, sum);
    let result2 = runCode(x, y, mult);
    let result3 = runCode(x, y, diff);

    // let scriptContent = html.querySelector("body").innerText;
    return result1 === 14 && result2 === 40 && result3 === 6;
  }, html);
  expect(check).toBeTruthy();
});
