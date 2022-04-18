// Semantics for the ATFStructure Grammar
// that produces valid JTF.
const semantics = {
    Main: function(optionalOuter, start, interList, optionalAfter, end){
        let startInfo = start.toJTF();
        return {
            success: true,
            errors: [],
            warnings: [],
            meta: {
                "name": startInfo[0].name,
                "p_number": startInfo[0].p_number
            },
            objects: interList.toJTF(),
            start: startInfo
        };
    },

    Start: function(ampLine, hashProtocolLines){
        let result = [];
        result.push(ampLine.toJTF());
        hashProtocolLines.children.forEach(protoLine => {
            result.push(protoLine.toJTF());
        });
        return result;
    },

    Inter: function(interLine){
        return interLine.toJTF();
    },

    TextLine: function(beginning, dot, space, otherText, newline){
        return {
            _class: "line",
            name: beginning.sourceString,
            children: [],
            content: otherText.sourceString
        };
    },

    HashStartProtocolLine: function(line){
        let lineJTF = line.toJTF();
        lineJTF._class = "protocol.start";
        return lineJTF;
    },

    AmpLine: function(amp, pCode, eqSign, otherText, newline){
        return {
            _class: "ampStatement",
            p_number: pCode.sourceString,
            name: otherText.sourceString
        };
    },

    AtLine: function(line){
        return line.toJTF();
    },

    AtObjectLine: function(atSign, objectName, newline){
        return {
            _class: "object",
            type: objectName.sourceString,
            children: []
        };
    },

    AtSurfaceLine: function(atSign, surfaceName, newline){
        return {
            _class: "surface",
            type: surfaceName.sourceString,
            children: []
        };
    },
    
    ATFProtocolLine: function(prefix, langOrUseLiteral, valToken, newline){
        return {
            type: "atf",
            value: langOrUseLiteral.sourceString + " " + valToken.sourceString
        };
    },

    _nonterminal: function(...rest){
        return rest.map(item => { return item.sourceString; });
    },
    _terminal: function(){
        return "uncaught terminal";
    },

    _iter: function(...collection){
        return collection.map(item => { return item.toJTF();});
    }
};

export default semantics;
