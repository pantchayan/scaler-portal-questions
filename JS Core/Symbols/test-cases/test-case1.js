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

    let runCode = new Function("username", functionBody);

    // Demonstrate the usage of the generateUserToken function
    const user1Token = runCode("alice");
    const user2Token = runCode("bob");
    const user3Token = runCode("alice"); // Reusing the same username

    return {
      ans: user2Token.description,
      // flag: result.name === "Alice" && result.age === 30,
      flag: user1Token !== user3Token,
    };
  }, html);
  console.log(check.ans);
  expect(check.flag).toBeTruthy();
});
