// Parse an incoming ATF text and
// output the results with annontated HTML
import fs from "fs";
import ohm from "ohm-js";
import lineHTMLSemantics from "./LineHTMLSemantics.js";
import lineTypeSemantics from "./LineTestingSemantics.js";
import inlineHTMLSemantics from "./WordHTMLSemantics.js";
const structureGrammar = ohm.grammar(fs.readFileSync("ATFStructure.ohm"));
const inlineGrammar = ohm.grammar(fs.readFileSync("ATFInline.ohm"));
const lineSemantics = structureGrammar.createSemantics();
const inlineSemantics = inlineGrammar.createSemantics();
lineSemantics.addOperation("toHTML", lineHTMLSemantics);
lineSemantics.addOperation("lineType", lineTypeSemantics);
inlineSemantics.addOperation("toHTML", inlineHTMLSemantics);

const template = fs.readFileSync("template.html").toString();

const renderHTML = (atfText) => {
    let match = structureGrammar.match(atfText, "Lines");
    if(match.failed()){
        throw `Could not parse Lines in this ATF document!`;
        process.exit(-1);
    }
    let lineTypes = lineSemantics(match).lineType();
    let innerHTML = lineTypes.map(line => {
        let open = `<p data-line-type="${line.type}">`;
        let close = `</p>`;
        if(line.type !== "TextLine"){
            return `${open}${line.content}${close}`;
        } else {
            let textLineMatch = inlineGrammar.match(line.innerContent, "Words");
            if(textLineMatch.failed()){
                throw new Error(`Match failed in TextLine: ${line.innerContent}`);
                process.exit(-1);
            }
            let textLineHTML = inlineSemantics(textLineMatch).toHTML();
            return `${open}${textLineHTML}${close}`;
        }
    }).join("\n");
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
