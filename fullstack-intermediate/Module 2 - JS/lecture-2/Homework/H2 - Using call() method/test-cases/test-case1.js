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

  const check = await page.evaluate((html) => {
    let scriptContent = html.querySelector("#solution").innerHTML;

    let functionBody = scriptContent.substring(
      scriptContent.indexOf("{") + 1,
      scriptContent.lastIndexOf("}")
    );

    // Create a function and pass it the input array
    let runCode = new Function("obj", "func", functionBody);
    let func = function () {
      return `Hello avengers this is ${this.name} from ${this.team} lets fight !`;
    };
    let obj = {
      name: "bucky",
      team: "Team Cap",
    };

    // Call the function with the input array
    let resultString = runCode(obj, func);

    // let scriptContent = html.querySelector("body").innerText;
    return {
      resultString,
      check:
        resultString ===
        "Hello avengers this is bucky from Team Cap lets fight !",
    };
  }, html);
  console.log(check.resultString);
  expect(check.check).toBeTruthy();
});
