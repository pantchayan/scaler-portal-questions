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

    let functionBody = scriptContent.substring(
      scriptContent.indexOf("{") + 1,
      scriptContent.lastIndexOf("}")
    );

    let runCode = new Function("sessions", functionBody);

    let sessions = [
      { user: 8, duration: 50, equipment: ["bench"] },
      { user: 7, duration: 100, equipment: ["dumbbell"] },
      { user: 1, duration: 10, equipment: ["barbell"] },
      { user: 7, duration: 100, equipment: ["bike"] },
      { user: 7, duration: 200, equipment: ["bike"] },
      { user: 2, duration: 200, equipment: ["treadmill"] },
      { user: 2, duration: 100, equipment: ["bike"] },
    ];

    let mergedData = runCode(sessions);

    console.log(mergedData);

    return {
      ans: mergedData,
      // flag: result.name === "Alice" && result.age === 30,
      flag:
        (mergedData[1].equipment.length === 2) &
          (mergedData[1].duration === 400) && mergedData[3].duration === 300,
    };
  }, html);
  console.log(check.ans);
  expect(check.flag).toBeTruthy();
});
