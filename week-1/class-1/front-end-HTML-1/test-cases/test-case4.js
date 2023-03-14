// Description:
// Verify that the webpage has a name and intro using the <h1> and <h2> tags respectively.

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

  it("has <h1> and <h2> tags for name and intro.", async () => {
    const h1Handles = await page.$("h1");
    const h2Handles = await page.$("h2");
    expect(h1Handles).toBeTruthy();
    expect(h2Handles).toBeTruthy();
  });

  afterAll(() => browser.close());
});