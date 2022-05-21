/**
 * An Initial Structure/Line Parser for ATF
 */
import ohm from "ohm-js";
import fs from "fs";
import semanticDefinition from "./LineTestingSemantics.js";
const grammar = ohm.grammar(fs.readFileSync("ATFStructure.ohm"));
const semantics = grammar.createSemantics();
semantics.addOperation('lineType', semanticDefinition);

class ATFLineParser extends Object {
    constructor(){
        super();

        this.source = null;
        this.lines = [];
        this.errors = [];

        // Bound instance methods
        this.reset = this.reset.bind(this);
        this.parse = this.parse.bind(this);
        this.validateLines = this.validateLines.bind(this);
    }

    parse(aString){
        this.reset();
        this.source = aString;
        let match = grammar.match(this.source, "Lines");
        if(match.failed()){
            throw new Error(`Could not parse. Is the given string valid ATF?`);
        }
        this.lines = semantics(match).lineType();
        this.validateLines();
    }

    reset(){
        this.source = null;
        this.lines = [];
        this.errors = [];
    }

    validateLines(){
        // If the first line is not an
        // AmpLine, then the document is technically
        // not valid.
        if(this.lines[0].type !== "AmpLine"){
            this.errors.push(this._addError("LineValidation", "The first line should be an AmpLine with a P-Number", 0));
        }

        // If there are any unknown lines, report those
        // as errors
        this.lines.forEach((line, idx) => {
            if(line.type === "UnknownLine"){
                this.errors.push(
                    this._addError("UnknownLine", `Could not read unknown line type at line ${idx}:\n${line.content}`)
                );
            }
        });
    }

    _addError(name, message, location){
        return {
            type: name,
            message: message
        };
    }

    get hasErrors(){
        return this.errors.length > 0;
    }

    toJSON(){
        return JSON.stringify({
            errors: this.errors,
            lines: this.lines
        }, null, 4);
    }
};

export {
    ATFLineParser,
    ATFLineParser as default
};
