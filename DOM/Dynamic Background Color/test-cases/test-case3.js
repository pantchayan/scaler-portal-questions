const puppeteer = require("puppeteer");

let browser;
let page;
beforeAll(async () => {
  browser = await puppeteer.launch({
    executablePath: process.env.CHROMIUM_PATH,
    args: ["--no-sandbox"], // This was important. Can't remember why
  });
  page = await browser.newPage();
  await page.setViewport({ width: 300, height: 800 });
});

afterAll(async () => {
  await browser.close();
});

test("Verify that the background changes for mobile to green", async () => {
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    window.dispatchEvent(new Event("resize"));
    // CHECK HERE===
    let div = body.querySelector("div");
    return {
      ans:
        window.innerWidth +
        " - " +
        window.getComputedStyle(div).backgroundColor,
      flag: window.getComputedStyle(div).backgroundColor == "rgb(0, 128, 0)",
    };
  }, body);
  console.log(check.ans);
  expect(check.flag).toBeTruthy();
});
