// Description:
// Hidden Test Case 3
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

test("Hidden Test Case 3", async () => {
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
    let runCode = new Function(functionBody);

    // Call the function with the input array
    runCode();

    let arr = [0, 1, -2];
    let lastElem = arr.last();
    // let scriptContent = html.querySelector("body").innerText;
    return { lastElem, check: lastElem === -2 };
  }, html);
  console.log(check.lastElem);
  expect(check.check).toBeTruthy();
});
