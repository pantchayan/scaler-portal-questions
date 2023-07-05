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

  const check = await page.evaluate(async (html) => {
    let scriptContent = html.querySelector("#solution").innerHTML;

    let functionBody = scriptContent.substring(
      scriptContent.indexOf("{") + 1,
      scriptContent.lastIndexOf("}")
    );

    // Create a function and pass it the input array
    let runCode = new Function("file1", "file2", "ansArray", functionBody);

    // Call the function with the input array
    let ansArr = [];
    runCode("This was a file", "This was a file", ansArr);

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(250);

    let expectedArr = [
      "content : This was a file",
      "content : This was a file",
      "All files have been read",
    ];
    // let scriptContent = html.querySelector("body").innerText;
    return JSON.stringify(ansArr) == JSON.stringify(expectedArr);
  }, html);
  expect(check).toBeTruthy();
});
