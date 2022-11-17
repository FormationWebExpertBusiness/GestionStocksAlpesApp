module.exports = {
	env: {
        "browser": true,
        "es2021": true
    },
    root: true,
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    overrides: [
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        "ecmaVersion": "latest",
        "sourceType": "module",
		"project": ["./tsconfig.json"]
    },
    plugins: [
        "@typescript-eslint",
    ],
	ignorePatterns: ["*.config.js", "*.js"],
	rules: {
		'@typescript-eslint/adjacent-overload-signatures': 2,
		'@typescript-eslint/array-type': [2, { ArrayOption: 'generic' }],
		'@typescript-eslint/ban-ts-comment': [2, { 'ts-expect-error': 'allow-with-description' }],
		'@typescript-eslint/brace-style': [
			2,
			'1tbs',
			{
				allowSingleLine: true
			}
		],
		'@typescript-eslint/class-literal-property-style': [2, 'fields'],
		'@typescript-eslint/comma-dangle': [2, 'never'],
		'@typescript-eslint/comma-spacing': [
			2,
			{
				before: false,
				after: true
			}
		],
		'@typescript-eslint/consistent-indexed-object-style': [2, 'record'],
		'@typescript-eslint/consistent-type-assertions': [2, { assertionStyle: 'as' }],
		'@typescript-eslint/consistent-type-definitions': [2, 'type'],
		'@typescript-eslint/consistent-type-imports': [2, { prefer: 'type-imports' }],
		'@typescript-eslint/default-param-last': 2,
		'@typescript-eslint/explicit-function-return-type': [
			2,
			{
				allowExpressions: false,
				allowTypedFunctionExpressions: false,
				allowHigherOrderFunctions: false,
				allowDirectConstAssertionInArrowFunctions: false,
				allowConciseArrowFunctionExpressionsStartingWithVoid: false
			}
		],
		'@typescript-eslint/explicit-member-accessibility': [2, { accessibility: 'explicit' }],
		'@typescript-eslint/explicit-module-boundary-types': [
			2,
			{
				allowArgumentsExplicitlyTypedAsAny: false,
				allowDirectConstAssertionInArrowFunctions: false,
				allowHigherOrderFunctions: false,
				allowTypedFunctionExpressions: false
			}
		],
		'@typescript-eslint/func-call-spacing': [2, 'never'],
		'@typescript-eslint/init-declarations': [2, 'always'],
		'@typescript-eslint/keyword-spacing': [
			2,
			{
				before: true,
				after: true,
				overrides: {
					if: {
						after: false
					},
					for: {
						after: false
					},
					while: {
						after: false
					}
				}
			}
		],
		'@typescript-eslint/lines-between-class-members': [2, 'always', { exceptAfterSingleLine: true, exceptAfterOverload: true }],
		'@typescript-eslint/member-delimiter-style': [
			2,
			{
				singleline: { delimiter: 'semi', requireLast: true },
				multiline: { delimiter: 'semi', requireLast: true }
			}
		],
		'@typescript-eslint/method-signature-style': [2, 'method'],
		'@typescript-eslint/naming-convention': [
			2,
			{
				selector: 'default',
				format: ['strictCamelCase'],
				leadingUnderscore: 'forbid',
				trailingUnderscore: 'forbid'
			},
			{
				selector: 'class',
				format: ['StrictPascalCase'],
				leadingUnderscore: 'forbid',
				trailingUnderscore: 'forbid'
			},
			{
				selector: 'variable',
				modifiers: ['const'],
				format: ['UPPER_CASE'],
				leadingUnderscore: 'forbid',
				trailingUnderscore: 'forbid'
			},
			{
				selector: 'variable',
				modifiers: ['const'],
				format: ['strictCamelCase'],
				types: ['function'],
				leadingUnderscore: 'forbid',
				trailingUnderscore: 'forbid'
			},
			{
				selector: 'variable',
				types: ['boolean'],
				format: ['PascalCase'],
				prefix: ['is', 'should', 'has', 'can', 'did', 'will']
			},
			{
				selector: 'classProperty',
				format: ['strictCamelCase'],
				leadingUnderscore: 'require',
				trailingUnderscore: 'forbid'
			},
			{
				selector: 'objectLiteralProperty',
				format: ['camelCase'],
				leadingUnderscore: 'forbid',
				trailingUnderscore: 'forbid'
			},
			{
				selector: 'parameterProperty',
				format: ['strictCamelCase'],
				leadingUnderscore: 'require',
				trailingUnderscore: 'forbid'
			},
			{
				selector: 'typeLike',
				format: ['StrictPascalCase'],
				leadingUnderscore: 'forbid',
				trailingUnderscore: 'forbid'
			},
			{
				selector: 'interface',
				format: ['StrictPascalCase'],
				prefix: ['I']
			},
			{
				selector: 'enumMember',
				format: ['UPPER_CASE'],
			}
		],
		'@typescript-eslint/no-array-constructor' : 2,
		'@typescript-eslint/no-confusing-non-null-assertion': 2,
		'@typescript-eslint/no-confusing-void-expression': 2,
		'@typescript-eslint/no-dupe-class-members': 2,
		'@typescript-eslint/no-duplicate-imports': 2,
		'@typescript-eslint/no-dynamic-delete': 2,
		'@typescript-eslint/no-empty-function': [2, { allow: ['private-constructors', 'protected-constructors', 'decoratedFunctions'] }],
		'@typescript-eslint/no-empty-interface': 2,
		'@typescript-eslint/no-explicit-any': 2,
		'@typescript-eslint/no-extra-non-null-assertion': 2,
		'@typescript-eslint/no-extra-parens': 2,
		'@typescript-eslint/no-extra-semi': 2,
		'@typescript-eslint/no-extraneous-class': [2, { allowWithDecorator: true }],
		'@typescript-eslint/no-for-in-array': 2,
		'@typescript-eslint/no-inferrable-types': [2, { ignoreParameters: true, ignoreProperties: true }],
		'@typescript-eslint/no-invalid-this': 2,
		'@typescript-eslint/no-invalid-void-type': 2,
		'@typescript-eslint/no-loop-func': 2,
		'@typescript-eslint/no-loss-of-precision': 2,
		'@typescript-eslint/no-magic-numbers': [2, { ignoreEnums: true, ignoreReadonlyClassProperties: true }],
		'@typescript-eslint/no-misused-new': 2,
		'@typescript-eslint/no-namespace': 2,
		'@typescript-eslint/no-non-null-asserted-nullish-coalescing': 2,
		'@typescript-eslint/no-non-null-asserted-optional-chain': 2,
		'@typescript-eslint/no-non-null-assertion': 2,
		'@typescript-eslint/no-parameter-properties': 2,
		'@typescript-eslint/no-redeclare': 2,
		'@typescript-eslint/no-require-imports': 2,
		'@typescript-eslint/no-shadow': [2, { ignoreTypeValueShadow: false, ignoreFunctionTypeParameterNameValueShadow: false }],
		'@typescript-eslint/no-this-alias': [2, { allowedNames: ['that'] }],
		'@typescript-eslint/no-use-before-define': 2,
		'@typescript-eslint/no-useless-constructor': 2,
		'@typescript-eslint/no-var-requires': 2,
		'@typescript-eslint/object-curly-spacing': [2, 'never'],
		'@typescript-eslint/prefer-as-const': 2,
		'@typescript-eslint/prefer-enum-initializers': 2,
		'@typescript-eslint/prefer-literal-enum-member': [2, { allowBitwiseExpressions: true }],
		'@typescript-eslint/prefer-namespace-keyword': 2,
		'@typescript-eslint/prefer-optional-chain': 2,
		'@typescript-eslint/prefer-readonly-parameter-types': [
			2,
			{ checkParameterProperties: true, treatMethodsAsReadonly: true }
		],
		'@typescript-eslint/prefer-reduce-type-parameter': 2,
		'@typescript-eslint/prefer-regexp-exec': 2,
		'@typescript-eslint/prefer-return-this-type': 2,
		'@typescript-eslint/prefer-string-starts-ends-with': 2,
		'@typescript-eslint/prefer-ts-expect-error': 2,
		'@typescript-eslint/promise-function-async': 2,
		'@typescript-eslint/quotes': [
			2,
			'single',
			{
				avoidEscape: true,
				allowTemplateLiterals: true
			}
		],
		'@typescript-eslint/require-array-sort-compare': [2, { ignoreStringArrays: true }],
		'@typescript-eslint/require-await': 2,
		'@typescript-eslint/restrict-plus-operands': [2, { checkCompoundAssignments: true }],
		'@typescript-eslint/restrict-template-expressions': [
			2,
			{ allowNumber: true, allowBoolean: true, allowAny: false, allowNullish: false }
		],
		'@typescript-eslint/return-await': [2, 'always'],
		'@typescript-eslint/semi': [2, 'always'],
		'@typescript-eslint/sort-type-union-intersection-members': [2, { checkIntersections: true, checkUnions: true }],
		'@typescript-eslint/space-before-blocks': [2, 'always'],
		'@typescript-eslint/space-before-function-paren': [2, 'never'],
		'@typescript-eslint/space-infix-ops': 2,
		'@typescript-eslint/strict-boolean-expressions': [
			2,
			{ allowString: true, allowNumber: true, allowNullableObject: true }
		],
		'@typescript-eslint/switch-exhaustiveness-check': 2,
		'@typescript-eslint/triple-slash-reference': [2, { path: 'never', types: 'never', lib: 'never' }],
		'@typescript-eslint/type-annotation-spacing': [
			2,
			{ before: false, after: true, overrides: { arrow: { before: true, after: true } } }
		],
		'@typescript-eslint/unbound-method': 2,
		'@typescript-eslint/unified-signatures': 2,
		'array-bracket-newline': [
			2,
			{
				multiline: true
			}
		],
		'array-bracket-spacing': [2, 'never'],
		'array-callback-return': 2,
		'array-element-newline': [2, 'consistent'],
		'arrow-body-style': [2, 'always'],
		'arrow-parens': [2, 'always'],
		'arrow-spacing': [
			2,
			{
				before: true,
				after: true
			}
		],
		'block-scoped-var': 2,
		'block-spacing': [2, 'always'],
		'brace-style': 0,
		'camelcase': 2,
		'capitalized-comments': 2,
		'class-methods-use-this': 2,
		'constructor-super': 2,
		'comma-dangle': 0,
		'comma-spacing': 0,
		'comma-style': [2, 'last'],
		'complexity': 2,
		'computed-property-spacing': [2, 'never'],
		'consistent-return': 2,
		'consistent-this': [2, 'that'],
		'curly': [2, 'all'],
		'default-case': 2,
		'default-case-last': 2,
		'default-param-last': 0,
		'dot-location': [2, 'property'],
		'dot-notation': 0,
		'eol-last': [2, 'always'],
		'eqeqeq': [2, 'always'],
		'for-direction': 2,
		'func-call-spacing': 0,
		'func-names': [2, 'as-needed'],
		'func-style': [
			2,
			'declaration',
			{
				allowArrowFunctions: true
			}
		],
		'function-call-argument-newline': [2, 'never'],
		'function-paren-newline': [2, 'multiline'],
		'generator-star-spacing': [
			2,
			{
				after: true,
				before: false
			}
		],
		'getter-return': 2,
		'grouped-accessor-pairs': [2, 'getBeforeSet'],
		'implicit-arrow-linebreak': [2, 'beside'],
		'init-declarations': 0,
		'keyword-spacing': 0,
		'linebreak-style': [2, 'unix'],
		'lines-around-comment': [
			2,
			{
				beforeBlockComment: true,
				afterBlockComment: false,
				beforeLineComment: true,
				afterLineComment: false,
				allowBlockStart: true,
				allowBlockEnd: true,
				allowObjectStart: true,
				allowObjectEnd: true,
				allowArrayStart: true,
				allowArrayEnd: true,
				allowClassStart: true,
				allowClassEnd: true,
				applyDefaultIgnorePatterns: true
			}
		],
		'lines-between-class-members': 0,
		'max-depth': [2, 6],
		'max-len': [
			2,
			{
				code: 250,
				tabWidth: 4,
				ignoreUrls: true,
				ignoreComments: true,
				ignoreRegExpLiterals: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true
			}
		],
		'max-nested-callbacks': [2, 5],
		'max-params': [2, 8],
		'multiline-comment-style': [2, 'starred-block'],
		'multiline-ternary': [2, 'never'],
		'new-cap': [
			2,
			{
				newIsCap: true,
				capIsNew: false,
				properties: false
			}
		],
		'new-parens': [2, 'always'],
		'newline-per-chained-call': [
			2,
			{
				ignoreChainWithDepth: 3
			}
		],
		'no-alert': 2,
		'no-array-constructor' : 0,
		'no-async-promise-executor': 2,
		'no-case-declarations': 2,
		'no-class-assign': 2,
		'no-compare-neg-zero': 2,
		'no-cond-assign': 2,
		'no-console': 2,
		'no-const-assign': 2,
		'no-constant-condition': 2,
		'no-control-regex': 2,
		'no-constructor-return': 2,
		'no-debugger': 2,
		'no-delete-var': 2,
		'no-dupe-args': 2,
		'no-dupe-class-members': 0,
		'no-dupe-else-if': 2,
		'no-dupe-keys': 2,
		'no-duplicate-case': 2,
		'no-duplicate-imports': 0,
		'no-else-return': 2,
		'no-empty': 2,
		'no-empty-character-class': 2,
		'no-empty-function': 0,
		'no-empty-pattern': 2,
		'no-eq-null': 2,
		'no-ex-assign': 2,
		'no-extend-native': 2,
		'no-extra-parens': 0,
		'no-extra-label': 2,
		'no-extra-bind': 2,
		'no-extra-boolean-cast': 2,
		'no-extra-semi': 0,
		'no-eval': 2,
		'no-fallthrough': 2,
		'no-func-assign': 2,
		'no-global-assign': 2,
		'no-implicit-coercion': 2,
		'no-implied-eval': 0,
		'no-implicit-globals': 2,
		'no-import-assign': 2,
		'no-inner-declarations': 2,
		'no-invalid-regexp': 2,
		'no-invalid-this': 0,
		'no-irregular-whitespace': [
			2,
			{
				skipStrings: true
			}
		],
		'no-iterator': 2,
		'no-label-var': 2,
		'no-labels': 2,
		'no-lone-blocks': 2,
		'no-lonely-if': 2,
		'no-loop-func': 0,
		'no-loss-of-precision': 0,
		'no-magic-numbers': 0,
		'no-misleading-character-class': 2,
		'no-mixed-operators': 2,
		'no-mixed-spaces-and-tabs': 2,
		'no-multi-spaces': 2,
		'no-nested-ternary': 2,
		'no-new': 2,
		'no-new-func': 2,
		'no-new-object': 2,
		'no-new-symbol': 2,
		'no-new-wrappers': 2,
		'no-nonoctal-decimal-escape': 2,
		'no-obj-calls': 2,
		'no-octal': 2,
		'no-param-reassign': 2,
		'no-proto': 2,
		'no-prototype-builtins': 2,
		'no-redeclare': 0,
		'no-regex-spaces': 2,
		'no-return-assign': 2,
		'no-return-await': 0,
		'no-script-url': 2,
		'no-self-assign': 2,
		'no-self-compare': 2,
		'no-sequences': 2,
		'no-setter-return': 2,
		'no-shadow': 0,
		'no-shadow-restricted-names': 2,
		'no-sparse-arrays': 2,
		'no-template-curly-in-string': 2,
		'no-trailing-spaces': 2,
		'no-this-before-super': 2,
		'no-throw-literal': 0,
		'no-undef': 2,
		'no-undef-init': 2,
		'no-undefined': 2,
		'no-underscore-dangle': [2, { allowAfterThis: true, allowAfterSuper: true, allowAfterThisConstructor: true }],
		'no-unexpected-multiline': 2,
		'no-unmodified-loop-condition': 2,
		'no-unreachable': 2,
		'no-unsafe-finally': 2,
		'no-unsafe-negation': 2,
		'no-unsafe-optional-chaining': 2,
		'no-unused-expressions': 0,
		'no-unused-labels': 2,
		'no-unused-vars': 0,
		'no-use-before-define': 0,
		'no-useless-backreference': 2,
		'no-useless-call': 2,
		'no-useless-catch': 2,
		'no-useless-escape': 2,
		'no-useless-computed-key': 2,
		'no-useless-concat': 2,
		'no-useless-constructor': 0,
		'no-useless-rename': 2,
		'no-useless-return': 2,
		'no-var': 2,
		'no-void': [2, { allowAsStatement: true }],
		'no-whitespace-before-property': 2,
		'no-with': 2,
		'nonblock-statement-body-position': [2, 'below'],
		'object-curly-newline': [
			2,
			{
				multiline: true,
				minProperties: 3
			}
		],
		'object-curly-spacing': 0,
		'object-property-newline': [
			2,
			{
				allowAllPropertiesOnSameLine: true
			}
		],
		'object-shorthand': [2, 'always'],
		'one-var': [2, 'never'],
		'one-var-declaration-per-line': [2, 'initializations'],
		'operator-assignment': [2, 'always'],
		'operator-linebreak': [2, 'before'],
		'padded-blocks': [2, 'never'],
		'prefer-arrow-callback': 2,
		'prefer-const': 2,
		'prefer-exponentiation-operator': 2,
		'prefer-numeric-literals': 2,
		'prefer-object-spread': 2,
		'prefer-promise-reject-errors': 2,
		'prefer-regex-literals': 2,
		'prefer-spread': 2,
		'prefer-template': 2,
		'quote-props': [2, 'as-needed'],
		'quotes': 0,
		'radix': 2,
		'require-await': 0,
		'require-yield': 2,
		'require-atomic-updates': 2,
		'rest-spread-spacing': [2, 'never'],
		'semi': 0,
		'semi-spacing': [
			'error',
			{
				before: false,
				after: true
			}
		],
		'semi-style': [2, 'last'],
		'sort-keys': 2,
		'sort-vars': 2,
		'space-before-function-paren': 0,
		'space-in-parens': [2, 'never'],
		'space-before-blocks': 0,
		'space-infix-ops': 0,
		'space-unary-ops': [
			2,
			{
				words: true,
				nonwords: false
			}
		],
		'spaced-comment': [
			2,
			'always',
			{
				exceptions: ['-', '+', '!', '*', '?']
			}
		],
		'strict': 2,
		'switch-colon-spacing': [
			2,
			{
				after: true,
				before: true
			}
		],
		'symbol-description': 2,
		'template-curly-spacing': [2, 'never'],
		'template-tag-spacing': [2, 'never'],
		'use-isnan': 2,
		'valid-typeof': 2,
		'yield-star-spacing': [2, 'after'],
		'yoda': [2, 'never']
	}
};
