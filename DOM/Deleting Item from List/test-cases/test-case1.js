// Description:
// Verify that the color of the card changes when double clicked (class of desired color is added)
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

test("Verify that clicking on a specific li, deletes it. ", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  // let bodyHandle = await page.$("body");

  const check = await page.evaluate(() => {
    document.querySelector("#Item-1>a").click();
    // CHECK HERE===
    let li = document.querySelectorAll("li");
    let a = document.querySelector("a");
    return {
      ans: document.querySelector("body").innerHTML,
      flag:
        li.length == 4 && li[0].id == "Item-2" && a.innerText == "second item",
    };
  });
  console.log(check.ans);
  expect(check.flag).toBeTruthy();
});
