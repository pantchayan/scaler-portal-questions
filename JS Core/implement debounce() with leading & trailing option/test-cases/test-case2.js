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

  const check = await page.evaluate(async (html) => {
    let scriptContent = html.querySelector("#solution").innerHTML;

    function findSecondOccurrence(str, char) {
      let count = 0;

      for (let i = 0; i < str.length; i++) {
        if (str[i] === char) {
          count++;

          if (count === 2) {
            return i; // Return the index of the third occurrence
          }
        }
      }
      // If the character doesn't occur three times, return -1 or handle accordingly
      return -1;
    }
    let functionBody = scriptContent.substring(
      findSecondOccurrence(scriptContent, "{") + 1,
      scriptContent.lastIndexOf("}")
    );

    let runCode = new Function("func", "wait", "option", functionBody);


    const run = (input) => {
      const calls = [];

      const func = (arg) => {
        calls.push(`${arg}`);
      };

      const debounced = runCode(func, 3, { leading: true, trailing: false });
      input.forEach((call) => {
        const [arg, time] = call.split("@");
        setTimeout(() => debounced(arg), time);
      });
      return calls;
    };
    let ans = run(["A@0", "B@2", "C@3"]);
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(1200);
    return {
      ans: ans,
      flag: ans[0] == 'A',
    };
  }, html);
  console.log(check.ans);
  expect(check.flag).toBeTruthy();
});
