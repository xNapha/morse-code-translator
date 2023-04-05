// A to Z in Morse Code
// 1 unit is equal to 1 dot
// a dash is 3 units long
// Space between letters is three units long
// Space between words is seven units long
const morseCodeData = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    1: ".----",
    2: "..---",
    3: "...--",
    4: "....-",
    5: ".....",
    6: "-....",
    7: "--...",
    8: "---..",
    9: "----.",
    0: "-----",
    "'": " .----.",
    ",": "--.--",
    "!": "-.-.--",
    "?": "..--..",
    "&": ".-...",
    "@": ".--.-.",
    "(": "-.--.",
    ")": "-.--.-",
    "=": "-...-",
    "!": "-.-.--",
    // ".": ".-.-.-",
    // "-": "-....-",
    "-----": "0",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    ".-": "A",
    "-...": "B",
    "-.-.": "C",
    "-..": "D",
    ".": "E",
    "..-.": "F",
    "--.": "G",
    "....": "H",
    "..": "I",
    ".---": "J",
    "-.-": "K",
    ".-..": "L",
    "--": "M",
    "-.": "N",
    "---": "O",
    ".--.": "P",
    "--.-": "Q",
    ".-.": "R",
    "...": "S",
    "-": "T",
    "..-": "U",
    "...-": "V",
    ".--": "W",
    "-..-": "X",
    "-.--": "Y",
    "--..": "Z",
    " .----.": "'",
    "--.--": ",",
    "-.-.--": "!",
    "..--..": "?",
    ".-...": "&",
    ".--.-.": "@",
    "-.--.": "(",
    "-.--.-": ")",
    "-...-": "=",
    "-.-.--": "!",
    // ".-.-.-": ".",
    // "-....-": "-",
};

export default morseCodeData;
