// Description:
// Verify that the div.card has a line-height of 25px

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

test("Verify that the div.card has a line-height of 25px", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let div = body.querySelector(".card");
    return window.getComputedStyle(div).lineHeight === "25px";
  }, body);

  expect(check).toBeTruthy();
});
