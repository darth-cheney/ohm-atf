import ohm from "ohm-js";
import chai from "chai";
import fs from "fs";
const assert = chai.assert;
const grammar = ohm.grammar(fs.readFileSync("./ATFStructure.ohm"));


const exampleFile = JSON.parse(fs.readFileSync("./examples/1.json"))[0];

function getFailureStrings(matchObject){
    let response = `${matchObject.message}\n`;
    matchObject.getRightmostFailures().forEach(failObj => {
        response += `${failObj.message}\n`;
    });
    return response;
}


describe("Testing on full ATF Files...", () => {
    it("inscription atf exists", () => {
        assert.exists(exampleFile.inscription.atf);
    });
    it("Can parse the file at Main rule", () => {
        let match = grammar.match(exampleFile.inscription.atf, "Main");
        assert.isTrue(match.succeeded(), getFailureStrings(match));
        
        //console.log(grammar.trace(exampleFile.inscription.atf, "Main"));
    });
});
