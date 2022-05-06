import fs from "fs";
import ohm from "ohm-js";
import lineSemantics from "./LineTestingSemantics.js";
import wordSemantics from './WordTestingSemantics.js';
const grammar = ohm.grammar(fs.readFileSync('ATFStructure.ohm'));
const inlineGrammar = ohm.grammar(fs.readFileSync('ATFInline.ohm'));
const semantics = grammar.createSemantics();
const inlineSemantics = inlineGrammar.createSemantics();

semantics.addOperation('lineType', lineSemantics);
inlineSemantics.addOperation('wordType', wordSemantics);


// Get the ATF data from the bulk file.
// Add your own ATF_FILE_PATH or the program will error
// and exit
//const ATF_FILE_PATH = "/home/ecgade/Downloads/cdliatf_unblocked.atf";
const ATF_FILE_PATH = null;
if(!ATF_FILE_PATH){
    console.error('You must specify an ATF_FILE_PATH const pointing to the bulk ATF file');
    process.exit(-1);
}

let fileData = fs.readFileSync(atfPath).toString();
let documents = fileData.split("&P");
documents = documents.map(document => {
    return `&P${document}`;
});

let random = documents[Math.floor(Math.random()*documents.length)];
console.log(`Checking ${random.split("\n")[0]}`);

let match = grammar.match(random, 'Lines');
if(match.succeeded()){
    console.log('Success!');
    let result = semantics(match).lineType();
    let textLines = result.filter(line => {
        return line.type == 'TextLine';
    });
    console.log(textLines.length);
    let lineContent = textLines.forEach((line, idx) => {
        let match = inlineGrammar.match(line.innerContent, "Words");
        if(match.succeeded()){
            console.log(`Success for line ${idx+1}`);
            let innerResult = inlineSemantics(match).wordType();
            console.log(JSON.stringify(innerResult, null, 4));
        } else {
            console.log(`Could not parse line ${idx+1}`);
            console.log(line.innerContent);
        }
    });
}
