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

test("Hidden Test Case", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const html = await page.$("html");

  const check = await page.evaluate((html) => {
    let scriptContent = html.querySelector("#solution").innerHTML;

    let functionBody = scriptContent.substring(
      scriptContent.indexOf("{") + 1,
      scriptContent.lastIndexOf("}")
    );

    let runCode = new Function("data", functionBody);
    // Call the renderTable function with the initial dataset
    const initialData = [
      { id: 1, name: "John Doe", age: 25 },
      { id: 2, name: "Jane Smith", age: 30 },
      { id: 3, name: "Bob Johnson", age: 35 },
      { id: 4, name: "Jasbir Singh", age: 25 },
      { id: 5, name: "Sample Name", age: 99 },
      // Add more data objects as needed
    ];
    runCode(initialData);

    let trElems = html.querySelectorAll("tr");
    let tdElems = html.querySelectorAll("td");

    return trElems.length === 5 && tdElems.length === 15;
  }, html);
  // console.log(check.resultArr)
  expect(check).toBeTruthy();
});
