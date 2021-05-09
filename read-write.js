const path = require('path');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const shiftCode = require('./encode_decone.js');

function readWrite(shift, action, input, output, minus) {
  fs.access(input, fs.constants.F_OK, async (err) => {

  if (typeof shift !== 'number') {
    process.stderr.write('Shift is undefined. Please, enter parametr shift');
    process.stdout.write('\n');
    process.exit(1);
  }
    if (action !== 'encode' && action !== 'decode') {
      process.stderr.write('Action is undefined. Please, enter parametr action(encode or decode)');
      process.stdout.write('\n');
      process.exit(1);
    }
    if (err) {
      if (err.code === 'ENOENT') {
        // console.log(`The file ${input} doesn't exist`);
        process.stdout.write('Enter your message:');
        process.stdin.on('data', (data) => {
  
          process.stdout.write('\n');
          process.stdout.write(`The file ${input} doesn't exist`);
          process.stdout.write('\n');
          const textStd = data.toString().trim();
    
          let resultAction = '';
          for (let i = 0; i < textStd.length; i++) {
            resultAction += shiftCode(textStd[i], action, shift, minus);
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
      const chunks = [];
      let readableStream = fs.createReadStream(input, "utf8");
      readableStream.on("data", function(chunk){ 
        chunks.push(chunk.toString());
      });
      readableStream.on("end", () => {
        let resultAction = '';
        for (let i = 0; i < chunks[0].length; i++) {
          resultAction += shiftCode(chunks[0][i], action, shift, minus);
        }
        return write(resultAction);
    })
    }
  });
  
  function write(text){
    fs.access(output, fs.constants.F_OK, async (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          process.stdout.write('\n');
          process.stdout.write(`The file ${output} doesn't exist`);
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
  
}

module.exports = readWrite;