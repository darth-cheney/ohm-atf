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
const ATF_FILE_PATH = "/home/ecgade/Downloads/cdliatf_unblocked.atf";
//const ATF_FILE_PATH = null;
if(!ATF_FILE_PATH){
    console.error('You must specify an ATF_FILE_PATH const pointing to the bulk ATF file');
    process.exit(-1);
}

let fileData = fs.readFileSync(ATF_FILE_PATH).toString();
let documents = fileData.split("&P");
documents = documents.map(document => {
    return `&P${document}`;
});

let random = documents[Math.floor(Math.random()*documents.length)];
console.log(`Checking ${random.split("\n")[0]}`);

let match = grammar.match(random, 'Lines');
if(match.succeeded()){
    let result = semantics(match).lineType();
    let textLines = result.filter(line => {
        return line.type == 'TextLine';
    });
    console.log(textLines.length);
    let lineContent = textLines.forEach((line, idx) => {
        let match = inlineGrammar.match(line.innerContent, "Words");
        if(match.succeeded()){
            let innerResult = inlineSemantics(match).wordType();
            let unknowns = innerResult.filter(grapheme => {
                return grapheme.type == 'UnknownGrapheme';
            });
            unknowns.forEach(unknown => {
                console.log(`Unknown grapheme ${unknown.content}`);
                console.log(`Source: ${JSON.stringify(unknown.source, null, 4)}`);
                console.log(`In line ${idx+1}: ${line.content}`);
            });
            //console.log(JSON.stringify(innerResult, null, 4));
            //console.log('Types:');
            //console.log(innerResult.map(r => { return r.type }));
        } else {
            console.log(`Could not parse line ${idx+1}`);
            console.log(line.innerContent);
        }
    });
}
