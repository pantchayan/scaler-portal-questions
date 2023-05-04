// Description:
//  Verify that when mouse leaves, the color of stars beyond star point is changed to grey.
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

test(" Verify that when mouse leaves, the color of stars beyond star point is changed to grey. ", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const thirdStar = await page.$("#star-container > span:nth-child(3)");

  await thirdStar.click();

  const fifthStar = await page.$("#star-container > span:nth-child(5)");
  const boundingBox = await fifthStar.boundingBox();
  const x = boundingBox.x + boundingBox.width + 1; // Move mouse pointer outside of element
  const y = boundingBox.y + boundingBox.height + 1; // Move mouse pointer outside of element
  await page.mouse.move(x, y);

  const check = await page.evaluate((body) => {
    let allStars = body.querySelectorAll(".star");
    let flag = true;

    for (let i = 0; i < 3; i++) {
      if (!allStars[i].classList.contains("star-filled")) {
        flag = false;
        break;
      }
    }

    for (let i = 3; i < 5; i++) {
      if (allStars[i].classList.contains("star-filled")) {
        flag = false;
        break;
      }
    }

    return flag;
  }, bodyHandle);

  expect(check).toBeTruthy();
});
