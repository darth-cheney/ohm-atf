/**
 * ATF Fetch and Format Tools
 * ----------------------------------
 * Helper functions that can fetch ATF
 * for a given CDLI number and format the
 * lines and inline elements with HTML.
 */
// We assume ohm is imported at the global level
// in the browser
import lineGrammarStr from "./dist/lineGrammar.js";
import inlineGrammarStr from './dist/inlineGrammar.js';
import lineSemanticRules from './LineHTMLSemantics.js';
import lineTypeSemanticRules from './LineTestingSemantics.js';
import inlineSemanticRules from './WordHTMLSemantics.js';

const lineGrammar = ohm.grammar(lineGrammarStr);
const inlineGrammar = ohm.grammar(inlineGrammarStr);

const lineSemantics = lineGrammar.createSemantics();
lineSemantics.addOperation('toHTML', lineSemanticRules);
lineSemantics.addOperation('lineType', lineTypeSemanticRules);

const inlineSemantics = inlineGrammar.createSemantics();
inlineSemantics.addOperation('toHTML', inlineSemanticRules);

const getFormattedLineElements = (atf) => {
    let match = lineGrammar.match(atf, 'Lines');
    if(match.failed()){
        throw new Error(`Could not match ATF to Lines!`);
    }
    let lineTypes = lineSemantics(match).lineType();
    console.log(lineTypes.length);
    return lineTypes.map(lineTypeInfo => {
        let el = document.createElement('div');
        if(lineTypeInfo.type === 'LineTerminator'){
            return false;
        }
        let pre = document.createElement('pre');
        pre.innerText = JSON.stringify(lineTypeInfo, null, 4);
        pre.style.display = "none";
        el.style.borderBottom = "1px solid black";
        el.style.marginBottom = "20px";
        el.append(pre);

        // Now, add the basic line HTML
        let outerMatch = lineGrammar.match(lineTypeInfo.content, "Line");
        let outerMarkup = lineSemantics(outerMatch).toHTML();
        let outerWrapper = document.createElement('div');
        outerWrapper.innerHTML += outerMarkup;
        el.append(outerWrapper);
        if(lineTypeInfo.type === 'TextLine'){
            let innerMatch = inlineGrammar.match(lineTypeInfo.innerContent, "Words");
            let innerMarkup = inlineSemantics(innerMatch).toHTML();
            outerWrapper.querySelector('.text-line .line-content').innerHTML = innerMarkup.join(" ");
        }
        //outerWrapper.outerHTML = outerWrapper.innerHTML;
        return el;
    }).filter(item => { return item !== false; });
};

const fetchATF = async (id) => {
    let url = `https://cdli.mpiwg-berlin.mpg.de/artifacts/${id}/inscription/atf`;
    let response = await fetch(url);
    let text = await response.text();
    return text;
};

export {
    fetchATF,
    getFormattedLineElements
};


