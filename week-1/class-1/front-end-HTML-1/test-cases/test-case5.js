// Description:
// Verify that the webpage has description heading with <h3> tag.

const puppeteer = require("puppeteer");

describe("App.js", () => {
  let browser;
  let page;

  const width = 1440;
  const height = 700;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 25,
      args: [`--window-size=${width},${height}`],
      defaultViewport: {
        width,
        height,
      },
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000");
  }, 100000);

  it("has <h3> tag for description heading.", async () => {
    const h3Handles = await page.$("h3");
    expect(h3Handles).toBeTruthy();
  });

  afterAll(() => browser.close());
});
