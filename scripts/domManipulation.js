import { morseCodeTranslator } from "./translate.js";

export const createHTML = () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", showTranslation);
};

const showTranslation = (event) => {
  event.preventDefault();

  const errorMsg = document.querySelector(".error__message");
  errorMsg.innerHTML = "";

  const userInput = document.querySelector(".user-input");
  userInput.classList.remove("error");

  const result = document.querySelector(".result");
  result.value = morseCodeTranslator(userInput.value);
};

export const showErrorMessage = (error) => {
  const errorMsg = document.querySelector(".error__message");
  const userInput = document.querySelector(".user-input");
  userInput.classList.add("error");

  const para = document.createElement("p");
  para.textContent = error;
  errorMsg.append(para);
};
