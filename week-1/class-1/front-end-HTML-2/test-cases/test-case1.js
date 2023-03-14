// Description:
// Verify that the webpage has a proper structure using the <html>, <head>, and <body> tags.

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

  it("has a proper structure utilising <html>, <head> and <body> tag", async () => {
    const htmlHandle = await page.$("html");
    const headHandle = await page.$("head");
    const bodyHandle = await page.$("body");
    expect(htmlHandle).toBeTruthy();
    expect(headHandle).toBeTruthy();
    expect(bodyHandle).toBeTruthy();
  });

  afterAll(() => browser.close());
});
