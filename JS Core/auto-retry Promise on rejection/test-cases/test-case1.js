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

    let runCode = new Function("fetcher", "maximumRetryCount", functionBody);

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let i = 0;
    let str = "";

    function dummyFetcher(retries) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (arr[i++] <= 5) {
            str += `Simulating API call (retries left: ${retries - i}) -- `;
            reject(new Error("Network error"));
          } else {
            str += "Simulating successful API call ";
            resolve("API data");
          }
        }, 10); // Simulate API call delay
      });
    }

    function testFetchWithAutoRetry() {
      const maximumRetryCount = 10;

      runCode(() => dummyFetcher(maximumRetryCount), maximumRetryCount)
        .then((data) => {
          str += "Data received:" + data + " ";
        })
        .catch((error) => {
          str += "All retries failed. Network error:" + error.message;
          +" ";
        });
    }

    // Run the test
    await testFetchWithAutoRetry();

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(100);

    return {
      ans: str,
      flag:
        str ==
        `Simulating API call (retries left: 9) -- Simulating API call (retries left: 8) -- Simulating API call (retries left: 7) -- Simulating API call (retries left: 6) -- Simulating API call (retries left: 5) -- Simulating successful API call Data received:API data `,
    };
  }, html);
  console.log(check.ans);
  expect(check.flag).toBeTruthy();
});
