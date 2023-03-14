// Description:
// Verify that the webpage has an image using the <img> tag with 'src' and 'alt' attributes

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

  it("has an image with src and alt attributes.", async () => {
    const imgHandle = await page.$("img");
    expect(imgHandle).toBeTruthy();
    const src = await page.evaluate(
      (img) => img.getAttribute("src"),
      imgHandle
    );
    const alt = await page.evaluate(
      (img) => img.getAttribute("alt"),
      imgHandle
    );
    expect(src).toBeTruthy();
    expect(alt).toBeTruthy();
  });

  afterAll(() => browser.close());
});
