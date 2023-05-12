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

import { codeToCharacterData, characterToCodeData } from "./morseCodeData.js";

export const morseCodeTranslator = (string) => {
  try {
    throwStringOnlyError(string);
    const trimmedString = string.trim();
    if (
      morseCheck(trimmedString) &&
      !singleSpaceSeperationCheck(trimmedString) &&
      !tripleSpaceSeperationCheck(trimmedString)
    ) {
      return morseToEnglish(trimmedString);
    } else if (
      englishCheck(trimmedString) &&
      !singleSpaceSeperationCheck(trimmedString) &&
      !tripleSpaceSeperationCheck(trimmedString)
    ) {
      return englishToMorse(trimmedString);
    } else {
      return translateMixed(trimmedString);
    }
  } catch (err) {
    console.warn(err);
  }
};

const throwStringOnlyError = (string) => {
  if (typeof string !== "string") {
    showErrorMessage(
      "You must only enter a valid string, please check and try agian."
    );
    throw stringOnlyError;
  }
};

const englishCheck = (string) => /^\w/gi.test(string);

const tripleSpaceSeperationCheck = (string) => /(\s{3})/gi.test(string);

const singleSpaceSeperationCheck = (string) =>
  /(\w(\s){1,2}[\.\-])|([\.\-]{2}(\s){1,2}\w)/gi.test(string);

const morseCheck = (string) => /^[\.\-]/gi.test(string);

const englishToMorse = (string) => {
  const stringArr = string.toUpperCase().split("");
  return stringArr.reduce(checkIfLetter, []).join(" ");
};

const checkIfLetter = (acc, curr) => {
  if (characterToCodeData[curr]) {
    console.log(characterToCodeData[curr]);
    acc.push(characterToCodeData[curr]);
  } else {
    acc.push(" ");
  }
  return acc;
};

const morseToEnglish = (string) => {
  try {
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
  } catch (err) {
    console.warn(err);
  }
};

const checkIfError = (acc, curr) => {
  if (codeToCharacterData[curr]) {
    console.log(codeToCharacterData[curr]);
    acc += codeToCharacterData[curr];
    return acc;
  }
  showErrorMessage(
    "You have entered an incorrectly typed morse letter, please check and try again."
  );
  throw incorrectInputError;
};

const translateMixed = (string) => {
  if (singleSpaceSeperationCheck(string)) {
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

const addCorrectSpacing = (acc, curr, index, arr) => {
  if (!arr[index + 1]) {
    acc += `${curr}`;
  } else if (englishCheck(curr) && morseCheck(arr[index + 1])) {
    acc += `${curr}   `;
  } else if (morseCheck(curr) && englishCheck(arr[index + 1])) {
    acc += `${curr}   `;
  } else if (englishCheck(curr) && englishCheck(arr[index + 1])) {
    acc += `${curr} `;
  } else if (morseCheck(curr) && morseCheck(arr[index + 1])) {
    acc += `${curr}   `;
  }
  return acc;
};
