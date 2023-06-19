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
    let runCode = new Function("fn", "context", "args", functionBody);

    function greet(country) {
      return `Hello, ${this.name}! of ${this.age} age from ${country}`;
    }

    const person = {
      name: "John",
      age: 30,
    };

    const result = runCode(greet, person, ["USA"]);

    // let scriptContent = html.querySelector("body").innerText;
    return {
      result,
      check: result === "Hello, John! of 30 age from USA",
    };
  }, html);
  console.log(check.result);
  expect(check.check).toBeTruthy();
});
