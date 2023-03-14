// Description:
// Verify that the webpage has a paragraph of text using the <p> tag that contains description text.
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

  it("has <p> tag for description text.", async () => {
    const pHandles = await page.$("p");
    expect(pHandles).toBeTruthy();
  });

  afterAll(() => browser.close());
});
