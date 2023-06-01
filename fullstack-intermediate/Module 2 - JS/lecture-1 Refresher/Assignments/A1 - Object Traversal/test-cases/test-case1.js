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
    let runCode = new Function("arr", functionBody);

    // Call the function with the input array
    let result = JSON.stringify(
      runCode(
        users,
        {
          name: "Rajneesh",
          age: 34,
          address: {
            local: "22 Alaknanda",
            city: "Dehradun",
            state: "UK",
          },
        },
        "GOT Book Series"
      )
    );
    // let scriptContent = html.querySelector("body").innerText;
    return (
      result ==
      '[{"name":"Rajneesh","age":34,"address":{"local":"22 Alaknanda","city":"Dehradun","state":"UK"},"orders":[{"id":1,"name":"GOT Book Series"}]},{"name":"Bhavesh","age":37,"address":{"local":"48 DT Row","city":"Hyderabad","state":"AP"}},{"name":"Jasbir","age":38,"address":{"local":"196 Lama Bhavan","city":"Gangtok","state":"Sikkim"},"orders":[{"id":1,"name":"Chair"},{"id":2,"name":"PS5"}]},{"name":"Rajneesh","age":34,"address":{"local":"22 Alaknanda","city":"Dehradun","state":"UK"},"orders":[{"id":1,"name":"GOT Book Series"}]}]'
    );
  }, html);
  expect(check).toBeTruthy();
});
