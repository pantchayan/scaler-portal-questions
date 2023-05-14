// Description:
//Verify that the webpage has <div> tag that groups feature's components like <img>, <h3> and <p>.

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

test("Verify that the webpage has <div> tag that groups feature's components like <img>, <h3> and <p>.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const divHandles = await page.$("div");
  const imgEnclosed = await page.evaluate(
    (a) => a.querySelector("img"),
    divHandles
  );
  const pEnclosed = await page.evaluate(
    (a) => a.querySelector("p"),
    divHandles
  );
  const h3Enclosed = await page.evaluate(
    (a) => a.querySelector("h3"),
    divHandles
  );

  expect(imgEnclosed).toBeTruthy();
  expect(pEnclosed).toBeTruthy();
  expect(h3Enclosed).toBeTruthy();
});
