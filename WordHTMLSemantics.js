const semantics = {
    Words: function(someWords){
        return someWords.children.map(word => {
            return word.toHTML();
        });
    },

    Word: function(aWord){
        return `<span class="inline word">${aWord.toHTML()}</span>`;
    },

    shift: function(percent, content){
        return `<span class="inline lang-shift">${this.sourceString}</span>`;
    },

    InlineComment: function(open, content, close){
        return `<span class="inline comment">${this.sourceString}</span>`;
    },

    unknownGrapheme: function(nonWhitespaceChars){
        return `<span class="inline grapheme unknown">${this.sourceString}</span>`;
    },

    punctuation: function(aPunctuation){
        return aPunctuation.sourceString;
    },

    missingGrapheme: function(grapheme){
        return `<span class="inline grapheme missing">${grapheme.sourceString}</span>`;
    },

    grapheme_complex: function(signReading, signSep, grapheme){
        return `${signReading.toHTML()}-${grapheme.toHTML()}`;
    },

    grapheme_dual: function(signReading, signSep, otherSignReading){
        return `${signReading.toHTML()}-${otherSignReading.toHTML()}`;
    },

    grapheme_single: function(signReading){
        return `<span class="inline grapheme single">${signReading.toHTML()}</span>`;
    },

    grapheme_glossed: function(glossedGrapheme){
        return `<span class="inline grapheme glossed">${glossedGrapheme.sourceString}</span>`;
    },

    signReading: function(aSignReading){
        return `<span class="inline sign-reading">${aSignReading.sourceString}</span>`;
    },

    _iter: function(...children){
        
    }

    
};

export { semantics as default };
