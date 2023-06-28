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

test("Test Case 2", async () => {
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
    let runCode = new Function("", functionBody);
    runCode();

    const obj = {
      name: "John",
      age: 30,
    };

    obj.sealPolyfill();

    // let result = Object.isSealed(obj); // Output: true

    obj.name = "Jane"; // Existing property can still be modified
    let result = obj.name; // Output: Jane

    // obj.gender = "Female"; // Attempt to add a new property
    // console.log(obj.gender); // Output: undefined (property was not added)

    // delete obj.age; // Attempt to delete an existing property
    // console.log(obj.age); // Output: undefined (property was not deleted)

    // let scriptContent = html.querySelector("body").innerText;
    return {
      check: result === "Jane",
    };
  }, html);
  // console.log(check.copiedObject);
  // console.log(check.originalObject);
  expect(check.check).toBeTruthy();
});
