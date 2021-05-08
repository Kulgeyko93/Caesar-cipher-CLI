const path = require('path');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

// console.log(argv);

const shift = argv.s || argv.shift
const action = argv.a || argv.action
const input = `${argv.i}`.trim() || `${argv.input}`.trim()
const output = `${argv.o}`.trim() || `${argv.output}`.trim()

const alfabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const alfabetLen = alfabet.length;

function shiftCode(letter, action, shift){
  let upper = false;
  let currentLetter;
  let currentShift = shift;
  while (currentShift > 26) {
    currentShift -= 26;
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
    letterWithShift = letterNumber + shift;
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
  };
  if (action === 'decode') {
    letterWithShift = letterNumber - shift;
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
  }
};

fs.access(input, fs.constants.F_OK, async (err) => {

  if (typeof shift !== 'number') {
    return console.log('Shift is undefined. Please, enter parametr shift');
  }
  if (action !== 'encode' && action !== 'decode') {
    return console.log('Action is undefined. Please, enter parametr action(encode or decode)');
  }
  if (err) {
    if (err.code === 'ENOENT') {
      console.log(`The file ${input} doesn't exist`);
      console.log('Enter your message:');
      process.stdin.on('data', (data) => {

        process.stdout.write('\n');
        process.stdout.write('Enter your message:');
        const textStd = data.toString().trim();
  
        let resultAction = '';
        for (let i = 0; i < textStd.length; i++) {
          resultAction += shiftCode(textStd[i], action, shift);
        }
        write(resultAction);
      });
  
      process.on('exit', () => {
        process.stdout.write('\n');
        process.stdout.write('Process is finish...');
        process.stdout.write('\n');
      });
  
    } else {
      console.log(err);
    }
  } else {
    await fs.readFile(input, 'utf-8', (err, data) => {
      if (err) {
        process.stderr.write(err);
        process.stdout.write('\n');
        process.exit(1);
      }
  
      let resultAction = '';
      for (let i = 0; i < data.length; i++) {
        resultAction += shiftCode(data[i], action, shift);
      }
      return write(resultAction);
  
    })
  }
});

function write(text){
  fs.access(output, fs.constants.F_OK, async (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log(`The file ${output} doesn't exist`)
        process.stdout.write('\n');
        process.stdout.write(`Result ${action}: ${text}`);
        process.stdout.write('\n');
        process.exit();
      } else {
        process.stderr.write(err);
        process.stdout.write('\n');
        process.exit(1);
      }
    } else {

      fs.appendFileSync(output, text, async (err) => {
        if (err) {
          process.stderr.write(err);
          process.stdout.write('\n');
          process.exit(1);
        }
        console.log(`You can see result in ${output}`)
      });
      process.exit();
    }
  });
}
