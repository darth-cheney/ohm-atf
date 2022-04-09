/**
 * Tests for lexical rules in the ATFStructure Ohm Grammar
 */
import ohm from "ohm-js";
import fs from "fs";
const grammar = ohm.grammar(fs.readFileSync("./ATFStructure.ohm"));
import chai from "chai";
const assert = chai.assert;

const protocolLanguages = ["akk-x-earakk", "akk-x-oldakk", "ua", "akk-x-oldass", "akk-x-oldbab", "akk-x-obperi", "akk-x-midass", "akk-x-midbab", "akk-x-mbperi", "akk-x-neoass", "akk-x-neobab", "akk-x-ltebab", "akk-x-stdbab", "akk-x-conakk", "hit", "sux or sux-x-emegir", "sux-x-emesal", "sux-x-syllabic", "sux-x-udgalnun"];

describe("Initial test", () => {
    it("Should have loaded a grammar", () => {
        assert.isNotEmpty(grammar);
    });
});

describe("At-Line Tests", () =>{
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
    describe("At-Line Surface Object type tests", () => {
        let plainFaces = ["obverse", "reverse", "left",
                          "right", "top", "bottom", ];
        plainFaces.forEach(name => {
            it(`Matches a @${name} line`, () => {
                let input = `@${name}\n`;
                let match = grammar.match(input, "AtSurfaceLine");
                assert.isTrue(match.succeeded());
            });
        });
        plainFaces.forEach(name => {
            it(`Does not match a @${name} line that has extra text after it`, () => {
                let input = `@${name}`;
                let match = grammar.match(input, "AtSurfaceLine");
                assert.isFalse(match.succeeded());
            });
        });
        it("Matches a @surface generic line", () => {
            let input = `@surface some other designation here\n`;
            let match = grammar.match(input, "AtSurfaceLine");
            assert.isTrue(match.succeeded());
        });
        it("Does not match a @surface line that has no extra text", () => {
            let input = `@surface\n`;
            let match = grammar.match(input, "AtSurfaceLine");
            assert.isFalse(match.succeeded());
        });
        it("Matches a @face generic line with a single letter designation", () => {
            let input = `@face b\n`;
            let match = grammar.match(input, "AtSurfaceLine");
            assert.isTrue(match.succeeded());
        });
        it("Does not match an @face generic line that has more than one letter designation", () => {
            let input = `@face bb\n`;
            let match = grammar.match(input, "AtSurfaceLine");
            assert.isFalse(match.succeeded());
        });
        it("Does not match @face generic line that has no letter designation or other text", () => {
            let input = `@face\n`;
            let match = grammar.match(input, "AtSurfaceLine");
            assert.isFalse(match.succeeded());
        });
    });
    describe("At-Line Heading object line type tests", () => {
        for(let i = 1; i <= 9; i++){
            it(`Matches a heading for ${i} without extra text`, () => {
                let input = `@h${i}\n`;
                let match = grammar.match(input, "AtHeadingLine");
                assert.isTrue(match.succeeded());
            });
            it(`Does not match a heading for ${i} that contains extra text`, () => {
                let input = `@h${i} and some extra test\n`;
                let match = grammar.match(input, "AtHeadingLine");
                assert.isFalse(match.succeeded());
            });
        }
    });
    describe("At-Line Division object line type tests", () => {
        it("Matches a division line for a plain division with no further information", () => {
            let input = `@m=division\n`;
            let match = grammar.match(input, "AtDivisionLine");
            assert.isTrue(match.succeeded());
        });
        it("Matches a division line for a plain division with paragraph subpart and number", () => {
            let input = `@m=division paragraph 223\n`;
            let match = grammar.match(input, "AtDivisionLine");
            assert.isTrue(match.succeeded());
        });
        it("Does not match a division with arbitrary text after it", () => {
            let input = `@m=division this text should fail\n`;
            let match = grammar.match(input, "AtDivisionLine");
            assert.isFalse(match.succeeded());
        });
    });
    describe("At-Line Discourse object like type tests", () => {
        let shortcuts = ["catchline", "colophon", "date", "signature", "signatures", "summary", "witnesses"];
        shortcuts.forEach(name => {
            it(`Matches the discourse milestone shortcut ${name}`, () => {
                let input = `@${name}\n`;
                let match = grammar.match(input, "AtDiscourseLine");
                assert.isTrue(match.succeeded());
            });
        });
    });
});

describe("Hash Line Tests", () => {
    describe("Protocol Line Tests", () => {
        describe("atf protocol lang tests", () => {
            protocolLanguages.forEach(langName => {
                it(`Parses language protocol for ${langName}`, () => {
                    let input = `#atf: lang ${langName}\n`;
                    let match = grammar.match(input, "ATFProtocolLine");
                    assert.isTrue(match.succeeded());
                });
            });
        });
    });
});
