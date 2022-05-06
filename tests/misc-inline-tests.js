import ohm from "ohm-js";
import fs from "fs";
import chai from "chai";
import wordTypeOperation from "../WordTestingSemantics.js";
const assert = chai.assert;
const inlineGrammar = ohm.grammar(fs.readFileSync("ATFInline.ohm"));
const inlineSemantics = inlineGrammar.createSemantics();
inlineSemantics.addOperation("wordType", wordTypeOperation);

describe("Miscellaneous Inline Tests", () => {
    it("Should parse 2(u)? as a flagged sign value", () => {
        let match = inlineGrammar.match("2(u)?", "signValueFlagged");
        assert.isTrue(match.succeeded());
    });
    it("Should parse 2(u)? as a grapheme", () => {
        let match = inlineGrammar.match("2(u)?", "grapheme");
        assert.isTrue(match.succeeded());
    });
    it("Should be able to parse [ur-{d}ba-ba6] as a missing grapheme", () => {
        let match = inlineGrammar.match("[ur-{d}ba-ba6]", "missingGrapheme");
        assert.isTrue(match.succeeded());
    });
});
