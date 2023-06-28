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
    let runCode = new Function("proto", functionBody);
    // Step 1: Define a prototype object
    const personPrototype = {
      greet: function () {
        return 30;
      },
    };

    // Step 2: Call myObjectCreate and pass the prototype object
    const person = runCode(personPrototype);

    // Step 3: Assign the returned object to a variable

    // Step 4: Use the newly created object
    person.name = "Jasbir";
    let result = person.greet(); // Output: Hello, my name is John.

    // let scriptContent = html.querySelector("body").innerText;
    return {
      check: result === 30,
    };
  }, html);
  // console.log(check.copiedObject);
  // console.log(check.originalObject);
  expect(check.check).toBeTruthy();
});
