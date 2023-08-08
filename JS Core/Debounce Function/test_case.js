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

    let counter = 1;
    let p = html.querySelector("p");
    function call() {
      p.innerHTML = "String " + counter++;
    }
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    let debouncedFunction;
    debouncedFunction = runCode(call, 500);
    debouncedFunction();
    await delay(20);
    debouncedFunction = runCode(call, 500);
    debouncedFunction();
    await delay(20);
    debouncedFunction = runCode(call, 500);
    debouncedFunction();
    await delay(1000);
    return { ans: p.innerHTML, flag: p.innerHTML === "String 3" };
  }, html);
  console.log(check.ans);
  expect(check.flag).toBeTruthy();
});
