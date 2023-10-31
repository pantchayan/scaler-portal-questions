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

test("Test Case 1", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const html = await page.$("html");

  const check = await page.evaluate(async (html) => {
    let scriptContent = html.querySelector("#solution").innerHTML;

    let functionBody = scriptContent.substring(
      scriptContent.indexOf("{") + 1,
      scriptContent.lastIndexOf("}")
    );

    let finalFB =
      `function customFetch(url) {
      return new Promise((resolve, reject) => {
          // Simulate a delay to mimic a real API request
          setTimeout(() => {
              resolve(" Dummy data from the API");
          }, 100); // Simulate a 100-ms delay
      });
  }` + functionBody;

    const AsyncFunction = Object.getPrototypeOf(
      async function () {}
    ).constructor;
    // Create a function and pass it the input array
    let runCode = new AsyncFunction("url", finalFB);
    let ans;
    runCode("DummyLink").then((data) => {
      ans = "Data from API: " + data;
    });

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(500);

    return {
      ans: ans,
      flag: ans == `Data from API:  Dummy data from the API`,
    };
  }, html);
  console.log(check.ans);
  expect(check.flag).toBeTruthy();
});
