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

export const morseCodeTranslator = (string) => {
    if (typeof string !== "string") {
        showErrorMessage(
            "You must only enter a valid string, please check and try agian."
        );
        throw stringOnlyError;
    }

    if (englishCheck(string).length === string.length) {
        return englishToMorse(string);
    } else if (morseCheck(string).length === string.length) {
        return morseToEnglish(string);
    } else {
        return translateMixed(string);
    }
};

const englishCheck = (string) =>
    string.match(/([a-z0-9\'\,\!\?\&\(\)\=\!\@](\s)?)*/gi).join("");

const morseCheck = (string) => string.match(/(\W(\s{1}||\s{3})?)*/gi).join("");

const englishToMorse = (string) => {
    const stringArr = string.toUpperCase().split("");
    return stringArr.reduce(checkIfLetter, []).join(" ");
};

const checkIfLetter = (acc, curr) => {
    if (morseCodeData[curr]) {
        acc.push(morseCodeData[curr]);
    } else {
        acc.push(" ");
    }
    return acc;
};

const morseToEnglish = (string) => {
    if (/[ ]{3}/.test(string)) {
        return string
            .split("   ")
            .reduce((acc, curr) => {
                acc.push(curr.split(" ").reduce(checkIfError, ""));
                return acc;
            }, [])
            .join(" ")
            .toLowerCase();
    } else {
        return string.split(" ").reduce(checkIfError, "").toLowerCase();
    }
};

const checkIfError = (acc, curr) => {
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
    if (!/[ ]{3}/.test(string)) {
        showErrorMessage(
            "You must correctly space your morse code from your english text, please add three space characters between them and try again."
        );
        throw incorrectSpacingError;
    }

    return string
        .split("   ")
        .reduce((acc, curr) => {
            acc.push(morseCodeTranslator(curr));
            return acc;
        }, [])
        .reduce(addCorrectSpacing, "");
};

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
