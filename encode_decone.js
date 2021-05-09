const alfabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const alfabetLen = alfabet.length;

function shiftCode(letter, action, shift, minus) {
if (!shift) return letter;

  let upper = false;
  let currentLetter;

  currentShift = shift;

  while (currentShift > 26) {
    currentShift -= 26;
  }

  if (minus === 'yes') {
    currentShift = -currentShift;
  }

  if (letter.charCodeAt(0) >= 65 &&  letter.charCodeAt(0) <= 90) {
    currentLetter = letter.toLowerCase();
    upper = true;
  } else {
    currentLetter = letter;
  }

  if (currentLetter.charCodeAt(0) < 97 || currentLetter.charCodeAt(0) > 122) return currentLetter;

  const letterNumber = alfabet.indexOf(currentLetter);
  let letterWithShift;
  if (action === 'encode') {
    letterWithShift = letterNumber + currentShift;

    if (currentShift >= 0) {
      if (letterWithShift < alfabetLen) {
        if (upper) {
          return alfabet[letterWithShift].toUpperCase();
        } else {
          return alfabet[letterWithShift];
        }
      } else {
        if (upper) {
          return alfabet[letterWithShift - alfabetLen].toUpperCase();
        } else {
          return alfabet[letterWithShift - alfabetLen];
        }
      }
    } else {
      if (letterWithShift < 0) {
        if (upper) {
          return alfabet[alfabetLen + letterWithShift].toUpperCase();
        } else {
          return alfabet[alfabetLen + letterWithShift];
        }
      } else {
        if (upper) {
          return alfabet[letterWithShift].toUpperCase();
        } else {
          return alfabet[letterWithShift];
        }
      }
    }
  };
  if (action === 'decode') {
    letterWithShift = letterNumber - currentShift;
    if (currentShift >= 0) {
      if (letterWithShift >= 0) {
        if (upper) {
          return alfabet[letterWithShift].toUpperCase();
        } else {
          return alfabet[letterWithShift];
        }
      } else {
        if (upper) {
          return alfabet[alfabetLen + letterWithShift].toUpperCase();
        } else {
          return alfabet[alfabetLen + letterWithShift];
        }
      }
    } else {
      if (letterWithShift > alfabetLen) {

        if (upper) {
          return alfabet[letterWithShift - alfabetLen].toUpperCase();
        } else {
          return alfabet[letterWithShift - alfabetLen];
        }
      } else {
        if (upper) {
          return alfabet[letterWithShift].toUpperCase();
        } else {
          return alfabet[letterWithShift];
        }
      }
    }
  }
};

module.exports = shiftCode;