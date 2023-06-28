// Description:
// Test Case 2
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

test("Hidden Test Case 2", async () => {
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
    let runCode = new Function("obj", "classFunction", functionBody);
    class Shape {
      getArea() {
        return 0;
      }
    }

    class Circle extends Shape {
      constructor(radius) {
        super();
        this.radius = radius;
      }

      getArea() {
        return Math.PI * this.radius * this.radius;
      }
    }

    class Square extends Shape {
      constructor(sideLength) {
        super();
        this.sideLength = sideLength;
      }

      getArea() {
        return this.sideLength * this.sideLength;
      }
    }

    const shape = new Shape();
    const circle = new Circle(5);
    const square = new Square(7);

    // let result = runCode(shape, Shape); // Output: true
    let result = runCode(circle, Circle); // Output: true
    // console.log(checkIfInstanceOf(square, Square)); // Output: true
    // console.log(checkIfInstanceOf(circle, Shape)); // Output: true
    // console.log(checkIfInstanceOf(square, Shape)); // Output: true
    // console.log(checkIfInstanceOf(shape, Circle)); // Output: false
    // console.log(checkIfInstanceOf(shape, Square)); // Output: false

    // let scriptContent = html.querySelector("body").innerText;
    return {
      check: result === true,
    };
  }, html);
  // console.log(check.copiedObject);
  // console.log(check.originalObject);
  expect(check.check).toBeTruthy();
});
