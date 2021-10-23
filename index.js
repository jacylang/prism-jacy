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
        }
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
            'string': null // see below
        }
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
        }
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
        alias: 'class-name'
    },
    'module-declaration': [
        {
            pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,
            lookbehind: true,
            alias: 'namespace'
        },
        {
            pattern: /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
            lookbehind: true,
            alias: 'namespace',
            inside: {
                'punctuation': /::/
            }
        }
    ],
    'keyword': [
        /\b(?:as|break|const|continue|else|enum|false|func|for|if|impl|in|let|loop|match|mod|move|mut|party|priv|pub|ref|return|self|Self|static|struct|super|trait|true|type|use|where|while)\b/,
        /\b(?:[ui](?:8|16|32|64|128)|f(?:32|64)|uint|int|bool|char|str)\b/
    ],

    'function': /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
    'macro': {
        pattern: /\b\w+!/,
        alias: 'property'
    },
    'constant': /\b[A-Z_][A-Z_\d]+\b/,
    'class-name': /\b[A-Z]\w*\b/,

    'namespace': {
        pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
        inside: {
            'punctuation': /::/
        }
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
