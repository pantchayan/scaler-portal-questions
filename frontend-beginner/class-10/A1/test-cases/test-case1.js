// Description:
// Trivial Test-case 1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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

test("Trivial Test-case 1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]", async () => {
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
    let runCode = new Function("arr", functionBody);

    // Define the input array
    let inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Call the function with the input array
    let result = runCode(inputArray);
    // let scriptContent = html.querySelector("body").innerText;
    return result === 90;
  }, html);
  expect(check).toBeTruthy();
});
