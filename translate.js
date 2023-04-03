export const incorrectInputError = new Error(
    "You have entered an incorrectly typed code, please try again."
);
export const undefinedInputError = new Error(
    "You have entered an undefined input, please try again."
);
export const stringOnlyError = new Error(
    "You must only enter a valid string, please try agian."
);
import morseCodeData from "./morseCodeData.js";

export const inputToString = (input, phrase) => {
    phrase += input;
    return phrase;
};

export const morseCodeTranslator = (string) => {
    // throw error if input is anything but a string
    if (typeof string !== "string") {
        throw stringOnlyError;
    }
    // flip the morse code library to function as a morse to english translator,
    // only used if input is morse, else use normal library
    const morseToEnglish = {};
    for (const [key, value] of Object.entries(morseCodeData)) {
        morseToEnglish[value] = key;
    }
    // translate per word
    const isMorse = (acc, curr) => {
        if (morseToEnglish[curr]) {
            acc += morseToEnglish[curr];
            return acc;
        }
        throw incorrectInputError;
    };

    const longerThanOne = (string) => {
        if (/[ ]{3}/.test(string)) {
            return (
                string
                    .split("   ")
                    //translate if there is more than one word in the input
                    .reduce((acc, curr) => {
                        acc.push(curr.split(" ").reduce(isMorse, ""));
                        return acc;
                    }, [])
                    .join(" ")
                    .toLowerCase()
            );
        } else {
            return string.split(" ").reduce(isMorse, "").toLowerCase();
        }
    };
    return longerThanOne(string);
};
