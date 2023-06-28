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
    let runCode = new Function("ob", functionBody);
    const obj = {
      name: {
        first: "robin",
        last: "negi",
      },
      address: {
        city: {
          name: "Gwalior",
        },
        landmark: "Badri Marg",
        street: "22",
      },
    };

    let expectedObj = {
      "name.first": "robin",
      "name.last": "negi",
      "address.city.name": "Gwalior",
      "address.landmark": "Badri Marg",
      "address.street": "22",
    };

    let result = runCode(obj);

    // let scriptContent = html.querySelector("body").innerText;
    return {
      check: JSON.stringify(result) === JSON.stringify(expectedObj),
    };
  }, html);
  // console.log(check.copiedObject);
  // console.log(check.originalObject);
  expect(check.check).toBeTruthy();
});
