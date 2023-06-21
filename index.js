const Obfuscator = require("javascript-obfuscator");
const fs = require("fs");
const path = require("path");

const filename = path.basename(__filename);


function obfuscate(input) {
  //try {
  //  const string = fs.readFileSync(input, "utf8");
  //} catch (e) {
  //  console.log("[-] Invalid input path!");
  //  return;
  //}
  
  const string = fs.readFileSync(input, "utf8");

  const obfuscated = Obfuscator.obfuscate(
    string, 
    {
      compact: true,
      controlFlowFlattening: false,
      controlFlowFlatteningThreshold: 1,
      numbersToExpressions: true,
      simplify: true,
      stringArrayShuffle: true,
      splitStrings: true,
      stringArrayThreshold: 1
    }
  );

  return obfuscated.getObfuscatedCode();
};


const args = process.argv.slice(2);
const help = args.findIndex(arg => arg === "-h" || arg === "--help");
const inputIndex = args.findIndex(arg => arg === "-i" || arg === "--input");
const outputIndex = args.findIndex(arg => arg === "-o" || arg === "--output");


if (help !== -1) {
  console.log(`
usage: ${filename} [-h] [-i] [-o]

options:
-h, --help    show this help message and exit
-i, --input   File to obfuscate
-o, --output  Obfuscated file, do not specify if you want to show output in stdout
  `);
} else if (inputIndex !== -1) {
  const input = args[inputIndex + 1];
  const output = args[outputIndex + 1];
  
  const obfuscated = obfuscate(input);
    
  if (outputIndex == -1) {
    console.log(obfuscated);
  } else {
    try {
      fs.writeFileSync(output, obfuscated);
    } catch (e) {
      console.log("[-] Invalid output path specified!");
    }
  }
} else {
  console.log(`
usage: ${filename} [-h] [-i] [-o]

options:
-h, --help    show this help message and exit
-i, --input   File to obfuscate
-o, --output  Obfuscated file, do not specify if you want to show output in stdout
  `);
}

