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
    let runCode = new Function("obj", functionBody);
    Function.prototype.customBind = runCode;

    function greet() {
      return `Hi, ${this.name}! of age ${this.age}`;
    }

    const person = {
      name: "John",
      age: 20,
    };

    const boundFunction = greet.customBind(person);
    const result = boundFunction();

    // let scriptContent = html.querySelector("body").innerText;
    return {
      result,
      check: result === "Hi, John! of age 20",
    };
  }, html);
  expect(check.check).toBeTruthy();
});
