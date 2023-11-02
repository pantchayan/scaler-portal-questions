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

test("Verify that submitting a form adds Name.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const html = await page.$("html");

  // Select the text fields by their CSS selectors and type something into them
  await page.type("#name", "ABCD");
  await page.type("#marks", "55");

  // Click a button by its CSS selector
  await page.click("input[type=submit]");

  const check = await page.evaluate((html) => {
    // CHECK HERE===

    let trArr = html.querySelectorAll("tr");

    let sNo, name, marks;
    if (trArr.length === 4) {
      let tr = html.querySelector("tr:nth-child(3)");
      let tdArr = tr.querySelectorAll("td");

      if (tdArr.length === 3) {
        sNo = tdArr[0].innerText;
        name = tdArr[1].innerText;
        marks = tdArr[2].innerText;
      }
    }

    return {
      ans: { s: sNo, n: name, m: marks, tr: trArr.length },
      flag: name === "ABCD",
    };
  }, html);
  console.log(check.ans);
  expect(check.flag).toBeTruthy();
});
