// Description:
// Verify that the webpage has <div> tag that groups project's components like <img>, <h2> and <p>.

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

test("has a <div> tag that groups project's components like <img>, <h2> and <p>", async () => {
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
  const h2Enclosed = await page.evaluate(
    (a) => a.querySelector("h2"),
    divHandles
  );

  expect(imgEnclosed).toBeTruthy();
  expect(pEnclosed).toBeTruthy();
  expect(h2Enclosed).toBeTruthy();
});
