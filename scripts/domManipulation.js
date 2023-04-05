import { morseCodeTranslator } from "./translate.js";

const createHTML = () => {
    const body = document.querySelector("body");
    body.innerHTML = `
    <h1>Morse Code Translator</h1>
    <h3>Enter any input to have it translated</h3>
    <h6>Guidelines for using the translator</h6>
    <ul>
        <li>When entering morse code please space your letters apart with a single space character</li>
        <li>When entering morse code please space your words apart with three space characters</li>
        <li>When entering morse code please space your words apart with three space characters</li>
    </ul>
    <form>
        <input type="text"/>
        <button>Translate</button>
    </form>
    <textarea class="result"/>
    `;

    const form = document.querySelector("form");
    form.addEventListener("submit", showTranslation);
};

const showTranslation = (event) => {
    event.preventDefault();
    const result = document.querySelector(".result");
    result.value = morseCodeTranslator(event.target.elements[0].value);
};

export default createHTML;
