# Morse Code Translator

-   Create a user interface that allows the user to either input some English text or some Morse Code
-   Create JS functions that would allow the user to:

    -   translate their English text into Morse Code
    -   Morse Code into English text

-   Make sure to handle spaces properly (ie. there is 1 space between English words, but one space between Morse Code characters)

-   Bonus: Handle other characters as well
-   Bonus: Detect if a piece of text is english or morse and translate accordingly

-   Split your code between data, logic functions and dom functions
-   Develop unit tests for all of your logic functions
-   Explore and discover edge cases in your code to further develop your tests

## Languages Used

This project will use HTMl, CSS/SCSS, and JavaScript.

## How to Use

This will be a simple Single Page Application, with an a single input and a single output.
All you'll need to do is enter any type of string (english or morse code) and it will translate it

### My thought process

Create a morseCode dataBase that can be referred to each time for translation

If input is english, split the inputted string between every character and replace each character with the morse Code equivalent

If input is in morse code, split the inputted string by amount of spaces needed between words and then split again for amount between letters. Replace and concat all together

If input is a mixture of english and morse code, split by amount of spaces needed between morse code words, check if each word is either a alphanumeric character or dot-and-dash if alphanumeric refer to english translation, else refer to morse code translation
