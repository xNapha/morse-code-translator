import {
  morseCodeTranslator,
  incorrectInputError,
  stringOnlyError,
} from "./translate";
/*
morseCodeTranslator to return a string

morseCodeTranslator should return an error if input is incorrect,




*/
const morseCodeTests = {
  hello: `.... . .-.. .-.. ---`,
  abcde: `.- -... -.-. -.. .`,
  1234: `.---- ..--- ...-- ....-`,
  nology: `-. --- .-.. --- --. -.--`,
  string1: `-. ---   - .... .- -. -.-   -.-- --- ..-`,
  string2: `-.-- --- ..-   .- .-. .   .-- . .-.. -.-. --- -- .`,
  string3: `... . .   -.-- --- ..-   .-.. .- - . .-.`,
  string4: `.... .- ...- .   .-   --. --- --- -..   -.. .- -.--`,
};

describe("Morse code to English ranslator", () => {
  it("Should return a translated string", () => {
    expect(morseCodeTranslator(morseCodeTests.hello)).toBe("hello");
    expect(morseCodeTranslator(morseCodeTests.abcde)).toBe("abcde");
    expect(morseCodeTranslator(morseCodeTests["1234"])).toBe("1234");
    expect(morseCodeTranslator(morseCodeTests.nology)).toBe("nology");
  });
  it("Should handle a string with two words in it", () => {
    expect(morseCodeTranslator(morseCodeTests.string1)).toBe("no thank you");
    expect(morseCodeTranslator(morseCodeTests.string2)).toBe("you are welcome");
    expect(morseCodeTranslator(morseCodeTests.string3)).toBe("see you later");
    expect(morseCodeTranslator(morseCodeTests.string4)).toBe("have a good day");
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
describe("English to Morse Code translator", () => {
  it("Should return a string", () => {
    expect(morseCodeTranslator("hello")).toBe(morseCodeTests.hello);
    expect(morseCodeTranslator("abcde")).toBe(morseCodeTests.abcde);
    expect(morseCodeTranslator("1234")).toBe(morseCodeTests["1234"]);
    expect(morseCodeTranslator("nology")).toBe(morseCodeTests.nology);
  });
  it("Should be able to handle random capitalised words", () => {
    expect(morseCodeTranslator("hElLo")).toBe(morseCodeTests.hello);
    expect(morseCodeTranslator("AbcDe")).toBe(morseCodeTests.abcde);
    expect(morseCodeTranslator("NoLOgY")).toBe(morseCodeTests.nology);
  });
  it("Should handle a string with two or more words", () => {
    expect(morseCodeTranslator("No thank you")).toBe(morseCodeTests.string1);
    expect(morseCodeTranslator("You are welcome")).toBe(morseCodeTests.string2);
    expect(morseCodeTranslator("See you later")).toBe(morseCodeTests.string3);
    expect(morseCodeTranslator("Have a good day")).toBe(morseCodeTests.string4);
  });
});
describe("Mixutre of English and Morse Code", () => {
  it("Should return a string", () => {
    expect(morseCodeTranslator(`hello   ${morseCodeTests.nology}`)).toBe(
      `${morseCodeTests.hello}   nology`
    );
    expect(
      morseCodeTranslator(`No thank you   ${morseCodeTests.string4}`)
    ).toBe(`${morseCodeTests.string1}   have a good day`);
    expect(morseCodeTranslator(`${morseCodeTests.string3}   abcde`)).toBe(
      `see you later   ${morseCodeTests.abcde}`
    );
  });
});
