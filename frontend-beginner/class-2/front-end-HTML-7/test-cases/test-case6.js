// Description:
// Verify that the <ul> tag has 3 items defined using <li> tag.
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

test("Verify that the <ul> tag has 3 items defined using <li> tag.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  const check = await page.evaluate((body) => {
    let liTags = body.querySelectorAll("ul > li");
    return liTags.length === 3;
  }, bodyHandle);

  expect(check).toBeTruthy();
});
