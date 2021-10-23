(function (Prism) {

var multilineComment = /\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source;
for (var i = 0; i < 2; i++) {
    // support 4 levels of nested comments
    multilineComment = multilineComment.replace(/<self>/g, function () { return multilineComment; });
}
multilineComment = multilineComment.replace(/<self>/g, function () { return /[^\s\S]/.source; });


Prism.languages.jacy = {
    'comment': [
        {
            pattern: RegExp(/(^|[^\\])/.source + multilineComment),
            lookbehind: true,
            greedy: true
        },
        {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true,
            greedy: true
        },
    ],
    'string': {
        pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,
        greedy: true
    },
    'char': {
        pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,
        greedy: true,
        alias: 'string'
    },
    'attribute': {
        pattern: /@(?:.*)$/,
        greedy: true,
        alias: 'attr-name',
        inside: {
            'string': null,
        },
    },

    // Closure params should not be confused with bitwise OR |
    'closure-params': {
        pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
        lookbehind: true,
        greedy: true,
        inside: {
            'closure-punctuation': {
                pattern: /^\||\|$/,
                alias: 'punctuation'
            },
            rest: null // see below
        },
    },

    'lifetime-annotation': {
        pattern: /'\w+/,
        alias: 'symbol'
    },

    'fragment-specifier': {
        pattern: /(\$\w+:)[a-z]+/,
        lookbehind: true,
        alias: 'punctuation'
    },
    'variable': /\$\w+/,

    'function-definition': {
        pattern: /(\bfunc\s+)\w+/,
        lookbehind: true,
        alias: 'function'
    },
    'type-definition': {
        pattern: /(\b(?:enum|struct|union)\s+)\w+/,
        lookbehind: true,
        alias: 'class-name',
    },
    'module-declaration': [
        {
            pattern: /(\b(?:party|mod)\s+)[a-z][a-z_\d]*/,
            lookbehind: true,
            alias: 'namespace'
        },
        {
            pattern: /(\b(?:party|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
            lookbehind: true,
            alias: 'namespace',
            inside: {
                'punctuation': /::/
            },
        },
    ],
    'keyword': [
        /\b(?:_|and|as|async|await|break|const|continue|do|elif|else|enum|false|for|func|if|impl|import|in|infix|init|loop|match|mod|move|mut|not|of|or|return|party|pub|ref|self|static|struct|super|this|trait|true|type|use|let|where|while)\b/,
    ],

    'function': /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
    'constant': /\b[A-Z_][A-Z_\d]+\b/,
    'class-name': [
        /\b[A-Z]\w*\b/,
        /\b(?:[ui](?:8|16|32|64|128)|f(?:32|64)|uint|int|bool|char|str)\b/,
        /\b(str|char|bool|Option|Result|String|Vec)\b/,
    ],

    'namespace': {
        pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
        inside: {
            'punctuation': /::/
        },
    },

    // Hex, oct, bin, dec numbers with visual separators and type suffix
    'number': /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:[iu](?:8|16|32|64)?|f32|f64))?\b/,
    'boolean': /\b(?:false|true)\b/,
    'punctuation': /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
    'operator': /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/
};

Prism.languages.jacy['closure-params'].inside.rest = Prism.languages.jacy;
Prism.languages.jacy['attribute'].inside['string'] = Prism.languages.jacy['string'];

}(Prism));
