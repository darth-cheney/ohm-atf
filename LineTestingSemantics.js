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
            content: `${beginning.sourceString}. ${content.sourceString}\n`,
            innerContent: content.sourceString.trim()
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
    }
};

export {
    semantics as default
};
