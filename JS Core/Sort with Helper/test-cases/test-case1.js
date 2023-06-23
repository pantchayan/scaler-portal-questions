// Description:
// Sample Test Case 1
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

test("Sample Test Case 1", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const html = await page.$("html");

  const check = await page.evaluate((html) => {
    let scriptContent = html.querySelector("#solution").innerHTML;

    let functionBody = scriptContent.substring(
      scriptContent.indexOf("{") + 1,
      scriptContent.lastIndexOf("}")
    );

    // Create a function and pass it the input array
    let runCode = new Function("library", functionBody);

    const library = [
      { author: "Bill Gates", title: "The Road Ahead", libraryID: 1254 },
      { author: "Steve Jobs", title: "Walter Isaacson", libraryID: 4264 },
      {
        author: "Suzanne Collins",
        title: "Mockingjay: The Final Book of The Hunger Games",
        libraryID: 3245,
      },
    ];

    let sortedLibrary = runCode(library);

    let expectedResult = [
      {
        author: "Suzanne Collins",
        title: "Mockingjay: The Final Book of The Hunger Games",
        libraryID: 3245,
      },
      { author: "Bill Gates", title: "The Road Ahead", libraryID: 1254 },
      { author: "Steve Jobs", title: "Walter Isaacson", libraryID: 4264 },
    ];

    // let scriptContent = html.querySelector("body").innerText;
    return {
      check: JSON.stringify(sortedLibrary) === JSON.stringify(expectedResult),
    };
  }, html);
  // console.log(check.copiedObject);
  // console.log(check.originalObject);
  expect(check.check).toBeTruthy();
});
