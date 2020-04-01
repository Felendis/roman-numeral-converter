'use strict'
function convertToRoman(num) {
  const subNotation = [
    {"4": "IV"},
    {"9": "IX"},
    {"40": "XL"},
    {"90": "XC"},
    {"400": "CD"},
    {"900": "CM"},
  ];
  const addNotation = [
    {"1": "I"},
    {"5": "V"},
    {"10": "X"},
    {"50": "L"},
    {"100": "C"},
    {"500": "D"},
    {"1000": "M"},
    {"Infinity" : null},
  ];
  const regex = /\d/g
  let conversionArr = [];

  //declare conversion functions
  function subConversion(num) {
    for (let i = 0; i < subNotation.length; i++) {
      if (subNotation[i].hasOwnProperty(num)) {
        conversionArr.push(subNotation[i][num]);
        return true;
      }
    }
  }
  function addConversion(num) {
    if (num === 1) {
      conversionArr.push("I");
      return;
    }
    for (let i = 0; i < addNotation.length; i++) {
      if (num == Object.getOwnPropertyNames(addNotation[i])) {
        conversionArr.push(addNotation[i][Object.getOwnPropertyNames(addNotation[i])]);
        return;
      } else if (num < Object.getOwnPropertyNames(addNotation[i])) {
        conversionArr.push((addNotation[i-1][Object.getOwnPropertyNames(addNotation[i-1])]));
        addConversion(num - Object.getOwnPropertyNames(addNotation[i-1]));
        return;
      }
    }
  }

  //reverse the numbers in order to use their index as place value reference
  let numArr = num.toString().match(regex);
  numArr.sort((a, b) => numArr.indexOf(b) - numArr.indexOf(a));

  //compute place value
  let decimalRefArr = numArr.map((number, index) => ({
    index: index,
    number: number,
    })
  );
  let placeValArr = decimalRefArr.map(object => object.number * (Math.pow(10, object.index)));

  //put the numbers back in order
  placeValArr.sort((a, b) => placeValArr.indexOf(b) - placeValArr.indexOf(a))

  //remove zeros
  let nonZeroArr = placeValArr.filter(num => num > 0);

  //convert the numbers into Numerals
  nonZeroArr.forEach(num => {
    if (subConversion(num)) {
      return;
    } else {
      addConversion(num);
    }
  })

  //done ^_^
  let result = conversionArr.join("");
  document.getElementsByClassName("message-content text-uppercase")[0].textContent = result;
  document.getElementById("message").value = '';
}

const handlers = {
  formEventListener () {
   const form = document.getElementById("message-form");

   form.addEventListener('submit', function (e) {
    e.preventDefault();
    let userInput = document.getElementById("message").value;
    convertToRoman(userInput);
   });
  },
 };

handlers.formEventListener();
