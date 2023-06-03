// Description:
// Verify that the returned function is binded with snap function of object.
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

test("Verify that the returned function is binded with snap function of object.", async () => {
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
      check: typeOfFunc === "bound snap",
    };
  }, html);
  console.log(check.resultString);
  expect(check.check).toBeTruthy();
});
