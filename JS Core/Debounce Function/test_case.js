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

test("Checking in backend if the debounce function is working or not. ", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const html = await page.$("html");

  const check = await page.evaluate(async (html) => {
    let scriptContent = html.querySelector("#solution").innerHTML;

    let functionBody = scriptContent.substring(
      scriptContent.indexOf("{") + 1,
      scriptContent.lastIndexOf("}")
    );

    let runCode = new Function("func", "wait", functionBody);

    let counter = 0;
    function call() {
      counter++;
    }
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    let debouncedFunction = runCode(call, 1000);
    debouncedFunction();
    await delay(100);
    debouncedFunction();
    await delay(100);
    debouncedFunction();
    let initialCounter = counter;
    await delay(1200);
    return {
      ans: initialCounter,
      counter,
      flag: initialCounter === 0 && counter === 1,
    };
  }, html);
  // console.log(check.ans);
  // console.log(check.counter);
  expect(check.flag).toBeTruthy();
});
