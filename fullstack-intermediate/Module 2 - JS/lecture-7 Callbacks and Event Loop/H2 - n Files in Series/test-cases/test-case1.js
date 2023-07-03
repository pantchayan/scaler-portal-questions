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
    let runCode = new Function("idx", "files", "ansArray", functionBody);

    // Call the function with the input array
    let ansArray = [];
    let files = ["file1.txt", "file2.txt", "file3.txt"];
    runCode(0, files, ansArray);

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(1000);

    let expectedArr = [
      "content -> content of file1.txt",
      "content -> content of file2.txt",
      "content -> content of file3.txt",
    ];
    // let scriptContent = html.querySelector("body").innerText;
    return JSON.stringify(ansArray) == JSON.stringify(expectedArr);
  }, html);
  expect(check).toBeTruthy();
});
