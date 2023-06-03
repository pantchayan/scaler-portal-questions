// Description:
// Verify that when the function is called, it returns correct string output
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

test("Verify that when the function is called, it returns correct string output", async () => {
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
    let bindedFunc = runCode();

    let resultString = bindedFunc();
    let typeOfFunc = bindedFunc.name;
    // let scriptContent = html.querySelector("body").innerText;
    return {
      resultString,
      check:
        resultString ===
        "IRON MAN snapped the finger and half of the universe came back",
    };
  }, html);
  console.log(check.resultString);
  expect(check.check).toBeTruthy();
});
