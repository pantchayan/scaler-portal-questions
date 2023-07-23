// Description:
// Verify that the missing <li> element has been added
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

test("Checking if all the p tags are red", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const check = await page.evaluate((body) => {
    let pTags = body.querySelectorAll("p");
    let flag = true;
    for (let i = 0; i < pTags.length; i++) {
      if (pTags[0]["style"]["color"] != "red") {
        flag = false;
        break;
      }
    }
    return flag;
  }, bodyHandle);

  expect(check).toBeTruthy();
});
