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

test("Checking if the form is working properly with correct update in the db.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
 
  const check = await page.evaluate(async (body) => {
    let nameInput = body.querySelector("#name");
    let addInput = body.querySelector("#add");
    let phInput = body.querySelector("#ph");
    nameInput.value = "XYZ";
    addInput.value = "XYZ";
    phInput.value = "123123";

    await body.querySelector("button").click();

    async function fetchEmployeeStorage() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open("employees");

        request.onerror = function (event) {
          console.error("Error opening database:", event.target.error);
          resolve(false);
        };

        request.onsuccess = function (event) {
          const db = event.target.result;
          const transaction = db.transaction(["employee"], "readonly");
          const objectStore = transaction.objectStore("employee");
          const employees = [];

          objectStore.openCursor().onsuccess = function (event) {
            const cursor = event.target.result;
            if (cursor) {
              employees.push(cursor.value);
              cursor.continue();
            } else {
              resolve(employees);
            }
          };

          objectStore.openCursor().onerror = function (event) {
            console.error("Error opening cursor:", event.target.error);
            resolve(false);
          };
        };

        request.onupgradeneeded = function (event) {
          const db = event.target.result;
          db.createObjectStore("employee", {
            keyPath: "id",
            autoIncrement: true,
          });
        };
      });
    }
    let employees = await fetchEmployeeStorage();

    let flag = false;
    if (employees === false) {
      employees = "THE STORAGE employee OR the db employees DOES NOT EXIST.";
    } else {
      for (let i = 0; i < employees.length; i++) {
        if (employees[i].name === "XYZ" && employees[i].address === "XYZ") {
          flag = true;
          break;
        }
      }
      if (flag === false) {
        employees = "THE VALUES ARE NOT BEING UPDATED USING THE FORM.";
      }
    }
    return { employees, flag };
  }, bodyHandle);
  console.log(check.employees);
  expect(check.flag).toBeTruthy();
});
