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
    let runCode = new Function("object", functionBody);
    function isDeepCopy(original, copy) {
      copy.address.city = "Changed";
      if (original.address.city === "Changed") return false;

      return true;
    }

    const originalObject = {
      name: "John",
      age: 30,
      address: {
        city: "New York",
        country: "USA",
      },
    };

    const copiedObject = runCode(originalObject);

    // Compare the original object with the copied object
    const result = isDeepCopy(originalObject, copiedObject);

    // let scriptContent = html.querySelector("body").innerText;
    return {
      copiedObject,
      originalObject,
      result,
    };
  }, html);
  // console.log(check.copiedObject);
  // console.log(check.originalObject);
  expect(check.result).toBeTruthy();
});
