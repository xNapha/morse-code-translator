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

// only used if you want to actually type in morse code
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
    // translate per word
    const isError = (acc, curr) => {
        if (morseToEnglish[curr]) {
            acc += morseToEnglish[curr];
            return acc;
        }
        throw incorrectInputError;
    };

    // translate morse code to english
    const englishToMorse = (string) => {
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
            return string.split(" ").reduce(isMorse, "").toLowerCase();
        }
    };

    const morseToEnglish = () => {};

    // check if alphanumeric input is string morse or a mixture of both
    const identifyString = (string) => {
        // match if any number of a-z letters that come before no or a single space character
        const english = string.match(/([a-z0-9\'\,\!\?](\s)?)*/gi).join("");
        // match if any number of dots and dashes that  come before a no, a single or triple space character
        const morse = string.match(/(\W(\s{1}||\s{3})?)*/gi).join("");

        // check if matched string length is equal to original string,
        // if lengths match the proceed with respective translation
        //  else translate it as a mixture
        if (english.length === string.length) {
            // proceed with english to morse Code translation
            console.log("to morse code");
            return morseToEnglish(string);
        } else if (morse.length === string.length) {
            // proceed with morse to english translation
            console.log("to english");
            return englishToMorse(string);
        } else {
            // translate mixutre
        }
    };

    return identifyString(string);
};

// was used to flip morseCodeData
const morseToEnglish = {};
for (const [key, value] of Object.entries(morseCodeData)) {
    morseToEnglish[value] = key;
}
