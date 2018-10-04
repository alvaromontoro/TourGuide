module.exports = {
    'rules': {
        'indent': [
            'error',
            2, {
                'SwitchCase': 1
            }
        ],
        'quotes': [
            'error',
            'single'
        ],
        'no-multi-spaces': [
            'error'
        ],
        'space-infix-ops': [
            'error'
        ],
        'linebreak-style': [
            'off'
        ],
        'semi': [
            'error',
            'always'
        ],
        'eol-last': [
            'error',
            'always'
        ],
        'func-call-spacing': [
            'error',
            'never'
        ],
        'space-before-function-paren': [
            'error',
            'never'
        ],
        'space-before-blocks': [
            'error',
            'always'
        ],
        'func-style': [
            'error',
            'declaration', {
                'allowArrowFunctions': true
            }
        ],
        'no-empty-function': [
            'error'
        ],
        'no-debugger': [
            'error'
        ],
        'no-console': [
            'error', {
                'allow': ['error']
            }
        ],
    },
    'env': {
        'browser': true,
        'es6': true
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 6
    },
    'plugins': [
        'jsx-a11y',
        'import'
    ]
};
