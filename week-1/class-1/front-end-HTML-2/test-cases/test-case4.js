// Description:
// Verify that the webpage has a heading and intro using the <h1> and <h3> tags respectively.

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

  it("has <h1> and <h2> tags for heading and intro.", async () => {
    const h1Handles = await page.$("h1");
    const h3Handles = await page.$("h3");
    expect(h1Handles).toBeTruthy();
    expect(h3Handles).toBeTruthy();
  });

  afterAll(() => browser.close());
});