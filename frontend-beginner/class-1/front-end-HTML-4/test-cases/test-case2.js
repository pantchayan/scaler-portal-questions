// Description:
// Verify that one anchor tag has the text "Interview Bit" and href attribute set to "www.interviewbit.com".
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

test("Verify that one anchor tag has the text 'Interview Bit' and href attribute set to 'www.interviewbit.com'.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  const check = await page.evaluate((body) => {
    let anchorTags = body.querySelectorAll("a");
    let flag = false;
    if (
      anchorTags[0].innerText == "Interview Bit" ||
      anchorTags[1].innerText == "Interview Bit"
    ) {
      if (
        anchorTags[0].href.includes("www.interviewbit.com") ||
        anchorTags[1].href.includes("www.interviewbit.com")
      ) {
        flag = true;
      }
    }

    return flag;
  }, bodyHandle);

  expect(check).toBeTruthy();
});
