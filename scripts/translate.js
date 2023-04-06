import { showErrorMessage } from "./domManipulation.js";

export const incorrectInputError = new Error(
    "You have entered an incorrectly typed morse letter, please check and try again."
);
export const undefinedInputError = new Error(
    "You have entered an undefined input, please check and try again."
);
export const stringOnlyError = new Error(
    "You must only enter a valid string, please check and try agian."
);

const incorrectSpacingError = new Error(
    "You must correctly space your morse code from your english text, please add three space characters between them"
);
import morseCodeData from "./morseCodeData.js";

// only used if you want to actually type in morse code
// export const inputToString = (input, phrase) => {
//     phrase += input;
//     return phrase;
// };

export const morseCodeTranslator = (string) => {
    // throw error if input is anything but a string
    if (typeof string !== "string") {
        showErrorMessage(
            "You must only enter a valid string, please check and try agian."
        );
        throw stringOnlyError;
    }
    // check if alphanumeric input is string, morse or a mixture of both
    // check if matched string length is equal to original string,
    // if lengths match the proceed with respective translation
    // else translate it as a mixture
    if (englishCheck(string).length === string.length) {
        // proceed with english to morse Code translation
        return englishToMorse(string);
    } else if (morseCheck(string).length === string.length) {
        // proceed with morse to english translation
        return morseToEnglish(string);
    } else {
        // translate mixutre
        return translateMixed(string);
    }
};

// match if any number of a-z letters that come before no or a single space character
const englishCheck = (string) =>
    string.match(/([a-z0-9\'\,\!\?\&\(\)\=\!\@](\s)?)*/gi).join("");
// match if any number of dots and dashes that come before no, a single or a triple space character
const morseCheck = (string) => string.match(/(\W(\s{1}||\s{3})?)*/gi).join("");

const englishToMorse = (string) => {
    // take string and for each letter replace it with the morse code equivalent
    // following morse code grammar and punctuation
    // 1 space between letters and 3 spaces between words

    const stringArr = string.toUpperCase().split("");
    return stringArr.reduce(isLetter, []).join(" ");
};

// check if current value is a letter in the dictionary if not then return the current value
const isLetter = (acc, curr) => {
    if (morseCodeData[curr]) {
        acc.push(morseCodeData[curr]);
    } else {
        acc.push(" ");
    }
    return acc;
};

// translate morse code to english
const morseToEnglish = (string) => {
    if (/[ ]{3}/.test(string)) {
        return (
            string
                .split("   ")
                //translate if there is more than one word in the input
                .reduce((acc, curr) => {
                    acc.push(curr.split(" ").reduce(isError, ""));
                    return acc;
                }, [])
                .join(" ")
                .toLowerCase()
        );
    } else {
        return string.split(" ").reduce(isError, "").toLowerCase();
    }
};

// check if current value is in dictionary, if not return an error
const isError = (acc, curr) => {
    if (morseCodeData[curr]) {
        acc += morseCodeData[curr];
        return acc;
    }
    showErrorMessage(
        "You have entered an incorrectly typed morse letter, please check and try again."
    );
    throw incorrectInputError;
};

const translateMixed = (string) => {
    // take string and replace
    // this all relies on the user following the correct grammar and punctuation laid out
    if (!/[ ]{3}/.test(string)) {
        showErrorMessage(
            "You must correctly space your morse code from your english text, please add three space characters between them and try again."
        );
        throw incorrectSpacingError;
    }

    const translated = string.split("   ").reduce((acc, curr) => {
        acc.push(morseCodeTranslator(curr));
        return acc;
    }, []);

    // add three spaces to word if is before morse code or if it is the end of a morse code word
    const addCorrectSpacing = (acc, curr, index) => {
        if (!translated[index + 1]) {
            acc += `${curr}`;
        } else if (englishCheck(curr) && morseCheck(translated[index + 1])) {
            acc += `${curr}   `;
        } else if (morseCheck(curr) && englishCheck(translated[index + 1])) {
            acc += `${curr}   `;
        } else if (englishCheck(curr) && englishCheck(translated[index + 1])) {
            acc += `${curr} `;
        } else if (morseCheck(curr) && morseCheck(translated[index + 1])) {
            acc += `${curr}   `;
        }
        return acc;
    };

    return translated.reduce(addCorrectSpacing, "");
};
