const semantics = {
    AmpLine: function(amp, pCode, eq, content, lineTerminator){
        return `<p class="amp-line">${this.sourceString}</p>`;
    },

    AtLine: function(atLineType){
        return `<p class="at-line">${atLineType.sourceString}</p>`;
    },

    DollarLine: function(aDollarLine){
        return `<p class="dollar-line">${aDollarLine.sourceString}</p>`;
    },

    TextLine: function(beginning, dot, space, content, lineTerminator){
        // return {
        //     type: 'TextLine',
        //     content: `${beginning.sourceString}. ${content.sourceString}\n`,
        //     innerContent: content.sourceString.trim()
        // };
        return `<p class="text-line"><span class="line-prefix">${beginning.sourceString}</span>. <span class="line-content">${content.sourceString}</span></p>`;
    },

    ContinuedTextLine: function(nonLineTerminator, lineTerminator){
        return `<p class="text-line continued-text-line">${this.sourceString}</p>`;
    },

    TextLines: function(textLine, continuedLines){
        let result = textLine.toHTML() + "\n";
        result += continuedLines.children.map(child => {
            return child.toHTML();
        }).join('\n');
        return result;
    },

    HashLine: function(aHashLine){
        return `<p class="hash-line">${this.sourceString}</span>`;
    },

    UnknownLine: function(content, lineTerminator){
        return `<p class="unknown-line">${this.sourceString}</p>`;
    },

    Line: function(aLine){
        return aLine.toHTML();
    },

    Lines: function(lines){
        return lines.children.map(child => {
            return child.toHTML();
        }).join("\n");
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
