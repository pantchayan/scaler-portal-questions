// Description:
// Verify that clicking on inactive delete button turns the background color of the div.remove-btn to 'red'.
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

test("Verify that clicking on inactive delete button turns the background color of the div.remove-btn to 'red'.", async () => {
  let page = await browser.newPage();
  page.on("dialog", async (dialog) => {
    //get alert message
    // let alertMsg = dialog.message();
    // console.log(alertMsg);
    // if (alertMsg == "delete button has been activated") {
    //   flag = true;
    // }
    await dialog.accept();
  });

  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const removeBtn = await page.$("div.remove-btn");
  await removeBtn.click();

  const check = await page.evaluate((body) => {
    let removeBtn = body.querySelector("div.remove-btn");
    return removeBtn.style.backgroundColor === "red";
  }, bodyHandle);

  expect(check).toBeTruthy();
});
