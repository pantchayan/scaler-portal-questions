// Description:
// Verify that in that media query, div.cards-container has items across the cross-axis aligned to center
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

test("Verify that in that media query, div.cards-container has items across the cross-axis aligned to center", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let container = body.querySelector(".card_large");

    let cssProp;

    // Define the media query you want to check
    var mediaQuery = "(max-width: 767px)";

    // Iterate over the loaded stylesheets
    for (var i = 0; i < document.styleSheets.length; i++) {
      var styleSheet = document.styleSheets[i];

      // Iterate over the CSS rules in each stylesheet
      for (var j = 0; j < styleSheet.cssRules.length; j++) {
        var cssRule = styleSheet.cssRules[j];

        // Check if the rule is a media query
        if (cssRule instanceof CSSMediaRule) {
          // Check if the media query matches your desired query
          if (cssRule.media.mediaText === mediaQuery) {
            // Iterate over the CSS rules inside the media query
            for (var k = 0; k < cssRule.cssRules.length; k++) {
              var matchingRule = cssRule.cssRules[k];
              // Access the CSS properties or perform actions with the rule
              cssProp += "" + matchingRule.cssText;
            }
          }
        }
      }
    }

    if (
      cssProp &&
      cssProp.includes(".cards-container") &&
      cssProp.includes("align-items: center;")
    ) {
      return true;
    }
    mediaQuery = "only screen and (max-width: 767px)";

    // Iterate over the loaded stylesheets
    for (var i = 0; i < document.styleSheets.length; i++) {
      var styleSheet = document.styleSheets[i];

      // Iterate over the CSS rules in each stylesheet
      for (var j = 0; j < styleSheet.cssRules.length; j++) {
        var cssRule = styleSheet.cssRules[j];

        // Check if the rule is a media query
        if (cssRule instanceof CSSMediaRule) {
          // Check if the media query matches your desired query
          if (cssRule.media.mediaText === mediaQuery) {
            // Iterate over the CSS rules inside the media query
            for (var k = 0; k < cssRule.cssRules.length; k++) {
              var matchingRule = cssRule.cssRules[k];
              // Access the CSS properties or perform actions with the rule
              cssProp += "" + matchingRule.cssText;
            }
          }
        }
      }
    }
    // return cssProp;

    return (
      cssProp.includes(".cards-container") &&
      cssProp.includes("align-items: center;")
    );
  }, body);

  expect(check).toBeTruthy();
});
