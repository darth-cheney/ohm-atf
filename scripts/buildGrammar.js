/**
 * Build Grammar Script
 * ------------------------------
 * This is a simple script that inlines
 * the text of the grammar files into a
 * Javascript constant that is then exported.
 * Can be used for importing by frontend applications
 */
import fs from 'fs';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const lineGrammarPath = path.resolve(__dirname, "..", "ATFStructure.ohm");
const inlineGrammarPath = path.resolve(__dirname, "..", "ATFInline.ohm");

const outputPath = path.resolve(__dirname, "..", "dist");
if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath);
}

const lineGrammarText = fs.readFileSync(lineGrammarPath).toString();
const inlineGrammarText = fs.readFileSync(inlineGrammarPath).toString();

let lineGrammarOutput = `const lineGrammar = String.raw\`${lineGrammarText.replace("`", "\`")}\`;\nexport { lineGrammar as default }`;
let inlineGrammarOutput = `const inlineGrammar = String.raw\`${inlineGrammarText.replace("`", "\`")}\`;\nexport { inlineGrammar as default }`;

fs.writeFileSync(path.resolve(outputPath, "lineGrammar.js"), lineGrammarOutput);
fs.writeFileSync(path.resolve(outputPath, "inlineGrammar.js"), inlineGrammarOutput);

