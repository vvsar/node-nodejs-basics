import fs from 'node:fs';
import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import { Transform } from 'node:stream';

const transform = async () => {
  const welcome =
    `Hello! Please type your text below.
To show transformed text, press ENTER.
After that, you can type another text.
To quit, press Ctrl^C.\n\n`;

  const farewell = '\nThank you! Have a nice day!\n';

  const reverse = new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk.toString().split('').reverse().join('') + '\n\n');
      callback();
    },
  });
  
  process.on('exit', () => {
    output.write(farewell);
  });

  process.on('SIGINT', () => {
    process.exit();
  });
  
  output.write(welcome);
  
  input.pipe(reverse).pipe(output);
}

await transform();
