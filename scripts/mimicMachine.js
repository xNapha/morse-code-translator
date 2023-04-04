import { inputToString, morseCodeTranslator } from "./translate.js";
import morseCodeData from "./morseCodeData.js";

const results = document.querySelector(".translated");
results.innerHTML = "hello";

const button = document.querySelector(".input");
let phrase = "",
    timeBetweenLetters,
    startInput,
    translate;

button.addEventListener("mousedown", () => {
    const timeInMs = Math.floor(new Date().getTime());
    const newLetterOrWord = (timeInMs - timeBetweenLetters) / 1000;

    if (newLetterOrWord < 0.6 || !phrase) {
        phrase = inputToString("", phrase);
    } else if (newLetterOrWord >= 0.6 && newLetterOrWord < 1.2) {
        // new letter
        phrase = inputToString(" ", phrase);
    } else if (newLetterOrWord >= 1.2) {
        // new word
        phrase = inputToString("   ", phrase);
    }
    startInput = timeInMs;
    window.clearTimeout(translate);
});
button.addEventListener("mouseup", () => {
    const timeInMs = Math.floor(new Date().getTime());
    const endInput = timeInMs;
    timeBetweenLetters = timeInMs;
    const dashOrDot = (endInput - startInput) / 1000;
    startInput = timeInMs;

    if (dashOrDot < 0.1) {
        phrase = inputToString(".", phrase);
    } else {
        phrase = inputToString("-", phrase);
    }
    translate = window.setTimeout(() => {
        console.log(phrase);
        // start fresh for new translation
        phrase = "";
    }, 3000);
});
