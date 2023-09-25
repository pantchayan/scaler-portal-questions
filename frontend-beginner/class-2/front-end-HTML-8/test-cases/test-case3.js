// Description:
// Verify Other rows use td. (Checks if all the rows except the first row contains td tag or not)
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

test("Verify Other rows use td. (Checks if all the rows except the first row contains td tag or not)", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  const check = await page.evaluate((body) => {
    let trTags = body.querySelectorAll("tr");
    let flag = true;
    for (let i = 1; i < trTags.length; i++) {
      if (!trTags[i].innerHTML.includes("td")) {
        flag = false;
      }
    }

    return flag;
  }, bodyHandle);

  expect(check).toBeTruthy();
});
