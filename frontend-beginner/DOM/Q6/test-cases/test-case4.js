// Description:
// Verify that the 'Comedy' filter is working.
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

test("Verify that the 'Comedy' filter is working.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  await page.select("select", "comedy");

  const check = await page.evaluate((body) => {
    let moviesDivs = body.querySelectorAll(".movies");
    let flag = true;
    for (let i = 0; i < moviesDivs.length; i++) {
      if (window.getComputedStyle(moviesDivs[i]).display === "block") {
        if (
          moviesDivs[i].querySelector(".price").getAttribute("data-category") ==
          "comedy"
        ) {
        } else {
          flag = false;
          break;
        }
      }
    }

    return flag;
  }, bodyHandle);

  expect(check).toBeTruthy();
});
