const texts = [
    "Finding voter data for Chattanooga, TN",
    "7,030 voter files found",
    "Analyzing past election turnout rates",
    "Calculating votes needed to win your race"
];

const typingText = document.querySelector('.typing-text');
const spinningText = document.querySelector('.spinning-text');
const loader = document.querySelector('.loader');
let textIndex = 0;
let charIndex = 0;

function startTyping() {
    setTimeout(type, 100);
}

function slotMachineEffect(finalNumber) {
    const container = document.querySelector('.typing-container');
    const resultContent = document.querySelector('.result-content');
    const resultText = document.querySelector('.result-text');
    const buttonContainer = document.querySelector('.button-container');
    
    container.classList.add('expanded');
    const finalDigits = finalNumber.toLocaleString().split('');
    typingText.classList.add('hidden');
    
    // Show container but keep elements invisible
    resultContent.classList.remove('hidden');
    
    // Fade in text first
    setTimeout(() => {
        resultText.classList.add('visible');
        // Fade in buttons after text
        setTimeout(() => {
            buttonContainer.classList.add('visible');
        }, 300);
    }, 300);
    
    finalDigits.forEach((digit, index) => {
        const digitSpan = document.createElement('span');
        digitSpan.className = 'digit';
        
        if (digit === ',') {
            digitSpan.className = 'digit comma';
            digitSpan.textContent = ',';
        } else {
            // Create a wrapper for the spinning numbers
            const spinnerDiv = document.createElement('div');
            spinnerDiv.className = 'spinner';
            
            // Start with the numbers that come before the final digit
            const startNum = parseInt(digit);
            for (let i = 0; i < 2; i++) {  // 2 full sets of numbers
                for (let n = 0; n < 10; n++) {
                    const numberDiv = document.createElement('div');
                    numberDiv.textContent = n;
                    spinnerDiv.appendChild(numberDiv);
                }
            }
            
            // Add numbers up to and including the final digit
            for (let n = 0; n <= startNum; n++) {
                const numberDiv = document.createElement('div');
                numberDiv.textContent = n;
                spinnerDiv.appendChild(numberDiv);
            }
            
            digitSpan.appendChild(spinnerDiv);
            
            // Stagger the animation start with blur effect
            setTimeout(() => {
                spinnerDiv.classList.add('spin');
                
                // Remove blur at the end of spinning
                setTimeout(() => {
                    spinnerDiv.classList.remove('spin');
                    spinnerDiv.classList.add('spin-end');
                }, 650); // Match the spin transition duration
            }, index * 50); // Increased delay between digits
        }
        spinningText.appendChild(digitSpan);
    });
}

function animateToFinalDigit(digitSpan, finalDigit) {
    // Start the spinning animation
    digitSpan.classList.add('digit-animation');
    
    // When animation ends, show final number
    setTimeout(() => {
        digitSpan.classList.remove('digit-animation');
        digitSpan.textContent = finalDigit;
    }, 1500); // Match animation duration
}

function type() {
    if (charIndex < texts[textIndex].length) {
        typingText.textContent += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 20); // speed up, slow down
    } else {
        // Only erase and continue if we're not at the last message
        if (textIndex < texts.length - 1) {
            setTimeout(erase, 2300); // speed up, slow down
        } else {
            // After the last message, wait and show the final number
            setTimeout(() => {
                loader.style.display = 'none';
                slotMachineEffect(1547);
            }, 2000);
        }
    }
}

function erase() {
    typingText.textContent = "";
    charIndex = 0;
    textIndex++;
    startTyping();
}

// Start the animation
startTyping(); 