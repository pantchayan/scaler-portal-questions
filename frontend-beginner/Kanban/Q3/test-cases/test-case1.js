// Description:
// Verify that clicking on inactive delete button gives out an alert saying 'delete button has been activated'.
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

test("Verify that clicking on inactive delete button gives out an alert saying 'delete button has been activated'", async () => {
  let page = await browser.newPage();
  let flag = false;
  page.on("dialog", async (dialog) => {
    //get alert message
    let alertMsg = dialog.message();
    console.log(alertMsg);
    if (alertMsg == "delete button has been activated") {
      flag = true;
    }
    await dialog.accept();
  });

  await page.goto("http://localhost:8080");

  const removeBtn = await page.$("div.remove-btn");
  await removeBtn.click();

  expect(flag).toBeTruthy();
});
