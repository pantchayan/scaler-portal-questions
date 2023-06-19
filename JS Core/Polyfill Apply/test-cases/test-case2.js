// Description:
// Sample Test Case 2
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

test("Hidden Test Case 1", async () => {
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
    let runCode = new Function("fn", "context", "args", functionBody);

    function greet(country) {
      return `Hello, ${this.name}! from ${country}`;
    }

    const person = {
      name: "Man",
    };

    const result = runCode(greet, person, ["USA"]);

    // let scriptContent = html.querySelector("body").innerText;
    return {
      result,
      check: result === "Hello, Man! from USA",
    };
  }, html);
  console.log(check.result);
  expect(check.check).toBeTruthy();
});
