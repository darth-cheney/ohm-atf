import ohm from "ohm-js";
import chai from "chai";
import fs from "fs";
const assert = chai.assert;
const grammar = ohm.grammar(fs.readFileSync("./ATFInline.ohm"));

describe("Modifiers", () => {
    it("Matches variant @v modifier", () => {
        let match = grammar.match("@v", "modifierToken_variant");
        assert.isTrue(match.succeeded());
    });
    it("Matches curved @c modifier", () => {
        let match = grammar.match("@c", "modifierToken_curved");
        assert.isTrue(match.succeeded());
    });
    it("Matches flat @f", () => {
        let match = grammar.match("@f", "modifierToken_flat");
        assert.isTrue(match.succeeded());
    });
    it("Matches gunu @g modifier", () => {
        let match = grammar.match("@g", "modifierToken_gunu");
        assert.isTrue(match.succeeded());
    });
    it("Matches sheshig @s modifier", () => {
        let match = grammar.match("@s", "modifierToken_sheshig");
        assert.isTrue(match.succeeded());
    });
    it("Matches tenu (slanted) @t modifier", () => {
        let match = grammar.match("@t", "modifierToken_tenu");
        assert.isTrue(match.succeeded());
    });
    it("Matches nutillu (unfinished) @n modifier", () => {
        let match = grammar.match("@n", "modifierToken_nutillu");
        assert.isTrue(match.succeeded());
    });
    it("Matches zidatenu (slanting right) @z modifier", () => {
        let match = grammar.match("@z", "modifierToken_zidatenu");
        assert.isTrue(match.succeeded());
    });
    it("Matches kabatenu (slanting left) @k modifier", () => {
        let match = grammar.match("@k", "modifierToken_kabatenu");
        assert.isTrue(match.succeeded());
    });
    it("Matches vertically reflected @r modifier", () => {
        let match = grammar.match("@r", "modifierToken_verticallyReflected");
        assert.isTrue(match.succeeded());
    });
    it("Matches horizontally reflected @h modifier", () => {
        let match = grammar.match("@h", "modifierToken_horizontallyReflected");
        assert.isTrue(match.succeeded());
    });
    it("Matches rotated @321 modifier", () => {
        let match = grammar.match("@321", "modifierToken_rotated");
        assert.isTrue(match.succeeded());
    });
});

describe("Allographs", () => {
    it("Matches a custom allograph", () => {
        let match = grammar.match("~plt112", "allograph_custom");
        assert.isTrue(match.succeeded());
    });
    it("Does not match a custom allograph containing lowercase x", () => {
        let match = grammar.match("~1xpel", "allograph");
        assert.isTrue(match.failed());
    });
    it("Matches the token allograph ~t", () => {
        let match = grammar.match("~t", "allograph_token");
        assert.isTrue(match.succeeded());
    });
    it("Matches the variant allograph ~v", () => {
        let match = grammar.match("~v", "allograph_variant");
        assert.isTrue(match.succeeded());
    });
});
