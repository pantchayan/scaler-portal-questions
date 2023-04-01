// WARNING!!
// DO NOT CHANGE THIS CODE
let testProcess = () => {
  let inputField = document.querySelector("input");
  let inputString = inputField.value;

  let stringArray = inputString.split(",");

  console.log(stringArray);
  let inputArr = [];
  stringArray.forEach((a) => {
    inputArr.push(parseInt(a.trim()));
  });

  console.log(inputArr);
  let ans = doubleAndSum(inputArr);

  document.querySelector("div.solution").innerText = ans;
};
