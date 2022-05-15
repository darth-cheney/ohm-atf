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
    it("Should parse basic sign with allograph", () => {
        let match = inlineGrammar.match("PA~a", "grapheme");
        assert.isTrue(match.succeeded());
    });
    it("Should be able to parse 4(|ASZxDISZ@t|)", () => {
        let match = inlineGrammar.match("4(|ASZxDISZ@t|)", "grapheme");
        assert.isTrue(match.succeeded());
    });
    it("Should be able to parse sila3-ta!(DUG)", () => {
        let match = inlineGrammar.match("sila3-ta!(DUG)", "grapheme");
        assert.isTrue(match.succeeded());
    });
    it("Should be able to parse |BAD3.AN|{ki}-sze3", () => {
        let match = inlineGrammar.match("|BAD3.AN|{ki}-sze3", "Word");
        assert.isTrue(match.succeeded());
    });
    it("Should be able to parse uri5{ki}-ma", () => {
        let match = inlineGrammar.match("uri5{ki}-ma", "Word");
        assert.isTrue(match.succeeded());
    });
    describe("Missing Word/Grapheme Cases", () => {
        it.skip("Should be able to parse [dumu lu2-{d}szara2]", () => {
            let match = inlineGrammar.match("[dumu lu2-{d}szara2]", "missingGrapheme");
            assert.isTrue(match.succeeded());
        });
        // Other examples
        // "[x a]-ha-ti"
        // "[kiszib3 lugal]-e2-mah-e"
        // "[iti x x {d}nin]-a-zu"
    });
    describe("Field Token Cases", () => {
        it("Should be able to parse [...] = %a MIN<(mu-'-ir-ri)>", () => {
            let match = inlineGrammar.match("[...] = %a MIN<(mu-'-ir-ri)>", "Words");
            assert.isTrue(match.succeeded());
        });
    });

    describe.skip("CDLI logograms", () => {
        it("Should parse _a mu-ru_ as grapheme", () => {
            let match = inlineGrammar.match("_a mu-ru_", "grapheme");
            assert.isTrue(match.succeeded());
        });
        it("Should parse _a mu-ru_ as logogramCDLI", () => {
            let match = inlineGrammar.match("_a mu-ru_", "logogramCDLI");
            assert.isTrue(match.succeeded());
        });
    });
});
