// Description:
// Verify that the webpage has a <button> tag.

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

  it("has a <button> tag", async () => {
    const button = await page.$("button");
    expect(button).toBeTruthy();
  });

  afterAll(() => browser.close());
});
