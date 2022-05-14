// Parse an incoming ATF text and
// output the results with annontated HTML
import fs from "fs";
import ohm from "ohm-js";
import lineHTMLSemantics from "./LineHTMLSemantics.js";
//import inlineHTMLSemantics from "./InlineHTMLSemantics";
const structureGrammar = ohm.grammar(fs.readFileSync("ATFStructure.ohm"));
const lineSemantics = structureGrammar.createSemantics();
lineSemantics.addOperation("toHTML", lineHTMLSemantics);

const template = fs.readFileSync("template.html").toString();

const renderHTML = (atfText) => {
    let match = structureGrammar.match(atfText, "Lines");
    if(match.failed()){
        throw `Could not parse Lines in this ATF document!`;
        process.exit(-1);
    }
    let innerHTML = lineSemantics(match).toHTML();
    let html = template.replace("${LINES}", innerHTML);
    return html;
};


// Render a random file
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

fs.writeFileSync("random.html", renderHTML(random));
console.log("Wrote random.html");
