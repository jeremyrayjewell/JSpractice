// JavaScript functions
document.getElementById("checkPalindromeBtn").addEventListener("click", function() {
    var inputValue = prompt("Enter a string to check for palindrome:");
    var result = checkPalindrome(inputValue);
    document.getElementById("palindromeOutput").textContent = `Is '${inputValue}' a palindrome? ${result}`;
});

document.getElementById("convertToRomanBtn").addEventListener("click", function() {
    var inputValue = prompt("Enter a number to convert to Roman numeral:");
    var result = convertToRoman(inputValue);
    document.getElementById("romanOutput").textContent = `Roman numeral: ${result}`;
});

document.getElementById("convertFromRomanBtn").addEventListener("click", function() {
    var inputValue = prompt("Enter a Roman numeral to convert to a number:");
    var result = convertFromRoman(inputValue);
    document.getElementById("romanOutput").textContent = `Number: ${result}`;
});

document.getElementById("encryptCaesarCipherBtn").addEventListener("click", function() {
    var inputValue = prompt("Enter a string to encrypt using Caesar's Cipher:");
    var result = encryptCaesarCipher(inputValue);
    document.getElementById("cipherOutput").textContent = `Encrypted text: ${result}`;
});

document.getElementById("decryptCaesarCipherBtn").addEventListener("click", function() {
    var inputValue = prompt("Enter a string to decrypt using Caesar's Cipher:");
    var result = decryptCaesarCipher(inputValue);
    document.getElementById("cipherOutput").textContent = `Decrypted text: ${result}`;
});

document.getElementById("validateTelephoneBtn").addEventListener("click", function() {
    var inputValue = prompt("Enter a telephone number to validate:");
    var result = validateTelephone(inputValue);
    document.getElementById("telephoneOutput").textContent = `Is '${inputValue}' a valid phone number? ${result}`;
});

document.getElementById("checkCashRegisterBtn").addEventListener("click", function() {
    var price = parseFloat(prompt("Enter the price:"));
    var amountOwed = parseFloat(prompt("Enter the amount you owe:"));
    var cid = [
        ["PENNY", parseFloat(prompt("Enter the quantity of PENNY:"))],
        ["NICKEL", parseFloat(prompt("Enter the quantity of NICKEL:"))],
        ["DIME", parseFloat(prompt("Enter the quantity of DIME:"))],
        ["QUARTER", parseFloat(prompt("Enter the quantity of QUARTER:"))],
        ["ONE", parseFloat(prompt("Enter the quantity of ONE:"))],
        ["FIVE", parseFloat(prompt("Enter the quantity of FIVE:"))],
        ["TEN", parseFloat(prompt("Enter the quantity of TEN:"))],
        ["TWENTY", parseFloat(prompt("Enter the quantity of TWENTY:"))],
        ["ONE HUNDRED", parseFloat(prompt("Enter the quantity of ONE HUNDRED:"))]
    ];

    var result = checkCashRegister(price, amountOwed, cid);
    displayCashRegisterResult(result);
});

function checkPalindrome(str) {
    var reg = /[\W_]/g;
    var smallStr = str.toLowerCase().replace(reg, "");
    var reversed = smallStr.split("").reverse().join("");
    return reversed === smallStr;
}

function convertToRoman(num) {
    var romanToNum = {
        M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1
    };
    var roman = "";

    if (num === 0) {
        return "";
    }

    for (var key in romanToNum) {
        while (num >= romanToNum[key]) {
            roman += key;
            num -= romanToNum[key];
        }
    }

    return roman;
}

function convertFromRoman(roman) {
    var romanToNum = {
        M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1
    };
    var num = 0;

    for (var i = 0; i < roman.length; i++) {
        var currentChar = roman[i];
        var currentValue = romanToNum[currentChar];
        var nextChar = roman[i + 1];
        var nextValue = romanToNum[nextChar];

        if (nextValue && currentValue < nextValue) {
            num -= currentValue;
        } else {
            num += currentValue;
        }
    }

    return num;
}

function encryptCaesarCipher(str) {
    var solved = "";
    for (var i = 0; i < str.length; i++) {
        var asciiNum = str[i].charCodeAt();
        if (asciiNum >= 65 && asciiNum <= 77) {
            solved += String.fromCharCode(asciiNum + 13);
        } else if (asciiNum >= 78 && asciiNum <= 90) {
            solved += String.fromCharCode(asciiNum - 13)
        } else {
            solved += str[i];
        }
    }
    return solved;
}

function decryptCaesarCipher(str) {
    var solved = "";
    for (var i = 0; i < str.length; i++) {
        var asciiNum = str[i].charCodeAt();
        if (asciiNum >= 65 && asciiNum <= 77) {
            solved += String.fromCharCode(asciiNum + 13);
        } else if (asciiNum >= 78 && asciiNum <= 90) {
            solved += String.fromCharCode(asciiNum - 13)
        } else {
            solved += str[i];
        }
    }
    return solved;
}

function validateTelephone(str) {
    let regex = /^(1\s?)?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/;
    return regex.test(str);
}

function checkCashRegister(price, amountOwed, cid) {
    const currencyToCents = (value) => Math.round(value * 100);
    let amountToReturn = currencyToCents(amountOwed) - currencyToCents(price);
    let cashOnHand = {};

    cid.forEach(function(denomination) {
        cashOnHand[denomination[0]] = currencyToCents(denomination[1]);
    });

    let index = denominations.length - 1;
    let changeArray = [];

    while (index >= 0 && amountToReturn > 0) {
        const moneyName = denominations[index][0];
        const moneyValue = denominations[index][1];

        if (amountToReturn >= moneyValue && cashOnHand[moneyName] >= moneyValue) {
            const maxNumOfBills = Math.min(
                Math.floor(cashOnHand[moneyName] / moneyValue),
                Math.floor(amountToReturn / moneyValue)
            );
            const valueToGive = maxNumOfBills * moneyValue;

            cashOnHand[moneyName] -= valueToGive;
            amountToReturn -= valueToGive;
            changeArray.push([moneyName, valueToGive / 100]);
        }
        index -= 1;
    }

    if (amountToReturn === 0) {
        let isRegisterEmpty = true;

        Object.keys(cashOnHand).forEach(function(moneyType) {
            if (cashOnHand[moneyType] > 0) {
                isRegisterEmpty = false;
            }
        });

        if (isRegisterEmpty) {
            return {
                status: "CLOSED",
                change: cid
            };
        } else {
            return {
                status: "OPEN",
                change: changeArray
            };
        }
    }

    return {
        status: "INSUFFICIENT_FUNDS",
        change: []
    };
}

function displayCashRegisterResult(result) {
    const outputElement = document.getElementById("cashRegisterOutput");
    outputElement.innerHTML = `<p>Status: ${result.status}</p>`;
    if (result.status === "OPEN" || result.status === "CLOSED") {
        const changeList = result.change.map(([name, value]) => `<li>${name}: $${value.toFixed(2)}</li>`).join("");
        outputElement.innerHTML += `<ul>${changeList}</ul>`;
    }
}
