const semantics = {
    AmpLine: function(amp, pCode, eq, content, lineTerminator){
        return {
            type: 'AmpLine',
            content: this.sourceString
        };
    },

    AtLine: function(atLineType){
        return  {
            type: 'AtLine',
            content: atLineType.sourceString
        };
    },

    DollarLine: function(aDollarLine){
        return {
            type: 'DollarLine',
            content: aDollarLine.sourceString
        };
    },

    TextLine: function(beginning, dot, space, content, lineTerminator){
        return {
            type: 'TextLine',
            isContinued: true,
            content: `${beginning.sourceString}. ${content.sourceString}\n`,
            innerContent: content.sourceString.trim()
        };
    },

    ContinuedTextLine: function(content, lineTerminator){
        return {
            type: 'TextLine',
            isContinued: true,
            content: content.sourceString,
            innerContent: content.sourceString.trim()
        };
    },

    TextLines: function(textLine, continuationLines){
        return {
            type: 'TextLines',
            content: this.sourceString
        };
    },
    
    HashLine: function(aHashLine){
        return {
            type: 'HashLine',
            content: aHashLine.sourceString
        };
    },

    UnknownLine: function(content, lineTerminator){
        return {
            type: 'UnknownLine',
            content: content.sourceString + "\n"
        };
    },

    Line: function(aLine){
        return aLine.lineType();
    },

    Lines: function(lines){
        return lines.children.map(child => {
            return child.lineType();
        });
    },

    lineTerminator: function(newlineChar){
        return {
            type: 'LineTerminator',
            content: newlineChar.sourceString
        };
    },

    _iter: function(...items){
        return items.map(item => {
            return item.sourceString;
        });
    },

    _terminal: function(){
        return this.sourceString;
    }
};

export {
    semantics as default
};
