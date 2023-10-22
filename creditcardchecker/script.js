// Function to generate a valid credit card number using the Luhn Algorithm
function generateCreditCardNumber() {
    const prefix = '4'; // A common starting digit for Visa cards
    const length = 16;  // Common credit card length
    let cardNumber = prefix;

    for (let i = prefix.length; i < length - 1; i++) {
        const randomDigit = Math.floor(Math.random() * 10);
        cardNumber += randomDigit;
    }

    // Calculate the Luhn check digit
    const checkDigit = calculateLuhnCheckDigit(cardNumber);
    cardNumber += checkDigit;

    return cardNumber;
}

// Function to calculate the Luhn check digit
function calculateLuhnCheckDigit(cardNumber) {
    const digits = cardNumber.split('').map(Number);
    let sum = 0;
    let isEven = true;

    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = digits[i];
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        isEven = !isEven;
    }

    const checkDigit = (10 - (sum % 10)) % 10;
    return checkDigit.toString();
}


// Function to validate a credit card number using the Luhn Algorithm
function validateCreditCardNumber(cardNumber) {
    if (!/^\d{16}$/.test(cardNumber)) {
        return false;
    }

    const digits = cardNumber.split('').map(Number);
    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = digits[i];
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
}

// Function to play sound
function playSound() {
    const audio = new Audio('sound.mp3');
    audio.play();
}

// Function to create a falling dollar animation
function createFallingDollarAnimation() {
    const numImages = 200; // Number of images to create
    const animationDuration = 20000; // Animation duration in milliseconds

    for (let i = 0; i < numImages; i++) {
        const img = document.createElement('img');
        img.src = 'dollar.png';
        img.style.position = 'fixed';
        img.style.zIndex = 9999;
        img.style.width = '50px'; // Set the width to a smaller size
        img.style.height = '50px'; // Set the height to a smaller size
        img.style.top = Math.random() * window.innerHeight + 'px';
        img.style.left = Math.random() * window.innerWidth + 'px';
        
        // Generate a random rotation angle between 0 and 360 degrees
        const randomRotation = Math.random() * 360;
        img.style.transform = 'rotate(' + randomRotation + 'deg)';
        
        document.body.appendChild(img);

        // Animate the image
        const animation = img.animate(
            [
                { transform: 'translateY(-100%)' },
                { transform: `translateY(${window.innerHeight}px)` }
            ],
            {
                duration: animationDuration,
                iterations: 1
            }
        );

        // Remove the image after the animation ends
        animation.onfinish = () => {
            document.body.removeChild(img);
        };
    }
}


// Attach event listeners
const generateButton = document.getElementById('generate');
const creditCardInput = document.getElementById('credit-card');
generateButton.addEventListener('click', () => {
    creditCardInput.value = generateCreditCardNumber();
    playSound();  // Play sound when generate button is clicked
    createFallingDollarAnimation();  // Create falling dollar animation when generate button is clicked
});

const checkButton = document.getElementById('check');
const validateInput = document.getElementById('validate');
const validityMessage = document.getElementById('validity');
checkButton.addEventListener('click', () => {
    const inputCardNumber = validateInput.value;
    const isValid = validateCreditCardNumber(inputCardNumber);
    validityMessage.innerText = isValid ? 'Valid' : 'Invalid';
    playSound();  // Play sound when check button is clicked
    createFallingDollarAnimation();  // Create falling dollar animation when check button is clicked
});