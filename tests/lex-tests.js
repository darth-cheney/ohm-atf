/**
 * Tests for lexical rules in the ATFStructure Ohm Grammar
 */
import ohm from "ohm-js";
import fs from "fs";
const grammar = ohm.grammar(fs.readFileSync("./ATFStructure.ohm"));
import chai from "chai";
const assert = chai.assert;

describe("Initial test", () => {
    it("Should have loaded a grammar", () => {
        assert.isNotEmpty(grammar);
    });
});

describe("At-Line Basic Object type tests", () => {
    it("Matches an @tablet line", () => {
        let input = "@tablet\n";
        let match = grammar.match(input, "AtObjectLine");
        assert.isTrue(match.succeeded());
    });
    it("Does not match @tablet line with extra text after it", () => {
        let input = "@tablet something else here\n";
        let match = grammar.match(input, "AtObjectLine");
        assert.isFalse(match.succeeded());
    });
    it("Matches an @envelope line", () => {
        let input = "@envelope\n";
        let match = grammar.match(input, "AtObjectLine");
        assert.isTrue(match.succeeded());
    });
    it("Does not match @envelope line with extra text after it", () => {
        let input = "@envelope something else here\n";
        let match = grammar.match(input, "AtObjectLine");
        assert.isFalse(match.succeeded());
    });
    it("Matches an @prism line", () => {
        let input = "@prism\n";
        let match = grammar.match(input, "AtObjectLine");
        assert.isTrue(match.succeeded());
    });
    it("Does not match @prism line with extra text after it", () => {
        let input = "@prism something else here\n";
        let match = grammar.match(input, "AtObjectLine");
        assert.isFalse(match.succeeded());
    });
    it("Matches an @bulla line", () => {
        let input = "@bulla\n";
        let match = grammar.match(input, "AtObjectLine");
        assert.isTrue(match.succeeded());
    });
    it("Does not match @bulla line with extra text after it", () => {
        let input = "@bulla something else here\n";
        let match = grammar.match(input, "AtObjectLine");
        assert.isFalse(match.succeeded());
    });
    it("Matches a @fragment line", () => {
        let input = "@fragment b\n";
        let match = grammar.match(input, "AtObjectLine");
        assert.isTrue(match.succeeded());
    });
    it("Does not match a @fragment line that doesn't have a letter specification", () => {
        let input = "@fragment\n";
        let match = grammar.match(input, "AtObjectLine");
        assert.isFalse(match.succeeded());
    });
    it("Does not match a @fragment line that has more than one letter after it", () => {
        let input = "@fragment this is other stuff\n";
        let match = grammar.match(input, "AtObjectLine");
        assert.isFalse(match.succeeded());
    });
});
