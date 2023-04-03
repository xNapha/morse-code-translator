import {
    morseCodeTranslator,
    incorrectInputError,
    stringOnlyError,
} from "./translate";
import morseCodeData from "./morseCodeData";
/*
morseCodeTranslator to return a string

morseCodeTranslator should return an error if input is incorrect,




*/
const morseCodeTests = {
    hello: `${morseCodeData.H} ${morseCodeData.E} ${morseCodeData.L} ${morseCodeData.L} ${morseCodeData.O}`,
    abcde: `${morseCodeData.A} ${morseCodeData.B} ${morseCodeData.C} ${morseCodeData.D} ${morseCodeData.E}`,
    1234: `${morseCodeData["1"]} ${morseCodeData["2"]} ${morseCodeData["3"]} ${morseCodeData["4"]}`,
    nology: `${morseCodeData.N} ${morseCodeData.O} ${morseCodeData.L} ${morseCodeData.O} ${morseCodeData.G} ${morseCodeData.Y}`,
    string1: `${morseCodeData.N} ${morseCodeData.O}   ${morseCodeData.T} ${morseCodeData.H} ${morseCodeData.A} ${morseCodeData.N} ${morseCodeData.K}   ${morseCodeData.Y} ${morseCodeData.O} ${morseCodeData.U}`,
    string2: `${morseCodeData.Y} ${morseCodeData.O} ${morseCodeData.U}   ${morseCodeData.A} ${morseCodeData.R} ${morseCodeData.E}   ${morseCodeData.W} ${morseCodeData.E} ${morseCodeData.L} ${morseCodeData.C} ${morseCodeData.O} ${morseCodeData.M} ${morseCodeData.E}`,
    string3: `${morseCodeData.S} ${morseCodeData.E} ${morseCodeData.E}   ${morseCodeData.Y} ${morseCodeData.O} ${morseCodeData.U}   ${morseCodeData.L} ${morseCodeData.A} ${morseCodeData.T} ${morseCodeData.E} ${morseCodeData.R}`,
    string4: `${morseCodeData.H} ${morseCodeData.A} ${morseCodeData.V} ${morseCodeData.E}   ${morseCodeData.A}   ${morseCodeData.G} ${morseCodeData.O} ${morseCodeData.O} ${morseCodeData.D}   ${morseCodeData.D} ${morseCodeData.A} ${morseCodeData.Y}`,
};

describe("Morse code Translator", () => {
    it("Should return a translated string", () => {
        expect(morseCodeTranslator(morseCodeTests.hello)).toBe("hello");
        expect(morseCodeTranslator(morseCodeTests.abcde)).toBe("abcde");
        expect(morseCodeTranslator(morseCodeTests["1234"])).toBe("1234");
        expect(morseCodeTranslator(morseCodeTests.nology)).toBe("nology");
    });
    it("Should handle a string with two words in it", () => {
        expect(morseCodeTranslator(morseCodeTests.string1)).toBe(
            "no thank you"
        );
        expect(morseCodeTranslator(morseCodeTests.string2)).toBe(
            "you are welcome"
        );
        expect(morseCodeTranslator(morseCodeTests.string3)).toBe(
            "see you later"
        );
        expect(morseCodeTranslator(morseCodeTests.string4)).toBe(
            "have a good day"
        );
    });
    it("Should return an error if the input is incorrect", () => {
        expect(() => {
            morseCodeTranslator(".-. .-- -.-.-");
        }).toThrow(incorrectInputError);
        expect(() => {
            morseCodeTranslator("------");
        }).toThrow(incorrectInputError);
        expect(() => {
            morseCodeTranslator(".- -.  --- ------");
        }).toThrow(incorrectInputError);
    });
    it("Should return an error if the input is anything but a string", () => {
        expect(() => {
            morseCodeTranslator(1234);
        }).toThrow(stringOnlyError);
        expect(() => {
            morseCodeTranslator([]);
        }).toThrow(stringOnlyError);
        expect(() => {
            morseCodeTranslator({});
        }).toThrow(stringOnlyError);
        expect(() => {
            morseCodeTranslator(true);
        }).toThrow(stringOnlyError);
        expect(() => {
            morseCodeTranslator(false);
        }).toThrow(stringOnlyError);
    });
});
