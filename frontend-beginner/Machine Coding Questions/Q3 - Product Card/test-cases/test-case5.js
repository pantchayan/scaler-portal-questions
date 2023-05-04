// Description:
// Verify that a card contains correct star rating. (number of empty and filled stars checked using class of span)
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

test("Verify that a card contains correct star rating. (number of empty and filled stars checked using class of span)", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");
  const bodyHandle = await page.$("body");

  const check = await page.evaluate((body) => {
    let allCards = body.querySelectorAll(".card");
    let allStars = allCards[0].querySelectorAll(".all__star span");
    
    return {
      flag:
        allStars[0].classList[0] == "star__filled" &&
        allStars[1].classList[0] == "star__filled" &&
        allStars[2].classList[0] == "star__filled" &&
        allStars[3].classList[0] == "star__notfilled" &&
        allStars[4].classList[0] == "star__notfilled",
      val: allStars[0].innerHTML
    };
  }, bodyHandle);

  expect(check.flag).toBeTruthy();
});
