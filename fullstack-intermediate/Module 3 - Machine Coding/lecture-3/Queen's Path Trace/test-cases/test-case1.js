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

test("clicking on a checkbox, the program traces the path of Queen from that checkbox.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const checkbox = await page.$("#\\31 1");
  await checkbox.click();

  const check = await page.evaluate((body) => {
    let checkBoxesDiv = body.querySelectorAll("div.checkbox");
    let arr = [];
    function isCheckboxRed(idx) {
      if (checkBoxesDiv[idx].style.backgroundColor == "red") {
        return true;
      } else {
        return false;
      }
    }

    function checkQueenTraceByIndex(idx) {
      let directionArr = [
        [0, 1],
        [0, -1],
        [-1, 0],
        [1, 0],
        [1, 1],
        [-1, -1],
        [-1, 1],
        [1, -1],
      ];
      let flag = true;
      if (!isCheckboxRed(idx)) {
        return false;
      }
      for (let di = 0; di < directionArr.length; di++) {
        let dr = directionArr[di][0];
        let dc = directionArr[di][1];

        let ri = Math.floor(idx / 8);
        let ci = idx - ri * 8;
        // idx = (row * 8) + col + 1;
        while (ri + dr < 8 && ri + dr >= 0 && ci + dc < 8 && ci + dc >= 0) {
          ri = ri + dr;
          ci = ci + dc;
          if (!isCheckboxRed(ri * 8 + ci)) {
            arr.push(ri * 8 + ci + " isnt red");
            return false;
          } else {
            arr.push("checked " + (ri * 8 + ci));
          }
        }
      }
      return true;
    }

    let flag = checkQueenTraceByIndex(10);
    return { flag, arr };
  }, bodyHandle);
  console.log(check.arr);
  expect(check.flag).toBeTruthy();
});
