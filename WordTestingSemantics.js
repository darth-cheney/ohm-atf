const semantics = {
    Words: function(someWords){
        return someWords.children.map(word => {
            return word.wordType();
        });
    },

    Word: function(aWord){
        return aWord.wordType();
    },

    shift: function(percent, content){
        return {
            type: 'shift',
            content: `%${content.sourceString}`
        };
    },

    InlineComment: function(open, content, close){
        return {
            type: 'InlineComment',
            content: this.sourceString,
            innerContent: content.sourceString
        };
    },

    unknownGrapheme: function(nonWhitespaceChars){
        return {
            type: 'UnknownGrapheme',
            content: nonWhitespaceChars.sourceString,
            source: nonWhitespaceChars.source
        };
    },

    punctuation: function(aPunctuation){
        return {
            type: 'punctuation',
            content: aPunctuation.sourceString
        };
    },

    missingGrapheme: function(grapheme){
        return {
            type: 'missingGrapheme',
            content: this.sourceString,
            innerContent: grapheme.sourceString
        };
    },

    grapheme_complex: function(signReading, signSep, grapheme){
        return {
            type: 'grapheme',
            parts: [
                signReading.wordType(),
                grapheme.wordType()
            ]
        };
    },

    grapheme_dual: function(signReading, signSep, otherSignReading){
        return {
            type: 'grapheme',
            parts: [
                signReading.wordType(),
                otherSignReading.wordType()
            ]
        };
    },

    grapheme_single: function(signReading){
        return {
            type: 'grapheme',
            parts: [
                signReading.wordType()
            ]
        };
    },

    grapheme_glossed: function(glossedGrapheme){
        return {
            type: 'grapheme',
            parts: [
                glossedGrapheme.wordType()
            ]
        };
    },

    glossedGrapheme: function(glossedType){
        return {
            type: 'glossedGrapheme',
            content: glossedType.sourceString
        };
    },

    signReading: function(aSignReading){
        return {
            type: 'signReading',
            content: aSignReading.sourceString
        };
    },

    _iter: function(...children){
        
    }

    
};

export { semantics as default };
