// Description:
// Verify that the data-color attribute is set to 'used' after double clicking
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

test("Clicking thrice removes Highlight", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  // Get the bounding box of the element to perform the double-click
  const elementHandle = await page.$('p');
  const boundingBox = await elementHandle.boundingBox();

  // If the element is not visible or doesn't have boundingBox, handle the error
  if (!boundingBox) {
    console.error('Element not visible or doesn\'t have bounding box');
    await browser.close();
    return;
  }

  // Calculate the x and y coordinates at the center of the element
  const x = boundingBox.x + boundingBox.width / 2;
  const y = boundingBox.y + boundingBox.height / 2;

  // Simulate the double-click action by using the mouse events
  await page.mouse.click(x, y, { clickCount: 3 });

  const check = await page.evaluate((body) => {
    let p = body.querySelector("p");
    let color = window.getComputedStyle(p).backgroundColor;
    return { color, check: color == "rgba(0, 0, 0, 0)" };
  }, bodyHandle);
  console.log(check.color);
  expect(check.check).toBeTruthy();
});

