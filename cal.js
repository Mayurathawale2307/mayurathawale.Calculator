let currentInput = "";
let calculationHistory = [];
let memory = 0;
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".button");
const historyDisplay = document.getElementById("history-display");
const color1 = document.querySelector(".background");
const voiceButton = document.getElementById("voice-button");

/// MODE

let mode = "light";
const colorb = document.querySelector(".background"); 

colorb.addEventListener("click", () => {
    if (mode === "light") {
        mode = "dark";
        document.body.style.background = "linear-gradient(135deg, #232526, #414345)"; 
        
    } else {
        mode = "light";
        document.body.style.background = "linear-gradient(135deg, #87CEEB, #FFFFFF)"; 
        
    }

 let mode1 = "black";
 const navcolor = document.querySelector(".navbar");
  navcolor.addEventListener("click", () => {
      if (mode1 === "black") {
          mode1 = "white";
          document.body.style.inneText.color = "dark"; 
          
      } else {
          mode1 = "black";
          document.body.style.inneText.color = "white"; 
          
      }
  });
  
});






document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
 
  function handleButtonClick(value) {
    try {
      if (value === "=" || value === "Enter") {
        if (/[\d)]$/.test(currentInput)) {
          const result = Function("return " + currentInput)();
          calculationHistory.push(`${currentInput} = ${result}`);
          currentInput = result.toString();
        }
      } else if (value === "AC" || value === "Escape") {
        currentInput = "";
      } else if (value === "DEL" || value === "Backspace") {
        currentInput = currentInput.slice(0, -1);
      } else if (value === "SIN") {
        currentInput = Math.sin(parseFloat(currentInput) * (Math.PI / 180)).toString();
      } else if (value === "COS") {
        currentInput = Math.cos(parseFloat(currentInput) * (Math.PI / 180)).toString();
      } else if (value === "TAN") {
        currentInput = Math.tan(parseFloat(currentInput) * (Math.PI / 180)).toString();
      } else if (value === "SQRT") {
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
      } else if (value === "LOG") {
        currentInput = Math.log10(parseFloat(currentInput)).toString();
      } else if (value === "EXP") {
        currentInput = Math.exp(parseFloat(currentInput)).toString();
      } else if (value === "π") {
        currentInput += Math.PI.toString();
      } else if (value === "M+") {
        memory += parseFloat(currentInput) || 0;
      } else if (value === "M-") {
        memory -= parseFloat(currentInput) || 0;
      } else if (value === "MR") {
        currentInput = memory.toString();
      } else if (value === "MC") {
        memory = 0;
      } else if (value.match(/[\d+\-*/().%]/)) {
        currentInput += value;
      } else if (value === "HISTORY") {
        historyDisplay.innerHTML = calculationHistory.join("<br>");
      } else if (value === "HIS CLR") {
        calculationHistory = [];
        historyDisplay.innerHTML = "";
      }
      display.value = currentInput;
    } catch (error) {
      currentInput = "Error";
      display.value = currentInput;
    }
  }

  // Event listener for mouse clicks on calculator buttons

  document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", () => handleButtonClick(button.textContent));
  });

  // Event listener for keyboard input

  document.addEventListener("keydown", function (event) {
    const key = event.key;
    // Allow digits, operators, and other supported keys
    if (/[\d+\-*/().%]/.test(key) || key === "Enter" || key === "Backspace" || key === "Escape") {
      event.preventDefault(); // Prevent default browser behavior
      handleButtonClick(key);
    }
  });
});








document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  const voiceButton = document.getElementById("voice-button");
  const equalButton = document.getElementById("equals"); // Get the = button
  const convertBtn = document.getElementById("convertBtn");

  // Check if Speech Recognition is supported
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Voice recognition is not supported in this browser.");
    voiceButton.disabled = true;
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;

  voiceButton.addEventListener("click", () => {
    recognition.start();
  });

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript.toLowerCase();
    console.log("Recognized:", speechResult);
    processVoiceCommand(speechResult);
  };

  recognition.onerror = (event) => {
    alert("Voice recognition error: " + event.error);
  };

  function processVoiceCommand(command) {
    let words = command.replace(/\s+/g, ''); // Remove spaces

    // Convert voice commands to button actions
    let mappings = {
      "one": "1",
      "two": "2",
      "three": "3",
      "four": "4",
      "five": "5",
      "six": "6",
      "seven": "7",
      "eight": "8",
      "nine": "9",
      "zero": "0",
      "plus": "+",
      "minus": "-",
      "times": "*",
      "multiply": "*",
      "dividedby": "/",
      "divide": "/",
      "equals": "=",
      "decimal": ".",
      "clear": "AC",
      "delete": "DEL",
      "openbracket": "(",
      "closebracket": ")",
      "sin": "SIN",
      "cos": "COS",
      "tan": "TAN",
      "pi": "π",
      "sqrt": "SQRT",
      "exponent": "EXPO",
      "log": "LOG",
      "percentage": "%",
      "history": "HISTORY",
      "clearhistory": "HIS CLR"
    };

    // Replace words with mapped symbols
    Object.keys(mappings).forEach(word => {
      words = words.replace(new RegExp(word, "g"), mappings[word]);
    });

    if (words.includes("=")) {
      display.value = words.replace("=", ""); // Remove = and evaluate
      calculateResult();
    } else if (words.includes("convert")) {
      handleCurrencyConversion(words);
    } else {
      display.value += words;
    }
  }

  function calculateResult() {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
  }

  function handleCurrencyConversion(command) {
    const match = command.match(/convert (\d+) (\w+) to (\w+)/);
    if (match) {
      document.getElementById("amount").value = match[1];
      document.getElementById("fromCurrency").value = match[2].toUpperCase();
      document.getElementById("toCurrency").value = match[3].toUpperCase();
      convertBtn.click();
    } else {
      alert("Invalid currency conversion command. Try 'convert 100 USD to INR'.");
    }
  }

  // **FIX: Pressing Enter or Equal Button should calculate**
  equalButton.addEventListener("click", calculateResult);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      calculateResult();
    }
  });
});





const shareButton = document.getElementById("share-button");
const historyText = calculationHistory.join("\n");
const shareMessage = `My Calculation History:\n\n${historyText}`;

shareButton.addEventListener("click", () => {
  if (calculationHistory.length === 0) {
    console.log("No history found");
    alert("No history to share!");
  return;
  }  else {

  if (navigator.share) {
    navigator.share({
      title: "My Calculator History",
      text: shareMessage,
    }).then(() => {
      console.log("Shared successfully!");
    }).catch((error) => {
      console.error("Sharing failed: ", error);
      alert("Error while sharing.");
    });
  } else {
    navigator.clipboard.writeText(shareMessage)
      .then(() => {
        alert("Calculation history copied to clipboard! Paste it anywhere.");
      })
      .catch((error) => {
        console.error("Error copying history: ", error);
        alert("Failed to copy history.");
        return;
      });
  }}
});




// Currency Converion

const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const conversionResultPara = document.getElementById('conversionResult');

const currencyConversionRates = {
  USD: {
    INR: 74.83,
    EUR: 0.88,
    GBP: 0.76
  },
  INR: {
    USD: 0.013,
    EUR: 0.012,
    GBP: 0.01
  },
  EUR: {
    USD: 1.14,
    INR: 84.33,
    GBP: 0.86
  },
  GBP: {
    USD: 1.32,
    INR: 98.51,
    EUR: 1.16
  }
};
 // Get the input elements
// const amountInput = document.getElementById('amount');
const convertButton = document.getElementById('convertBtn');

// Add event listener for keyboard events
document.addEventListener('keydown', (event) => {
    // Check if the keys 1-9 are pressed
    if (event.key >= 1 && event.key <= 9) {
        // Append the pressed key to the amount input field
        amountInput.value += event.key;
    }

    // Check if the Enter key is pressed
    if (event.key === 'Enter') {
        // Perform the conversion when the Enter key is pressed
        convertCurrency();

    }
    // Check if the Backspace key is pressed
    if (event.key === 'Backspace') {
      // Delete the last character from the amount input field
      amountInput.value = amountInput.value.slice(0, -1);
  }
});

// Add event listener for convert button click
convertButton.addEventListener('click', () => {
    // Perform the conversion when the convert button is clicked
    convertCurrency();
});

// Function to perform the currency conversion
function convertCurrency() {
    // Get the values from the input elements
    const amount = amountInput.value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    // Perform the conversion using an API or a conversion formula
    // For this example, we'll use a simple conversion formula
    const conversionRate = getConversionRate(fromCurrency, toCurrency);
    const convertedAmount = amount * conversionRate;

    // Display the conversion result
    document.getElementById('conversionResult').textContent = `${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`;
}

// Function to get the conversion rate
function getConversionRate(fromCurrency, toCurrency) {
    // This is a simple example and actual conversion rates may vary
    // You can use an API to get the actual conversion rates
    const conversionRates = {
        'USD': {
            'INR': 74.83,
            'EUR': 0.88,
            'GBP': 0.76
        },
        'INR': {
            'USD': 0.013,
            'EUR': 0.012,
            'GBP': 0.010
        },
        'EUR': {
            'USD': 1.14,
            'INR': 84.23,
            'GBP': 0.86
        },
        'GBP': {
            'USD': 1.32,
            'INR': 98.11,
            'EUR': 1.16
        }
    };

    return conversionRates[fromCurrency][toCurrency];
}

convertBtn.addEventListener('click', () => {
  const amount = parseFloat(amountInput.value);
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;

  if (amount && fromCurrency && toCurrency) {
    const conversionRate = currencyConversionRates[fromCurrency][toCurrency];
    const convertedAmount = amount * conversionRate;

    conversionResultPara.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
  } else {
    conversionResultPara.textContent = 'Please enter a valid amount and select both currencies.';
  }
 });
 


 //// toggle button
 const toggleButton = document.getElementById('toggle-button');
 const calculator = document.getElementById('calculator');
 const currencyConverter = document.getElementById('currency-converter');

 toggleButton.addEventListener('click', () => {
     if (calculator.style.display === 'none') {
         calculator.style.display = 'block';
         currencyConverter.style.display = 'none';
         toggleButton.textContent = ' Converter';
     } else {
         calculator.style.display = 'none';
         currencyConverter.style.display = 'block';
         toggleButton.textContent = 'Calculator';
     }
 });


