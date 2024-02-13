(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[2],{

/***/ "./node_modules/prism-react-renderer/dist/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/prism-react-renderer/dist/index.js ***!
  \*********************************************************/
/*! exports provided: Prism, default, defaultProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultProps", function() { return defaultProps; });
/* harmony import */ var _prism_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prism/index.js */ "./node_modules/prism-react-renderer/prism/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Prism", function() { return _prism_index_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _themes_duotoneDark__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../themes/duotoneDark */ "./node_modules/prism-react-renderer/themes/duotoneDark/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);





var defaultProps = {
  // $FlowFixMe
  Prism: _prism_index_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  theme: _themes_duotoneDark__WEBPACK_IMPORTED_MODULE_1__["default"]
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var newlineRe = /\r\n|\r|\n/; // Empty lines need to contain a single empty token, denoted with { empty: true }

var normalizeEmptyLines = function (line) {
  if (line.length === 0) {
    line.push({
      types: ["plain"],
      content: "\n",
      empty: true
    });
  } else if (line.length === 1 && line[0].content === "") {
    line[0].content = "\n";
    line[0].empty = true;
  }
};

var appendTypes = function (types, add) {
  var typesSize = types.length;

  if (typesSize > 0 && types[typesSize - 1] === add) {
    return types;
  }

  return types.concat(add);
}; // Takes an array of Prism's tokens and groups them by line, turning plain
// strings into tokens as well. Tokens can become recursive in some cases,
// which means that their types are concatenated. Plain-string tokens however
// are always of type "plain".
// This is not recursive to avoid exceeding the call-stack limit, since it's unclear
// how nested Prism's tokens can become


var normalizeTokens = function (tokens) {
  var typeArrStack = [[]];
  var tokenArrStack = [tokens];
  var tokenArrIndexStack = [0];
  var tokenArrSizeStack = [tokens.length];
  var i = 0;
  var stackIndex = 0;
  var currentLine = [];
  var acc = [currentLine];

  while (stackIndex > -1) {
    while ((i = tokenArrIndexStack[stackIndex]++) < tokenArrSizeStack[stackIndex]) {
      var content = void 0;
      var types = typeArrStack[stackIndex];
      var tokenArr = tokenArrStack[stackIndex];
      var token = tokenArr[i]; // Determine content and append type to types if necessary

      if (typeof token === "string") {
        types = stackIndex > 0 ? types : ["plain"];
        content = token;
      } else {
        types = appendTypes(types, token.type);

        if (token.alias) {
          types = appendTypes(types, token.alias);
        }

        content = token.content;
      } // If token.content is an array, increase the stack depth and repeat this while-loop


      if (typeof content !== "string") {
        stackIndex++;
        typeArrStack.push(types);
        tokenArrStack.push(content);
        tokenArrIndexStack.push(0);
        tokenArrSizeStack.push(content.length);
        continue;
      } // Split by newlines


      var splitByNewlines = content.split(newlineRe);
      var newlineCount = splitByNewlines.length;
      currentLine.push({
        types: types,
        content: splitByNewlines[0]
      }); // Create a new line for each string on a new line

      for (var i$1 = 1; i$1 < newlineCount; i$1++) {
        normalizeEmptyLines(currentLine);
        acc.push(currentLine = []);
        currentLine.push({
          types: types,
          content: splitByNewlines[i$1]
        });
      }
    } // Decreate the stack depth


    stackIndex--;
    typeArrStack.pop();
    tokenArrStack.pop();
    tokenArrIndexStack.pop();
    tokenArrSizeStack.pop();
  }

  normalizeEmptyLines(currentLine);
  return acc;
};

var themeToDict = function (theme, language) {
  var plain = theme.plain; // $FlowFixMe

  var base = Object.create(null);
  var themeDict = theme.styles.reduce(function (acc, themeEntry) {
    var languages = themeEntry.languages;
    var style = themeEntry.style;

    if (languages && !languages.includes(language)) {
      return acc;
    }

    themeEntry.types.forEach(function (type) {
      // $FlowFixMe
      var accStyle = _extends({}, acc[type], style);

      acc[type] = accStyle;
    });
    return acc;
  }, base); // $FlowFixMe

  themeDict.root = plain; // $FlowFixMe

  themeDict.plain = _extends({}, plain, {
    backgroundColor: null
  });
  return themeDict;
};

function objectWithoutProperties(obj, exclude) {
  var target = {};

  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k];

  return target;
}

var Highlight = /*@__PURE__*/function (Component) {
  function Highlight() {
    var this$1 = this;
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    Component.apply(this, args);

    _defineProperty(this, "getThemeDict", function (props) {
      if (this$1.themeDict !== undefined && props.theme === this$1.prevTheme && props.language === this$1.prevLanguage) {
        return this$1.themeDict;
      }

      this$1.prevTheme = props.theme;
      this$1.prevLanguage = props.language;
      var themeDict = props.theme ? themeToDict(props.theme, props.language) : undefined;
      return this$1.themeDict = themeDict;
    });

    _defineProperty(this, "getLineProps", function (ref) {
      var key = ref.key;
      var className = ref.className;
      var style = ref.style;
      var rest$1 = objectWithoutProperties(ref, ["key", "className", "style", "line"]);
      var rest = rest$1;

      var output = _extends({}, rest, {
        className: "token-line",
        style: undefined,
        key: undefined
      });

      var themeDict = this$1.getThemeDict(this$1.props);

      if (themeDict !== undefined) {
        output.style = themeDict.plain;
      }

      if (style !== undefined) {
        output.style = output.style !== undefined ? _extends({}, output.style, style) : style;
      }

      if (key !== undefined) {
        output.key = key;
      }

      if (className) {
        output.className += " " + className;
      }

      return output;
    });

    _defineProperty(this, "getStyleForToken", function (ref) {
      var types = ref.types;
      var empty = ref.empty;
      var typesSize = types.length;
      var themeDict = this$1.getThemeDict(this$1.props);

      if (themeDict === undefined) {
        return undefined;
      } else if (typesSize === 1 && types[0] === "plain") {
        return empty ? {
          display: "inline-block"
        } : undefined;
      } else if (typesSize === 1 && !empty) {
        return themeDict[types[0]];
      }

      var baseStyle = empty ? {
        display: "inline-block"
      } : {}; // $FlowFixMe

      var typeStyles = types.map(function (type) {
        return themeDict[type];
      });
      return Object.assign.apply(Object, [baseStyle].concat(typeStyles));
    });

    _defineProperty(this, "getTokenProps", function (ref) {
      var key = ref.key;
      var className = ref.className;
      var style = ref.style;
      var token = ref.token;
      var rest$1 = objectWithoutProperties(ref, ["key", "className", "style", "token"]);
      var rest = rest$1;

      var output = _extends({}, rest, {
        className: "token " + token.types.join(" "),
        children: token.content,
        style: this$1.getStyleForToken(token),
        key: undefined
      });

      if (style !== undefined) {
        output.style = output.style !== undefined ? _extends({}, output.style, style) : style;
      }

      if (key !== undefined) {
        output.key = key;
      }

      if (className) {
        output.className += " " + className;
      }

      return output;
    });

    _defineProperty(this, "tokenize", function (Prism, code, grammar, language) {
      var env = {
        code: code,
        grammar: grammar,
        language: language,
        tokens: []
      };
      Prism.hooks.run("before-tokenize", env);
      var tokens = env.tokens = Prism.tokenize(env.code, env.grammar, env.language);
      Prism.hooks.run("after-tokenize", env);
      return tokens;
    });
  }

  if (Component) Highlight.__proto__ = Component;
  Highlight.prototype = Object.create(Component && Component.prototype);
  Highlight.prototype.constructor = Highlight;

  Highlight.prototype.render = function render() {
    var ref = this.props;
    var Prism = ref.Prism;
    var language = ref.language;
    var code = ref.code;
    var children = ref.children;
    var themeDict = this.getThemeDict(this.props);
    var grammar = Prism.languages[language];
    var mixedTokens = grammar !== undefined ? this.tokenize(Prism, code, grammar, language) : [code];
    var tokens = normalizeTokens(mixedTokens);
    return children({
      tokens: tokens,
      className: "prism-code language-" + language,
      style: themeDict !== undefined ? themeDict.root : {},
      getLineProps: this.getLineProps,
      getTokenProps: this.getTokenProps
    });
  };

  return Highlight;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Highlight);



/***/ }),

/***/ "./node_modules/prism-react-renderer/prism/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/prism-react-renderer/prism/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
/**
 * prism-react-renderer:
 * This file has been modified to remove:
 * - globals and window dependency
 * - worker support
 * - highlightAll and other element dependent methods
 * - _.hooks helpers
 * - UMD/node-specific hacks
 * It has also been run through prettier
 */

 var Prism = (function () {

	// Private helper vars
	var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
	var uniqueId = 0;

	// The grammar object for plaintext
	var plainTextGrammar = {};


	var _ = {
		/**
		 * A namespace for utility methods.
		 *
		 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
		 * change or disappear at any time.
		 *
		 * @namespace
		 * @memberof Prism
		 */
		util: {
			encode: function encode(tokens) {
				if (tokens instanceof Token) {
					return new Token(tokens.type, encode(tokens.content), tokens.alias);
				} else if (Array.isArray(tokens)) {
					return tokens.map(encode);
				} else {
					return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
				}
			},

			/**
			 * Returns the name of the type of the given value.
			 *
			 * @param {any} o
			 * @returns {string}
			 * @example
			 * type(null)      === 'Null'
			 * type(undefined) === 'Undefined'
			 * type(123)       === 'Number'
			 * type('foo')     === 'String'
			 * type(true)      === 'Boolean'
			 * type([1, 2])    === 'Array'
			 * type({})        === 'Object'
			 * type(String)    === 'Function'
			 * type(/abc+/)    === 'RegExp'
			 */
			type: function (o) {
				return Object.prototype.toString.call(o).slice(8, -1);
			},

			/**
			 * Returns a unique number for the given object. Later calls will still return the same number.
			 *
			 * @param {Object} obj
			 * @returns {number}
			 */
			objId: function (obj) {
				if (!obj['__id']) {
					Object.defineProperty(obj, '__id', { value: ++uniqueId });
				}
				return obj['__id'];
			},

			/**
			 * Creates a deep clone of the given object.
			 *
			 * The main intended use of this function is to clone language definitions.
			 *
			 * @param {T} o
			 * @param {Record<number, any>} [visited]
			 * @returns {T}
			 * @template T
			 */
			clone: function deepClone(o, visited) {
				visited = visited || {};

				var clone; var id;
				switch (_.util.type(o)) {
					case 'Object':
						id = _.util.objId(o);
						if (visited[id]) {
							return visited[id];
						}
						clone = /** @type {Record<string, any>} */ ({});
						visited[id] = clone;

						for (var key in o) {
							if (o.hasOwnProperty(key)) {
								clone[key] = deepClone(o[key], visited);
							}
						}

						return /** @type {any} */ (clone);

					case 'Array':
						id = _.util.objId(o);
						if (visited[id]) {
							return visited[id];
						}
						clone = [];
						visited[id] = clone;

						(/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
							clone[i] = deepClone(v, visited);
						});

						return /** @type {any} */ (clone);

					default:
						return o;
				}
			},

			/**
			 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
			 *
			 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
			 *
			 * @param {Element} element
			 * @returns {string}
			 */
			getLanguage: function (element) {
				while (element) {
					var m = lang.exec(element.className);
					if (m) {
						return m[1].toLowerCase();
					}
					element = element.parentElement;
				}
				return 'none';
			},

			/**
			 * Sets the Prism `language-xxxx` class of the given element.
			 *
			 * @param {Element} element
			 * @param {string} language
			 * @returns {void}
			 */
			setLanguage: function (element, language) {
				// remove all `language-xxxx` classes
				// (this might leave behind a leading space)
				element.className = element.className.replace(RegExp(lang, 'gi'), '');

				// add the new `language-xxxx` class
				// (using `classList` will automatically clean up spaces for us)
				element.classList.add('language-' + language);
			},

			/**
			 * Returns whether a given class is active for `element`.
			 *
			 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
			 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
			 * given class is just the given class with a `no-` prefix.
			 *
			 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
			 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
			 * ancestors have the given class or the negated version of it, then the default activation will be returned.
			 *
			 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
			 * version of it, the class is considered active.
			 *
			 * @param {Element} element
			 * @param {string} className
			 * @param {boolean} [defaultActivation=false]
			 * @returns {boolean}
			 */
			isActive: function (element, className, defaultActivation) {
				var no = 'no-' + className;

				while (element) {
					var classList = element.classList;
					if (classList.contains(className)) {
						return true;
					}
					if (classList.contains(no)) {
						return false;
					}
					element = element.parentElement;
				}
				return !!defaultActivation;
			}
		},

		/**
		 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
		 *
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		languages: {
			/**
			 * The grammar for plain, unformatted text.
			 */
			plain: plainTextGrammar,
			plaintext: plainTextGrammar,
			text: plainTextGrammar,
			txt: plainTextGrammar,

			/**
			 * Creates a deep copy of the language with the given id and appends the given tokens.
			 *
			 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
			 * will be overwritten at its original position.
			 *
			 * ## Best practices
			 *
			 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
			 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
			 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
			 *
			 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
			 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
			 *
			 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
			 * @param {Grammar} redef The new tokens to append.
			 * @returns {Grammar} The new language created.
			 * @public
			 * @example
			 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
			 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
			 *     // at its original position
			 *     'comment': { ... },
			 *     // CSS doesn't have a 'color' token, so this token will be appended
			 *     'color': /\b(?:red|green|blue)\b/
			 * });
			 */
			extend: function (id, redef) {
				var lang = _.util.clone(_.languages[id]);

				for (var key in redef) {
					lang[key] = redef[key];
				}

				return lang;
			},

			/**
			 * Inserts tokens _before_ another token in a language definition or any other grammar.
			 *
			 * ## Usage
			 *
			 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
			 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
			 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
			 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
			 * this:
			 *
			 * ```js
			 * Prism.languages.markup.style = {
			 *     // token
			 * };
			 * ```
			 *
			 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
			 * before existing tokens. For the CSS example above, you would use it like this:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'cdata', {
			 *     'style': {
			 *         // token
			 *     }
			 * });
			 * ```
			 *
			 * ## Special cases
			 *
			 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
			 * will be ignored.
			 *
			 * This behavior can be used to insert tokens after `before`:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'comment', {
			 *     'comment': Prism.languages.markup.comment,
			 *     // tokens after 'comment'
			 * });
			 * ```
			 *
			 * ## Limitations
			 *
			 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
			 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
			 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
			 * deleting properties which is necessary to insert at arbitrary positions.
			 *
			 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
			 * Instead, it will create a new object and replace all references to the target object with the new one. This
			 * can be done without temporarily deleting properties, so the iteration order is well-defined.
			 *
			 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
			 * you hold the target object in a variable, then the value of the variable will not change.
			 *
			 * ```js
			 * var oldMarkup = Prism.languages.markup;
			 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
			 *
			 * assert(oldMarkup !== Prism.languages.markup);
			 * assert(newMarkup === Prism.languages.markup);
			 * ```
			 *
			 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
			 * object to be modified.
			 * @param {string} before The key to insert before.
			 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
			 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
			 * object to be modified.
			 *
			 * Defaults to `Prism.languages`.
			 * @returns {Grammar} The new grammar object.
			 * @public
			 */
			insertBefore: function (inside, before, insert, root) {
				root = root || /** @type {any} */ (_.languages);
				var grammar = root[inside];
				/** @type {Grammar} */
				var ret = {};

				for (var token in grammar) {
					if (grammar.hasOwnProperty(token)) {

						if (token == before) {
							for (var newToken in insert) {
								if (insert.hasOwnProperty(newToken)) {
									ret[newToken] = insert[newToken];
								}
							}
						}

						// Do not insert token which also occur in insert. See #1525
						if (!insert.hasOwnProperty(token)) {
							ret[token] = grammar[token];
						}
					}
				}

				var old = root[inside];
				root[inside] = ret;

				// Update references in other language definitions
				_.languages.DFS(_.languages, function (key, value) {
					if (value === old && key != inside) {
						this[key] = ret;
					}
				});

				return ret;
			},

			// Traverse a language definition with Depth First Search
			DFS: function DFS(o, callback, type, visited) {
				visited = visited || {};

				var objId = _.util.objId;

				for (var i in o) {
					if (o.hasOwnProperty(i)) {
						callback.call(o, i, o[i], type || i);

						var property = o[i];
						var propertyType = _.util.type(property);

						if (propertyType === 'Object' && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, null, visited);
						} else if (propertyType === 'Array' && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, i, visited);
						}
					}
				}
			}
		},

		plugins: {},


		/**
		 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
		 * and the language definitions to use, and returns a string with the HTML produced.
		 *
		 * The following hooks will be run:
		 * 1. `before-tokenize`
		 * 2. `after-tokenize`
		 * 3. `wrap`: On each {@link Token}.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @param {string} language The name of the language definition passed to `grammar`.
		 * @returns {string} The highlighted HTML.
		 * @memberof Prism
		 * @public
		 * @example
		 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
		 */
		highlight: function (text, grammar, language) {
			var env = {
				code: text,
				grammar: grammar,
				language: language
			};
			_.hooks.run('before-tokenize', env);
			env.tokens = _.tokenize(env.code, env.grammar);
			_.hooks.run('after-tokenize', env);
			return Token.stringify(_.util.encode(env.tokens), env.language);
		},

		/**
		 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
		 * and the language definitions to use, and returns an array with the tokenized code.
		 *
		 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
		 *
		 * This method could be useful in other contexts as well, as a very crude parser.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @returns {TokenStream} An array of strings and tokens, a token stream.
		 * @memberof Prism
		 * @public
		 * @example
		 * let code = `var foo = 0;`;
		 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
		 * tokens.forEach(token => {
		 *     if (token instanceof Prism.Token && token.type === 'number') {
		 *         console.log(`Found numeric literal: ${token.content}`);
		 *     }
		 * });
		 */
		tokenize: function (text, grammar) {
			var rest = grammar.rest;
			if (rest) {
				for (var token in rest) {
					grammar[token] = rest[token];
				}

				delete grammar.rest;
			}

			var tokenList = new LinkedList();
			addAfter(tokenList, tokenList.head, text);

			matchGrammar(text, tokenList, grammar, tokenList.head, 0);

			return toArray(tokenList);
		},

		/**
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		hooks: {
			all: {},

			/**
			 * Adds the given callback to the list of callbacks for the given hook.
			 *
			 * The callback will be invoked when the hook it is registered for is run.
			 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
			 *
			 * One callback function can be registered to multiple hooks and the same hook multiple times.
			 *
			 * @param {string} name The name of the hook.
			 * @param {HookCallback} callback The callback function which is given environment variables.
			 * @public
			 */
			add: function (name, callback) {
				var hooks = _.hooks.all;

				hooks[name] = hooks[name] || [];

				hooks[name].push(callback);
			},

			/**
			 * Runs a hook invoking all registered callbacks with the given environment variables.
			 *
			 * Callbacks will be invoked synchronously and in the order in which they were registered.
			 *
			 * @param {string} name The name of the hook.
			 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
			 * @public
			 */
			run: function (name, env) {
				var callbacks = _.hooks.all[name];

				if (!callbacks || !callbacks.length) {
					return;
				}

				for (var i = 0, callback; (callback = callbacks[i++]);) {
					callback(env);
				}
			}
		},

		Token: Token
	};


	// Typescript note:
	// The following can be used to import the Token type in JSDoc:
	//
	//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

	/**
	 * Creates a new token.
	 *
	 * @param {string} type See {@link Token#type type}
	 * @param {string | TokenStream} content See {@link Token#content content}
	 * @param {string|string[]} [alias] The alias(es) of the token.
	 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
	 * @class
	 * @global
	 * @public
	 */
	function Token(type, content, alias, matchedStr) {
		/**
		 * The type of the token.
		 *
		 * This is usually the key of a pattern in a {@link Grammar}.
		 *
		 * @type {string}
		 * @see GrammarToken
		 * @public
		 */
		this.type = type;
		/**
		 * The strings or tokens contained by this token.
		 *
		 * This will be a token stream if the pattern matched also defined an `inside` grammar.
		 *
		 * @type {string | TokenStream}
		 * @public
		 */
		this.content = content;
		/**
		 * The alias(es) of the token.
		 *
		 * @type {string|string[]}
		 * @see GrammarToken
		 * @public
		 */
		this.alias = alias;
		// Copy of the full string this token was created from
		this.length = (matchedStr || '').length | 0;
	}

	/**
	 * A token stream is an array of strings and {@link Token Token} objects.
	 *
	 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
	 * them.
	 *
	 * 1. No adjacent strings.
	 * 2. No empty strings.
	 *
	 *    The only exception here is the token stream that only contains the empty string and nothing else.
	 *
	 * @typedef {Array<string | Token>} TokenStream
	 * @global
	 * @public
	 */

	/**
	 * Converts the given token or token stream to an HTML representation.
	 *
	 * The following hooks will be run:
	 * 1. `wrap`: On each {@link Token}.
	 *
	 * @param {string | Token | TokenStream} o The token or token stream to be converted.
	 * @param {string} language The name of current language.
	 * @returns {string} The HTML representation of the token or token stream.
	 * @memberof Token
	 * @static
	 */
	Token.stringify = function stringify(o, language) {
		if (typeof o == 'string') {
			return o;
		}
		if (Array.isArray(o)) {
			var s = '';
			o.forEach(function (e) {
				s += stringify(e, language);
			});
			return s;
		}

		var env = {
			type: o.type,
			content: stringify(o.content, language),
			tag: 'span',
			classes: ['token', o.type],
			attributes: {},
			language: language
		};

		var aliases = o.alias;
		if (aliases) {
			if (Array.isArray(aliases)) {
				Array.prototype.push.apply(env.classes, aliases);
			} else {
				env.classes.push(aliases);
			}
		}

		_.hooks.run('wrap', env);

		var attributes = '';
		for (var name in env.attributes) {
			attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
		}

		return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
	};

	/**
	 * @param {RegExp} pattern
	 * @param {number} pos
	 * @param {string} text
	 * @param {boolean} lookbehind
	 * @returns {RegExpExecArray | null}
	 */
	function matchPattern(pattern, pos, text, lookbehind) {
		pattern.lastIndex = pos;
		var match = pattern.exec(text);
		if (match && lookbehind && match[1]) {
			// change the match to remove the text matched by the Prism lookbehind group
			var lookbehindLength = match[1].length;
			match.index += lookbehindLength;
			match[0] = match[0].slice(lookbehindLength);
		}
		return match;
	}

	/**
	 * @param {string} text
	 * @param {LinkedList<string | Token>} tokenList
	 * @param {any} grammar
	 * @param {LinkedListNode<string | Token>} startNode
	 * @param {number} startPos
	 * @param {RematchOptions} [rematch]
	 * @returns {void}
	 * @private
	 *
	 * @typedef RematchOptions
	 * @property {string} cause
	 * @property {number} reach
	 */
	function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
		for (var token in grammar) {
			if (!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			var patterns = grammar[token];
			patterns = Array.isArray(patterns) ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				if (rematch && rematch.cause == token + ',' + j) {
					return;
				}

				var patternObj = patterns[j];
				var inside = patternObj.inside;
				var lookbehind = !!patternObj.lookbehind;
				var greedy = !!patternObj.greedy;
				var alias = patternObj.alias;

				if (greedy && !patternObj.pattern.global) {
					// Without the global flag, lastIndex won't work
					var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
					patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
				}

				/** @type {RegExp} */
				var pattern = patternObj.pattern || patternObj;

				for ( // iterate the token list and keep track of the current token/string position
					var currentNode = startNode.next, pos = startPos;
					currentNode !== tokenList.tail;
					pos += currentNode.value.length, currentNode = currentNode.next
				) {

					if (rematch && pos >= rematch.reach) {
						break;
					}

					var str = currentNode.value;

					if (tokenList.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						return;
					}

					if (str instanceof Token) {
						continue;
					}

					var removeCount = 1; // this is the to parameter of removeBetween
					var match;

					if (greedy) {
						match = matchPattern(pattern, pos, text, lookbehind);
						if (!match || match.index >= text.length) {
							break;
						}

						var from = match.index;
						var to = match.index + match[0].length;
						var p = pos;

						// find the node that contains the match
						p += currentNode.value.length;
						while (from >= p) {
							currentNode = currentNode.next;
							p += currentNode.value.length;
						}
						// adjust pos (and p)
						p -= currentNode.value.length;
						pos = p;

						// the current node is a Token, then the match starts inside another Token, which is invalid
						if (currentNode.value instanceof Token) {
							continue;
						}

						// find the last node which is affected by this match
						for (
							var k = currentNode;
							k !== tokenList.tail && (p < to || typeof k.value === 'string');
							k = k.next
						) {
							removeCount++;
							p += k.value.length;
						}
						removeCount--;

						// replace with the new match
						str = text.slice(pos, p);
						match.index -= pos;
					} else {
						match = matchPattern(pattern, 0, str, lookbehind);
						if (!match) {
							continue;
						}
					}

					// eslint-disable-next-line no-redeclare
					var from = match.index;
					var matchStr = match[0];
					var before = str.slice(0, from);
					var after = str.slice(from + matchStr.length);

					var reach = pos + str.length;
					if (rematch && reach > rematch.reach) {
						rematch.reach = reach;
					}

					var removeFrom = currentNode.prev;

					if (before) {
						removeFrom = addAfter(tokenList, removeFrom, before);
						pos += before.length;
					}

					removeRange(tokenList, removeFrom, removeCount);

					var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
					currentNode = addAfter(tokenList, removeFrom, wrapped);

					if (after) {
						addAfter(tokenList, currentNode, after);
					}

					if (removeCount > 1) {
						// at least one Token object was removed, so we have to do some rematching
						// this can only happen if the current pattern is greedy

						/** @type {RematchOptions} */
						var nestedRematch = {
							cause: token + ',' + j,
							reach: reach
						};
						matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

						// the reach might have been extended because of the rematching
						if (rematch && nestedRematch.reach > rematch.reach) {
							rematch.reach = nestedRematch.reach;
						}
					}
				}
			}
		}
	}

	/**
	 * @typedef LinkedListNode
	 * @property {T} value
	 * @property {LinkedListNode<T> | null} prev The previous node.
	 * @property {LinkedListNode<T> | null} next The next node.
	 * @template T
	 * @private
	 */

	/**
	 * @template T
	 * @private
	 */
	function LinkedList() {
		/** @type {LinkedListNode<T>} */
		var head = { value: null, prev: null, next: null };
		/** @type {LinkedListNode<T>} */
		var tail = { value: null, prev: head, next: null };
		head.next = tail;

		/** @type {LinkedListNode<T>} */
		this.head = head;
		/** @type {LinkedListNode<T>} */
		this.tail = tail;
		this.length = 0;
	}

	/**
	 * Adds a new node with the given value to the list.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {T} value
	 * @returns {LinkedListNode<T>} The added node.
	 * @template T
	 */
	function addAfter(list, node, value) {
		// assumes that node != list.tail && values.length >= 0
		var next = node.next;

		var newNode = { value: value, prev: node, next: next };
		node.next = newNode;
		next.prev = newNode;
		list.length++;

		return newNode;
	}
	/**
	 * Removes `count` nodes after the given node. The given node will not be removed.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {number} count
	 * @template T
	 */
	function removeRange(list, node, count) {
		var next = node.next;
		for (var i = 0; i < count && next !== list.tail; i++) {
			next = next.next;
		}
		node.next = next;
		next.prev = node;
		list.length -= i;
	}
	/**
	 * @param {LinkedList<T>} list
	 * @returns {T[]}
	 * @template T
	 */
	function toArray(list) {
		var array = [];
		var node = list.head.next;
		while (node !== list.tail) {
			array.push(node.value);
			node = node.next;
		}
		return array;
	}

	return _;

}());

var prism = Prism;
Prism.default = Prism;

/* This content is auto-generated to include some prismjs language components: */

/* "prismjs/components/prism-markup" */

prism.languages.markup = {
  'comment': {
    pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
    greedy: true
  },
  'prolog': {
    pattern: /<\?[\s\S]+?\?>/,
    greedy: true
  },
  'doctype': {
    // https://www.w3.org/TR/xml/#NT-doctypedecl
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: true,
    inside: {
      'internal-subset': {
        pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
        lookbehind: true,
        greedy: true,
        inside: null // see below

      },
      'string': {
        pattern: /"[^"]*"|'[^']*'/,
        greedy: true
      },
      'punctuation': /^<!|>$|[[\]]/,
      'doctype-tag': /^DOCTYPE/i,
      'name': /[^\s<>'"]+/
    }
  },
  'cdata': {
    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
    greedy: true
  },
  'tag': {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: true,
    inside: {
      'tag': {
        pattern: /^<\/?[^\s>\/]+/,
        inside: {
          'punctuation': /^<\/?/,
          'namespace': /^[^\s>\/:]+:/
        }
      },
      'special-attr': [],
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          'punctuation': [{
            pattern: /^=/,
            alias: 'attr-equals'
          }, /"|'/]
        }
      },
      'punctuation': /\/?>/,
      'attr-name': {
        pattern: /[^\s>\/]+/,
        inside: {
          'namespace': /^[^\s>\/:]+:/
        }
      }
    }
  },
  'entity': [{
    pattern: /&[\da-z]{1,8};/i,
    alias: 'named-entity'
  }, /&#x?[\da-f]{1,8};/i]
};
prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = prism.languages.markup['entity'];
prism.languages.markup['doctype'].inside['internal-subset'].inside = prism.languages.markup; // Plugin to make entity title show the real entity, idea by Roman Komarov

prism.hooks.add('wrap', function (env) {
  if (env.type === 'entity') {
    env.attributes['title'] = env.content.replace(/&amp;/, '&');
  }
});
Object.defineProperty(prism.languages.markup.tag, 'addInlined', {
  /**
   * Adds an inlined language to markup.
   *
   * An example of an inlined language is CSS with `<style>` tags.
   *
   * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addInlined('style', 'css');
   */
  value: function addInlined(tagName, lang) {
    var includedCdataInside = {};
    includedCdataInside['language-' + lang] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: true,
      inside: prism.languages[lang]
    };
    includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;
    var inside = {
      'included-cdata': {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: includedCdataInside
      }
    };
    inside['language-' + lang] = {
      pattern: /[\s\S]+/,
      inside: prism.languages[lang]
    };
    var def = {};
    def[tagName] = {
      pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () {
        return tagName;
      }), 'i'),
      lookbehind: true,
      greedy: true,
      inside: inside
    };
    prism.languages.insertBefore('markup', 'cdata', def);
  }
});
Object.defineProperty(prism.languages.markup.tag, 'addAttribute', {
  /**
   * Adds an pattern to highlight languages embedded in HTML attributes.
   *
   * An example of an inlined language is CSS with `style` attributes.
   *
   * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addAttribute('style', 'css');
   */
  value: function (attrName, lang) {
    prism.languages.markup.tag.inside['special-attr'].push({
      pattern: RegExp(/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, 'i'),
      lookbehind: true,
      inside: {
        'attr-name': /^[^\s=]+/,
        'attr-value': {
          pattern: /=[\s\S]+/,
          inside: {
            'value': {
              pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
              lookbehind: true,
              alias: [lang, 'language-' + lang],
              inside: prism.languages[lang]
            },
            'punctuation': [{
              pattern: /^=/,
              alias: 'attr-equals'
            }, /"|'/]
          }
        }
      }
    });
  }
});
prism.languages.html = prism.languages.markup;
prism.languages.mathml = prism.languages.markup;
prism.languages.svg = prism.languages.markup;
prism.languages.xml = prism.languages.extend('markup', {});
prism.languages.ssml = prism.languages.xml;
prism.languages.atom = prism.languages.xml;
prism.languages.rss = prism.languages.xml;
/* "prismjs/components/prism-bash" */

(function (Prism) {
  // $ set | grep '^[A-Z][^[:space:]]*=' | cut -d= -f1 | tr '\n' '|'
  // + LC_ALL, RANDOM, REPLY, SECONDS.
  // + make sure PS1..4 are here as they are not always set,
  // - some useless things.
  var envVars = '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b';
  var commandAfterHeredoc = {
    pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
    lookbehind: true,
    alias: 'punctuation',
    // this looks reasonably well in all themes
    inside: null // see below

  };
  var insideString = {
    'bash': commandAfterHeredoc,
    'environment': {
      pattern: RegExp('\\$' + envVars),
      alias: 'constant'
    },
    'variable': [// [0]: Arithmetic Environment
    {
      pattern: /\$?\(\([\s\S]+?\)\)/,
      greedy: true,
      inside: {
        // If there is a $ sign at the beginning highlight $(( and )) as variable
        'variable': [{
          pattern: /(^\$\(\([\s\S]+)\)\)/,
          lookbehind: true
        }, /^\$\(\(/],
        'number': /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
        // Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
        'operator': /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
        // If there is no $ sign at the beginning highlight (( and )) as punctuation
        'punctuation': /\(\(?|\)\)?|,|;/
      }
    }, // [1]: Command Substitution
    {
      pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
      greedy: true,
      inside: {
        'variable': /^\$\(|^`|\)$|`$/
      }
    }, // [2]: Brace expansion
    {
      pattern: /\$\{[^}]+\}/,
      greedy: true,
      inside: {
        'operator': /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
        'punctuation': /[\[\]]/,
        'environment': {
          pattern: RegExp('(\\{)' + envVars),
          lookbehind: true,
          alias: 'constant'
        }
      }
    }, /\$(?:\w+|[#?*!@$])/],
    // Escape sequences from echo and printf's manuals, and escaped quotes.
    'entity': /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/
  };
  Prism.languages.bash = {
    'shebang': {
      pattern: /^#!\s*\/.*/,
      alias: 'important'
    },
    'comment': {
      pattern: /(^|[^"{\\$])#.*/,
      lookbehind: true
    },
    'function-name': [// a) function foo {
    // b) foo() {
    // c) function foo() {
    // but not “foo {”
    {
      // a) and c)
      pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
      lookbehind: true,
      alias: 'function'
    }, {
      // b)
      pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/,
      alias: 'function'
    }],
    // Highlight variable names as variables in for and select beginnings.
    'for-or-select': {
      pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
      alias: 'variable',
      lookbehind: true
    },
    // Highlight variable names as variables in the left-hand part
    // of assignments (“=” and “+=”).
    'assign-left': {
      pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
      inside: {
        'environment': {
          pattern: RegExp('(^|[\\s;|&]|[<>]\\()' + envVars),
          lookbehind: true,
          alias: 'constant'
        }
      },
      alias: 'variable',
      lookbehind: true
    },
    'string': [// Support for Here-documents https://en.wikipedia.org/wiki/Here_document
    {
      pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
      lookbehind: true,
      greedy: true,
      inside: insideString
    }, // Here-document with quotes around the tag
    // → No expansion (so no “inside”).
    {
      pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
      lookbehind: true,
      greedy: true,
      inside: {
        'bash': commandAfterHeredoc
      }
    }, // “Normal” string
    {
      // https://www.gnu.org/software/bash/manual/html_node/Double-Quotes.html
      pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
      lookbehind: true,
      greedy: true,
      inside: insideString
    }, {
      // https://www.gnu.org/software/bash/manual/html_node/Single-Quotes.html
      pattern: /(^|[^$\\])'[^']*'/,
      lookbehind: true,
      greedy: true
    }, {
      // https://www.gnu.org/software/bash/manual/html_node/ANSI_002dC-Quoting.html
      pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
      greedy: true,
      inside: {
        'entity': insideString.entity
      }
    }],
    'environment': {
      pattern: RegExp('\\$?' + envVars),
      alias: 'constant'
    },
    'variable': insideString.variable,
    'function': {
      pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    'keyword': {
      pattern: /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    // https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
    'builtin': {
      pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
      lookbehind: true,
      // Alias added to make those easier to distinguish from strings.
      alias: 'class-name'
    },
    'boolean': {
      pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    'file-descriptor': {
      pattern: /\B&\d\b/,
      alias: 'important'
    },
    'operator': {
      // Lots of redirections here, but not just that.
      pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
      inside: {
        'file-descriptor': {
          pattern: /^\d/,
          alias: 'important'
        }
      }
    },
    'punctuation': /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
    'number': {
      pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
      lookbehind: true
    }
  };
  commandAfterHeredoc.inside = Prism.languages.bash;
  /* Patterns in command substitution. */

  var toBeCopied = ['comment', 'function-name', 'for-or-select', 'assign-left', 'string', 'environment', 'function', 'keyword', 'builtin', 'boolean', 'file-descriptor', 'operator', 'punctuation', 'number'];
  var inside = insideString.variable[1].inside;

  for (var i = 0; i < toBeCopied.length; i++) {
    inside[toBeCopied[i]] = Prism.languages.bash[toBeCopied[i]];
  }

  Prism.languages.shell = Prism.languages.bash;
})(prism);
/* "prismjs/components/prism-clike" */


prism.languages.clike = {
  'comment': [{
    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
    lookbehind: true,
    greedy: true
  }, {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: true,
    greedy: true
  }],
  'string': {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  'class-name': {
    pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: true,
    inside: {
      'punctuation': /[.\\]/
    }
  },
  'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
  'boolean': /\b(?:false|true)\b/,
  'function': /\b\w+(?=\()/,
  'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  'punctuation': /[{}[\];(),.:]/
};
/* "prismjs/components/prism-c" */

prism.languages.c = prism.languages.extend('clike', {
  'comment': {
    pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: true
  },
  'string': {
    // https://en.cppreference.com/w/c/language/string_literal
    pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
    greedy: true
  },
  'class-name': {
    pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
    lookbehind: true
  },
  'keyword': /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
  'function': /\b[a-z_]\w*(?=\s*\()/i,
  'number': /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
  'operator': />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/
});
prism.languages.insertBefore('c', 'string', {
  'char': {
    // https://en.cppreference.com/w/c/language/character_constant
    pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/,
    greedy: true
  }
});
prism.languages.insertBefore('c', 'string', {
  'macro': {
    // allow for multiline macro definitions
    // spaces after the # character compile fine with gcc
    pattern: /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
    lookbehind: true,
    greedy: true,
    alias: 'property',
    inside: {
      'string': [{
        // highlight the path of the include statement as a string
        pattern: /^(#\s*include\s*)<[^>]+>/,
        lookbehind: true
      }, prism.languages.c['string']],
      'char': prism.languages.c['char'],
      'comment': prism.languages.c['comment'],
      'macro-name': [{
        pattern: /(^#\s*define\s+)\w+\b(?!\()/i,
        lookbehind: true
      }, {
        pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
        lookbehind: true,
        alias: 'function'
      }],
      // highlight macro directives as keywords
      'directive': {
        pattern: /^(#\s*)[a-z]+/,
        lookbehind: true,
        alias: 'keyword'
      },
      'directive-hash': /^#/,
      'punctuation': /##|\\(?=[\r\n])/,
      'expression': {
        pattern: /\S[\s\S]*/,
        inside: prism.languages.c
      }
    }
  }
});
prism.languages.insertBefore('c', 'function', {
  // highlight predefined macros as constants
  'constant': /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/
});
delete prism.languages.c['boolean'];
/* "prismjs/components/prism-cpp" */

(function (Prism) {
  var keyword = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/;
  var modName = /\b(?!<keyword>)\w+(?:\s*\.\s*\w+)*\b/.source.replace(/<keyword>/g, function () {
    return keyword.source;
  });
  Prism.languages.cpp = Prism.languages.extend('c', {
    'class-name': [{
      pattern: RegExp(/(\b(?:class|concept|enum|struct|typename)\s+)(?!<keyword>)\w+/.source.replace(/<keyword>/g, function () {
        return keyword.source;
      })),
      lookbehind: true
    }, // This is intended to capture the class name of method implementations like:
    //   void foo::bar() const {}
    // However! The `foo` in the above example could also be a namespace, so we only capture the class name if
    // it starts with an uppercase letter. This approximation should give decent results.
    /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/, // This will capture the class name before destructors like:
    //   Foo::~Foo() {}
    /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i, // This also intends to capture the class name of method implementations but here the class has template
    // parameters, so it can't be a namespace (until C++ adds generic namespaces).
    /\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/],
    'keyword': keyword,
    'number': {
      pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
      greedy: true
    },
    'operator': />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
    'boolean': /\b(?:false|true)\b/
  });
  Prism.languages.insertBefore('cpp', 'string', {
    'module': {
      // https://en.cppreference.com/w/cpp/language/modules
      pattern: RegExp(/(\b(?:import|module)\s+)/.source + '(?:' + // header-name
      /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|<[^<>\r\n]*>/.source + '|' + // module name or partition or both
      /<mod-name>(?:\s*:\s*<mod-name>)?|:\s*<mod-name>/.source.replace(/<mod-name>/g, function () {
        return modName;
      }) + ')'),
      lookbehind: true,
      greedy: true,
      inside: {
        'string': /^[<"][\s\S]+/,
        'operator': /:/,
        'punctuation': /\./
      }
    },
    'raw-string': {
      pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
      alias: 'string',
      greedy: true
    }
  });
  Prism.languages.insertBefore('cpp', 'keyword', {
    'generic-function': {
      pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
      inside: {
        'function': /^\w+/,
        'generic': {
          pattern: /<[\s\S]+/,
          alias: 'class-name',
          inside: Prism.languages.cpp
        }
      }
    }
  });
  Prism.languages.insertBefore('cpp', 'operator', {
    'double-colon': {
      pattern: /::/,
      alias: 'punctuation'
    }
  });
  Prism.languages.insertBefore('cpp', 'class-name', {
    // the base clause is an optional list of parent classes
    // https://en.cppreference.com/w/cpp/language/class
    'base-clause': {
      pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
      lookbehind: true,
      greedy: true,
      inside: Prism.languages.extend('cpp', {})
    }
  });
  Prism.languages.insertBefore('inside', 'double-colon', {
    // All untokenized words that are not namespaces should be class names
    'class-name': /\b[a-z_]\w*\b(?!\s*::)/i
  }, Prism.languages.cpp['base-clause']);
})(prism);
/* "prismjs/components/prism-css" */


(function (Prism) {
  var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
  Prism.languages.css = {
    'comment': /\/\*[\s\S]*?\*\//,
    'atrule': {
      pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
      inside: {
        'rule': /^@[\w-]+/,
        'selector-function-argument': {
          pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: true,
          alias: 'selector'
        },
        'keyword': {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: true
        } // See rest below

      }
    },
    'url': {
      // https://drafts.csswg.org/css-values-3/#urls
      pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
      greedy: true,
      inside: {
        'function': /^url/i,
        'punctuation': /^\(|\)$/,
        'string': {
          pattern: RegExp('^' + string.source + '$'),
          alias: 'url'
        }
      }
    },
    'selector': {
      pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
      lookbehind: true
    },
    'string': {
      pattern: string,
      greedy: true
    },
    'property': {
      pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
      lookbehind: true
    },
    'important': /!important\b/i,
    'function': {
      pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
      lookbehind: true
    },
    'punctuation': /[(){};:,]/
  };
  Prism.languages.css['atrule'].inside.rest = Prism.languages.css;
  var markup = Prism.languages.markup;

  if (markup) {
    markup.tag.addInlined('style', 'css');
    markup.tag.addAttribute('style', 'css');
  }
})(prism);
/* "prismjs/components/prism-css-extras" */


(function (Prism) {
  var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  var selectorInside;
  Prism.languages.css.selector = {
    pattern: Prism.languages.css.selector.pattern,
    lookbehind: true,
    inside: selectorInside = {
      'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
      'pseudo-class': /:[-\w]+/,
      'class': /\.[-\w]+/,
      'id': /#[-\w]+/,
      'attribute': {
        pattern: RegExp('\\[(?:[^[\\]"\']|' + string.source + ')*\\]'),
        greedy: true,
        inside: {
          'punctuation': /^\[|\]$/,
          'case-sensitivity': {
            pattern: /(\s)[si]$/i,
            lookbehind: true,
            alias: 'keyword'
          },
          'namespace': {
            pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/,
            lookbehind: true,
            inside: {
              'punctuation': /\|$/
            }
          },
          'attr-name': {
            pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/,
            lookbehind: true
          },
          'attr-value': [string, {
            pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/,
            lookbehind: true
          }],
          'operator': /[|~*^$]?=/
        }
      },
      'n-th': [{
        pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
        lookbehind: true,
        inside: {
          'number': /[\dn]+/,
          'operator': /[+-]/
        }
      }, {
        pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i,
        lookbehind: true
      }],
      'combinator': />|\+|~|\|\|/,
      // the `tag` token has been existed and removed.
      // because we can't find a perfect tokenize to match it.
      // if you want to add it, please read https://github.com/PrismJS/prism/pull/2373 first.
      'punctuation': /[(),]/
    }
  };
  Prism.languages.css['atrule'].inside['selector-function-argument'].inside = selectorInside;
  Prism.languages.insertBefore('css', 'property', {
    'variable': {
      pattern: /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i,
      lookbehind: true
    }
  });
  var unit = {
    pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/,
    lookbehind: true
  }; // 123 -123 .123 -.123 12.3 -12.3

  var number = {
    pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/,
    lookbehind: true
  };
  Prism.languages.insertBefore('css', 'function', {
    'operator': {
      pattern: /(\s)[+\-*\/](?=\s)/,
      lookbehind: true
    },
    // CAREFUL!
    // Previewers and Inline color use hexcode and color.
    'hexcode': {
      pattern: /\B#[\da-f]{3,8}\b/i,
      alias: 'color'
    },
    'color': [{
      pattern: /(^|[^\w-])(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)(?![\w-])/i,
      lookbehind: true
    }, {
      pattern: /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
      inside: {
        'unit': unit,
        'number': number,
        'function': /[\w-]+(?=\()/,
        'punctuation': /[(),]/
      }
    }],
    // it's important that there is no boundary assertion after the hex digits
    'entity': /\\[\da-f]{1,8}/i,
    'unit': unit,
    'number': number
  });
})(prism);
/* "prismjs/components/prism-javascript" */


prism.languages.javascript = prism.languages.extend('clike', {
  'class-name': [prism.languages.clike['class-name'], {
    pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
    lookbehind: true
  }],
  'keyword': [{
    pattern: /((?:^|\})\s*)catch\b/,
    lookbehind: true
  }, {
    pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
    lookbehind: true
  }],
  // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
  'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  'number': {
    pattern: RegExp(/(^|[^\w$])/.source + '(?:' + ( // constant
    /NaN|Infinity/.source + '|' + // binary integer
    /0[bB][01]+(?:_[01]+)*n?/.source + '|' + // octal integer
    /0[oO][0-7]+(?:_[0-7]+)*n?/.source + '|' + // hexadecimal integer
    /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + '|' + // decimal bigint
    /\d+(?:_\d+)*n/.source + '|' + // decimal number (integer or float) but no bigint
    /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ')' + /(?![\w$])/.source),
    lookbehind: true
  },
  'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});
prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
prism.languages.insertBefore('javascript', 'keyword', {
  'regex': {
    // eslint-disable-next-line regexp/no-dupe-characters-character-class
    pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
    lookbehind: true,
    greedy: true,
    inside: {
      'regex-source': {
        pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
        lookbehind: true,
        alias: 'language-regex',
        inside: prism.languages.regex
      },
      'regex-delimiter': /^\/|\/$/,
      'regex-flags': /^[a-z]+$/
    }
  },
  // This must be declared before keyword because we use "function" inside the look-forward
  'function-variable': {
    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
    alias: 'function'
  },
  'parameter': [{
    pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
    lookbehind: true,
    inside: prism.languages.javascript
  }, {
    pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
    lookbehind: true,
    inside: prism.languages.javascript
  }, {
    pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
    lookbehind: true,
    inside: prism.languages.javascript
  }, {
    pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
    lookbehind: true,
    inside: prism.languages.javascript
  }],
  'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});
prism.languages.insertBefore('javascript', 'string', {
  'hashbang': {
    pattern: /^#!.*/,
    greedy: true,
    alias: 'comment'
  },
  'template-string': {
    pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
    greedy: true,
    inside: {
      'template-punctuation': {
        pattern: /^`|`$/,
        alias: 'string'
      },
      'interpolation': {
        pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
        lookbehind: true,
        inside: {
          'interpolation-punctuation': {
            pattern: /^\$\{|\}$/,
            alias: 'punctuation'
          },
          rest: prism.languages.javascript
        }
      },
      'string': /[\s\S]+/
    }
  },
  'string-property': {
    pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
    lookbehind: true,
    greedy: true,
    alias: 'property'
  }
});
prism.languages.insertBefore('javascript', 'operator', {
  'literal-property': {
    pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
    lookbehind: true,
    alias: 'property'
  }
});

if (prism.languages.markup) {
  prism.languages.markup.tag.addInlined('script', 'javascript'); // add attribute support for all DOM events.
  // https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events

  prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, 'javascript');
}

prism.languages.js = prism.languages.javascript;
/* "prismjs/components/prism-coffeescript" */

(function (Prism) {
  // Ignore comments starting with { to privilege string interpolation highlighting
  var comment = /#(?!\{).+/;
  var interpolation = {
    pattern: /#\{[^}]+\}/,
    alias: 'variable'
  };
  Prism.languages.coffeescript = Prism.languages.extend('javascript', {
    'comment': comment,
    'string': [// Strings are multiline
    {
      pattern: /'(?:\\[\s\S]|[^\\'])*'/,
      greedy: true
    }, {
      // Strings are multiline
      pattern: /"(?:\\[\s\S]|[^\\"])*"/,
      greedy: true,
      inside: {
        'interpolation': interpolation
      }
    }],
    'keyword': /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
    'class-member': {
      pattern: /@(?!\d)\w+/,
      alias: 'variable'
    }
  });
  Prism.languages.insertBefore('coffeescript', 'comment', {
    'multiline-comment': {
      pattern: /###[\s\S]+?###/,
      alias: 'comment'
    },
    // Block regexp can contain comments and interpolation
    'block-regex': {
      pattern: /\/{3}[\s\S]*?\/{3}/,
      alias: 'regex',
      inside: {
        'comment': comment,
        'interpolation': interpolation
      }
    }
  });
  Prism.languages.insertBefore('coffeescript', 'string', {
    'inline-javascript': {
      pattern: /`(?:\\[\s\S]|[^\\`])*`/,
      inside: {
        'delimiter': {
          pattern: /^`|`$/,
          alias: 'punctuation'
        },
        'script': {
          pattern: /[\s\S]+/,
          alias: 'language-javascript',
          inside: Prism.languages.javascript
        }
      }
    },
    // Block strings
    'multiline-string': [{
      pattern: /'''[\s\S]*?'''/,
      greedy: true,
      alias: 'string'
    }, {
      pattern: /"""[\s\S]*?"""/,
      greedy: true,
      alias: 'string',
      inside: {
        interpolation: interpolation
      }
    }]
  });
  Prism.languages.insertBefore('coffeescript', 'keyword', {
    // Object property
    'property': /(?!\d)\w+(?=\s*:(?!:))/
  });
  delete Prism.languages.coffeescript['template-string'];
  Prism.languages.coffee = Prism.languages.coffeescript;
})(prism);
/* "prismjs/components/prism-yaml" */


(function (Prism) {
  // https://yaml.org/spec/1.2/spec.html#c-ns-anchor-property
  // https://yaml.org/spec/1.2/spec.html#c-ns-alias-node
  var anchorOrAlias = /[*&][^\s[\]{},]+/; // https://yaml.org/spec/1.2/spec.html#c-ns-tag-property

  var tag = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/; // https://yaml.org/spec/1.2/spec.html#c-ns-properties(n,c)

  var properties = '(?:' + tag.source + '(?:[ \t]+' + anchorOrAlias.source + ')?|' + anchorOrAlias.source + '(?:[ \t]+' + tag.source + ')?)'; // https://yaml.org/spec/1.2/spec.html#ns-plain(n,c)
  // This is a simplified version that doesn't support "#" and multiline keys
  // All these long scarry character classes are simplified versions of YAML's characters

  var plainKey = /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(/<PLAIN>/g, function () {
    return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source;
  });
  var string = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;
  /**
   *
   * @param {string} value
   * @param {string} [flags]
   * @returns {RegExp}
   */

  function createValuePattern(value, flags) {
    flags = (flags || '').replace(/m/g, '') + 'm'; // add m flag

    var pattern = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g, function () {
      return properties;
    }).replace(/<<value>>/g, function () {
      return value;
    });
    return RegExp(pattern, flags);
  }

  Prism.languages.yaml = {
    'scalar': {
      pattern: RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(/<<prop>>/g, function () {
        return properties;
      })),
      lookbehind: true,
      alias: 'string'
    },
    'comment': /#.*/,
    'key': {
      pattern: RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g, function () {
        return properties;
      }).replace(/<<key>>/g, function () {
        return '(?:' + plainKey + '|' + string + ')';
      })),
      lookbehind: true,
      greedy: true,
      alias: 'atrule'
    },
    'directive': {
      pattern: /(^[ \t]*)%.+/m,
      lookbehind: true,
      alias: 'important'
    },
    'datetime': {
      pattern: createValuePattern(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source),
      lookbehind: true,
      alias: 'number'
    },
    'boolean': {
      pattern: createValuePattern(/false|true/.source, 'i'),
      lookbehind: true,
      alias: 'important'
    },
    'null': {
      pattern: createValuePattern(/null|~/.source, 'i'),
      lookbehind: true,
      alias: 'important'
    },
    'string': {
      pattern: createValuePattern(string),
      lookbehind: true,
      greedy: true
    },
    'number': {
      pattern: createValuePattern(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source, 'i'),
      lookbehind: true
    },
    'tag': tag,
    'important': anchorOrAlias,
    'punctuation': /---|[:[\]{}\-,|>?]|\.\.\./
  };
  Prism.languages.yml = Prism.languages.yaml;
})(prism);
/* "prismjs/components/prism-markdown" */


(function (Prism) {
  // Allow only one line break
  var inner = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;
  /**
   * This function is intended for the creation of the bold or italic pattern.
   *
   * This also adds a lookbehind group to the given pattern to ensure that the pattern is not backslash-escaped.
   *
   * _Note:_ Keep in mind that this adds a capturing group.
   *
   * @param {string} pattern
   * @returns {RegExp}
   */

  function createInline(pattern) {
    pattern = pattern.replace(/<inner>/g, function () {
      return inner;
    });
    return RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + '(?:' + pattern + ')');
  }

  var tableCell = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source;
  var tableRow = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g, function () {
    return tableCell;
  });
  var tableLine = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;
  Prism.languages.markdown = Prism.languages.extend('markup', {});
  Prism.languages.insertBefore('markdown', 'prolog', {
    'front-matter-block': {
      pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
      lookbehind: true,
      greedy: true,
      inside: {
        'punctuation': /^---|---$/,
        'front-matter': {
          pattern: /\S+(?:\s+\S+)*/,
          alias: ['yaml', 'language-yaml'],
          inside: Prism.languages.yaml
        }
      }
    },
    'blockquote': {
      // > ...
      pattern: /^>(?:[\t ]*>)*/m,
      alias: 'punctuation'
    },
    'table': {
      pattern: RegExp('^' + tableRow + tableLine + '(?:' + tableRow + ')*', 'm'),
      inside: {
        'table-data-rows': {
          pattern: RegExp('^(' + tableRow + tableLine + ')(?:' + tableRow + ')*$'),
          lookbehind: true,
          inside: {
            'table-data': {
              pattern: RegExp(tableCell),
              inside: Prism.languages.markdown
            },
            'punctuation': /\|/
          }
        },
        'table-line': {
          pattern: RegExp('^(' + tableRow + ')' + tableLine + '$'),
          lookbehind: true,
          inside: {
            'punctuation': /\||:?-{3,}:?/
          }
        },
        'table-header-row': {
          pattern: RegExp('^' + tableRow + '$'),
          inside: {
            'table-header': {
              pattern: RegExp(tableCell),
              alias: 'important',
              inside: Prism.languages.markdown
            },
            'punctuation': /\|/
          }
        }
      }
    },
    'code': [{
      // Prefixed by 4 spaces or 1 tab and preceded by an empty line
      pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
      lookbehind: true,
      alias: 'keyword'
    }, {
      // ```optional language
      // code block
      // ```
      pattern: /^```[\s\S]*?^```$/m,
      greedy: true,
      inside: {
        'code-block': {
          pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
          lookbehind: true
        },
        'code-language': {
          pattern: /^(```).+/,
          lookbehind: true
        },
        'punctuation': /```/
      }
    }],
    'title': [{
      // title 1
      // =======
      // title 2
      // -------
      pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
      alias: 'important',
      inside: {
        punctuation: /==+$|--+$/
      }
    }, {
      // # title 1
      // ###### title 6
      pattern: /(^\s*)#.+/m,
      lookbehind: true,
      alias: 'important',
      inside: {
        punctuation: /^#+|#+$/
      }
    }],
    'hr': {
      // ***
      // ---
      // * * *
      // -----------
      pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
      lookbehind: true,
      alias: 'punctuation'
    },
    'list': {
      // * item
      // + item
      // - item
      // 1. item
      pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
      lookbehind: true,
      alias: 'punctuation'
    },
    'url-reference': {
      // [id]: http://example.com "Optional title"
      // [id]: http://example.com 'Optional title'
      // [id]: http://example.com (Optional title)
      // [id]: <http://example.com> "Optional title"
      pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
      inside: {
        'variable': {
          pattern: /^(!?\[)[^\]]+/,
          lookbehind: true
        },
        'string': /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
        'punctuation': /^[\[\]!:]|[<>]/
      },
      alias: 'url'
    },
    'bold': {
      // **strong**
      // __strong__
      // allow one nested instance of italic text using the same delimiter
      pattern: createInline(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),
      lookbehind: true,
      greedy: true,
      inside: {
        'content': {
          pattern: /(^..)[\s\S]+(?=..$)/,
          lookbehind: true,
          inside: {} // see below

        },
        'punctuation': /\*\*|__/
      }
    },
    'italic': {
      // *em*
      // _em_
      // allow one nested instance of bold text using the same delimiter
      pattern: createInline(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),
      lookbehind: true,
      greedy: true,
      inside: {
        'content': {
          pattern: /(^.)[\s\S]+(?=.$)/,
          lookbehind: true,
          inside: {} // see below

        },
        'punctuation': /[*_]/
      }
    },
    'strike': {
      // ~~strike through~~
      // ~strike~
      // eslint-disable-next-line regexp/strict
      pattern: createInline(/(~~?)(?:(?!~)<inner>)+\2/.source),
      lookbehind: true,
      greedy: true,
      inside: {
        'content': {
          pattern: /(^~~?)[\s\S]+(?=\1$)/,
          lookbehind: true,
          inside: {} // see below

        },
        'punctuation': /~~?/
      }
    },
    'code-snippet': {
      // `code`
      // ``code``
      pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
      lookbehind: true,
      greedy: true,
      alias: ['code', 'keyword']
    },
    'url': {
      // [example](http://example.com "Optional title")
      // [example][id]
      // [example] [id]
      pattern: createInline(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),
      lookbehind: true,
      greedy: true,
      inside: {
        'operator': /^!/,
        'content': {
          pattern: /(^\[)[^\]]+(?=\])/,
          lookbehind: true,
          inside: {} // see below

        },
        'variable': {
          pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
          lookbehind: true
        },
        'url': {
          pattern: /(^\]\()[^\s)]+/,
          lookbehind: true
        },
        'string': {
          pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
          lookbehind: true
        }
      }
    }
  });
  ['url', 'bold', 'italic', 'strike'].forEach(function (token) {
    ['url', 'bold', 'italic', 'strike', 'code-snippet'].forEach(function (inside) {
      if (token !== inside) {
        Prism.languages.markdown[token].inside.content.inside[inside] = Prism.languages.markdown[inside];
      }
    });
  });
  Prism.hooks.add('after-tokenize', function (env) {
    if (env.language !== 'markdown' && env.language !== 'md') {
      return;
    }

    function walkTokens(tokens) {
      if (!tokens || typeof tokens === 'string') {
        return;
      }

      for (var i = 0, l = tokens.length; i < l; i++) {
        var token = tokens[i];

        if (token.type !== 'code') {
          walkTokens(token.content);
          continue;
        }
        /*
         * Add the correct `language-xxxx` class to this code block. Keep in mind that the `code-language` token
         * is optional. But the grammar is defined so that there is only one case we have to handle:
         *
         * token.content = [
         *     <span class="punctuation">```</span>,
         *     <span class="code-language">xxxx</span>,
         *     '\n', // exactly one new lines (\r or \n or \r\n)
         *     <span class="code-block">...</span>,
         *     '\n', // exactly one new lines again
         *     <span class="punctuation">```</span>
         * ];
         */


        var codeLang = token.content[1];
        var codeBlock = token.content[3];

        if (codeLang && codeBlock && codeLang.type === 'code-language' && codeBlock.type === 'code-block' && typeof codeLang.content === 'string') {
          // this might be a language that Prism does not support
          // do some replacements to support C++, C#, and F#
          var lang = codeLang.content.replace(/\b#/g, 'sharp').replace(/\b\+\+/g, 'pp'); // only use the first word

          lang = (/[a-z][\w-]*/i.exec(lang) || [''])[0].toLowerCase();
          var alias = 'language-' + lang; // add alias

          if (!codeBlock.alias) {
            codeBlock.alias = [alias];
          } else if (typeof codeBlock.alias === 'string') {
            codeBlock.alias = [codeBlock.alias, alias];
          } else {
            codeBlock.alias.push(alias);
          }
        }
      }
    }

    walkTokens(env.tokens);
  });
  Prism.hooks.add('wrap', function (env) {
    if (env.type !== 'code-block') {
      return;
    }

    var codeLang = '';

    for (var i = 0, l = env.classes.length; i < l; i++) {
      var cls = env.classes[i];
      var match = /language-(.+)/.exec(cls);

      if (match) {
        codeLang = match[1];
        break;
      }
    }

    var grammar = Prism.languages[codeLang];

    if (!grammar) {
      if (codeLang && codeLang !== 'none' && Prism.plugins.autoloader) {
        var id = 'md-' + new Date().valueOf() + '-' + Math.floor(Math.random() * 1e16);
        env.attributes['id'] = id;
        Prism.plugins.autoloader.loadLanguages(codeLang, function () {
          var ele = document.getElementById(id);

          if (ele) {
            ele.innerHTML = Prism.highlight(ele.textContent, Prism.languages[codeLang], codeLang);
          }
        });
      }
    } else {
      env.content = Prism.highlight(textContent(env.content), grammar, codeLang);
    }
  });
  var tagPattern = RegExp(Prism.languages.markup.tag.pattern.source, 'gi');
  /**
   * A list of known entity names.
   *
   * This will always be incomplete to save space. The current list is the one used by lowdash's unescape function.
   *
   * @see {@link https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/unescape.js#L2}
   */

  var KNOWN_ENTITY_NAMES = {
    'amp': '&',
    'lt': '<',
    'gt': '>',
    'quot': '"'
  }; // IE 11 doesn't support `String.fromCodePoint`

  var fromCodePoint = String.fromCodePoint || String.fromCharCode;
  /**
   * Returns the text content of a given HTML source code string.
   *
   * @param {string} html
   * @returns {string}
   */

  function textContent(html) {
    // remove all tags
    var text = html.replace(tagPattern, ''); // decode known entities

    text = text.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function (m, code) {
      code = code.toLowerCase();

      if (code[0] === '#') {
        var value;

        if (code[1] === 'x') {
          value = parseInt(code.slice(2), 16);
        } else {
          value = Number(code.slice(1));
        }

        return fromCodePoint(value);
      } else {
        var known = KNOWN_ENTITY_NAMES[code];

        if (known) {
          return known;
        } // unable to decode


        return m;
      }
    });
    return text;
  }

  Prism.languages.md = Prism.languages.markdown;
})(prism);
/* "prismjs/components/prism-graphql" */


prism.languages.graphql = {
  'comment': /#.*/,
  'description': {
    pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
    greedy: true,
    alias: 'string',
    inside: {
      'language-markdown': {
        pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
        lookbehind: true,
        inside: prism.languages.markdown
      }
    }
  },
  'string': {
    pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,
    greedy: true
  },
  'number': /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  'boolean': /\b(?:false|true)\b/,
  'variable': /\$[a-z_]\w*/i,
  'directive': {
    pattern: /@[a-z_]\w*/i,
    alias: 'function'
  },
  'attr-name': {
    pattern: /\b[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
    greedy: true
  },
  'atom-input': {
    pattern: /\b[A-Z]\w*Input\b/,
    alias: 'class-name'
  },
  'scalar': /\b(?:Boolean|Float|ID|Int|String)\b/,
  'constant': /\b[A-Z][A-Z_\d]*\b/,
  'class-name': {
    pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,
    lookbehind: true
  },
  'fragment': {
    pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
    lookbehind: true,
    alias: 'function'
  },
  'definition-mutation': {
    pattern: /(\bmutation\s+)[a-zA-Z_]\w*/,
    lookbehind: true,
    alias: 'function'
  },
  'definition-query': {
    pattern: /(\bquery\s+)[a-zA-Z_]\w*/,
    lookbehind: true,
    alias: 'function'
  },
  'keyword': /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
  'operator': /[!=|&]|\.{3}/,
  'property-query': /\w+(?=\s*\()/,
  'object': /\w+(?=\s*\{)/,
  'punctuation': /[!(){}\[\]:=,]/,
  'property': /\w+/
};
prism.hooks.add('after-tokenize', function afterTokenizeGraphql(env) {
  if (env.language !== 'graphql') {
    return;
  }
  /**
   * get the graphql token stream that we want to customize
   *
   * @typedef {InstanceType<import("./prism-core")["Token"]>} Token
   * @type {Token[]}
   */


  var validTokens = env.tokens.filter(function (token) {
    return typeof token !== 'string' && token.type !== 'comment' && token.type !== 'scalar';
  });
  var currentIndex = 0;
  /**
   * Returns whether the token relative to the current index has the given type.
   *
   * @param {number} offset
   * @returns {Token | undefined}
   */

  function getToken(offset) {
    return validTokens[currentIndex + offset];
  }
  /**
   * Returns whether the token relative to the current index has the given type.
   *
   * @param {readonly string[]} types
   * @param {number} [offset=0]
   * @returns {boolean}
   */


  function isTokenType(types, offset) {
    offset = offset || 0;

    for (var i = 0; i < types.length; i++) {
      var token = getToken(i + offset);

      if (!token || token.type !== types[i]) {
        return false;
      }
    }

    return true;
  }
  /**
   * Returns the index of the closing bracket to an opening bracket.
   *
   * It is assumed that `token[currentIndex - 1]` is an opening bracket.
   *
   * If no closing bracket could be found, `-1` will be returned.
   *
   * @param {RegExp} open
   * @param {RegExp} close
   * @returns {number}
   */


  function findClosingBracket(open, close) {
    var stackHeight = 1;

    for (var i = currentIndex; i < validTokens.length; i++) {
      var token = validTokens[i];
      var content = token.content;

      if (token.type === 'punctuation' && typeof content === 'string') {
        if (open.test(content)) {
          stackHeight++;
        } else if (close.test(content)) {
          stackHeight--;

          if (stackHeight === 0) {
            return i;
          }
        }
      }
    }

    return -1;
  }
  /**
   * Adds an alias to the given token.
   *
   * @param {Token} token
   * @param {string} alias
   * @returns {void}
   */


  function addAlias(token, alias) {
    var aliases = token.alias;

    if (!aliases) {
      token.alias = aliases = [];
    } else if (!Array.isArray(aliases)) {
      token.alias = aliases = [aliases];
    }

    aliases.push(alias);
  }

  for (; currentIndex < validTokens.length;) {
    var startToken = validTokens[currentIndex++]; // add special aliases for mutation tokens

    if (startToken.type === 'keyword' && startToken.content === 'mutation') {
      // any array of the names of all input variables (if any)
      var inputVariables = [];

      if (isTokenType(['definition-mutation', 'punctuation']) && getToken(1).content === '(') {
        // definition
        currentIndex += 2; // skip 'definition-mutation' and 'punctuation'

        var definitionEnd = findClosingBracket(/^\($/, /^\)$/);

        if (definitionEnd === -1) {
          continue;
        } // find all input variables


        for (; currentIndex < definitionEnd; currentIndex++) {
          var t = getToken(0);

          if (t.type === 'variable') {
            addAlias(t, 'variable-input');
            inputVariables.push(t.content);
          }
        }

        currentIndex = definitionEnd + 1;
      }

      if (isTokenType(['punctuation', 'property-query']) && getToken(0).content === '{') {
        currentIndex++; // skip opening bracket

        addAlias(getToken(0), 'property-mutation');

        if (inputVariables.length > 0) {
          var mutationEnd = findClosingBracket(/^\{$/, /^\}$/);

          if (mutationEnd === -1) {
            continue;
          } // give references to input variables a special alias


          for (var i = currentIndex; i < mutationEnd; i++) {
            var varToken = validTokens[i];

            if (varToken.type === 'variable' && inputVariables.indexOf(varToken.content) >= 0) {
              addAlias(varToken, 'variable-input');
            }
          }
        }
      }
    }
  }
});
/* "prismjs/components/prism-sql" */

prism.languages.sql = {
  'comment': {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
    lookbehind: true
  },
  'variable': [{
    pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
    greedy: true
  }, /@[\w.$]+/],
  'string': {
    pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
    greedy: true,
    lookbehind: true
  },
  'identifier': {
    pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,
    greedy: true,
    lookbehind: true,
    inside: {
      'punctuation': /^`|`$/
    }
  },
  'function': /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
  // Should we highlight user defined functions too?
  'keyword': /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
  'boolean': /\b(?:FALSE|NULL|TRUE)\b/i,
  'number': /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
  'operator': /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
  'punctuation': /[;[\]()`,.]/
};
/* "prismjs/components/prism-js-templates" */

(function (Prism) {
  var templateString = Prism.languages.javascript['template-string']; // see the pattern in prism-javascript.js

  var templateLiteralPattern = templateString.pattern.source;
  var interpolationObject = templateString.inside['interpolation'];
  var interpolationPunctuationObject = interpolationObject.inside['interpolation-punctuation'];
  var interpolationPattern = interpolationObject.pattern.source;
  /**
   * Creates a new pattern to match a template string with a special tag.
   *
   * This will return `undefined` if there is no grammar with the given language id.
   *
   * @param {string} language The language id of the embedded language. E.g. `markdown`.
   * @param {string} tag The regex pattern to match the tag.
   * @returns {object | undefined}
   * @example
   * createTemplate('css', /\bcss/.source);
   */

  function createTemplate(language, tag) {
    if (!Prism.languages[language]) {
      return undefined;
    }

    return {
      pattern: RegExp('((?:' + tag + ')\\s*)' + templateLiteralPattern),
      lookbehind: true,
      greedy: true,
      inside: {
        'template-punctuation': {
          pattern: /^`|`$/,
          alias: 'string'
        },
        'embedded-code': {
          pattern: /[\s\S]+/,
          alias: language
        }
      }
    };
  }

  Prism.languages.javascript['template-string'] = [// styled-jsx:
  //   css`a { color: #25F; }`
  // styled-components:
  //   styled.h1`color: red;`
  createTemplate('css', /\b(?:styled(?:\([^)]*\))?(?:\s*\.\s*\w+(?:\([^)]*\))*)*|css(?:\s*\.\s*(?:global|resolve))?|createGlobalStyle|keyframes)/.source), // html`<p></p>`
  // div.innerHTML = `<p></p>`
  createTemplate('html', /\bhtml|\.\s*(?:inner|outer)HTML\s*\+?=/.source), // svg`<path fill="#fff" d="M55.37 ..."/>`
  createTemplate('svg', /\bsvg/.source), // md`# h1`, markdown`## h2`
  createTemplate('markdown', /\b(?:markdown|md)/.source), // gql`...`, graphql`...`, graphql.experimental`...`
  createTemplate('graphql', /\b(?:gql|graphql(?:\s*\.\s*experimental)?)/.source), // sql`...`
  createTemplate('sql', /\bsql/.source), // vanilla template string
  templateString].filter(Boolean);
  /**
   * Returns a specific placeholder literal for the given language.
   *
   * @param {number} counter
   * @param {string} language
   * @returns {string}
   */

  function getPlaceholder(counter, language) {
    return '___' + language.toUpperCase() + '_' + counter + '___';
  }
  /**
   * Returns the tokens of `Prism.tokenize` but also runs the `before-tokenize` and `after-tokenize` hooks.
   *
   * @param {string} code
   * @param {any} grammar
   * @param {string} language
   * @returns {(string|Token)[]}
   */


  function tokenizeWithHooks(code, grammar, language) {
    var env = {
      code: code,
      grammar: grammar,
      language: language
    };
    Prism.hooks.run('before-tokenize', env);
    env.tokens = Prism.tokenize(env.code, env.grammar);
    Prism.hooks.run('after-tokenize', env);
    return env.tokens;
  }
  /**
   * Returns the token of the given JavaScript interpolation expression.
   *
   * @param {string} expression The code of the expression. E.g. `"${42}"`
   * @returns {Token}
   */


  function tokenizeInterpolationExpression(expression) {
    var tempGrammar = {};
    tempGrammar['interpolation-punctuation'] = interpolationPunctuationObject;
    /** @type {Array} */

    var tokens = Prism.tokenize(expression, tempGrammar);

    if (tokens.length === 3) {
      /**
       * The token array will look like this
       * [
       *     ["interpolation-punctuation", "${"]
       *     "..." // JavaScript expression of the interpolation
       *     ["interpolation-punctuation", "}"]
       * ]
       */
      var args = [1, 1];
      args.push.apply(args, tokenizeWithHooks(tokens[1], Prism.languages.javascript, 'javascript'));
      tokens.splice.apply(tokens, args);
    }

    return new Prism.Token('interpolation', tokens, interpolationObject.alias, expression);
  }
  /**
   * Tokenizes the given code with support for JavaScript interpolation expressions mixed in.
   *
   * This function has 3 phases:
   *
   * 1. Replace all JavaScript interpolation expression with a placeholder.
   *    The placeholder will have the syntax of a identify of the target language.
   * 2. Tokenize the code with placeholders.
   * 3. Tokenize the interpolation expressions and re-insert them into the tokenize code.
   *    The insertion only works if a placeholder hasn't been "ripped apart" meaning that the placeholder has been
   *    tokenized as two tokens by the grammar of the embedded language.
   *
   * @param {string} code
   * @param {object} grammar
   * @param {string} language
   * @returns {Token}
   */


  function tokenizeEmbedded(code, grammar, language) {
    // 1. First filter out all interpolations
    // because they might be escaped, we need a lookbehind, so we use Prism

    /** @type {(Token|string)[]} */
    var _tokens = Prism.tokenize(code, {
      'interpolation': {
        pattern: RegExp(interpolationPattern),
        lookbehind: true
      }
    }); // replace all interpolations with a placeholder which is not in the code already


    var placeholderCounter = 0;
    /** @type {Object<string, string>} */

    var placeholderMap = {};

    var embeddedCode = _tokens.map(function (token) {
      if (typeof token === 'string') {
        return token;
      } else {
        var interpolationExpression = token.content;
        var placeholder;

        while (code.indexOf(placeholder = getPlaceholder(placeholderCounter++, language)) !== -1) {
          /* noop */
        }

        placeholderMap[placeholder] = interpolationExpression;
        return placeholder;
      }
    }).join(''); // 2. Tokenize the embedded code


    var embeddedTokens = tokenizeWithHooks(embeddedCode, grammar, language); // 3. Re-insert the interpolation

    var placeholders = Object.keys(placeholderMap);
    placeholderCounter = 0;
    /**
     *
     * @param {(Token|string)[]} tokens
     * @returns {void}
     */

    function walkTokens(tokens) {
      for (var i = 0; i < tokens.length; i++) {
        if (placeholderCounter >= placeholders.length) {
          return;
        }

        var token = tokens[i];

        if (typeof token === 'string' || typeof token.content === 'string') {
          var placeholder = placeholders[placeholderCounter];
          var s = typeof token === 'string' ? token :
          /** @type {string} */
          token.content;
          var index = s.indexOf(placeholder);

          if (index !== -1) {
            ++placeholderCounter;
            var before = s.substring(0, index);
            var middle = tokenizeInterpolationExpression(placeholderMap[placeholder]);
            var after = s.substring(index + placeholder.length);
            var replacement = [];

            if (before) {
              replacement.push(before);
            }

            replacement.push(middle);

            if (after) {
              var afterTokens = [after];
              walkTokens(afterTokens);
              replacement.push.apply(replacement, afterTokens);
            }

            if (typeof token === 'string') {
              tokens.splice.apply(tokens, [i, 1].concat(replacement));
              i += replacement.length - 1;
            } else {
              token.content = replacement;
            }
          }
        } else {
          var content = token.content;

          if (Array.isArray(content)) {
            walkTokens(content);
          } else {
            walkTokens([content]);
          }
        }
      }
    }

    walkTokens(embeddedTokens);
    return new Prism.Token(language, embeddedTokens, 'language-' + language, code);
  }
  /**
   * The languages for which JS templating will handle tagged template literals.
   *
   * JS templating isn't active for only JavaScript but also related languages like TypeScript, JSX, and TSX.
   */


  var supportedLanguages = {
    'javascript': true,
    'js': true,
    'typescript': true,
    'ts': true,
    'jsx': true,
    'tsx': true
  };
  Prism.hooks.add('after-tokenize', function (env) {
    if (!(env.language in supportedLanguages)) {
      return;
    }
    /**
     * Finds and tokenizes all template strings with an embedded languages.
     *
     * @param {(Token | string)[]} tokens
     * @returns {void}
     */


    function findTemplateStrings(tokens) {
      for (var i = 0, l = tokens.length; i < l; i++) {
        var token = tokens[i];

        if (typeof token === 'string') {
          continue;
        }

        var content = token.content;

        if (!Array.isArray(content)) {
          if (typeof content !== 'string') {
            findTemplateStrings([content]);
          }

          continue;
        }

        if (token.type === 'template-string') {
          /**
           * A JavaScript template-string token will look like this:
           *
           * ["template-string", [
           *     ["template-punctuation", "`"],
           *     (
           *         An array of "string" and "interpolation" tokens. This is the simple string case.
           *         or
           *         ["embedded-code", "..."] This is the token containing the embedded code.
           *                                  It also has an alias which is the language of the embedded code.
           *     ),
           *     ["template-punctuation", "`"]
           * ]]
           */
          var embedded = content[1];

          if (content.length === 3 && typeof embedded !== 'string' && embedded.type === 'embedded-code') {
            // get string content
            var code = stringContent(embedded);
            var alias = embedded.alias;
            var language = Array.isArray(alias) ? alias[0] : alias;
            var grammar = Prism.languages[language];

            if (!grammar) {
              // the embedded language isn't registered.
              continue;
            }

            content[1] = tokenizeEmbedded(code, grammar, language);
          }
        } else {
          findTemplateStrings(content);
        }
      }
    }

    findTemplateStrings(env.tokens);
  });
  /**
   * Returns the string content of a token or token stream.
   *
   * @param {string | Token | (string | Token)[]} value
   * @returns {string}
   */

  function stringContent(value) {
    if (typeof value === 'string') {
      return value;
    } else if (Array.isArray(value)) {
      return value.map(stringContent).join('');
    } else {
      return stringContent(value.content);
    }
  }
})(prism);
/* "prismjs/components/prism-typescript" */


(function (Prism) {
  Prism.languages.typescript = Prism.languages.extend('javascript', {
    'class-name': {
      pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
      lookbehind: true,
      greedy: true,
      inside: null // see below

    },
    'builtin': /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/
  }); // The keywords TypeScript adds to JavaScript

  Prism.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/, // keywords that have to be followed by an identifier
  /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/, // This is for `import type *, {}`
  /\btype\b(?=\s*(?:[\{*]|$))/); // doesn't work with TS because TS is too complex

  delete Prism.languages.typescript['parameter'];
  delete Prism.languages.typescript['literal-property']; // a version of typescript specifically for highlighting types

  var typeInside = Prism.languages.extend('typescript', {});
  delete typeInside['class-name'];
  Prism.languages.typescript['class-name'].inside = typeInside;
  Prism.languages.insertBefore('typescript', 'function', {
    'decorator': {
      pattern: /@[$\w\xA0-\uFFFF]+/,
      inside: {
        'at': {
          pattern: /^@/,
          alias: 'operator'
        },
        'function': /^[\s\S]+/
      }
    },
    'generic-function': {
      // e.g. foo<T extends "bar" | "baz">( ...
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
      greedy: true,
      inside: {
        'function': /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
        'generic': {
          pattern: /<[\s\S]+/,
          // everything after the first <
          alias: 'class-name',
          inside: typeInside
        }
      }
    }
  });
  Prism.languages.ts = Prism.languages.typescript;
})(prism);
/* "prismjs/components/prism-js-extras" */


(function (Prism) {
  Prism.languages.insertBefore('javascript', 'function-variable', {
    'method-variable': {
      pattern: RegExp('(\\.\\s*)' + Prism.languages.javascript['function-variable'].pattern.source),
      lookbehind: true,
      alias: ['function-variable', 'method', 'function', 'property-access']
    }
  });
  Prism.languages.insertBefore('javascript', 'function', {
    'method': {
      pattern: RegExp('(\\.\\s*)' + Prism.languages.javascript['function'].source),
      lookbehind: true,
      alias: ['function', 'property-access']
    }
  });
  Prism.languages.insertBefore('javascript', 'constant', {
    'known-class-name': [{
      // standard built-ins
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
      pattern: /\b(?:(?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|(?:Weak)?(?:Map|Set)|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|WebAssembly)\b/,
      alias: 'class-name'
    }, {
      // errors
      pattern: /\b(?:[A-Z]\w*)Error\b/,
      alias: 'class-name'
    }]
  });
  /**
   * Replaces the `<ID>` placeholder in the given pattern with a pattern for general JS identifiers.
   *
   * @param {string} source
   * @param {string} [flags]
   * @returns {RegExp}
   */

  function withId(source, flags) {
    return RegExp(source.replace(/<ID>/g, function () {
      return /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/.source;
    }), flags);
  }

  Prism.languages.insertBefore('javascript', 'keyword', {
    'imports': {
      // https://tc39.es/ecma262/#sec-imports
      pattern: withId(/(\bimport\b\s*)(?:<ID>(?:\s*,\s*(?:\*\s*as\s+<ID>|\{[^{}]*\}))?|\*\s*as\s+<ID>|\{[^{}]*\})(?=\s*\bfrom\b)/.source),
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    'exports': {
      // https://tc39.es/ecma262/#sec-exports
      pattern: withId(/(\bexport\b\s*)(?:\*(?:\s*as\s+<ID>)?(?=\s*\bfrom\b)|\{[^{}]*\})/.source),
      lookbehind: true,
      inside: Prism.languages.javascript
    }
  });
  Prism.languages.javascript['keyword'].unshift({
    pattern: /\b(?:as|default|export|from|import)\b/,
    alias: 'module'
  }, {
    pattern: /\b(?:await|break|catch|continue|do|else|finally|for|if|return|switch|throw|try|while|yield)\b/,
    alias: 'control-flow'
  }, {
    pattern: /\bnull\b/,
    alias: ['null', 'nil']
  }, {
    pattern: /\bundefined\b/,
    alias: 'nil'
  });
  Prism.languages.insertBefore('javascript', 'operator', {
    'spread': {
      pattern: /\.{3}/,
      alias: 'operator'
    },
    'arrow': {
      pattern: /=>/,
      alias: 'operator'
    }
  });
  Prism.languages.insertBefore('javascript', 'punctuation', {
    'property-access': {
      pattern: withId(/(\.\s*)#?<ID>/.source),
      lookbehind: true
    },
    'maybe-class-name': {
      pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/,
      lookbehind: true
    },
    'dom': {
      // this contains only a few commonly used DOM variables
      pattern: /\b(?:document|(?:local|session)Storage|location|navigator|performance|window)\b/,
      alias: 'variable'
    },
    'console': {
      pattern: /\bconsole(?=\s*\.)/,
      alias: 'class-name'
    }
  }); // add 'maybe-class-name' to tokens which might be a class name

  var maybeClassNameTokens = ['function', 'function-variable', 'method', 'method-variable', 'property-access'];

  for (var i = 0; i < maybeClassNameTokens.length; i++) {
    var token = maybeClassNameTokens[i];
    var value = Prism.languages.javascript[token]; // convert regex to object

    if (Prism.util.type(value) === 'RegExp') {
      value = Prism.languages.javascript[token] = {
        pattern: value
      };
    } // keep in mind that we don't support arrays


    var inside = value.inside || {};
    value.inside = inside;
    inside['maybe-class-name'] = /^[A-Z][\s\S]*/;
  }
})(prism);
/* "prismjs/components/prism-jsx" */


(function (Prism) {
  var javascript = Prism.util.clone(Prism.languages.javascript);
  var space = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source;
  var braces = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source;
  var spread = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;
  /**
   * @param {string} source
   * @param {string} [flags]
   */

  function re(source, flags) {
    source = source.replace(/<S>/g, function () {
      return space;
    }).replace(/<BRACES>/g, function () {
      return braces;
    }).replace(/<SPREAD>/g, function () {
      return spread;
    });
    return RegExp(source, flags);
  }

  spread = re(spread).source;
  Prism.languages.jsx = Prism.languages.extend('markup', javascript);
  Prism.languages.jsx.tag.pattern = re(/<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source);
  Prism.languages.jsx.tag.inside['tag'].pattern = /^<\/?[^\s>\/]*/;
  Prism.languages.jsx.tag.inside['attr-value'].pattern = /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/;
  Prism.languages.jsx.tag.inside['tag'].inside['class-name'] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/;
  Prism.languages.jsx.tag.inside['comment'] = javascript['comment'];
  Prism.languages.insertBefore('inside', 'attr-name', {
    'spread': {
      pattern: re(/<SPREAD>/.source),
      inside: Prism.languages.jsx
    }
  }, Prism.languages.jsx.tag);
  Prism.languages.insertBefore('inside', 'special-attr', {
    'script': {
      // Allow for two levels of nesting
      pattern: re(/=<BRACES>/.source),
      alias: 'language-javascript',
      inside: {
        'script-punctuation': {
          pattern: /^=(?=\{)/,
          alias: 'punctuation'
        },
        rest: Prism.languages.jsx
      }
    }
  }, Prism.languages.jsx.tag); // The following will handle plain text inside tags

  var stringifyToken = function (token) {
    if (!token) {
      return '';
    }

    if (typeof token === 'string') {
      return token;
    }

    if (typeof token.content === 'string') {
      return token.content;
    }

    return token.content.map(stringifyToken).join('');
  };

  var walkTokens = function (tokens) {
    var openedTags = [];

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      var notTagNorBrace = false;

      if (typeof token !== 'string') {
        if (token.type === 'tag' && token.content[0] && token.content[0].type === 'tag') {
          // We found a tag, now find its kind
          if (token.content[0].content[0].content === '</') {
            // Closing tag
            if (openedTags.length > 0 && openedTags[openedTags.length - 1].tagName === stringifyToken(token.content[0].content[1])) {
              // Pop matching opening tag
              openedTags.pop();
            }
          } else {
            if (token.content[token.content.length - 1].content === '/>') ; else {
              // Opening tag
              openedTags.push({
                tagName: stringifyToken(token.content[0].content[1]),
                openedBraces: 0
              });
            }
          }
        } else if (openedTags.length > 0 && token.type === 'punctuation' && token.content === '{') {
          // Here we might have entered a JSX context inside a tag
          openedTags[openedTags.length - 1].openedBraces++;
        } else if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces > 0 && token.type === 'punctuation' && token.content === '}') {
          // Here we might have left a JSX context inside a tag
          openedTags[openedTags.length - 1].openedBraces--;
        } else {
          notTagNorBrace = true;
        }
      }

      if (notTagNorBrace || typeof token === 'string') {
        if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {
          // Here we are inside a tag, and not inside a JSX context.
          // That's plain text: drop any tokens matched.
          var plainText = stringifyToken(token); // And merge text with adjacent text

          if (i < tokens.length - 1 && (typeof tokens[i + 1] === 'string' || tokens[i + 1].type === 'plain-text')) {
            plainText += stringifyToken(tokens[i + 1]);
            tokens.splice(i + 1, 1);
          }

          if (i > 0 && (typeof tokens[i - 1] === 'string' || tokens[i - 1].type === 'plain-text')) {
            plainText = stringifyToken(tokens[i - 1]) + plainText;
            tokens.splice(i - 1, 1);
            i--;
          }

          tokens[i] = new Prism.Token('plain-text', plainText, null, plainText);
        }
      }

      if (token.content && typeof token.content !== 'string') {
        walkTokens(token.content);
      }
    }
  };

  Prism.hooks.add('after-tokenize', function (env) {
    if (env.language !== 'jsx' && env.language !== 'tsx') {
      return;
    }

    walkTokens(env.tokens);
  });
})(prism);
/* "prismjs/components/prism-diff" */


(function (Prism) {
  Prism.languages.diff = {
    'coord': [// Match all kinds of coord lines (prefixed by "+++", "---" or "***").
    /^(?:\*{3}|-{3}|\+{3}).*$/m, // Match "@@ ... @@" coord lines in unified diff.
    /^@@.*@@$/m, // Match coord lines in normal diff (starts with a number).
    /^\d.*$/m] // deleted, inserted, unchanged, diff

  };
  /**
   * A map from the name of a block to its line prefix.
   *
   * @type {Object<string, string>}
   */

  var PREFIXES = {
    'deleted-sign': '-',
    'deleted-arrow': '<',
    'inserted-sign': '+',
    'inserted-arrow': '>',
    'unchanged': ' ',
    'diff': '!'
  }; // add a token for each prefix

  Object.keys(PREFIXES).forEach(function (name) {
    var prefix = PREFIXES[name];
    var alias = [];

    if (!/^\w+$/.test(name)) {
      // "deleted-sign" -> "deleted"
      alias.push(/\w+/.exec(name)[0]);
    }

    if (name === 'diff') {
      alias.push('bold');
    }

    Prism.languages.diff[name] = {
      pattern: RegExp('^(?:[' + prefix + '].*(?:\r\n?|\n|(?![\\s\\S])))+', 'm'),
      alias: alias,
      inside: {
        'line': {
          pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/,
          lookbehind: true
        },
        'prefix': {
          pattern: /[\s\S]/,
          alias: /\w+/.exec(name)[0]
        }
      }
    };
  }); // make prefixes available to Diff plugin

  Object.defineProperty(Prism.languages.diff, 'PREFIXES', {
    value: PREFIXES
  });
})(prism);
/* "prismjs/components/prism-git" */


prism.languages.git = {
  /*
   * A simple one line comment like in a git status command
   * For instance:
   * $ git status
   * # On branch infinite-scroll
   * # Your branch and 'origin/sharedBranches/frontendTeam/infinite-scroll' have diverged,
   * # and have 1 and 2 different commits each, respectively.
   * nothing to commit (working directory clean)
   */
  'comment': /^#.*/m,

  /*
   * Regexp to match the changed lines in a git diff output. Check the example below.
   */
  'deleted': /^[-–].*/m,
  'inserted': /^\+.*/m,

  /*
   * a string (double and simple quote)
   */
  'string': /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,

  /*
   * a git command. It starts with a random prompt finishing by a $, then "git" then some other parameters
   * For instance:
   * $ git add file.txt
   */
  'command': {
    pattern: /^.*\$ git .*$/m,
    inside: {
      /*
       * A git command can contain a parameter starting by a single or a double dash followed by a string
       * For instance:
       * $ git diff --cached
       * $ git log -p
       */
      'parameter': /\s--?\w+/
    }
  },

  /*
   * Coordinates displayed in a git diff command
   * For instance:
   * $ git diff
   * diff --git file.txt file.txt
   * index 6214953..1d54a52 100644
   * --- file.txt
   * +++ file.txt
   * @@ -1 +1,2 @@
   * -Here's my tetx file
   * +Here's my text file
   * +And this is the second line
   */
  'coord': /^@@.*@@$/m,

  /*
   * Match a "commit [SHA1]" line in a git log output.
   * For instance:
   * $ git log
   * commit a11a14ef7e26f2ca62d4b35eac455ce636d0dc09
   * Author: lgiraudel
   * Date:   Mon Feb 17 11:18:34 2014 +0100
   *
   *     Add of a new line
   */
  'commit-sha1': /^commit \w{40}$/m
};
/* "prismjs/components/prism-go" */

prism.languages.go = prism.languages.extend('clike', {
  'string': {
    pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,
    lookbehind: true,
    greedy: true
  },
  'keyword': /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
  'boolean': /\b(?:_|false|iota|nil|true)\b/,
  'number': [// binary and octal integers
  /\b0(?:b[01_]+|o[0-7_]+)i?\b/i, // hexadecimal integers and floats
  /\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i, // decimal integers and floats
  /(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i],
  'operator': /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
  'builtin': /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/
});
prism.languages.insertBefore('go', 'string', {
  'char': {
    pattern: /'(?:\\.|[^'\\\r\n]){0,10}'/,
    greedy: true
  }
});
delete prism.languages.go['class-name'];
/* "prismjs/components/prism-markup-templating" */

(function (Prism) {
  /**
   * Returns the placeholder for the given language id and index.
   *
   * @param {string} language
   * @param {string|number} index
   * @returns {string}
   */
  function getPlaceholder(language, index) {
    return '___' + language.toUpperCase() + index + '___';
  }

  Object.defineProperties(Prism.languages['markup-templating'] = {}, {
    buildPlaceholders: {
      /**
       * Tokenize all inline templating expressions matching `placeholderPattern`.
       *
       * If `replaceFilter` is provided, only matches of `placeholderPattern` for which `replaceFilter` returns
       * `true` will be replaced.
       *
       * @param {object} env The environment of the `before-tokenize` hook.
       * @param {string} language The language id.
       * @param {RegExp} placeholderPattern The matches of this pattern will be replaced by placeholders.
       * @param {(match: string) => boolean} [replaceFilter]
       */
      value: function (env, language, placeholderPattern, replaceFilter) {
        if (env.language !== language) {
          return;
        }

        var tokenStack = env.tokenStack = [];
        env.code = env.code.replace(placeholderPattern, function (match) {
          if (typeof replaceFilter === 'function' && !replaceFilter(match)) {
            return match;
          }

          var i = tokenStack.length;
          var placeholder; // Check for existing strings

          while (env.code.indexOf(placeholder = getPlaceholder(language, i)) !== -1) {
            ++i;
          } // Create a sparse array


          tokenStack[i] = match;
          return placeholder;
        }); // Switch the grammar to markup

        env.grammar = Prism.languages.markup;
      }
    },
    tokenizePlaceholders: {
      /**
       * Replace placeholders with proper tokens after tokenizing.
       *
       * @param {object} env The environment of the `after-tokenize` hook.
       * @param {string} language The language id.
       */
      value: function (env, language) {
        if (env.language !== language || !env.tokenStack) {
          return;
        } // Switch the grammar back


        env.grammar = Prism.languages[language];
        var j = 0;
        var keys = Object.keys(env.tokenStack);

        function walkTokens(tokens) {
          for (var i = 0; i < tokens.length; i++) {
            // all placeholders are replaced already
            if (j >= keys.length) {
              break;
            }

            var token = tokens[i];

            if (typeof token === 'string' || token.content && typeof token.content === 'string') {
              var k = keys[j];
              var t = env.tokenStack[k];
              var s = typeof token === 'string' ? token : token.content;
              var placeholder = getPlaceholder(language, k);
              var index = s.indexOf(placeholder);

              if (index > -1) {
                ++j;
                var before = s.substring(0, index);
                var middle = new Prism.Token(language, Prism.tokenize(t, env.grammar), 'language-' + language, t);
                var after = s.substring(index + placeholder.length);
                var replacement = [];

                if (before) {
                  replacement.push.apply(replacement, walkTokens([before]));
                }

                replacement.push(middle);

                if (after) {
                  replacement.push.apply(replacement, walkTokens([after]));
                }

                if (typeof token === 'string') {
                  tokens.splice.apply(tokens, [i, 1].concat(replacement));
                } else {
                  token.content = replacement;
                }
              }
            } else if (token.content
            /* && typeof token.content !== 'string' */
            ) {
                walkTokens(token.content);
              }
          }

          return tokens;
        }

        walkTokens(env.tokens);
      }
    }
  });
})(prism);
/* "prismjs/components/prism-handlebars" */


(function (Prism) {
  Prism.languages.handlebars = {
    'comment': /\{\{![\s\S]*?\}\}/,
    'delimiter': {
      pattern: /^\{\{\{?|\}\}\}?$/,
      alias: 'punctuation'
    },
    'string': /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
    'number': /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/,
    'boolean': /\b(?:false|true)\b/,
    'block': {
      pattern: /^(\s*(?:~\s*)?)[#\/]\S+?(?=\s*(?:~\s*)?$|\s)/,
      lookbehind: true,
      alias: 'keyword'
    },
    'brackets': {
      pattern: /\[[^\]]+\]/,
      inside: {
        punctuation: /\[|\]/,
        variable: /[\s\S]+/
      }
    },
    'punctuation': /[!"#%&':()*+,.\/;<=>@\[\\\]^`{|}~]/,
    'variable': /[^!"#%&'()*+,\/;<=>@\[\\\]^`{|}~\s]+/
  };
  Prism.hooks.add('before-tokenize', function (env) {
    var handlebarsPattern = /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g;
    Prism.languages['markup-templating'].buildPlaceholders(env, 'handlebars', handlebarsPattern);
  });
  Prism.hooks.add('after-tokenize', function (env) {
    Prism.languages['markup-templating'].tokenizePlaceholders(env, 'handlebars');
  });
  Prism.languages.hbs = Prism.languages.handlebars;
})(prism);
/* "prismjs/components/prism-json" */
// https://www.json.org/json-en.html


prism.languages.json = {
  'property': {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
    lookbehind: true,
    greedy: true
  },
  'string': {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: true,
    greedy: true
  },
  'comment': {
    pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: true
  },
  'number': /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  'punctuation': /[{}[\],]/,
  'operator': /:/,
  'boolean': /\b(?:false|true)\b/,
  'null': {
    pattern: /\bnull\b/,
    alias: 'keyword'
  }
};
prism.languages.webmanifest = prism.languages.json;
/* "prismjs/components/prism-less" */

/* FIXME :
 :extend() is not handled specifically : its highlighting is buggy.
 Mixin usage must be inside a ruleset to be highlighted.
 At-rules (e.g. import) containing interpolations are buggy.
 Detached rulesets are highlighted as at-rules.
 A comment before a mixin usage prevents the latter to be properly highlighted.
 */

prism.languages.less = prism.languages.extend('css', {
  'comment': [/\/\*[\s\S]*?\*\//, {
    pattern: /(^|[^\\])\/\/.*/,
    lookbehind: true
  }],
  'atrule': {
    pattern: /@[\w-](?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};\s]|\s+(?!\s))*?(?=\s*\{)/,
    inside: {
      'punctuation': /[:()]/
    }
  },
  // selectors and mixins are considered the same
  'selector': {
    pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@\s]|\s+(?!\s))*?(?=\s*\{)/,
    inside: {
      // mixin parameters
      'variable': /@+[\w-]+/
    }
  },
  'property': /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/,
  'operator': /[+\-*\/]/
});
prism.languages.insertBefore('less', 'property', {
  'variable': [// Variable declaration (the colon must be consumed!)
  {
    pattern: /@[\w-]+\s*:/,
    inside: {
      'punctuation': /:/
    }
  }, // Variable usage
  /@@?[\w-]+/],
  'mixin-usage': {
    pattern: /([{;]\s*)[.#](?!\d)[\w-].*?(?=[(;])/,
    lookbehind: true,
    alias: 'function'
  }
});
/* "prismjs/components/prism-makefile" */

prism.languages.makefile = {
  'comment': {
    pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
    lookbehind: true
  },
  'string': {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  'builtin-target': {
    pattern: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
    alias: 'builtin'
  },
  'target': {
    pattern: /^(?:[^:=\s]|[ \t]+(?![\s:]))+(?=\s*:(?!=))/m,
    alias: 'symbol',
    inside: {
      'variable': /\$+(?:(?!\$)[^(){}:#=\s]+|(?=[({]))/
    }
  },
  'variable': /\$+(?:(?!\$)[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
  // Directives
  'keyword': /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,
  'function': {
    pattern: /(\()(?:abspath|addsuffix|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:list|s)?)(?=[ \t])/,
    lookbehind: true
  },
  'operator': /(?:::|[?:+!])?=|[|@]/,
  'punctuation': /[:;(){}]/
};
/* "prismjs/components/prism-objectivec" */

prism.languages.objectivec = prism.languages.extend('c', {
  'string': {
    pattern: /@?"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
    greedy: true
  },
  'keyword': /\b(?:asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|in|inline|int|long|register|return|self|short|signed|sizeof|static|struct|super|switch|typedef|typeof|union|unsigned|void|volatile|while)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
  'operator': /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/
});
delete prism.languages.objectivec['class-name'];
prism.languages.objc = prism.languages.objectivec;
/* "prismjs/components/prism-ocaml" */
// https://ocaml.org/manual/lex.html

prism.languages.ocaml = {
  'comment': {
    pattern: /\(\*[\s\S]*?\*\)/,
    greedy: true
  },
  'char': {
    pattern: /'(?:[^\\\r\n']|\\(?:.|[ox]?[0-9a-f]{1,3}))'/i,
    greedy: true
  },
  'string': [{
    pattern: /"(?:\\(?:[\s\S]|\r\n)|[^\\\r\n"])*"/,
    greedy: true
  }, {
    pattern: /\{([a-z_]*)\|[\s\S]*?\|\1\}/,
    greedy: true
  }],
  'number': [// binary and octal
  /\b(?:0b[01][01_]*|0o[0-7][0-7_]*)\b/i, // hexadecimal
  /\b0x[a-f0-9][a-f0-9_]*(?:\.[a-f0-9_]*)?(?:p[+-]?\d[\d_]*)?(?!\w)/i, // decimal
  /\b\d[\d_]*(?:\.[\d_]*)?(?:e[+-]?\d[\d_]*)?(?!\w)/i],
  'directive': {
    pattern: /\B#\w+/,
    alias: 'property'
  },
  'label': {
    pattern: /\B~\w+/,
    alias: 'property'
  },
  'type-variable': {
    pattern: /\B'\w+/,
    alias: 'function'
  },
  'variant': {
    pattern: /`\w+/,
    alias: 'symbol'
  },
  // For the list of keywords and operators,
  // see: http://caml.inria.fr/pub/docs/manual-ocaml/lex.html#sec84
  'keyword': /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|nonrec|object|of|open|private|rec|sig|struct|then|to|try|type|val|value|virtual|when|where|while|with)\b/,
  'boolean': /\b(?:false|true)\b/,
  'operator-like-punctuation': {
    pattern: /\[[<>|]|[>|]\]|\{<|>\}/,
    alias: 'punctuation'
  },
  // Custom operators are allowed
  'operator': /\.[.~]|:[=>]|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lsl|lsr|lxor|mod|or)\b/,
  'punctuation': /;;|::|[(){}\[\].,:;#]|\b_\b/
};
/* "prismjs/components/prism-python" */

prism.languages.python = {
  'comment': {
    pattern: /(^|[^\\])#.*/,
    lookbehind: true,
    greedy: true
  },
  'string-interpolation': {
    pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
    greedy: true,
    inside: {
      'interpolation': {
        // "{" <expression> <optional "!s", "!r", or "!a"> <optional ":" format specifier> "}"
        pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
        lookbehind: true,
        inside: {
          'format-spec': {
            pattern: /(:)[^:(){}]+(?=\}$)/,
            lookbehind: true
          },
          'conversion-option': {
            pattern: /![sra](?=[:}]$)/,
            alias: 'punctuation'
          },
          rest: null
        }
      },
      'string': /[\s\S]+/
    }
  },
  'triple-quoted-string': {
    pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
    greedy: true,
    alias: 'string'
  },
  'string': {
    pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
    greedy: true
  },
  'function': {
    pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
    lookbehind: true
  },
  'class-name': {
    pattern: /(\bclass\s+)\w+/i,
    lookbehind: true
  },
  'decorator': {
    pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
    lookbehind: true,
    alias: ['annotation', 'punctuation'],
    inside: {
      'punctuation': /\./
    }
  },
  'keyword': /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
  'builtin': /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  'boolean': /\b(?:False|None|True)\b/,
  'number': /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
  'operator': /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
  'punctuation': /[{}[\];(),.:]/
};
prism.languages.python['string-interpolation'].inside['interpolation'].inside.rest = prism.languages.python;
prism.languages.py = prism.languages.python;
/* "prismjs/components/prism-reason" */

prism.languages.reason = prism.languages.extend('clike', {
  'string': {
    pattern: /"(?:\\(?:\r\n|[\s\S])|[^\\\r\n"])*"/,
    greedy: true
  },
  // 'class-name' must be matched *after* 'constructor' defined below
  'class-name': /\b[A-Z]\w*/,
  'keyword': /\b(?:and|as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|method|module|mutable|new|nonrec|object|of|open|or|private|rec|sig|struct|switch|then|to|try|type|val|virtual|when|while|with)\b/,
  'operator': /\.{3}|:[:=]|\|>|->|=(?:==?|>)?|<=?|>=?|[|^?'#!~`]|[+\-*\/]\.?|\b(?:asr|land|lor|lsl|lsr|lxor|mod)\b/
});
prism.languages.insertBefore('reason', 'class-name', {
  'char': {
    pattern: /'(?:\\x[\da-f]{2}|\\o[0-3][0-7][0-7]|\\\d{3}|\\.|[^'\\\r\n])'/,
    greedy: true
  },
  // Negative look-ahead prevents from matching things like String.capitalize
  'constructor': /\b[A-Z]\w*\b(?!\s*\.)/,
  'label': {
    pattern: /\b[a-z]\w*(?=::)/,
    alias: 'symbol'
  }
}); // We can't match functions property, so let's not even try.

delete prism.languages.reason.function;
/* "prismjs/components/prism-sass" */

(function (Prism) {
  Prism.languages.sass = Prism.languages.extend('css', {
    // Sass comments don't need to be closed, only indented
    'comment': {
      pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t].+)*/m,
      lookbehind: true,
      greedy: true
    }
  });
  Prism.languages.insertBefore('sass', 'atrule', {
    // We want to consume the whole line
    'atrule-line': {
      // Includes support for = and + shortcuts
      pattern: /^(?:[ \t]*)[@+=].+/m,
      greedy: true,
      inside: {
        'atrule': /(?:@[\w-]+|[+=])/
      }
    }
  });
  delete Prism.languages.sass.atrule;
  var variable = /\$[-\w]+|#\{\$[-\w]+\}/;
  var operator = [/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|not|or)\b/, {
    pattern: /(\s)-(?=\s)/,
    lookbehind: true
  }];
  Prism.languages.insertBefore('sass', 'property', {
    // We want to consume the whole line
    'variable-line': {
      pattern: /^[ \t]*\$.+/m,
      greedy: true,
      inside: {
        'punctuation': /:/,
        'variable': variable,
        'operator': operator
      }
    },
    // We want to consume the whole line
    'property-line': {
      pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s].*)/m,
      greedy: true,
      inside: {
        'property': [/[^:\s]+(?=\s*:)/, {
          pattern: /(:)[^:\s]+/,
          lookbehind: true
        }],
        'punctuation': /:/,
        'variable': variable,
        'operator': operator,
        'important': Prism.languages.sass.important
      }
    }
  });
  delete Prism.languages.sass.property;
  delete Prism.languages.sass.important; // Now that whole lines for other patterns are consumed,
  // what's left should be selectors

  Prism.languages.insertBefore('sass', 'punctuation', {
    'selector': {
      pattern: /^([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*/m,
      lookbehind: true,
      greedy: true
    }
  });
})(prism);
/* "prismjs/components/prism-scss" */


prism.languages.scss = prism.languages.extend('css', {
  'comment': {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
    lookbehind: true
  },
  'atrule': {
    pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
    inside: {
      'rule': /@[\w-]+/ // See rest below

    }
  },
  // url, compassified
  'url': /(?:[-a-z]+-)?url(?=\()/i,
  // CSS selector regex is not appropriate for Sass
  // since there can be lot more things (var, @ directive, nesting..)
  // a selector must start at the end of a property or after a brace (end of other rules or nesting)
  // it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
  // the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
  // can "pass" as a selector- e.g: proper#{$erty})
  // this one was hard to do, so please be careful if you edit this one :)
  'selector': {
    // Initial look-ahead is used to prevent matching of blank selectors
    pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/,
    inside: {
      'parent': {
        pattern: /&/,
        alias: 'important'
      },
      'placeholder': /%[-\w]+/,
      'variable': /\$[-\w]+|#\{\$[-\w]+\}/
    }
  },
  'property': {
    pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
    inside: {
      'variable': /\$[-\w]+|#\{\$[-\w]+\}/
    }
  }
});
prism.languages.insertBefore('scss', 'atrule', {
  'keyword': [/@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i, {
    pattern: /( )(?:from|through)(?= )/,
    lookbehind: true
  }]
});
prism.languages.insertBefore('scss', 'important', {
  // var and interpolated vars
  'variable': /\$[-\w]+|#\{\$[-\w]+\}/
});
prism.languages.insertBefore('scss', 'function', {
  'module-modifier': {
    pattern: /\b(?:as|hide|show|with)\b/i,
    alias: 'keyword'
  },
  'placeholder': {
    pattern: /%[-\w]+/,
    alias: 'selector'
  },
  'statement': {
    pattern: /\B!(?:default|optional)\b/i,
    alias: 'keyword'
  },
  'boolean': /\b(?:false|true)\b/,
  'null': {
    pattern: /\bnull\b/,
    alias: 'keyword'
  },
  'operator': {
    pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|not|or)(?=\s)/,
    lookbehind: true
  }
});
prism.languages.scss['atrule'].inside.rest = prism.languages.scss;
/* "prismjs/components/prism-stylus" */

(function (Prism) {
  var unit = {
    pattern: /(\b\d+)(?:%|[a-z]+)/,
    lookbehind: true
  }; // 123 -123 .123 -.123 12.3 -12.3

  var number = {
    pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/,
    lookbehind: true
  };
  var inside = {
    'comment': {
      pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
      lookbehind: true
    },
    'url': {
      pattern: /\burl\((["']?).*?\1\)/i,
      greedy: true
    },
    'string': {
      pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
      greedy: true
    },
    'interpolation': null,
    // See below
    'func': null,
    // See below
    'important': /\B!(?:important|optional)\b/i,
    'keyword': {
      pattern: /(^|\s+)(?:(?:else|for|if|return|unless)(?=\s|$)|@[\w-]+)/,
      lookbehind: true
    },
    'hexcode': /#[\da-f]{3,6}/i,
    'color': [/\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i, {
      pattern: /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
      inside: {
        'unit': unit,
        'number': number,
        'function': /[\w-]+(?=\()/,
        'punctuation': /[(),]/
      }
    }],
    'entity': /\\[\da-f]{1,8}/i,
    'unit': unit,
    'boolean': /\b(?:false|true)\b/,
    'operator': [// We want non-word chars around "-" because it is
    // accepted in property names.
    /~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.{2,3}|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/],
    'number': number,
    'punctuation': /[{}()\[\];:,]/
  };
  inside['interpolation'] = {
    pattern: /\{[^\r\n}:]+\}/,
    alias: 'variable',
    inside: {
      'delimiter': {
        pattern: /^\{|\}$/,
        alias: 'punctuation'
      },
      rest: inside
    }
  };
  inside['func'] = {
    pattern: /[\w-]+\([^)]*\).*/,
    inside: {
      'function': /^[^(]+/,
      rest: inside
    }
  };
  Prism.languages.stylus = {
    'atrule-declaration': {
      pattern: /(^[ \t]*)@.+/m,
      lookbehind: true,
      inside: {
        'atrule': /^@[\w-]+/,
        rest: inside
      }
    },
    'variable-declaration': {
      pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:\{[^{}]*\}|\S.*|$)/m,
      lookbehind: true,
      inside: {
        'variable': /^\S+/,
        rest: inside
      }
    },
    'statement': {
      pattern: /(^[ \t]*)(?:else|for|if|return|unless)[ \t].+/m,
      lookbehind: true,
      inside: {
        'keyword': /^\S+/,
        rest: inside
      }
    },
    // A property/value pair cannot end with a comma or a brace
    // It cannot have indented content unless it ended with a semicolon
    'property-declaration': {
      pattern: /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)(?!\s)[^{\r\n]*(?:;|[^{\r\n,]$(?!(?:\r?\n|\r)(?:\{|\2[ \t])))/m,
      lookbehind: true,
      inside: {
        'property': {
          pattern: /^[^\s:]+/,
          inside: {
            'interpolation': inside.interpolation
          }
        },
        rest: inside
      }
    },
    // A selector can contain parentheses only as part of a pseudo-element
    // It can span multiple lines.
    // It must end with a comma or an accolade or have indented content.
    'selector': {
      pattern: /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\)|(?![\w-]))|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\)|(?![\w-]))|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t])))/m,
      lookbehind: true,
      inside: {
        'interpolation': inside.interpolation,
        'comment': inside.comment,
        'punctuation': /[{},]/
      }
    },
    'func': inside.func,
    'string': inside.string,
    'comment': {
      pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
      lookbehind: true,
      greedy: true
    },
    'interpolation': inside.interpolation,
    'punctuation': /[{}()\[\];:.]/
  };
})(prism);
/* "prismjs/components/prism-tsx" */


(function (Prism) {
  var typescript = Prism.util.clone(Prism.languages.typescript);
  Prism.languages.tsx = Prism.languages.extend('jsx', typescript); // doesn't work with TS because TS is too complex

  delete Prism.languages.tsx['parameter'];
  delete Prism.languages.tsx['literal-property']; // This will prevent collisions between TSX tags and TS generic types.
  // Idea by https://github.com/karlhorky
  // Discussion: https://github.com/PrismJS/prism/issues/2594#issuecomment-710666928

  var tag = Prism.languages.tsx.tag;
  tag.pattern = RegExp(/(^|[^\w$]|(?=<\/))/.source + '(?:' + tag.pattern.source + ')', tag.pattern.flags);
  tag.lookbehind = true;
})(prism);
/* "prismjs/components/prism-wasm" */


prism.languages.wasm = {
  'comment': [/\(;[\s\S]*?;\)/, {
    pattern: /;;.*/,
    greedy: true
  }],
  'string': {
    pattern: /"(?:\\[\s\S]|[^"\\])*"/,
    greedy: true
  },
  'keyword': [{
    pattern: /\b(?:align|offset)=/,
    inside: {
      'operator': /=/
    }
  }, {
    pattern: /\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|neg?|nearest|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|sqrt|store(?:8|16|32)?|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))?|memory\.(?:grow|size))\b/,
    inside: {
      'punctuation': /\./
    }
  }, /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/],
  'variable': /\$[\w!#$%&'*+\-./:<=>?@\\^`|~]+/,
  'number': /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/,
  'punctuation': /[()]/
};

/* harmony default export */ __webpack_exports__["default"] = (prism);


/***/ }),

/***/ "./node_modules/prism-react-renderer/themes/duotoneDark/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/prism-react-renderer/themes/duotoneDark/index.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Duotone Dark
// Author: Simurai, adapted from DuoTone themes for Atom (http://simurai.com/projects/2016/01/01/duotone-themes)
// Conversion: Bram de Haan (http://atelierbram.github.io/Base2Tone-prism/output/prism/prism-base2tone-evening-dark.css)
// Generated with Base16 Builder (https://github.com/base16-builder/base16-builder)
var theme = {
  plain: {
    backgroundColor: "#2a2734",
    color: "#9a86fd"
  },
  styles: [{
    types: ["comment", "prolog", "doctype", "cdata", "punctuation"],
    style: {
      color: "#6c6783"
    }
  }, {
    types: ["namespace"],
    style: {
      opacity: 0.7
    }
  }, {
    types: ["tag", "operator", "number"],
    style: {
      color: "#e09142"
    }
  }, {
    types: ["property", "function"],
    style: {
      color: "#9a86fd"
    }
  }, {
    types: ["tag-id", "selector", "atrule-id"],
    style: {
      color: "#eeebff"
    }
  }, {
    types: ["attr-name"],
    style: {
      color: "#c4b9fe"
    }
  }, {
    types: ["boolean", "string", "entity", "url", "attr-value", "keyword", "control", "directive", "unit", "statement", "regex", "atrule", "placeholder", "variable"],
    style: {
      color: "#ffcc99"
    }
  }, {
    types: ["deleted"],
    style: {
      textDecorationLine: "line-through"
    }
  }, {
    types: ["inserted"],
    style: {
      textDecorationLine: "underline"
    }
  }, {
    types: ["italic"],
    style: {
      fontStyle: "italic"
    }
  }, {
    types: ["important", "bold"],
    style: {
      fontWeight: "bold"
    }
  }, {
    types: ["important"],
    style: {
      color: "#c4b9fe"
    }
  }]
};

/* harmony default export */ __webpack_exports__["default"] = (theme);


/***/ }),

/***/ "./src/components/Highlight2.js":
/*!**************************************!*\
  !*** ./src/components/Highlight2.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var C_Users_radan_Documents_Dev_table_docs_node_modules_next_node_modules_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/extends */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var C_Users_radan_Documents_Dev_table_docs_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var C_Users_radan_Documents_Dev_table_docs_node_modules_next_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prism_react_renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prism-react-renderer */ "./node_modules/prism-react-renderer/dist/index.js");




var _jsxFileName = "C:\\Users\\radan\\Documents\\Dev\\table\\docs\\src\\components\\Highlight2.js",
    _this = undefined;

var __jsx = react__WEBPACK_IMPORTED_MODULE_3__["createElement"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(C_Users_radan_Documents_Dev_table_docs_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


 // Original: https://raw.githubusercontent.com/PrismJS/prism-themes/master/themes/prism-ghcolors.css

/*:: import type { PrismTheme } from '../src/types' */

var theme
/*: PrismTheme */
= {
  plain: {
    color: '#293742',
    borderRadius: 12,
    fontFamily: "SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace",
    fontSize: 14,
    lineHeight: '1.5'
  },
  styles: [{
    types: ['comment', 'prolog', 'doctype', 'cdata'],
    style: {
      color: '#A7B6C2',
      fontStyle: 'italic'
    }
  }, {
    types: ['namespace'],
    style: {
      opacity: 0.7
    }
  }, {
    types: ['string', 'attr-value'],
    style: {
      color: '#DB2C6F'
    }
  }, {
    types: ['punctuation', 'operator'],
    style: {
      color: '#394B59'
    }
  }, {
    types: ['entity', 'url', 'symbol', 'number', 'boolean', 'variable', 'constant', 'property', 'regex', 'inserted'],
    style: {
      color: '#36acaa'
    }
  }, {
    types: ['atrule', 'keyword', 'attr-name', 'selector'],
    style: {
      color: '#00B3A4'
    }
  }, {
    types: ['function', 'deleted', 'tag'],
    style: {
      color: '#DB2C6F'
    }
  }, {
    types: ['function-variable'],
    style: {
      color: '#634DBF'
    }
  }, {
    types: ['tag', 'selector', 'keyword'],
    style: {
      color: '#1a56db'
    }
  }]
};

var Code = function Code(_ref) {
  var children = _ref.children,
      codeString = _ref.codeString,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? 'language-js' : _ref$className,
      props = Object(C_Users_radan_Documents_Dev_table_docs_node_modules_next_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__["default"])(_ref, ["children", "codeString", "className"]);

  var language = className.replace(/language-/, '');
  return __jsx(prism_react_renderer__WEBPACK_IMPORTED_MODULE_4__["default"], Object(C_Users_radan_Documents_Dev_table_docs_node_modules_next_node_modules_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, prism_react_renderer__WEBPACK_IMPORTED_MODULE_4__["defaultProps"], {
    code: children.trim(),
    language: language,
    theme: theme,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 10
    }
  }), function (_ref2) {
    var className = _ref2.className,
        style = _ref2.style,
        tokens = _ref2.tokens,
        getLineProps = _ref2.getLineProps,
        getTokenProps = _ref2.getTokenProps;
    return __jsx("pre", {
      className: className + ' bg-gray-50 pb-4 pt-4 pr-4 overflow-scroll',
      style: _objectSpread(_objectSpread({}, style), {}, {
        border: '1px solid #eee',
        fontSize: 13,
        lineHeight: '1.5'
      }),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 79,
        columnNumber: 11
      }
    }, tokens.map(function (line, i) {
      return __jsx("div", Object(C_Users_radan_Documents_Dev_table_docs_node_modules_next_node_modules_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        key: i
      }, getLineProps({
        line: line,
        key: i
      }), {
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84,
          columnNumber: 36
        }
      }), tokens.length > 1 ? __jsx("span", {
        "aria-hidden": "true",
        className: "select-none text-gray-300 text-right w-5 inline-block mx-2",
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 88,
          columnNumber: 36
        }
      }, i + 1) : __jsx("span", {
        className: "mx-2 w-5",
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90,
          columnNumber: 27
        }
      }), ' ', line.map(function (token, key) {
        return __jsx("span", Object(C_Users_radan_Documents_Dev_table_docs_node_modules_next_node_modules_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
          key: key
        }, getTokenProps({
          token: token,
          key: key
        }), {
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 91,
            columnNumber: 41
          }
        }));
      }));
    }));
  });
};

_c = Code;
/* harmony default export */ __webpack_exports__["default"] = (Code);

var _c;

$RefreshReg$(_c, "Code");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/dist/compiled/webpack/harmony-module.js */ "./node_modules/next/dist/compiled/webpack/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL3ByaXNtLXJlYWN0LXJlbmRlcmVyL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9wcmlzbS1yZWFjdC1yZW5kZXJlci9wcmlzbS9pbmRleC5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL3ByaXNtLXJlYWN0LXJlbmRlcmVyL3RoZW1lcy9kdW90b25lRGFyay9pbmRleC5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvSGlnaGxpZ2h0Mi5qcyJdLCJuYW1lcyI6WyJ0aGVtZSIsInBsYWluIiwiY29sb3IiLCJib3JkZXJSYWRpdXMiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJsaW5lSGVpZ2h0Iiwic3R5bGVzIiwidHlwZXMiLCJzdHlsZSIsImZvbnRTdHlsZSIsIm9wYWNpdHkiLCJDb2RlIiwiY2hpbGRyZW4iLCJjb2RlU3RyaW5nIiwiY2xhc3NOYW1lIiwicHJvcHMiLCJsYW5ndWFnZSIsInJlcGxhY2UiLCJkZWZhdWx0UHJvcHMiLCJ0cmltIiwidG9rZW5zIiwiZ2V0TGluZVByb3BzIiwiZ2V0VG9rZW5Qcm9wcyIsImJvcmRlciIsIm1hcCIsImxpbmUiLCJpIiwia2V5IiwibGVuZ3RoIiwidG9rZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXNDO0FBQ2U7QUFDWDtBQUNSOztBQUVsQztBQUNBO0FBQ0EsU0FBUyx1REFBSztBQUNkLFNBQVMsMkRBQUs7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxHQUFHO0FBQzVDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7O0FBRXBCLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7O0FBRXBCLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7O0FBRXBCLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjs7QUFFcEIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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anMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJpc20gZnJvbSAnLi4vcHJpc20vaW5kZXguanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQcmlzbSB9IGZyb20gJy4uL3ByaXNtL2luZGV4LmpzJztcbmltcG9ydCB0aGVtZSBmcm9tICcuLi90aGVtZXMvZHVvdG9uZURhcmsnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuXG52YXIgZGVmYXVsdFByb3BzID0ge1xuICAvLyAkRmxvd0ZpeE1lXG4gIFByaXNtOiBwcmlzbSxcbiAgdGhlbWU6IHRoZW1lXG59O1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxudmFyIG5ld2xpbmVSZSA9IC9cXHJcXG58XFxyfFxcbi87IC8vIEVtcHR5IGxpbmVzIG5lZWQgdG8gY29udGFpbiBhIHNpbmdsZSBlbXB0eSB0b2tlbiwgZGVub3RlZCB3aXRoIHsgZW1wdHk6IHRydWUgfVxuXG52YXIgbm9ybWFsaXplRW1wdHlMaW5lcyA9IGZ1bmN0aW9uIChsaW5lKSB7XG4gIGlmIChsaW5lLmxlbmd0aCA9PT0gMCkge1xuICAgIGxpbmUucHVzaCh7XG4gICAgICB0eXBlczogW1wicGxhaW5cIl0sXG4gICAgICBjb250ZW50OiBcIlxcblwiLFxuICAgICAgZW1wdHk6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChsaW5lLmxlbmd0aCA9PT0gMSAmJiBsaW5lWzBdLmNvbnRlbnQgPT09IFwiXCIpIHtcbiAgICBsaW5lWzBdLmNvbnRlbnQgPSBcIlxcblwiO1xuICAgIGxpbmVbMF0uZW1wdHkgPSB0cnVlO1xuICB9XG59O1xuXG52YXIgYXBwZW5kVHlwZXMgPSBmdW5jdGlvbiAodHlwZXMsIGFkZCkge1xuICB2YXIgdHlwZXNTaXplID0gdHlwZXMubGVuZ3RoO1xuXG4gIGlmICh0eXBlc1NpemUgPiAwICYmIHR5cGVzW3R5cGVzU2l6ZSAtIDFdID09PSBhZGQpIHtcbiAgICByZXR1cm4gdHlwZXM7XG4gIH1cblxuICByZXR1cm4gdHlwZXMuY29uY2F0KGFkZCk7XG59OyAvLyBUYWtlcyBhbiBhcnJheSBvZiBQcmlzbSdzIHRva2VucyBhbmQgZ3JvdXBzIHRoZW0gYnkgbGluZSwgdHVybmluZyBwbGFpblxuLy8gc3RyaW5ncyBpbnRvIHRva2VucyBhcyB3ZWxsLiBUb2tlbnMgY2FuIGJlY29tZSByZWN1cnNpdmUgaW4gc29tZSBjYXNlcyxcbi8vIHdoaWNoIG1lYW5zIHRoYXQgdGhlaXIgdHlwZXMgYXJlIGNvbmNhdGVuYXRlZC4gUGxhaW4tc3RyaW5nIHRva2VucyBob3dldmVyXG4vLyBhcmUgYWx3YXlzIG9mIHR5cGUgXCJwbGFpblwiLlxuLy8gVGhpcyBpcyBub3QgcmVjdXJzaXZlIHRvIGF2b2lkIGV4Y2VlZGluZyB0aGUgY2FsbC1zdGFjayBsaW1pdCwgc2luY2UgaXQncyB1bmNsZWFyXG4vLyBob3cgbmVzdGVkIFByaXNtJ3MgdG9rZW5zIGNhbiBiZWNvbWVcblxuXG52YXIgbm9ybWFsaXplVG9rZW5zID0gZnVuY3Rpb24gKHRva2Vucykge1xuICB2YXIgdHlwZUFyclN0YWNrID0gW1tdXTtcbiAgdmFyIHRva2VuQXJyU3RhY2sgPSBbdG9rZW5zXTtcbiAgdmFyIHRva2VuQXJySW5kZXhTdGFjayA9IFswXTtcbiAgdmFyIHRva2VuQXJyU2l6ZVN0YWNrID0gW3Rva2Vucy5sZW5ndGhdO1xuICB2YXIgaSA9IDA7XG4gIHZhciBzdGFja0luZGV4ID0gMDtcbiAgdmFyIGN1cnJlbnRMaW5lID0gW107XG4gIHZhciBhY2MgPSBbY3VycmVudExpbmVdO1xuXG4gIHdoaWxlIChzdGFja0luZGV4ID4gLTEpIHtcbiAgICB3aGlsZSAoKGkgPSB0b2tlbkFyckluZGV4U3RhY2tbc3RhY2tJbmRleF0rKykgPCB0b2tlbkFyclNpemVTdGFja1tzdGFja0luZGV4XSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSB2b2lkIDA7XG4gICAgICB2YXIgdHlwZXMgPSB0eXBlQXJyU3RhY2tbc3RhY2tJbmRleF07XG4gICAgICB2YXIgdG9rZW5BcnIgPSB0b2tlbkFyclN0YWNrW3N0YWNrSW5kZXhdO1xuICAgICAgdmFyIHRva2VuID0gdG9rZW5BcnJbaV07IC8vIERldGVybWluZSBjb250ZW50IGFuZCBhcHBlbmQgdHlwZSB0byB0eXBlcyBpZiBuZWNlc3NhcnlcblxuICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB0eXBlcyA9IHN0YWNrSW5kZXggPiAwID8gdHlwZXMgOiBbXCJwbGFpblwiXTtcbiAgICAgICAgY29udGVudCA9IHRva2VuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHlwZXMgPSBhcHBlbmRUeXBlcyh0eXBlcywgdG9rZW4udHlwZSk7XG5cbiAgICAgICAgaWYgKHRva2VuLmFsaWFzKSB7XG4gICAgICAgICAgdHlwZXMgPSBhcHBlbmRUeXBlcyh0eXBlcywgdG9rZW4uYWxpYXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGVudCA9IHRva2VuLmNvbnRlbnQ7XG4gICAgICB9IC8vIElmIHRva2VuLmNvbnRlbnQgaXMgYW4gYXJyYXksIGluY3JlYXNlIHRoZSBzdGFjayBkZXB0aCBhbmQgcmVwZWF0IHRoaXMgd2hpbGUtbG9vcFxuXG5cbiAgICAgIGlmICh0eXBlb2YgY29udGVudCAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICBzdGFja0luZGV4Kys7XG4gICAgICAgIHR5cGVBcnJTdGFjay5wdXNoKHR5cGVzKTtcbiAgICAgICAgdG9rZW5BcnJTdGFjay5wdXNoKGNvbnRlbnQpO1xuICAgICAgICB0b2tlbkFyckluZGV4U3RhY2sucHVzaCgwKTtcbiAgICAgICAgdG9rZW5BcnJTaXplU3RhY2sucHVzaChjb250ZW50Lmxlbmd0aCk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfSAvLyBTcGxpdCBieSBuZXdsaW5lc1xuXG5cbiAgICAgIHZhciBzcGxpdEJ5TmV3bGluZXMgPSBjb250ZW50LnNwbGl0KG5ld2xpbmVSZSk7XG4gICAgICB2YXIgbmV3bGluZUNvdW50ID0gc3BsaXRCeU5ld2xpbmVzLmxlbmd0aDtcbiAgICAgIGN1cnJlbnRMaW5lLnB1c2goe1xuICAgICAgICB0eXBlczogdHlwZXMsXG4gICAgICAgIGNvbnRlbnQ6IHNwbGl0QnlOZXdsaW5lc1swXVxuICAgICAgfSk7IC8vIENyZWF0ZSBhIG5ldyBsaW5lIGZvciBlYWNoIHN0cmluZyBvbiBhIG5ldyBsaW5lXG5cbiAgICAgIGZvciAodmFyIGkkMSA9IDE7IGkkMSA8IG5ld2xpbmVDb3VudDsgaSQxKyspIHtcbiAgICAgICAgbm9ybWFsaXplRW1wdHlMaW5lcyhjdXJyZW50TGluZSk7XG4gICAgICAgIGFjYy5wdXNoKGN1cnJlbnRMaW5lID0gW10pO1xuICAgICAgICBjdXJyZW50TGluZS5wdXNoKHtcbiAgICAgICAgICB0eXBlczogdHlwZXMsXG4gICAgICAgICAgY29udGVudDogc3BsaXRCeU5ld2xpbmVzW2kkMV1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSAvLyBEZWNyZWF0ZSB0aGUgc3RhY2sgZGVwdGhcblxuXG4gICAgc3RhY2tJbmRleC0tO1xuICAgIHR5cGVBcnJTdGFjay5wb3AoKTtcbiAgICB0b2tlbkFyclN0YWNrLnBvcCgpO1xuICAgIHRva2VuQXJySW5kZXhTdGFjay5wb3AoKTtcbiAgICB0b2tlbkFyclNpemVTdGFjay5wb3AoKTtcbiAgfVxuXG4gIG5vcm1hbGl6ZUVtcHR5TGluZXMoY3VycmVudExpbmUpO1xuICByZXR1cm4gYWNjO1xufTtcblxudmFyIHRoZW1lVG9EaWN0ID0gZnVuY3Rpb24gKHRoZW1lLCBsYW5ndWFnZSkge1xuICB2YXIgcGxhaW4gPSB0aGVtZS5wbGFpbjsgLy8gJEZsb3dGaXhNZVxuXG4gIHZhciBiYXNlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdmFyIHRoZW1lRGljdCA9IHRoZW1lLnN0eWxlcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgdGhlbWVFbnRyeSkge1xuICAgIHZhciBsYW5ndWFnZXMgPSB0aGVtZUVudHJ5Lmxhbmd1YWdlcztcbiAgICB2YXIgc3R5bGUgPSB0aGVtZUVudHJ5LnN0eWxlO1xuXG4gICAgaWYgKGxhbmd1YWdlcyAmJiAhbGFuZ3VhZ2VzLmluY2x1ZGVzKGxhbmd1YWdlKSkge1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9XG5cbiAgICB0aGVtZUVudHJ5LnR5cGVzLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgIC8vICRGbG93Rml4TWVcbiAgICAgIHZhciBhY2NTdHlsZSA9IF9leHRlbmRzKHt9LCBhY2NbdHlwZV0sIHN0eWxlKTtcblxuICAgICAgYWNjW3R5cGVdID0gYWNjU3R5bGU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFjYztcbiAgfSwgYmFzZSk7IC8vICRGbG93Rml4TWVcblxuICB0aGVtZURpY3Qucm9vdCA9IHBsYWluOyAvLyAkRmxvd0ZpeE1lXG5cbiAgdGhlbWVEaWN0LnBsYWluID0gX2V4dGVuZHMoe30sIHBsYWluLCB7XG4gICAgYmFja2dyb3VuZENvbG9yOiBudWxsXG4gIH0pO1xuICByZXR1cm4gdGhlbWVEaWN0O1xufTtcblxuZnVuY3Rpb24gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBleGNsdWRlKSB7XG4gIHZhciB0YXJnZXQgPSB7fTtcblxuICBmb3IgKHZhciBrIGluIG9iaikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGspICYmIGV4Y2x1ZGUuaW5kZXhPZihrKSA9PT0gLTEpIHRhcmdldFtrXSA9IG9ialtrXTtcblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG52YXIgSGlnaGxpZ2h0ID0gLypAX19QVVJFX18qL2Z1bmN0aW9uIChDb21wb25lbnQpIHtcbiAgZnVuY3Rpb24gSGlnaGxpZ2h0KCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuICAgIHZhciBhcmdzID0gW10sXG4gICAgICAgIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cbiAgICB3aGlsZSAobGVuLS0pIGFyZ3NbbGVuXSA9IGFyZ3VtZW50c1tsZW5dO1xuXG4gICAgQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3MpO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KHRoaXMsIFwiZ2V0VGhlbWVEaWN0XCIsIGZ1bmN0aW9uIChwcm9wcykge1xuICAgICAgaWYgKHRoaXMkMS50aGVtZURpY3QgIT09IHVuZGVmaW5lZCAmJiBwcm9wcy50aGVtZSA9PT0gdGhpcyQxLnByZXZUaGVtZSAmJiBwcm9wcy5sYW5ndWFnZSA9PT0gdGhpcyQxLnByZXZMYW5ndWFnZSkge1xuICAgICAgICByZXR1cm4gdGhpcyQxLnRoZW1lRGljdDtcbiAgICAgIH1cblxuICAgICAgdGhpcyQxLnByZXZUaGVtZSA9IHByb3BzLnRoZW1lO1xuICAgICAgdGhpcyQxLnByZXZMYW5ndWFnZSA9IHByb3BzLmxhbmd1YWdlO1xuICAgICAgdmFyIHRoZW1lRGljdCA9IHByb3BzLnRoZW1lID8gdGhlbWVUb0RpY3QocHJvcHMudGhlbWUsIHByb3BzLmxhbmd1YWdlKSA6IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybiB0aGlzJDEudGhlbWVEaWN0ID0gdGhlbWVEaWN0O1xuICAgIH0pO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KHRoaXMsIFwiZ2V0TGluZVByb3BzXCIsIGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgIHZhciBrZXkgPSByZWYua2V5O1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IHJlZi5jbGFzc05hbWU7XG4gICAgICB2YXIgc3R5bGUgPSByZWYuc3R5bGU7XG4gICAgICB2YXIgcmVzdCQxID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMocmVmLCBbXCJrZXlcIiwgXCJjbGFzc05hbWVcIiwgXCJzdHlsZVwiLCBcImxpbmVcIl0pO1xuICAgICAgdmFyIHJlc3QgPSByZXN0JDE7XG5cbiAgICAgIHZhciBvdXRwdXQgPSBfZXh0ZW5kcyh7fSwgcmVzdCwge1xuICAgICAgICBjbGFzc05hbWU6IFwidG9rZW4tbGluZVwiLFxuICAgICAgICBzdHlsZTogdW5kZWZpbmVkLFxuICAgICAgICBrZXk6IHVuZGVmaW5lZFxuICAgICAgfSk7XG5cbiAgICAgIHZhciB0aGVtZURpY3QgPSB0aGlzJDEuZ2V0VGhlbWVEaWN0KHRoaXMkMS5wcm9wcyk7XG5cbiAgICAgIGlmICh0aGVtZURpY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvdXRwdXQuc3R5bGUgPSB0aGVtZURpY3QucGxhaW47XG4gICAgICB9XG5cbiAgICAgIGlmIChzdHlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG91dHB1dC5zdHlsZSA9IG91dHB1dC5zdHlsZSAhPT0gdW5kZWZpbmVkID8gX2V4dGVuZHMoe30sIG91dHB1dC5zdHlsZSwgc3R5bGUpIDogc3R5bGU7XG4gICAgICB9XG5cbiAgICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvdXRwdXQua2V5ID0ga2V5O1xuICAgICAgfVxuXG4gICAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgIG91dHB1dC5jbGFzc05hbWUgKz0gXCIgXCIgKyBjbGFzc05hbWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfSk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkodGhpcywgXCJnZXRTdHlsZUZvclRva2VuXCIsIGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgIHZhciB0eXBlcyA9IHJlZi50eXBlcztcbiAgICAgIHZhciBlbXB0eSA9IHJlZi5lbXB0eTtcbiAgICAgIHZhciB0eXBlc1NpemUgPSB0eXBlcy5sZW5ndGg7XG4gICAgICB2YXIgdGhlbWVEaWN0ID0gdGhpcyQxLmdldFRoZW1lRGljdCh0aGlzJDEucHJvcHMpO1xuXG4gICAgICBpZiAodGhlbWVEaWN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSBpZiAodHlwZXNTaXplID09PSAxICYmIHR5cGVzWzBdID09PSBcInBsYWluXCIpIHtcbiAgICAgICAgcmV0dXJuIGVtcHR5ID8ge1xuICAgICAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCJcbiAgICAgICAgfSA6IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSBpZiAodHlwZXNTaXplID09PSAxICYmICFlbXB0eSkge1xuICAgICAgICByZXR1cm4gdGhlbWVEaWN0W3R5cGVzWzBdXTtcbiAgICAgIH1cblxuICAgICAgdmFyIGJhc2VTdHlsZSA9IGVtcHR5ID8ge1xuICAgICAgICBkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiXG4gICAgICB9IDoge307IC8vICRGbG93Rml4TWVcblxuICAgICAgdmFyIHR5cGVTdHlsZXMgPSB0eXBlcy5tYXAoZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoZW1lRGljdFt0eXBlXTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24uYXBwbHkoT2JqZWN0LCBbYmFzZVN0eWxlXS5jb25jYXQodHlwZVN0eWxlcykpO1xuICAgIH0pO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KHRoaXMsIFwiZ2V0VG9rZW5Qcm9wc1wiLCBmdW5jdGlvbiAocmVmKSB7XG4gICAgICB2YXIga2V5ID0gcmVmLmtleTtcbiAgICAgIHZhciBjbGFzc05hbWUgPSByZWYuY2xhc3NOYW1lO1xuICAgICAgdmFyIHN0eWxlID0gcmVmLnN0eWxlO1xuICAgICAgdmFyIHRva2VuID0gcmVmLnRva2VuO1xuICAgICAgdmFyIHJlc3QkMSA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHJlZiwgW1wia2V5XCIsIFwiY2xhc3NOYW1lXCIsIFwic3R5bGVcIiwgXCJ0b2tlblwiXSk7XG4gICAgICB2YXIgcmVzdCA9IHJlc3QkMTtcblxuICAgICAgdmFyIG91dHB1dCA9IF9leHRlbmRzKHt9LCByZXN0LCB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJ0b2tlbiBcIiArIHRva2VuLnR5cGVzLmpvaW4oXCIgXCIpLFxuICAgICAgICBjaGlsZHJlbjogdG9rZW4uY29udGVudCxcbiAgICAgICAgc3R5bGU6IHRoaXMkMS5nZXRTdHlsZUZvclRva2VuKHRva2VuKSxcbiAgICAgICAga2V5OiB1bmRlZmluZWRcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoc3R5bGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvdXRwdXQuc3R5bGUgPSBvdXRwdXQuc3R5bGUgIT09IHVuZGVmaW5lZCA/IF9leHRlbmRzKHt9LCBvdXRwdXQuc3R5bGUsIHN0eWxlKSA6IHN0eWxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3V0cHV0LmtleSA9IGtleTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICBvdXRwdXQuY2xhc3NOYW1lICs9IFwiIFwiICsgY2xhc3NOYW1lO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH0pO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KHRoaXMsIFwidG9rZW5pemVcIiwgZnVuY3Rpb24gKFByaXNtLCBjb2RlLCBncmFtbWFyLCBsYW5ndWFnZSkge1xuICAgICAgdmFyIGVudiA9IHtcbiAgICAgICAgY29kZTogY29kZSxcbiAgICAgICAgZ3JhbW1hcjogZ3JhbW1hcixcbiAgICAgICAgbGFuZ3VhZ2U6IGxhbmd1YWdlLFxuICAgICAgICB0b2tlbnM6IFtdXG4gICAgICB9O1xuICAgICAgUHJpc20uaG9va3MucnVuKFwiYmVmb3JlLXRva2VuaXplXCIsIGVudik7XG4gICAgICB2YXIgdG9rZW5zID0gZW52LnRva2VucyA9IFByaXNtLnRva2VuaXplKGVudi5jb2RlLCBlbnYuZ3JhbW1hciwgZW52Lmxhbmd1YWdlKTtcbiAgICAgIFByaXNtLmhvb2tzLnJ1bihcImFmdGVyLXRva2VuaXplXCIsIGVudik7XG4gICAgICByZXR1cm4gdG9rZW5zO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKENvbXBvbmVudCkgSGlnaGxpZ2h0Ll9fcHJvdG9fXyA9IENvbXBvbmVudDtcbiAgSGlnaGxpZ2h0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ29tcG9uZW50ICYmIENvbXBvbmVudC5wcm90b3R5cGUpO1xuICBIaWdobGlnaHQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSGlnaGxpZ2h0O1xuXG4gIEhpZ2hsaWdodC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciByZWYgPSB0aGlzLnByb3BzO1xuICAgIHZhciBQcmlzbSA9IHJlZi5QcmlzbTtcbiAgICB2YXIgbGFuZ3VhZ2UgPSByZWYubGFuZ3VhZ2U7XG4gICAgdmFyIGNvZGUgPSByZWYuY29kZTtcbiAgICB2YXIgY2hpbGRyZW4gPSByZWYuY2hpbGRyZW47XG4gICAgdmFyIHRoZW1lRGljdCA9IHRoaXMuZ2V0VGhlbWVEaWN0KHRoaXMucHJvcHMpO1xuICAgIHZhciBncmFtbWFyID0gUHJpc20ubGFuZ3VhZ2VzW2xhbmd1YWdlXTtcbiAgICB2YXIgbWl4ZWRUb2tlbnMgPSBncmFtbWFyICE9PSB1bmRlZmluZWQgPyB0aGlzLnRva2VuaXplKFByaXNtLCBjb2RlLCBncmFtbWFyLCBsYW5ndWFnZSkgOiBbY29kZV07XG4gICAgdmFyIHRva2VucyA9IG5vcm1hbGl6ZVRva2VucyhtaXhlZFRva2Vucyk7XG4gICAgcmV0dXJuIGNoaWxkcmVuKHtcbiAgICAgIHRva2VuczogdG9rZW5zLFxuICAgICAgY2xhc3NOYW1lOiBcInByaXNtLWNvZGUgbGFuZ3VhZ2UtXCIgKyBsYW5ndWFnZSxcbiAgICAgIHN0eWxlOiB0aGVtZURpY3QgIT09IHVuZGVmaW5lZCA/IHRoZW1lRGljdC5yb290IDoge30sXG4gICAgICBnZXRMaW5lUHJvcHM6IHRoaXMuZ2V0TGluZVByb3BzLFxuICAgICAgZ2V0VG9rZW5Qcm9wczogdGhpcy5nZXRUb2tlblByb3BzXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEhpZ2hsaWdodDtcbn0oQ29tcG9uZW50KTtcblxuZXhwb3J0IGRlZmF1bHQgSGlnaGxpZ2h0O1xuZXhwb3J0IHsgZGVmYXVsdFByb3BzIH07XG4iLCIvKipcbiAqIFByaXNtOiBMaWdodHdlaWdodCwgcm9idXN0LCBlbGVnYW50IHN5bnRheCBoaWdobGlnaHRpbmdcbiAqXG4gKiBAbGljZW5zZSBNSVQgPGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUPlxuICogQGF1dGhvciBMZWEgVmVyb3UgPGh0dHBzOi8vbGVhLnZlcm91Lm1lPlxuICogQG5hbWVzcGFjZVxuICogQHB1YmxpY1xuICovXG4vKipcbiAqIHByaXNtLXJlYWN0LXJlbmRlcmVyOlxuICogVGhpcyBmaWxlIGhhcyBiZWVuIG1vZGlmaWVkIHRvIHJlbW92ZTpcbiAqIC0gZ2xvYmFscyBhbmQgd2luZG93IGRlcGVuZGVuY3lcbiAqIC0gd29ya2VyIHN1cHBvcnRcbiAqIC0gaGlnaGxpZ2h0QWxsIGFuZCBvdGhlciBlbGVtZW50IGRlcGVuZGVudCBtZXRob2RzXG4gKiAtIF8uaG9va3MgaGVscGVyc1xuICogLSBVTUQvbm9kZS1zcGVjaWZpYyBoYWNrc1xuICogSXQgaGFzIGFsc28gYmVlbiBydW4gdGhyb3VnaCBwcmV0dGllclxuICovXG5cbiB2YXIgUHJpc20gPSAoZnVuY3Rpb24gKCkge1xuXG5cdC8vIFByaXZhdGUgaGVscGVyIHZhcnNcblx0dmFyIGxhbmcgPSAvKD86XnxcXHMpbGFuZyg/OnVhZ2UpPy0oW1xcdy1dKykoPz1cXHN8JCkvaTtcblx0dmFyIHVuaXF1ZUlkID0gMDtcblxuXHQvLyBUaGUgZ3JhbW1hciBvYmplY3QgZm9yIHBsYWludGV4dFxuXHR2YXIgcGxhaW5UZXh0R3JhbW1hciA9IHt9O1xuXG5cblx0dmFyIF8gPSB7XG5cdFx0LyoqXG5cdFx0ICogQSBuYW1lc3BhY2UgZm9yIHV0aWxpdHkgbWV0aG9kcy5cblx0XHQgKlxuXHRcdCAqIEFsbCBmdW5jdGlvbiBpbiB0aGlzIG5hbWVzcGFjZSB0aGF0IGFyZSBub3QgZXhwbGljaXRseSBtYXJrZWQgYXMgX3B1YmxpY18gYXJlIGZvciBfX2ludGVybmFsIHVzZSBvbmx5X18gYW5kIG1heVxuXHRcdCAqIGNoYW5nZSBvciBkaXNhcHBlYXIgYXQgYW55IHRpbWUuXG5cdFx0ICpcblx0XHQgKiBAbmFtZXNwYWNlXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICovXG5cdFx0dXRpbDoge1xuXHRcdFx0ZW5jb2RlOiBmdW5jdGlvbiBlbmNvZGUodG9rZW5zKSB7XG5cdFx0XHRcdGlmICh0b2tlbnMgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRcdHJldHVybiBuZXcgVG9rZW4odG9rZW5zLnR5cGUsIGVuY29kZSh0b2tlbnMuY29udGVudCksIHRva2Vucy5hbGlhcyk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0b2tlbnMpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRva2Vucy5tYXAoZW5jb2RlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gdG9rZW5zLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoL1xcdTAwYTAvZywgJyAnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSB0eXBlIG9mIHRoZSBnaXZlbiB2YWx1ZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge2FueX0gb1xuXHRcdFx0ICogQHJldHVybnMge3N0cmluZ31cblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiB0eXBlKG51bGwpICAgICAgPT09ICdOdWxsJ1xuXHRcdFx0ICogdHlwZSh1bmRlZmluZWQpID09PSAnVW5kZWZpbmVkJ1xuXHRcdFx0ICogdHlwZSgxMjMpICAgICAgID09PSAnTnVtYmVyJ1xuXHRcdFx0ICogdHlwZSgnZm9vJykgICAgID09PSAnU3RyaW5nJ1xuXHRcdFx0ICogdHlwZSh0cnVlKSAgICAgID09PSAnQm9vbGVhbidcblx0XHRcdCAqIHR5cGUoWzEsIDJdKSAgICA9PT0gJ0FycmF5J1xuXHRcdFx0ICogdHlwZSh7fSkgICAgICAgID09PSAnT2JqZWN0J1xuXHRcdFx0ICogdHlwZShTdHJpbmcpICAgID09PSAnRnVuY3Rpb24nXG5cdFx0XHQgKiB0eXBlKC9hYmMrLykgICAgPT09ICdSZWdFeHAnXG5cdFx0XHQgKi9cblx0XHRcdHR5cGU6IGZ1bmN0aW9uIChvKSB7XG5cdFx0XHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm5zIGEgdW5pcXVlIG51bWJlciBmb3IgdGhlIGdpdmVuIG9iamVjdC4gTGF0ZXIgY2FsbHMgd2lsbCBzdGlsbCByZXR1cm4gdGhlIHNhbWUgbnVtYmVyLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcblx0XHRcdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdFx0XHQgKi9cblx0XHRcdG9iaklkOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRcdGlmICghb2JqWydfX2lkJ10pIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnX19pZCcsIHsgdmFsdWU6ICsrdW5pcXVlSWQgfSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG9ialsnX19pZCddO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBDcmVhdGVzIGEgZGVlcCBjbG9uZSBvZiB0aGUgZ2l2ZW4gb2JqZWN0LlxuXHRcdFx0ICpcblx0XHRcdCAqIFRoZSBtYWluIGludGVuZGVkIHVzZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGNsb25lIGxhbmd1YWdlIGRlZmluaXRpb25zLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7VH0gb1xuXHRcdFx0ICogQHBhcmFtIHtSZWNvcmQ8bnVtYmVyLCBhbnk+fSBbdmlzaXRlZF1cblx0XHRcdCAqIEByZXR1cm5zIHtUfVxuXHRcdFx0ICogQHRlbXBsYXRlIFRcblx0XHRcdCAqL1xuXHRcdFx0Y2xvbmU6IGZ1bmN0aW9uIGRlZXBDbG9uZShvLCB2aXNpdGVkKSB7XG5cdFx0XHRcdHZpc2l0ZWQgPSB2aXNpdGVkIHx8IHt9O1xuXG5cdFx0XHRcdHZhciBjbG9uZTsgdmFyIGlkO1xuXHRcdFx0XHRzd2l0Y2ggKF8udXRpbC50eXBlKG8pKSB7XG5cdFx0XHRcdFx0Y2FzZSAnT2JqZWN0Jzpcblx0XHRcdFx0XHRcdGlkID0gXy51dGlsLm9iaklkKG8pO1xuXHRcdFx0XHRcdFx0aWYgKHZpc2l0ZWRbaWRdKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB2aXNpdGVkW2lkXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNsb25lID0gLyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSAqLyAoe30pO1xuXHRcdFx0XHRcdFx0dmlzaXRlZFtpZF0gPSBjbG9uZTtcblxuXHRcdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG8pIHtcblx0XHRcdFx0XHRcdFx0aWYgKG8uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0XHRcdGNsb25lW2tleV0gPSBkZWVwQ2xvbmUob1trZXldLCB2aXNpdGVkKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gLyoqIEB0eXBlIHthbnl9ICovIChjbG9uZSk7XG5cblx0XHRcdFx0XHRjYXNlICdBcnJheSc6XG5cdFx0XHRcdFx0XHRpZCA9IF8udXRpbC5vYmpJZChvKTtcblx0XHRcdFx0XHRcdGlmICh2aXNpdGVkW2lkXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdmlzaXRlZFtpZF07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjbG9uZSA9IFtdO1xuXHRcdFx0XHRcdFx0dmlzaXRlZFtpZF0gPSBjbG9uZTtcblxuXHRcdFx0XHRcdFx0KC8qKiBAdHlwZSB7QXJyYXl9ICovKC8qKiBAdHlwZSB7YW55fSAqLyhvKSkpLmZvckVhY2goZnVuY3Rpb24gKHYsIGkpIHtcblx0XHRcdFx0XHRcdFx0Y2xvbmVbaV0gPSBkZWVwQ2xvbmUodiwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIC8qKiBAdHlwZSB7YW55fSAqLyAoY2xvbmUpO1xuXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHJldHVybiBvO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJldHVybnMgdGhlIFByaXNtIGxhbmd1YWdlIG9mIHRoZSBnaXZlbiBlbGVtZW50IHNldCBieSBhIGBsYW5ndWFnZS14eHh4YCBvciBgbGFuZy14eHh4YCBjbGFzcy5cblx0XHRcdCAqXG5cdFx0XHQgKiBJZiBubyBsYW5ndWFnZSBpcyBzZXQgZm9yIHRoZSBlbGVtZW50IG9yIHRoZSBlbGVtZW50IGlzIGBudWxsYCBvciBgdW5kZWZpbmVkYCwgYG5vbmVgIHdpbGwgYmUgcmV0dXJuZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG5cdFx0XHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHRcdFx0ICovXG5cdFx0XHRnZXRMYW5ndWFnZTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRcdFx0d2hpbGUgKGVsZW1lbnQpIHtcblx0XHRcdFx0XHR2YXIgbSA9IGxhbmcuZXhlYyhlbGVtZW50LmNsYXNzTmFtZSk7XG5cdFx0XHRcdFx0aWYgKG0pIHtcblx0XHRcdFx0XHRcdHJldHVybiBtWzFdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuICdub25lJztcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU2V0cyB0aGUgUHJpc20gYGxhbmd1YWdlLXh4eHhgIGNsYXNzIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlXG5cdFx0XHQgKiBAcmV0dXJucyB7dm9pZH1cblx0XHRcdCAqL1xuXHRcdFx0c2V0TGFuZ3VhZ2U6IGZ1bmN0aW9uIChlbGVtZW50LCBsYW5ndWFnZSkge1xuXHRcdFx0XHQvLyByZW1vdmUgYWxsIGBsYW5ndWFnZS14eHh4YCBjbGFzc2VzXG5cdFx0XHRcdC8vICh0aGlzIG1pZ2h0IGxlYXZlIGJlaGluZCBhIGxlYWRpbmcgc3BhY2UpXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShSZWdFeHAobGFuZywgJ2dpJyksICcnKTtcblxuXHRcdFx0XHQvLyBhZGQgdGhlIG5ldyBgbGFuZ3VhZ2UteHh4eGAgY2xhc3Ncblx0XHRcdFx0Ly8gKHVzaW5nIGBjbGFzc0xpc3RgIHdpbGwgYXV0b21hdGljYWxseSBjbGVhbiB1cCBzcGFjZXMgZm9yIHVzKVxuXHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xhbmd1YWdlLScgKyBsYW5ndWFnZSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJldHVybnMgd2hldGhlciBhIGdpdmVuIGNsYXNzIGlzIGFjdGl2ZSBmb3IgYGVsZW1lbnRgLlxuXHRcdFx0ICpcblx0XHRcdCAqIFRoZSBjbGFzcyBjYW4gYmUgYWN0aXZhdGVkIGlmIGBlbGVtZW50YCBvciBvbmUgb2YgaXRzIGFuY2VzdG9ycyBoYXMgdGhlIGdpdmVuIGNsYXNzIGFuZCBpdCBjYW4gYmUgZGVhY3RpdmF0ZWRcblx0XHRcdCAqIGlmIGBlbGVtZW50YCBvciBvbmUgb2YgaXRzIGFuY2VzdG9ycyBoYXMgdGhlIG5lZ2F0ZWQgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gY2xhc3MuIFRoZSBfbmVnYXRlZCB2ZXJzaW9uXyBvZiB0aGVcblx0XHRcdCAqIGdpdmVuIGNsYXNzIGlzIGp1c3QgdGhlIGdpdmVuIGNsYXNzIHdpdGggYSBgbm8tYCBwcmVmaXguXG5cdFx0XHQgKlxuXHRcdFx0ICogV2hldGhlciB0aGUgY2xhc3MgaXMgYWN0aXZlIGlzIGRldGVybWluZWQgYnkgdGhlIGNsb3Nlc3QgYW5jZXN0b3Igb2YgYGVsZW1lbnRgICh3aGVyZSBgZWxlbWVudGAgaXRzZWxmIGlzXG5cdFx0XHQgKiBjbG9zZXN0IGFuY2VzdG9yKSB0aGF0IGhhcyB0aGUgZ2l2ZW4gY2xhc3Mgb3IgdGhlIG5lZ2F0ZWQgdmVyc2lvbiBvZiBpdC4gSWYgbmVpdGhlciBgZWxlbWVudGAgbm9yIGFueSBvZiBpdHNcblx0XHRcdCAqIGFuY2VzdG9ycyBoYXZlIHRoZSBnaXZlbiBjbGFzcyBvciB0aGUgbmVnYXRlZCB2ZXJzaW9uIG9mIGl0LCB0aGVuIHRoZSBkZWZhdWx0IGFjdGl2YXRpb24gd2lsbCBiZSByZXR1cm5lZC5cblx0XHRcdCAqXG5cdFx0XHQgKiBJbiB0aGUgcGFyYWRveGljYWwgc2l0dWF0aW9uIHdoZXJlIHRoZSBjbG9zZXN0IGFuY2VzdG9yIGNvbnRhaW5zIF9fYm90aF9fIHRoZSBnaXZlbiBjbGFzcyBhbmQgdGhlIG5lZ2F0ZWRcblx0XHRcdCAqIHZlcnNpb24gb2YgaXQsIHRoZSBjbGFzcyBpcyBjb25zaWRlcmVkIGFjdGl2ZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcblx0XHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlZmF1bHRBY3RpdmF0aW9uPWZhbHNlXVxuXHRcdFx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdFx0XHQgKi9cblx0XHRcdGlzQWN0aXZlOiBmdW5jdGlvbiAoZWxlbWVudCwgY2xhc3NOYW1lLCBkZWZhdWx0QWN0aXZhdGlvbikge1xuXHRcdFx0XHR2YXIgbm8gPSAnbm8tJyArIGNsYXNzTmFtZTtcblxuXHRcdFx0XHR3aGlsZSAoZWxlbWVudCkge1xuXHRcdFx0XHRcdHZhciBjbGFzc0xpc3QgPSBlbGVtZW50LmNsYXNzTGlzdDtcblx0XHRcdFx0XHRpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKG5vKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAhIWRlZmF1bHRBY3RpdmF0aW9uO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBUaGlzIG5hbWVzcGFjZSBjb250YWlucyBhbGwgY3VycmVudGx5IGxvYWRlZCBsYW5ndWFnZXMgYW5kIHRoZSBzb21lIGhlbHBlciBmdW5jdGlvbnMgdG8gY3JlYXRlIGFuZCBtb2RpZnkgbGFuZ3VhZ2VzLlxuXHRcdCAqXG5cdFx0ICogQG5hbWVzcGFjZVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRsYW5ndWFnZXM6IHtcblx0XHRcdC8qKlxuXHRcdFx0ICogVGhlIGdyYW1tYXIgZm9yIHBsYWluLCB1bmZvcm1hdHRlZCB0ZXh0LlxuXHRcdFx0ICovXG5cdFx0XHRwbGFpbjogcGxhaW5UZXh0R3JhbW1hcixcblx0XHRcdHBsYWludGV4dDogcGxhaW5UZXh0R3JhbW1hcixcblx0XHRcdHRleHQ6IHBsYWluVGV4dEdyYW1tYXIsXG5cdFx0XHR0eHQ6IHBsYWluVGV4dEdyYW1tYXIsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQ3JlYXRlcyBhIGRlZXAgY29weSBvZiB0aGUgbGFuZ3VhZ2Ugd2l0aCB0aGUgZ2l2ZW4gaWQgYW5kIGFwcGVuZHMgdGhlIGdpdmVuIHRva2Vucy5cblx0XHRcdCAqXG5cdFx0XHQgKiBJZiBhIHRva2VuIGluIGByZWRlZmAgYWxzbyBhcHBlYXJzIGluIHRoZSBjb3BpZWQgbGFuZ3VhZ2UsIHRoZW4gdGhlIGV4aXN0aW5nIHRva2VuIGluIHRoZSBjb3BpZWQgbGFuZ3VhZ2Vcblx0XHRcdCAqIHdpbGwgYmUgb3ZlcndyaXR0ZW4gYXQgaXRzIG9yaWdpbmFsIHBvc2l0aW9uLlxuXHRcdFx0ICpcblx0XHRcdCAqICMjIEJlc3QgcHJhY3RpY2VzXG5cdFx0XHQgKlxuXHRcdFx0ICogU2luY2UgdGhlIHBvc2l0aW9uIG9mIG92ZXJ3cml0aW5nIHRva2VucyAodG9rZW4gaW4gYHJlZGVmYCB0aGF0IG92ZXJ3cml0ZSB0b2tlbnMgaW4gdGhlIGNvcGllZCBsYW5ndWFnZSlcblx0XHRcdCAqIGRvZXNuJ3QgbWF0dGVyLCB0aGV5IGNhbiB0ZWNobmljYWxseSBiZSBpbiBhbnkgb3JkZXIuIEhvd2V2ZXIsIHRoaXMgY2FuIGJlIGNvbmZ1c2luZyB0byBvdGhlcnMgdGhhdCB0cnlpbmcgdG9cblx0XHRcdCAqIHVuZGVyc3RhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb24gYmVjYXVzZSwgbm9ybWFsbHksIHRoZSBvcmRlciBvZiB0b2tlbnMgbWF0dGVycyBpbiBQcmlzbSBncmFtbWFycy5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGVyZWZvcmUsIGl0IGlzIGVuY291cmFnZWQgdG8gb3JkZXIgb3ZlcndyaXRpbmcgdG9rZW5zIGFjY29yZGluZyB0byB0aGUgcG9zaXRpb25zIG9mIHRoZSBvdmVyd3JpdHRlbiB0b2tlbnMuXG5cdFx0XHQgKiBGdXJ0aGVybW9yZSwgYWxsIG5vbi1vdmVyd3JpdGluZyB0b2tlbnMgc2hvdWxkIGJlIHBsYWNlZCBhZnRlciB0aGUgb3ZlcndyaXRpbmcgb25lcy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaWQgVGhlIGlkIG9mIHRoZSBsYW5ndWFnZSB0byBleHRlbmQuIFRoaXMgaGFzIHRvIGJlIGEga2V5IGluIGBQcmlzbS5sYW5ndWFnZXNgLlxuXHRcdFx0ICogQHBhcmFtIHtHcmFtbWFyfSByZWRlZiBUaGUgbmV3IHRva2VucyB0byBhcHBlbmQuXG5cdFx0XHQgKiBAcmV0dXJucyB7R3JhbW1hcn0gVGhlIG5ldyBsYW5ndWFnZSBjcmVhdGVkLlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlc1snY3NzLXdpdGgtY29sb3JzJ10gPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjc3MnLCB7XG5cdFx0XHQgKiAgICAgLy8gUHJpc20ubGFuZ3VhZ2VzLmNzcyBhbHJlYWR5IGhhcyBhICdjb21tZW50JyB0b2tlbiwgc28gdGhpcyB0b2tlbiB3aWxsIG92ZXJ3cml0ZSBDU1MnICdjb21tZW50JyB0b2tlblxuXHRcdFx0ICogICAgIC8vIGF0IGl0cyBvcmlnaW5hbCBwb3NpdGlvblxuXHRcdFx0ICogICAgICdjb21tZW50JzogeyAuLi4gfSxcblx0XHRcdCAqICAgICAvLyBDU1MgZG9lc24ndCBoYXZlIGEgJ2NvbG9yJyB0b2tlbiwgc28gdGhpcyB0b2tlbiB3aWxsIGJlIGFwcGVuZGVkXG5cdFx0XHQgKiAgICAgJ2NvbG9yJzogL1xcYig/OnJlZHxncmVlbnxibHVlKVxcYi9cblx0XHRcdCAqIH0pO1xuXHRcdFx0ICovXG5cdFx0XHRleHRlbmQ6IGZ1bmN0aW9uIChpZCwgcmVkZWYpIHtcblx0XHRcdFx0dmFyIGxhbmcgPSBfLnV0aWwuY2xvbmUoXy5sYW5ndWFnZXNbaWRdKTtcblxuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gcmVkZWYpIHtcblx0XHRcdFx0XHRsYW5nW2tleV0gPSByZWRlZltrZXldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGxhbmc7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEluc2VydHMgdG9rZW5zIF9iZWZvcmVfIGFub3RoZXIgdG9rZW4gaW4gYSBsYW5ndWFnZSBkZWZpbml0aW9uIG9yIGFueSBvdGhlciBncmFtbWFyLlxuXHRcdFx0ICpcblx0XHRcdCAqICMjIFVzYWdlXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhpcyBoZWxwZXIgbWV0aG9kIG1ha2VzIGl0IGVhc3kgdG8gbW9kaWZ5IGV4aXN0aW5nIGxhbmd1YWdlcy4gRm9yIGV4YW1wbGUsIHRoZSBDU1MgbGFuZ3VhZ2UgZGVmaW5pdGlvblxuXHRcdFx0ICogbm90IG9ubHkgZGVmaW5lcyBDU1MgaGlnaGxpZ2h0aW5nIGZvciBDU1MgZG9jdW1lbnRzLCBidXQgYWxzbyBuZWVkcyB0byBkZWZpbmUgaGlnaGxpZ2h0aW5nIGZvciBDU1MgZW1iZWRkZWRcblx0XHRcdCAqIGluIEhUTUwgdGhyb3VnaCBgPHN0eWxlPmAgZWxlbWVudHMuIFRvIGRvIHRoaXMsIGl0IG5lZWRzIHRvIG1vZGlmeSBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAgYW5kIGFkZCB0aGVcblx0XHRcdCAqIGFwcHJvcHJpYXRlIHRva2Vucy4gSG93ZXZlciwgYFByaXNtLmxhbmd1YWdlcy5tYXJrdXBgIGlzIGEgcmVndWxhciBKYXZhU2NyaXB0IG9iamVjdCBsaXRlcmFsLCBzbyBpZiB5b3UgZG9cblx0XHRcdCAqIHRoaXM6XG5cdFx0XHQgKlxuXHRcdFx0ICogYGBganNcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlcy5tYXJrdXAuc3R5bGUgPSB7XG5cdFx0XHQgKiAgICAgLy8gdG9rZW5cblx0XHRcdCAqIH07XG5cdFx0XHQgKiBgYGBcblx0XHRcdCAqXG5cdFx0XHQgKiB0aGVuIHRoZSBgc3R5bGVgIHRva2VuIHdpbGwgYmUgYWRkZWQgKGFuZCBwcm9jZXNzZWQpIGF0IHRoZSBlbmQuIGBpbnNlcnRCZWZvcmVgIGFsbG93cyB5b3UgdG8gaW5zZXJ0IHRva2Vuc1xuXHRcdFx0ICogYmVmb3JlIGV4aXN0aW5nIHRva2Vucy4gRm9yIHRoZSBDU1MgZXhhbXBsZSBhYm92ZSwgeW91IHdvdWxkIHVzZSBpdCBsaWtlIHRoaXM6XG5cdFx0XHQgKlxuXHRcdFx0ICogYGBganNcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICdjZGF0YScsIHtcblx0XHRcdCAqICAgICAnc3R5bGUnOiB7XG5cdFx0XHQgKiAgICAgICAgIC8vIHRva2VuXG5cdFx0XHQgKiAgICAgfVxuXHRcdFx0ICogfSk7XG5cdFx0XHQgKiBgYGBcblx0XHRcdCAqXG5cdFx0XHQgKiAjIyBTcGVjaWFsIGNhc2VzXG5cdFx0XHQgKlxuXHRcdFx0ICogSWYgdGhlIGdyYW1tYXJzIG9mIGBpbnNpZGVgIGFuZCBgaW5zZXJ0YCBoYXZlIHRva2VucyB3aXRoIHRoZSBzYW1lIG5hbWUsIHRoZSB0b2tlbnMgaW4gYGluc2lkZWAncyBncmFtbWFyXG5cdFx0XHQgKiB3aWxsIGJlIGlnbm9yZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhpcyBiZWhhdmlvciBjYW4gYmUgdXNlZCB0byBpbnNlcnQgdG9rZW5zIGFmdGVyIGBiZWZvcmVgOlxuXHRcdFx0ICpcblx0XHRcdCAqIGBgYGpzXG5cdFx0XHQgKiBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAnY29tbWVudCcsIHtcblx0XHRcdCAqICAgICAnY29tbWVudCc6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXAuY29tbWVudCxcblx0XHRcdCAqICAgICAvLyB0b2tlbnMgYWZ0ZXIgJ2NvbW1lbnQnXG5cdFx0XHQgKiB9KTtcblx0XHRcdCAqIGBgYFxuXHRcdFx0ICpcblx0XHRcdCAqICMjIExpbWl0YXRpb25zXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhlIG1haW4gcHJvYmxlbSBgaW5zZXJ0QmVmb3JlYCBoYXMgdG8gc29sdmUgaXMgaXRlcmF0aW9uIG9yZGVyLiBTaW5jZSBFUzIwMTUsIHRoZSBpdGVyYXRpb24gb3JkZXIgZm9yIG9iamVjdFxuXHRcdFx0ICogcHJvcGVydGllcyBpcyBndWFyYW50ZWVkIHRvIGJlIHRoZSBpbnNlcnRpb24gb3JkZXIgKGV4Y2VwdCBmb3IgaW50ZWdlciBrZXlzKSBidXQgc29tZSBicm93c2VycyBiZWhhdmVcblx0XHRcdCAqIGRpZmZlcmVudGx5IHdoZW4ga2V5cyBhcmUgZGVsZXRlZCBhbmQgcmUtaW5zZXJ0ZWQuIFNvIGBpbnNlcnRCZWZvcmVgIGNhbid0IGJlIGltcGxlbWVudGVkIGJ5IHRlbXBvcmFyaWx5XG5cdFx0XHQgKiBkZWxldGluZyBwcm9wZXJ0aWVzIHdoaWNoIGlzIG5lY2Vzc2FyeSB0byBpbnNlcnQgYXQgYXJiaXRyYXJ5IHBvc2l0aW9ucy5cblx0XHRcdCAqXG5cdFx0XHQgKiBUbyBzb2x2ZSB0aGlzIHByb2JsZW0sIGBpbnNlcnRCZWZvcmVgIGRvZXNuJ3QgYWN0dWFsbHkgaW5zZXJ0IHRoZSBnaXZlbiB0b2tlbnMgaW50byB0aGUgdGFyZ2V0IG9iamVjdC5cblx0XHRcdCAqIEluc3RlYWQsIGl0IHdpbGwgY3JlYXRlIGEgbmV3IG9iamVjdCBhbmQgcmVwbGFjZSBhbGwgcmVmZXJlbmNlcyB0byB0aGUgdGFyZ2V0IG9iamVjdCB3aXRoIHRoZSBuZXcgb25lLiBUaGlzXG5cdFx0XHQgKiBjYW4gYmUgZG9uZSB3aXRob3V0IHRlbXBvcmFyaWx5IGRlbGV0aW5nIHByb3BlcnRpZXMsIHNvIHRoZSBpdGVyYXRpb24gb3JkZXIgaXMgd2VsbC1kZWZpbmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEhvd2V2ZXIsIG9ubHkgcmVmZXJlbmNlcyB0aGF0IGNhbiBiZSByZWFjaGVkIGZyb20gYFByaXNtLmxhbmd1YWdlc2Agb3IgYGluc2VydGAgd2lsbCBiZSByZXBsYWNlZC4gSS5lLiBpZlxuXHRcdFx0ICogeW91IGhvbGQgdGhlIHRhcmdldCBvYmplY3QgaW4gYSB2YXJpYWJsZSwgdGhlbiB0aGUgdmFsdWUgb2YgdGhlIHZhcmlhYmxlIHdpbGwgbm90IGNoYW5nZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBgYGBqc1xuXHRcdFx0ICogdmFyIG9sZE1hcmt1cCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cdFx0XHQgKiB2YXIgbmV3TWFya3VwID0gUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ2NvbW1lbnQnLCB7IC4uLiB9KTtcblx0XHRcdCAqXG5cdFx0XHQgKiBhc3NlcnQob2xkTWFya3VwICE9PSBQcmlzbS5sYW5ndWFnZXMubWFya3VwKTtcblx0XHRcdCAqIGFzc2VydChuZXdNYXJrdXAgPT09IFByaXNtLmxhbmd1YWdlcy5tYXJrdXApO1xuXHRcdFx0ICogYGBgXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IGluc2lkZSBUaGUgcHJvcGVydHkgb2YgYHJvb3RgIChlLmcuIGEgbGFuZ3VhZ2UgaWQgaW4gYFByaXNtLmxhbmd1YWdlc2ApIHRoYXQgY29udGFpbnMgdGhlXG5cdFx0XHQgKiBvYmplY3QgdG8gYmUgbW9kaWZpZWQuXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gYmVmb3JlIFRoZSBrZXkgdG8gaW5zZXJ0IGJlZm9yZS5cblx0XHRcdCAqIEBwYXJhbSB7R3JhbW1hcn0gaW5zZXJ0IEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBrZXktdmFsdWUgcGFpcnMgdG8gYmUgaW5zZXJ0ZWQuXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IFtyb290XSBUaGUgb2JqZWN0IGNvbnRhaW5pbmcgYGluc2lkZWAsIGkuZS4gdGhlIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZVxuXHRcdFx0ICogb2JqZWN0IHRvIGJlIG1vZGlmaWVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIERlZmF1bHRzIHRvIGBQcmlzbS5sYW5ndWFnZXNgLlxuXHRcdFx0ICogQHJldHVybnMge0dyYW1tYXJ9IFRoZSBuZXcgZ3JhbW1hciBvYmplY3QuXG5cdFx0XHQgKiBAcHVibGljXG5cdFx0XHQgKi9cblx0XHRcdGluc2VydEJlZm9yZTogZnVuY3Rpb24gKGluc2lkZSwgYmVmb3JlLCBpbnNlcnQsIHJvb3QpIHtcblx0XHRcdFx0cm9vdCA9IHJvb3QgfHwgLyoqIEB0eXBlIHthbnl9ICovIChfLmxhbmd1YWdlcyk7XG5cdFx0XHRcdHZhciBncmFtbWFyID0gcm9vdFtpbnNpZGVdO1xuXHRcdFx0XHQvKiogQHR5cGUge0dyYW1tYXJ9ICovXG5cdFx0XHRcdHZhciByZXQgPSB7fTtcblxuXHRcdFx0XHRmb3IgKHZhciB0b2tlbiBpbiBncmFtbWFyKSB7XG5cdFx0XHRcdFx0aWYgKGdyYW1tYXIuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG5cblx0XHRcdFx0XHRcdGlmICh0b2tlbiA9PSBiZWZvcmUpIHtcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgbmV3VG9rZW4gaW4gaW5zZXJ0KSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGluc2VydC5oYXNPd25Qcm9wZXJ0eShuZXdUb2tlbikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldFtuZXdUb2tlbl0gPSBpbnNlcnRbbmV3VG9rZW5dO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBEbyBub3QgaW5zZXJ0IHRva2VuIHdoaWNoIGFsc28gb2NjdXIgaW4gaW5zZXJ0LiBTZWUgIzE1MjVcblx0XHRcdFx0XHRcdGlmICghaW5zZXJ0Lmhhc093blByb3BlcnR5KHRva2VuKSkge1xuXHRcdFx0XHRcdFx0XHRyZXRbdG9rZW5dID0gZ3JhbW1hclt0b2tlbl07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIG9sZCA9IHJvb3RbaW5zaWRlXTtcblx0XHRcdFx0cm9vdFtpbnNpZGVdID0gcmV0O1xuXG5cdFx0XHRcdC8vIFVwZGF0ZSByZWZlcmVuY2VzIGluIG90aGVyIGxhbmd1YWdlIGRlZmluaXRpb25zXG5cdFx0XHRcdF8ubGFuZ3VhZ2VzLkRGUyhfLmxhbmd1YWdlcywgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0XHRpZiAodmFsdWUgPT09IG9sZCAmJiBrZXkgIT0gaW5zaWRlKSB7XG5cdFx0XHRcdFx0XHR0aGlzW2tleV0gPSByZXQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gVHJhdmVyc2UgYSBsYW5ndWFnZSBkZWZpbml0aW9uIHdpdGggRGVwdGggRmlyc3QgU2VhcmNoXG5cdFx0XHRERlM6IGZ1bmN0aW9uIERGUyhvLCBjYWxsYmFjaywgdHlwZSwgdmlzaXRlZCkge1xuXHRcdFx0XHR2aXNpdGVkID0gdmlzaXRlZCB8fCB7fTtcblxuXHRcdFx0XHR2YXIgb2JqSWQgPSBfLnV0aWwub2JqSWQ7XG5cblx0XHRcdFx0Zm9yICh2YXIgaSBpbiBvKSB7XG5cdFx0XHRcdFx0aWYgKG8uaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwobywgaSwgb1tpXSwgdHlwZSB8fCBpKTtcblxuXHRcdFx0XHRcdFx0dmFyIHByb3BlcnR5ID0gb1tpXTtcblx0XHRcdFx0XHRcdHZhciBwcm9wZXJ0eVR5cGUgPSBfLnV0aWwudHlwZShwcm9wZXJ0eSk7XG5cblx0XHRcdFx0XHRcdGlmIChwcm9wZXJ0eVR5cGUgPT09ICdPYmplY3QnICYmICF2aXNpdGVkW29iaklkKHByb3BlcnR5KV0pIHtcblx0XHRcdFx0XHRcdFx0dmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0REZTKHByb3BlcnR5LCBjYWxsYmFjaywgbnVsbCwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5VHlwZSA9PT0gJ0FycmF5JyAmJiAhdmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldKSB7XG5cdFx0XHRcdFx0XHRcdHZpc2l0ZWRbb2JqSWQocHJvcGVydHkpXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdERGUyhwcm9wZXJ0eSwgY2FsbGJhY2ssIGksIHZpc2l0ZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRwbHVnaW5zOiB7fSxcblxuXG5cdFx0LyoqXG5cdFx0ICogTG93LWxldmVsIGZ1bmN0aW9uLCBvbmx5IHVzZSBpZiB5b3Uga25vdyB3aGF0IHlvdeKAmXJlIGRvaW5nLiBJdCBhY2NlcHRzIGEgc3RyaW5nIG9mIHRleHQgYXMgaW5wdXRcblx0XHQgKiBhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb25zIHRvIHVzZSwgYW5kIHJldHVybnMgYSBzdHJpbmcgd2l0aCB0aGUgSFRNTCBwcm9kdWNlZC5cblx0XHQgKlxuXHRcdCAqIFRoZSBmb2xsb3dpbmcgaG9va3Mgd2lsbCBiZSBydW46XG5cdFx0ICogMS4gYGJlZm9yZS10b2tlbml6ZWBcblx0XHQgKiAyLiBgYWZ0ZXItdG9rZW5pemVgXG5cdFx0ICogMy4gYHdyYXBgOiBPbiBlYWNoIHtAbGluayBUb2tlbn0uXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBBIHN0cmluZyB3aXRoIHRoZSBjb2RlIHRvIGJlIGhpZ2hsaWdodGVkLlxuXHRcdCAqIEBwYXJhbSB7R3JhbW1hcn0gZ3JhbW1hciBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgdG9rZW5zIHRvIHVzZS5cblx0XHQgKlxuXHRcdCAqIFVzdWFsbHkgYSBsYW5ndWFnZSBkZWZpbml0aW9uIGxpa2UgYFByaXNtLmxhbmd1YWdlcy5tYXJrdXBgLlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSBUaGUgbmFtZSBvZiB0aGUgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBwYXNzZWQgdG8gYGdyYW1tYXJgLlxuXHRcdCAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBoaWdobGlnaHRlZCBIVE1MLlxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIFByaXNtLmhpZ2hsaWdodCgndmFyIGZvbyA9IHRydWU7JywgUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQsICdqYXZhc2NyaXB0Jyk7XG5cdFx0ICovXG5cdFx0aGlnaGxpZ2h0OiBmdW5jdGlvbiAodGV4dCwgZ3JhbW1hciwgbGFuZ3VhZ2UpIHtcblx0XHRcdHZhciBlbnYgPSB7XG5cdFx0XHRcdGNvZGU6IHRleHQsXG5cdFx0XHRcdGdyYW1tYXI6IGdyYW1tYXIsXG5cdFx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZVxuXHRcdFx0fTtcblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtdG9rZW5pemUnLCBlbnYpO1xuXHRcdFx0ZW52LnRva2VucyA9IF8udG9rZW5pemUoZW52LmNvZGUsIGVudi5ncmFtbWFyKTtcblx0XHRcdF8uaG9va3MucnVuKCdhZnRlci10b2tlbml6ZScsIGVudik7XG5cdFx0XHRyZXR1cm4gVG9rZW4uc3RyaW5naWZ5KF8udXRpbC5lbmNvZGUoZW52LnRva2VucyksIGVudi5sYW5ndWFnZSk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgaXMgdGhlIGhlYXJ0IG9mIFByaXNtLCBhbmQgdGhlIG1vc3QgbG93LWxldmVsIGZ1bmN0aW9uIHlvdSBjYW4gdXNlLiBJdCBhY2NlcHRzIGEgc3RyaW5nIG9mIHRleHQgYXMgaW5wdXRcblx0XHQgKiBhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb25zIHRvIHVzZSwgYW5kIHJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgdG9rZW5pemVkIGNvZGUuXG5cdFx0ICpcblx0XHQgKiBXaGVuIHRoZSBsYW5ndWFnZSBkZWZpbml0aW9uIGluY2x1ZGVzIG5lc3RlZCB0b2tlbnMsIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgcmVjdXJzaXZlbHkgb24gZWFjaCBvZiB0aGVzZSB0b2tlbnMuXG5cdFx0ICpcblx0XHQgKiBUaGlzIG1ldGhvZCBjb3VsZCBiZSB1c2VmdWwgaW4gb3RoZXIgY29udGV4dHMgYXMgd2VsbCwgYXMgYSB2ZXJ5IGNydWRlIHBhcnNlci5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IEEgc3RyaW5nIHdpdGggdGhlIGNvZGUgdG8gYmUgaGlnaGxpZ2h0ZWQuXG5cdFx0ICogQHBhcmFtIHtHcmFtbWFyfSBncmFtbWFyIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSB0b2tlbnMgdG8gdXNlLlxuXHRcdCAqXG5cdFx0ICogVXN1YWxseSBhIGxhbmd1YWdlIGRlZmluaXRpb24gbGlrZSBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAuXG5cdFx0ICogQHJldHVybnMge1Rva2VuU3RyZWFtfSBBbiBhcnJheSBvZiBzdHJpbmdzIGFuZCB0b2tlbnMsIGEgdG9rZW4gc3RyZWFtLlxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIGxldCBjb2RlID0gYHZhciBmb28gPSAwO2A7XG5cdFx0ICogbGV0IHRva2VucyA9IFByaXNtLnRva2VuaXplKGNvZGUsIFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0KTtcblx0XHQgKiB0b2tlbnMuZm9yRWFjaCh0b2tlbiA9PiB7XG5cdFx0ICogICAgIGlmICh0b2tlbiBpbnN0YW5jZW9mIFByaXNtLlRva2VuICYmIHRva2VuLnR5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0ICogICAgICAgICBjb25zb2xlLmxvZyhgRm91bmQgbnVtZXJpYyBsaXRlcmFsOiAke3Rva2VuLmNvbnRlbnR9YCk7XG5cdFx0ICogICAgIH1cblx0XHQgKiB9KTtcblx0XHQgKi9cblx0XHR0b2tlbml6ZTogZnVuY3Rpb24gKHRleHQsIGdyYW1tYXIpIHtcblx0XHRcdHZhciByZXN0ID0gZ3JhbW1hci5yZXN0O1xuXHRcdFx0aWYgKHJlc3QpIHtcblx0XHRcdFx0Zm9yICh2YXIgdG9rZW4gaW4gcmVzdCkge1xuXHRcdFx0XHRcdGdyYW1tYXJbdG9rZW5dID0gcmVzdFt0b2tlbl07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWxldGUgZ3JhbW1hci5yZXN0O1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgdG9rZW5MaXN0ID0gbmV3IExpbmtlZExpc3QoKTtcblx0XHRcdGFkZEFmdGVyKHRva2VuTGlzdCwgdG9rZW5MaXN0LmhlYWQsIHRleHQpO1xuXG5cdFx0XHRtYXRjaEdyYW1tYXIodGV4dCwgdG9rZW5MaXN0LCBncmFtbWFyLCB0b2tlbkxpc3QuaGVhZCwgMCk7XG5cblx0XHRcdHJldHVybiB0b0FycmF5KHRva2VuTGlzdCk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEBuYW1lc3BhY2Vcblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0aG9va3M6IHtcblx0XHRcdGFsbDoge30sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQWRkcyB0aGUgZ2l2ZW4gY2FsbGJhY2sgdG8gdGhlIGxpc3Qgb2YgY2FsbGJhY2tzIGZvciB0aGUgZ2l2ZW4gaG9vay5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGhvb2sgaXQgaXMgcmVnaXN0ZXJlZCBmb3IgaXMgcnVuLlxuXHRcdFx0ICogSG9va3MgYXJlIHVzdWFsbHkgZGlyZWN0bHkgcnVuIGJ5IGEgaGlnaGxpZ2h0IGZ1bmN0aW9uIGJ1dCB5b3UgY2FuIGFsc28gcnVuIGhvb2tzIHlvdXJzZWxmLlxuXHRcdFx0ICpcblx0XHRcdCAqIE9uZSBjYWxsYmFjayBmdW5jdGlvbiBjYW4gYmUgcmVnaXN0ZXJlZCB0byBtdWx0aXBsZSBob29rcyBhbmQgdGhlIHNhbWUgaG9vayBtdWx0aXBsZSB0aW1lcy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgaG9vay5cblx0XHRcdCAqIEBwYXJhbSB7SG9va0NhbGxiYWNrfSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgZ2l2ZW4gZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICovXG5cdFx0XHRhZGQ6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuXHRcdFx0XHR2YXIgaG9va3MgPSBfLmhvb2tzLmFsbDtcblxuXHRcdFx0XHRob29rc1tuYW1lXSA9IGhvb2tzW25hbWVdIHx8IFtdO1xuXG5cdFx0XHRcdGhvb2tzW25hbWVdLnB1c2goY2FsbGJhY2spO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSdW5zIGEgaG9vayBpbnZva2luZyBhbGwgcmVnaXN0ZXJlZCBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuXHRcdFx0ICpcblx0XHRcdCAqIENhbGxiYWNrcyB3aWxsIGJlIGludm9rZWQgc3luY2hyb25vdXNseSBhbmQgaW4gdGhlIG9yZGVyIGluIHdoaWNoIHRoZXkgd2VyZSByZWdpc3RlcmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBob29rLlxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBlbnYgVGhlIGVudmlyb25tZW50IHZhcmlhYmxlcyBvZiB0aGUgaG9vayBwYXNzZWQgdG8gYWxsIGNhbGxiYWNrcyByZWdpc3RlcmVkLlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICovXG5cdFx0XHRydW46IGZ1bmN0aW9uIChuYW1lLCBlbnYpIHtcblx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IF8uaG9va3MuYWxsW25hbWVdO1xuXG5cdFx0XHRcdGlmICghY2FsbGJhY2tzIHx8ICFjYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIGNhbGxiYWNrOyAoY2FsbGJhY2sgPSBjYWxsYmFja3NbaSsrXSk7KSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2soZW52KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRUb2tlbjogVG9rZW5cblx0fTtcblxuXG5cdC8vIFR5cGVzY3JpcHQgbm90ZTpcblx0Ly8gVGhlIGZvbGxvd2luZyBjYW4gYmUgdXNlZCB0byBpbXBvcnQgdGhlIFRva2VuIHR5cGUgaW4gSlNEb2M6XG5cdC8vXG5cdC8vICAgQHR5cGVkZWYge0luc3RhbmNlVHlwZTxpbXBvcnQoXCIuL3ByaXNtLWNvcmVcIilbXCJUb2tlblwiXT59IFRva2VuXG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgdG9rZW4uXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFNlZSB7QGxpbmsgVG9rZW4jdHlwZSB0eXBlfVxuXHQgKiBAcGFyYW0ge3N0cmluZyB8IFRva2VuU3RyZWFtfSBjb250ZW50IFNlZSB7QGxpbmsgVG9rZW4jY29udGVudCBjb250ZW50fVxuXHQgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gW2FsaWFzXSBUaGUgYWxpYXMoZXMpIG9mIHRoZSB0b2tlbi5cblx0ICogQHBhcmFtIHtzdHJpbmd9IFttYXRjaGVkU3RyPVwiXCJdIEEgY29weSBvZiB0aGUgZnVsbCBzdHJpbmcgdGhpcyB0b2tlbiB3YXMgY3JlYXRlZCBmcm9tLlxuXHQgKiBAY2xhc3Ncblx0ICogQGdsb2JhbFxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHRmdW5jdGlvbiBUb2tlbih0eXBlLCBjb250ZW50LCBhbGlhcywgbWF0Y2hlZFN0cikge1xuXHRcdC8qKlxuXHRcdCAqIFRoZSB0eXBlIG9mIHRoZSB0b2tlbi5cblx0XHQgKlxuXHRcdCAqIFRoaXMgaXMgdXN1YWxseSB0aGUga2V5IG9mIGEgcGF0dGVybiBpbiBhIHtAbGluayBHcmFtbWFyfS5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIHtzdHJpbmd9XG5cdFx0ICogQHNlZSBHcmFtbWFyVG9rZW5cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0dGhpcy50eXBlID0gdHlwZTtcblx0XHQvKipcblx0XHQgKiBUaGUgc3RyaW5ncyBvciB0b2tlbnMgY29udGFpbmVkIGJ5IHRoaXMgdG9rZW4uXG5cdFx0ICpcblx0XHQgKiBUaGlzIHdpbGwgYmUgYSB0b2tlbiBzdHJlYW0gaWYgdGhlIHBhdHRlcm4gbWF0Y2hlZCBhbHNvIGRlZmluZWQgYW4gYGluc2lkZWAgZ3JhbW1hci5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIHtzdHJpbmcgfCBUb2tlblN0cmVhbX1cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0dGhpcy5jb250ZW50ID0gY29udGVudDtcblx0XHQvKipcblx0XHQgKiBUaGUgYWxpYXMoZXMpIG9mIHRoZSB0b2tlbi5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIHtzdHJpbmd8c3RyaW5nW119XG5cdFx0ICogQHNlZSBHcmFtbWFyVG9rZW5cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0dGhpcy5hbGlhcyA9IGFsaWFzO1xuXHRcdC8vIENvcHkgb2YgdGhlIGZ1bGwgc3RyaW5nIHRoaXMgdG9rZW4gd2FzIGNyZWF0ZWQgZnJvbVxuXHRcdHRoaXMubGVuZ3RoID0gKG1hdGNoZWRTdHIgfHwgJycpLmxlbmd0aCB8IDA7XG5cdH1cblxuXHQvKipcblx0ICogQSB0b2tlbiBzdHJlYW0gaXMgYW4gYXJyYXkgb2Ygc3RyaW5ncyBhbmQge0BsaW5rIFRva2VuIFRva2VufSBvYmplY3RzLlxuXHQgKlxuXHQgKiBUb2tlbiBzdHJlYW1zIGhhdmUgdG8gZnVsZmlsbCBhIGZldyBwcm9wZXJ0aWVzIHRoYXQgYXJlIGFzc3VtZWQgYnkgbW9zdCBmdW5jdGlvbnMgKG1vc3RseSBpbnRlcm5hbCBvbmVzKSB0aGF0IHByb2Nlc3Ncblx0ICogdGhlbS5cblx0ICpcblx0ICogMS4gTm8gYWRqYWNlbnQgc3RyaW5ncy5cblx0ICogMi4gTm8gZW1wdHkgc3RyaW5ncy5cblx0ICpcblx0ICogICAgVGhlIG9ubHkgZXhjZXB0aW9uIGhlcmUgaXMgdGhlIHRva2VuIHN0cmVhbSB0aGF0IG9ubHkgY29udGFpbnMgdGhlIGVtcHR5IHN0cmluZyBhbmQgbm90aGluZyBlbHNlLlxuXHQgKlxuXHQgKiBAdHlwZWRlZiB7QXJyYXk8c3RyaW5nIHwgVG9rZW4+fSBUb2tlblN0cmVhbVxuXHQgKiBAZ2xvYmFsXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIHRoZSBnaXZlbiB0b2tlbiBvciB0b2tlbiBzdHJlYW0gdG8gYW4gSFRNTCByZXByZXNlbnRhdGlvbi5cblx0ICpcblx0ICogVGhlIGZvbGxvd2luZyBob29rcyB3aWxsIGJlIHJ1bjpcblx0ICogMS4gYHdyYXBgOiBPbiBlYWNoIHtAbGluayBUb2tlbn0uXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nIHwgVG9rZW4gfCBUb2tlblN0cmVhbX0gbyBUaGUgdG9rZW4gb3IgdG9rZW4gc3RyZWFtIHRvIGJlIGNvbnZlcnRlZC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIFRoZSBuYW1lIG9mIGN1cnJlbnQgbGFuZ3VhZ2UuXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBIVE1MIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0b2tlbiBvciB0b2tlbiBzdHJlYW0uXG5cdCAqIEBtZW1iZXJvZiBUb2tlblxuXHQgKiBAc3RhdGljXG5cdCAqL1xuXHRUb2tlbi5zdHJpbmdpZnkgPSBmdW5jdGlvbiBzdHJpbmdpZnkobywgbGFuZ3VhZ2UpIHtcblx0XHRpZiAodHlwZW9mIG8gPT0gJ3N0cmluZycpIHtcblx0XHRcdHJldHVybiBvO1xuXHRcdH1cblx0XHRpZiAoQXJyYXkuaXNBcnJheShvKSkge1xuXHRcdFx0dmFyIHMgPSAnJztcblx0XHRcdG8uZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRzICs9IHN0cmluZ2lmeShlLCBsYW5ndWFnZSk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBzO1xuXHRcdH1cblxuXHRcdHZhciBlbnYgPSB7XG5cdFx0XHR0eXBlOiBvLnR5cGUsXG5cdFx0XHRjb250ZW50OiBzdHJpbmdpZnkoby5jb250ZW50LCBsYW5ndWFnZSksXG5cdFx0XHR0YWc6ICdzcGFuJyxcblx0XHRcdGNsYXNzZXM6IFsndG9rZW4nLCBvLnR5cGVdLFxuXHRcdFx0YXR0cmlidXRlczoge30sXG5cdFx0XHRsYW5ndWFnZTogbGFuZ3VhZ2Vcblx0XHR9O1xuXG5cdFx0dmFyIGFsaWFzZXMgPSBvLmFsaWFzO1xuXHRcdGlmIChhbGlhc2VzKSB7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShhbGlhc2VzKSkge1xuXHRcdFx0XHRBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShlbnYuY2xhc3NlcywgYWxpYXNlcyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbnYuY2xhc3Nlcy5wdXNoKGFsaWFzZXMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdF8uaG9va3MucnVuKCd3cmFwJywgZW52KTtcblxuXHRcdHZhciBhdHRyaWJ1dGVzID0gJyc7XG5cdFx0Zm9yICh2YXIgbmFtZSBpbiBlbnYuYXR0cmlidXRlcykge1xuXHRcdFx0YXR0cmlidXRlcyArPSAnICcgKyBuYW1lICsgJz1cIicgKyAoZW52LmF0dHJpYnV0ZXNbbmFtZV0gfHwgJycpLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKSArICdcIic7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICc8JyArIGVudi50YWcgKyAnIGNsYXNzPVwiJyArIGVudi5jbGFzc2VzLmpvaW4oJyAnKSArICdcIicgKyBhdHRyaWJ1dGVzICsgJz4nICsgZW52LmNvbnRlbnQgKyAnPC8nICsgZW52LnRhZyArICc+Jztcblx0fTtcblxuXHQvKipcblx0ICogQHBhcmFtIHtSZWdFeHB9IHBhdHRlcm5cblx0ICogQHBhcmFtIHtudW1iZXJ9IHBvc1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGxvb2tiZWhpbmRcblx0ICogQHJldHVybnMge1JlZ0V4cEV4ZWNBcnJheSB8IG51bGx9XG5cdCAqL1xuXHRmdW5jdGlvbiBtYXRjaFBhdHRlcm4ocGF0dGVybiwgcG9zLCB0ZXh0LCBsb29rYmVoaW5kKSB7XG5cdFx0cGF0dGVybi5sYXN0SW5kZXggPSBwb3M7XG5cdFx0dmFyIG1hdGNoID0gcGF0dGVybi5leGVjKHRleHQpO1xuXHRcdGlmIChtYXRjaCAmJiBsb29rYmVoaW5kICYmIG1hdGNoWzFdKSB7XG5cdFx0XHQvLyBjaGFuZ2UgdGhlIG1hdGNoIHRvIHJlbW92ZSB0aGUgdGV4dCBtYXRjaGVkIGJ5IHRoZSBQcmlzbSBsb29rYmVoaW5kIGdyb3VwXG5cdFx0XHR2YXIgbG9va2JlaGluZExlbmd0aCA9IG1hdGNoWzFdLmxlbmd0aDtcblx0XHRcdG1hdGNoLmluZGV4ICs9IGxvb2tiZWhpbmRMZW5ndGg7XG5cdFx0XHRtYXRjaFswXSA9IG1hdGNoWzBdLnNsaWNlKGxvb2tiZWhpbmRMZW5ndGgpO1xuXHRcdH1cblx0XHRyZXR1cm4gbWF0Y2g7XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHRcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0PHN0cmluZyB8IFRva2VuPn0gdG9rZW5MaXN0XG5cdCAqIEBwYXJhbSB7YW55fSBncmFtbWFyXG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdE5vZGU8c3RyaW5nIHwgVG9rZW4+fSBzdGFydE5vZGVcblx0ICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0UG9zXG5cdCAqIEBwYXJhbSB7UmVtYXRjaE9wdGlvbnN9IFtyZW1hdGNoXVxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICogQHByaXZhdGVcblx0ICpcblx0ICogQHR5cGVkZWYgUmVtYXRjaE9wdGlvbnNcblx0ICogQHByb3BlcnR5IHtzdHJpbmd9IGNhdXNlXG5cdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSByZWFjaFxuXHQgKi9cblx0ZnVuY3Rpb24gbWF0Y2hHcmFtbWFyKHRleHQsIHRva2VuTGlzdCwgZ3JhbW1hciwgc3RhcnROb2RlLCBzdGFydFBvcywgcmVtYXRjaCkge1xuXHRcdGZvciAodmFyIHRva2VuIGluIGdyYW1tYXIpIHtcblx0XHRcdGlmICghZ3JhbW1hci5oYXNPd25Qcm9wZXJ0eSh0b2tlbikgfHwgIWdyYW1tYXJbdG9rZW5dKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgcGF0dGVybnMgPSBncmFtbWFyW3Rva2VuXTtcblx0XHRcdHBhdHRlcm5zID0gQXJyYXkuaXNBcnJheShwYXR0ZXJucykgPyBwYXR0ZXJucyA6IFtwYXR0ZXJuc107XG5cblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgcGF0dGVybnMubGVuZ3RoOyArK2opIHtcblx0XHRcdFx0aWYgKHJlbWF0Y2ggJiYgcmVtYXRjaC5jYXVzZSA9PSB0b2tlbiArICcsJyArIGopIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgcGF0dGVybk9iaiA9IHBhdHRlcm5zW2pdO1xuXHRcdFx0XHR2YXIgaW5zaWRlID0gcGF0dGVybk9iai5pbnNpZGU7XG5cdFx0XHRcdHZhciBsb29rYmVoaW5kID0gISFwYXR0ZXJuT2JqLmxvb2tiZWhpbmQ7XG5cdFx0XHRcdHZhciBncmVlZHkgPSAhIXBhdHRlcm5PYmouZ3JlZWR5O1xuXHRcdFx0XHR2YXIgYWxpYXMgPSBwYXR0ZXJuT2JqLmFsaWFzO1xuXG5cdFx0XHRcdGlmIChncmVlZHkgJiYgIXBhdHRlcm5PYmoucGF0dGVybi5nbG9iYWwpIHtcblx0XHRcdFx0XHQvLyBXaXRob3V0IHRoZSBnbG9iYWwgZmxhZywgbGFzdEluZGV4IHdvbid0IHdvcmtcblx0XHRcdFx0XHR2YXIgZmxhZ3MgPSBwYXR0ZXJuT2JqLnBhdHRlcm4udG9TdHJpbmcoKS5tYXRjaCgvW2ltc3V5XSokLylbMF07XG5cdFx0XHRcdFx0cGF0dGVybk9iai5wYXR0ZXJuID0gUmVnRXhwKHBhdHRlcm5PYmoucGF0dGVybi5zb3VyY2UsIGZsYWdzICsgJ2cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qKiBAdHlwZSB7UmVnRXhwfSAqL1xuXHRcdFx0XHR2YXIgcGF0dGVybiA9IHBhdHRlcm5PYmoucGF0dGVybiB8fCBwYXR0ZXJuT2JqO1xuXG5cdFx0XHRcdGZvciAoIC8vIGl0ZXJhdGUgdGhlIHRva2VuIGxpc3QgYW5kIGtlZXAgdHJhY2sgb2YgdGhlIGN1cnJlbnQgdG9rZW4vc3RyaW5nIHBvc2l0aW9uXG5cdFx0XHRcdFx0dmFyIGN1cnJlbnROb2RlID0gc3RhcnROb2RlLm5leHQsIHBvcyA9IHN0YXJ0UG9zO1xuXHRcdFx0XHRcdGN1cnJlbnROb2RlICE9PSB0b2tlbkxpc3QudGFpbDtcblx0XHRcdFx0XHRwb3MgKz0gY3VycmVudE5vZGUudmFsdWUubGVuZ3RoLCBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHRcblx0XHRcdFx0KSB7XG5cblx0XHRcdFx0XHRpZiAocmVtYXRjaCAmJiBwb3MgPj0gcmVtYXRjaC5yZWFjaCkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIHN0ciA9IGN1cnJlbnROb2RlLnZhbHVlO1xuXG5cdFx0XHRcdFx0aWYgKHRva2VuTGlzdC5sZW5ndGggPiB0ZXh0Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0Ly8gU29tZXRoaW5nIHdlbnQgdGVycmlibHkgd3JvbmcsIEFCT1JULCBBQk9SVCFcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoc3RyIGluc3RhbmNlb2YgVG9rZW4pIHtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciByZW1vdmVDb3VudCA9IDE7IC8vIHRoaXMgaXMgdGhlIHRvIHBhcmFtZXRlciBvZiByZW1vdmVCZXR3ZWVuXG5cdFx0XHRcdFx0dmFyIG1hdGNoO1xuXG5cdFx0XHRcdFx0aWYgKGdyZWVkeSkge1xuXHRcdFx0XHRcdFx0bWF0Y2ggPSBtYXRjaFBhdHRlcm4ocGF0dGVybiwgcG9zLCB0ZXh0LCBsb29rYmVoaW5kKTtcblx0XHRcdFx0XHRcdGlmICghbWF0Y2ggfHwgbWF0Y2guaW5kZXggPj0gdGV4dC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciBmcm9tID0gbWF0Y2guaW5kZXg7XG5cdFx0XHRcdFx0XHR2YXIgdG8gPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcblx0XHRcdFx0XHRcdHZhciBwID0gcG9zO1xuXG5cdFx0XHRcdFx0XHQvLyBmaW5kIHRoZSBub2RlIHRoYXQgY29udGFpbnMgdGhlIG1hdGNoXG5cdFx0XHRcdFx0XHRwICs9IGN1cnJlbnROb2RlLnZhbHVlLmxlbmd0aDtcblx0XHRcdFx0XHRcdHdoaWxlIChmcm9tID49IHApIHtcblx0XHRcdFx0XHRcdFx0Y3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuXHRcdFx0XHRcdFx0XHRwICs9IGN1cnJlbnROb2RlLnZhbHVlLmxlbmd0aDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIGFkanVzdCBwb3MgKGFuZCBwKVxuXHRcdFx0XHRcdFx0cCAtPSBjdXJyZW50Tm9kZS52YWx1ZS5sZW5ndGg7XG5cdFx0XHRcdFx0XHRwb3MgPSBwO1xuXG5cdFx0XHRcdFx0XHQvLyB0aGUgY3VycmVudCBub2RlIGlzIGEgVG9rZW4sIHRoZW4gdGhlIG1hdGNoIHN0YXJ0cyBpbnNpZGUgYW5vdGhlciBUb2tlbiwgd2hpY2ggaXMgaW52YWxpZFxuXHRcdFx0XHRcdFx0aWYgKGN1cnJlbnROb2RlLnZhbHVlIGluc3RhbmNlb2YgVG9rZW4pIHtcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIGZpbmQgdGhlIGxhc3Qgbm9kZSB3aGljaCBpcyBhZmZlY3RlZCBieSB0aGlzIG1hdGNoXG5cdFx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0XHR2YXIgayA9IGN1cnJlbnROb2RlO1xuXHRcdFx0XHRcdFx0XHRrICE9PSB0b2tlbkxpc3QudGFpbCAmJiAocCA8IHRvIHx8IHR5cGVvZiBrLnZhbHVlID09PSAnc3RyaW5nJyk7XG5cdFx0XHRcdFx0XHRcdGsgPSBrLm5leHRcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRyZW1vdmVDb3VudCsrO1xuXHRcdFx0XHRcdFx0XHRwICs9IGsudmFsdWUubGVuZ3RoO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmVtb3ZlQ291bnQtLTtcblxuXHRcdFx0XHRcdFx0Ly8gcmVwbGFjZSB3aXRoIHRoZSBuZXcgbWF0Y2hcblx0XHRcdFx0XHRcdHN0ciA9IHRleHQuc2xpY2UocG9zLCBwKTtcblx0XHRcdFx0XHRcdG1hdGNoLmluZGV4IC09IHBvcztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bWF0Y2ggPSBtYXRjaFBhdHRlcm4ocGF0dGVybiwgMCwgc3RyLCBsb29rYmVoaW5kKTtcblx0XHRcdFx0XHRcdGlmICghbWF0Y2gpIHtcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlZGVjbGFyZVxuXHRcdFx0XHRcdHZhciBmcm9tID0gbWF0Y2guaW5kZXg7XG5cdFx0XHRcdFx0dmFyIG1hdGNoU3RyID0gbWF0Y2hbMF07XG5cdFx0XHRcdFx0dmFyIGJlZm9yZSA9IHN0ci5zbGljZSgwLCBmcm9tKTtcblx0XHRcdFx0XHR2YXIgYWZ0ZXIgPSBzdHIuc2xpY2UoZnJvbSArIG1hdGNoU3RyLmxlbmd0aCk7XG5cblx0XHRcdFx0XHR2YXIgcmVhY2ggPSBwb3MgKyBzdHIubGVuZ3RoO1xuXHRcdFx0XHRcdGlmIChyZW1hdGNoICYmIHJlYWNoID4gcmVtYXRjaC5yZWFjaCkge1xuXHRcdFx0XHRcdFx0cmVtYXRjaC5yZWFjaCA9IHJlYWNoO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciByZW1vdmVGcm9tID0gY3VycmVudE5vZGUucHJldjtcblxuXHRcdFx0XHRcdGlmIChiZWZvcmUpIHtcblx0XHRcdFx0XHRcdHJlbW92ZUZyb20gPSBhZGRBZnRlcih0b2tlbkxpc3QsIHJlbW92ZUZyb20sIGJlZm9yZSk7XG5cdFx0XHRcdFx0XHRwb3MgKz0gYmVmb3JlLmxlbmd0aDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZW1vdmVSYW5nZSh0b2tlbkxpc3QsIHJlbW92ZUZyb20sIHJlbW92ZUNvdW50KTtcblxuXHRcdFx0XHRcdHZhciB3cmFwcGVkID0gbmV3IFRva2VuKHRva2VuLCBpbnNpZGUgPyBfLnRva2VuaXplKG1hdGNoU3RyLCBpbnNpZGUpIDogbWF0Y2hTdHIsIGFsaWFzLCBtYXRjaFN0cik7XG5cdFx0XHRcdFx0Y3VycmVudE5vZGUgPSBhZGRBZnRlcih0b2tlbkxpc3QsIHJlbW92ZUZyb20sIHdyYXBwZWQpO1xuXG5cdFx0XHRcdFx0aWYgKGFmdGVyKSB7XG5cdFx0XHRcdFx0XHRhZGRBZnRlcih0b2tlbkxpc3QsIGN1cnJlbnROb2RlLCBhZnRlcik7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHJlbW92ZUNvdW50ID4gMSkge1xuXHRcdFx0XHRcdFx0Ly8gYXQgbGVhc3Qgb25lIFRva2VuIG9iamVjdCB3YXMgcmVtb3ZlZCwgc28gd2UgaGF2ZSB0byBkbyBzb21lIHJlbWF0Y2hpbmdcblx0XHRcdFx0XHRcdC8vIHRoaXMgY2FuIG9ubHkgaGFwcGVuIGlmIHRoZSBjdXJyZW50IHBhdHRlcm4gaXMgZ3JlZWR5XG5cblx0XHRcdFx0XHRcdC8qKiBAdHlwZSB7UmVtYXRjaE9wdGlvbnN9ICovXG5cdFx0XHRcdFx0XHR2YXIgbmVzdGVkUmVtYXRjaCA9IHtcblx0XHRcdFx0XHRcdFx0Y2F1c2U6IHRva2VuICsgJywnICsgaixcblx0XHRcdFx0XHRcdFx0cmVhY2g6IHJlYWNoXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0bWF0Y2hHcmFtbWFyKHRleHQsIHRva2VuTGlzdCwgZ3JhbW1hciwgY3VycmVudE5vZGUucHJldiwgcG9zLCBuZXN0ZWRSZW1hdGNoKTtcblxuXHRcdFx0XHRcdFx0Ly8gdGhlIHJlYWNoIG1pZ2h0IGhhdmUgYmVlbiBleHRlbmRlZCBiZWNhdXNlIG9mIHRoZSByZW1hdGNoaW5nXG5cdFx0XHRcdFx0XHRpZiAocmVtYXRjaCAmJiBuZXN0ZWRSZW1hdGNoLnJlYWNoID4gcmVtYXRjaC5yZWFjaCkge1xuXHRcdFx0XHRcdFx0XHRyZW1hdGNoLnJlYWNoID0gbmVzdGVkUmVtYXRjaC5yZWFjaDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQHR5cGVkZWYgTGlua2VkTGlzdE5vZGVcblx0ICogQHByb3BlcnR5IHtUfSB2YWx1ZVxuXHQgKiBAcHJvcGVydHkge0xpbmtlZExpc3ROb2RlPFQ+IHwgbnVsbH0gcHJldiBUaGUgcHJldmlvdXMgbm9kZS5cblx0ICogQHByb3BlcnR5IHtMaW5rZWRMaXN0Tm9kZTxUPiB8IG51bGx9IG5leHQgVGhlIG5leHQgbm9kZS5cblx0ICogQHRlbXBsYXRlIFRcblx0ICogQHByaXZhdGVcblx0ICovXG5cblx0LyoqXG5cdCAqIEB0ZW1wbGF0ZSBUXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRmdW5jdGlvbiBMaW5rZWRMaXN0KCkge1xuXHRcdC8qKiBAdHlwZSB7TGlua2VkTGlzdE5vZGU8VD59ICovXG5cdFx0dmFyIGhlYWQgPSB7IHZhbHVlOiBudWxsLCBwcmV2OiBudWxsLCBuZXh0OiBudWxsIH07XG5cdFx0LyoqIEB0eXBlIHtMaW5rZWRMaXN0Tm9kZTxUPn0gKi9cblx0XHR2YXIgdGFpbCA9IHsgdmFsdWU6IG51bGwsIHByZXY6IGhlYWQsIG5leHQ6IG51bGwgfTtcblx0XHRoZWFkLm5leHQgPSB0YWlsO1xuXG5cdFx0LyoqIEB0eXBlIHtMaW5rZWRMaXN0Tm9kZTxUPn0gKi9cblx0XHR0aGlzLmhlYWQgPSBoZWFkO1xuXHRcdC8qKiBAdHlwZSB7TGlua2VkTGlzdE5vZGU8VD59ICovXG5cdFx0dGhpcy50YWlsID0gdGFpbDtcblx0XHR0aGlzLmxlbmd0aCA9IDA7XG5cdH1cblxuXHQvKipcblx0ICogQWRkcyBhIG5ldyBub2RlIHdpdGggdGhlIGdpdmVuIHZhbHVlIHRvIHRoZSBsaXN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3Q8VD59IGxpc3Rcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0Tm9kZTxUPn0gbm9kZVxuXHQgKiBAcGFyYW0ge1R9IHZhbHVlXG5cdCAqIEByZXR1cm5zIHtMaW5rZWRMaXN0Tm9kZTxUPn0gVGhlIGFkZGVkIG5vZGUuXG5cdCAqIEB0ZW1wbGF0ZSBUXG5cdCAqL1xuXHRmdW5jdGlvbiBhZGRBZnRlcihsaXN0LCBub2RlLCB2YWx1ZSkge1xuXHRcdC8vIGFzc3VtZXMgdGhhdCBub2RlICE9IGxpc3QudGFpbCAmJiB2YWx1ZXMubGVuZ3RoID49IDBcblx0XHR2YXIgbmV4dCA9IG5vZGUubmV4dDtcblxuXHRcdHZhciBuZXdOb2RlID0geyB2YWx1ZTogdmFsdWUsIHByZXY6IG5vZGUsIG5leHQ6IG5leHQgfTtcblx0XHRub2RlLm5leHQgPSBuZXdOb2RlO1xuXHRcdG5leHQucHJldiA9IG5ld05vZGU7XG5cdFx0bGlzdC5sZW5ndGgrKztcblxuXHRcdHJldHVybiBuZXdOb2RlO1xuXHR9XG5cdC8qKlxuXHQgKiBSZW1vdmVzIGBjb3VudGAgbm9kZXMgYWZ0ZXIgdGhlIGdpdmVuIG5vZGUuIFRoZSBnaXZlbiBub2RlIHdpbGwgbm90IGJlIHJlbW92ZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdDxUPn0gbGlzdFxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3ROb2RlPFQ+fSBub2RlXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudFxuXHQgKiBAdGVtcGxhdGUgVFxuXHQgKi9cblx0ZnVuY3Rpb24gcmVtb3ZlUmFuZ2UobGlzdCwgbm9kZSwgY291bnQpIHtcblx0XHR2YXIgbmV4dCA9IG5vZGUubmV4dDtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50ICYmIG5leHQgIT09IGxpc3QudGFpbDsgaSsrKSB7XG5cdFx0XHRuZXh0ID0gbmV4dC5uZXh0O1xuXHRcdH1cblx0XHRub2RlLm5leHQgPSBuZXh0O1xuXHRcdG5leHQucHJldiA9IG5vZGU7XG5cdFx0bGlzdC5sZW5ndGggLT0gaTtcblx0fVxuXHQvKipcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0PFQ+fSBsaXN0XG5cdCAqIEByZXR1cm5zIHtUW119XG5cdCAqIEB0ZW1wbGF0ZSBUXG5cdCAqL1xuXHRmdW5jdGlvbiB0b0FycmF5KGxpc3QpIHtcblx0XHR2YXIgYXJyYXkgPSBbXTtcblx0XHR2YXIgbm9kZSA9IGxpc3QuaGVhZC5uZXh0O1xuXHRcdHdoaWxlIChub2RlICE9PSBsaXN0LnRhaWwpIHtcblx0XHRcdGFycmF5LnB1c2gobm9kZS52YWx1ZSk7XG5cdFx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHRcdH1cblx0XHRyZXR1cm4gYXJyYXk7XG5cdH1cblxuXHRyZXR1cm4gXztcblxufSgpKTtcblxudmFyIHByaXNtID0gUHJpc207XG5QcmlzbS5kZWZhdWx0ID0gUHJpc207XG5cbi8qIFRoaXMgY29udGVudCBpcyBhdXRvLWdlbmVyYXRlZCB0byBpbmNsdWRlIHNvbWUgcHJpc21qcyBsYW5ndWFnZSBjb21wb25lbnRzOiAqL1xuXG4vKiBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1tYXJrdXBcIiAqL1xuXG5wcmlzbS5sYW5ndWFnZXMubWFya3VwID0ge1xuICAnY29tbWVudCc6IHtcbiAgICBwYXR0ZXJuOiAvPCEtLSg/Oig/ITwhLS0pW1xcc1xcU10pKj8tLT4vLFxuICAgIGdyZWVkeTogdHJ1ZVxuICB9LFxuICAncHJvbG9nJzoge1xuICAgIHBhdHRlcm46IC88XFw/W1xcc1xcU10rP1xcPz4vLFxuICAgIGdyZWVkeTogdHJ1ZVxuICB9LFxuICAnZG9jdHlwZSc6IHtcbiAgICAvLyBodHRwczovL3d3dy53My5vcmcvVFIveG1sLyNOVC1kb2N0eXBlZGVjbFxuICAgIHBhdHRlcm46IC88IURPQ1RZUEUoPzpbXj5cIidbXFxdXXxcIlteXCJdKlwifCdbXiddKicpKyg/OlxcWyg/OltePFwiJ1xcXV18XCJbXlwiXSpcInwnW14nXSonfDwoPyEhLS0pfDwhLS0oPzpbXi1dfC0oPyEtPikpKi0tPikqXFxdXFxzKik/Pi9pLFxuICAgIGdyZWVkeTogdHJ1ZSxcbiAgICBpbnNpZGU6IHtcbiAgICAgICdpbnRlcm5hbC1zdWJzZXQnOiB7XG4gICAgICAgIHBhdHRlcm46IC8oXlteXFxbXSpcXFspW1xcc1xcU10rKD89XFxdPiQpLyxcbiAgICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgICAgZ3JlZWR5OiB0cnVlLFxuICAgICAgICBpbnNpZGU6IG51bGwgLy8gc2VlIGJlbG93XG5cbiAgICAgIH0sXG4gICAgICAnc3RyaW5nJzoge1xuICAgICAgICBwYXR0ZXJuOiAvXCJbXlwiXSpcInwnW14nXSonLyxcbiAgICAgICAgZ3JlZWR5OiB0cnVlXG4gICAgICB9LFxuICAgICAgJ3B1bmN0dWF0aW9uJzogL148IXw+JHxbW1xcXV0vLFxuICAgICAgJ2RvY3R5cGUtdGFnJzogL15ET0NUWVBFL2ksXG4gICAgICAnbmFtZSc6IC9bXlxcczw+J1wiXSsvXG4gICAgfVxuICB9LFxuICAnY2RhdGEnOiB7XG4gICAgcGF0dGVybjogLzwhXFxbQ0RBVEFcXFtbXFxzXFxTXSo/XFxdXFxdPi9pLFxuICAgIGdyZWVkeTogdHJ1ZVxuICB9LFxuICAndGFnJzoge1xuICAgIHBhdHRlcm46IC88XFwvPyg/IVxcZClbXlxccz5cXC89JDwlXSsoPzpcXHMoPzpcXHMqW15cXHM+XFwvPV0rKD86XFxzKj1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonfFteXFxzJ1wiPj1dKyg/PVtcXHM+XSkpfCg/PVtcXHMvPl0pKSkrKT9cXHMqXFwvPz4vLFxuICAgIGdyZWVkeTogdHJ1ZSxcbiAgICBpbnNpZGU6IHtcbiAgICAgICd0YWcnOiB7XG4gICAgICAgIHBhdHRlcm46IC9ePFxcLz9bXlxccz5cXC9dKy8sXG4gICAgICAgIGluc2lkZToge1xuICAgICAgICAgICdwdW5jdHVhdGlvbic6IC9ePFxcLz8vLFxuICAgICAgICAgICduYW1lc3BhY2UnOiAvXlteXFxzPlxcLzpdKzovXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAnc3BlY2lhbC1hdHRyJzogW10sXG4gICAgICAnYXR0ci12YWx1ZSc6IHtcbiAgICAgICAgcGF0dGVybjogLz1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonfFteXFxzJ1wiPj1dKykvLFxuICAgICAgICBpbnNpZGU6IHtcbiAgICAgICAgICAncHVuY3R1YXRpb24nOiBbe1xuICAgICAgICAgICAgcGF0dGVybjogL149LyxcbiAgICAgICAgICAgIGFsaWFzOiAnYXR0ci1lcXVhbHMnXG4gICAgICAgICAgfSwgL1wifCcvXVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ3B1bmN0dWF0aW9uJzogL1xcLz8+LyxcbiAgICAgICdhdHRyLW5hbWUnOiB7XG4gICAgICAgIHBhdHRlcm46IC9bXlxccz5cXC9dKy8sXG4gICAgICAgIGluc2lkZToge1xuICAgICAgICAgICduYW1lc3BhY2UnOiAvXlteXFxzPlxcLzpdKzovXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gICdlbnRpdHknOiBbe1xuICAgIHBhdHRlcm46IC8mW1xcZGEtel17MSw4fTsvaSxcbiAgICBhbGlhczogJ25hbWVkLWVudGl0eSdcbiAgfSwgLyYjeD9bXFxkYS1mXXsxLDh9Oy9pXVxufTtcbnByaXNtLmxhbmd1YWdlcy5tYXJrdXBbJ3RhZyddLmluc2lkZVsnYXR0ci12YWx1ZSddLmluc2lkZVsnZW50aXR5J10gPSBwcmlzbS5sYW5ndWFnZXMubWFya3VwWydlbnRpdHknXTtcbnByaXNtLmxhbmd1YWdlcy5tYXJrdXBbJ2RvY3R5cGUnXS5pbnNpZGVbJ2ludGVybmFsLXN1YnNldCddLmluc2lkZSA9IHByaXNtLmxhbmd1YWdlcy5tYXJrdXA7IC8vIFBsdWdpbiB0byBtYWtlIGVudGl0eSB0aXRsZSBzaG93IHRoZSByZWFsIGVudGl0eSwgaWRlYSBieSBSb21hbiBLb21hcm92XG5cbnByaXNtLmhvb2tzLmFkZCgnd3JhcCcsIGZ1bmN0aW9uIChlbnYpIHtcbiAgaWYgKGVudi50eXBlID09PSAnZW50aXR5Jykge1xuICAgIGVudi5hdHRyaWJ1dGVzWyd0aXRsZSddID0gZW52LmNvbnRlbnQucmVwbGFjZSgvJmFtcDsvLCAnJicpO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZywgJ2FkZElubGluZWQnLCB7XG4gIC8qKlxuICAgKiBBZGRzIGFuIGlubGluZWQgbGFuZ3VhZ2UgdG8gbWFya3VwLlxuICAgKlxuICAgKiBBbiBleGFtcGxlIG9mIGFuIGlubGluZWQgbGFuZ3VhZ2UgaXMgQ1NTIHdpdGggYDxzdHlsZT5gIHRhZ3MuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0YWdOYW1lIFRoZSBuYW1lIG9mIHRoZSB0YWcgdGhhdCBjb250YWlucyB0aGUgaW5saW5lZCBsYW5ndWFnZS4gVGhpcyBuYW1lIHdpbGwgYmUgdHJlYXRlZCBhc1xuICAgKiBjYXNlIGluc2Vuc2l0aXZlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZyBUaGUgbGFuZ3VhZ2Uga2V5LlxuICAgKiBAZXhhbXBsZVxuICAgKiBhZGRJbmxpbmVkKCdzdHlsZScsICdjc3MnKTtcbiAgICovXG4gIHZhbHVlOiBmdW5jdGlvbiBhZGRJbmxpbmVkKHRhZ05hbWUsIGxhbmcpIHtcbiAgICB2YXIgaW5jbHVkZWRDZGF0YUluc2lkZSA9IHt9O1xuICAgIGluY2x1ZGVkQ2RhdGFJbnNpZGVbJ2xhbmd1YWdlLScgKyBsYW5nXSA9IHtcbiAgICAgIHBhdHRlcm46IC8oXjwhXFxbQ0RBVEFcXFspW1xcc1xcU10rPyg/PVxcXVxcXT4kKS9pLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgIGluc2lkZTogcHJpc20ubGFuZ3VhZ2VzW2xhbmddXG4gICAgfTtcbiAgICBpbmNsdWRlZENkYXRhSW5zaWRlWydjZGF0YSddID0gL148IVxcW0NEQVRBXFxbfFxcXVxcXT4kL2k7XG4gICAgdmFyIGluc2lkZSA9IHtcbiAgICAgICdpbmNsdWRlZC1jZGF0YSc6IHtcbiAgICAgICAgcGF0dGVybjogLzwhXFxbQ0RBVEFcXFtbXFxzXFxTXSo/XFxdXFxdPi9pLFxuICAgICAgICBpbnNpZGU6IGluY2x1ZGVkQ2RhdGFJbnNpZGVcbiAgICAgIH1cbiAgICB9O1xuICAgIGluc2lkZVsnbGFuZ3VhZ2UtJyArIGxhbmddID0ge1xuICAgICAgcGF0dGVybjogL1tcXHNcXFNdKy8sXG4gICAgICBpbnNpZGU6IHByaXNtLmxhbmd1YWdlc1tsYW5nXVxuICAgIH07XG4gICAgdmFyIGRlZiA9IHt9O1xuICAgIGRlZlt0YWdOYW1lXSA9IHtcbiAgICAgIHBhdHRlcm46IFJlZ0V4cCgvKDxfX1tePl0qPikoPzo8IVxcW0NEQVRBXFxbKD86W15cXF1dfFxcXSg/IVxcXT4pKSpcXF1cXF0+fCg/ITwhXFxbQ0RBVEFcXFspW1xcc1xcU10pKj8oPz08XFwvX18+KS8uc291cmNlLnJlcGxhY2UoL19fL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRhZ05hbWU7XG4gICAgICB9KSwgJ2knKSxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBncmVlZHk6IHRydWUsXG4gICAgICBpbnNpZGU6IGluc2lkZVxuICAgIH07XG4gICAgcHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ2NkYXRhJywgZGVmKTtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcsICdhZGRBdHRyaWJ1dGUnLCB7XG4gIC8qKlxuICAgKiBBZGRzIGFuIHBhdHRlcm4gdG8gaGlnaGxpZ2h0IGxhbmd1YWdlcyBlbWJlZGRlZCBpbiBIVE1MIGF0dHJpYnV0ZXMuXG4gICAqXG4gICAqIEFuIGV4YW1wbGUgb2YgYW4gaW5saW5lZCBsYW5ndWFnZSBpcyBDU1Mgd2l0aCBgc3R5bGVgIGF0dHJpYnV0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyTmFtZSBUaGUgbmFtZSBvZiB0aGUgdGFnIHRoYXQgY29udGFpbnMgdGhlIGlubGluZWQgbGFuZ3VhZ2UuIFRoaXMgbmFtZSB3aWxsIGJlIHRyZWF0ZWQgYXNcbiAgICogY2FzZSBpbnNlbnNpdGl2ZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmcgVGhlIGxhbmd1YWdlIGtleS5cbiAgICogQGV4YW1wbGVcbiAgICogYWRkQXR0cmlidXRlKCdzdHlsZScsICdjc3MnKTtcbiAgICovXG4gIHZhbHVlOiBmdW5jdGlvbiAoYXR0ck5hbWUsIGxhbmcpIHtcbiAgICBwcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZy5pbnNpZGVbJ3NwZWNpYWwtYXR0ciddLnB1c2goe1xuICAgICAgcGF0dGVybjogUmVnRXhwKC8oXnxbXCInXFxzXSkvLnNvdXJjZSArICcoPzonICsgYXR0ck5hbWUgKyAnKScgKyAvXFxzKj1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonfFteXFxzJ1wiPj1dKyg/PVtcXHM+XSkpLy5zb3VyY2UsICdpJyksXG4gICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgaW5zaWRlOiB7XG4gICAgICAgICdhdHRyLW5hbWUnOiAvXlteXFxzPV0rLyxcbiAgICAgICAgJ2F0dHItdmFsdWUnOiB7XG4gICAgICAgICAgcGF0dGVybjogLz1bXFxzXFxTXSsvLFxuICAgICAgICAgIGluc2lkZToge1xuICAgICAgICAgICAgJ3ZhbHVlJzoge1xuICAgICAgICAgICAgICBwYXR0ZXJuOiAvKF49XFxzKihbXCInXXwoPyFbXCInXSkpKVxcU1tcXHNcXFNdKig/PVxcMiQpLyxcbiAgICAgICAgICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgICAgICAgICAgYWxpYXM6IFtsYW5nLCAnbGFuZ3VhZ2UtJyArIGxhbmddLFxuICAgICAgICAgICAgICBpbnNpZGU6IHByaXNtLmxhbmd1YWdlc1tsYW5nXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdwdW5jdHVhdGlvbic6IFt7XG4gICAgICAgICAgICAgIHBhdHRlcm46IC9ePS8sXG4gICAgICAgICAgICAgIGFsaWFzOiAnYXR0ci1lcXVhbHMnXG4gICAgICAgICAgICB9LCAvXCJ8Jy9dXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0pO1xucHJpc20ubGFuZ3VhZ2VzLmh0bWwgPSBwcmlzbS5sYW5ndWFnZXMubWFya3VwO1xucHJpc20ubGFuZ3VhZ2VzLm1hdGhtbCA9IHByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5wcmlzbS5sYW5ndWFnZXMuc3ZnID0gcHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcbnByaXNtLmxhbmd1YWdlcy54bWwgPSBwcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdtYXJrdXAnLCB7fSk7XG5wcmlzbS5sYW5ndWFnZXMuc3NtbCA9IHByaXNtLmxhbmd1YWdlcy54bWw7XG5wcmlzbS5sYW5ndWFnZXMuYXRvbSA9IHByaXNtLmxhbmd1YWdlcy54bWw7XG5wcmlzbS5sYW5ndWFnZXMucnNzID0gcHJpc20ubGFuZ3VhZ2VzLnhtbDtcbi8qIFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWJhc2hcIiAqL1xuXG4oZnVuY3Rpb24gKFByaXNtKSB7XG4gIC8vICQgc2V0IHwgZ3JlcCAnXltBLVpdW15bOnNwYWNlOl1dKj0nIHwgY3V0IC1kPSAtZjEgfCB0ciAnXFxuJyAnfCdcbiAgLy8gKyBMQ19BTEwsIFJBTkRPTSwgUkVQTFksIFNFQ09ORFMuXG4gIC8vICsgbWFrZSBzdXJlIFBTMS4uNCBhcmUgaGVyZSBhcyB0aGV5IGFyZSBub3QgYWx3YXlzIHNldCxcbiAgLy8gLSBzb21lIHVzZWxlc3MgdGhpbmdzLlxuICB2YXIgZW52VmFycyA9ICdcXFxcYig/OkJBU0h8QkFTSE9QVFN8QkFTSF9BTElBU0VTfEJBU0hfQVJHQ3xCQVNIX0FSR1Z8QkFTSF9DTURTfEJBU0hfQ09NUExFVElPTl9DT01QQVRfRElSfEJBU0hfTElORU5PfEJBU0hfUkVNQVRDSHxCQVNIX1NPVVJDRXxCQVNIX1ZFUlNJTkZPfEJBU0hfVkVSU0lPTnxDT0xPUlRFUk18Q09MVU1OU3xDT01QX1dPUkRCUkVBS1N8REJVU19TRVNTSU9OX0JVU19BRERSRVNTfERFRkFVTFRTX1BBVEh8REVTS1RPUF9TRVNTSU9OfERJUlNUQUNLfERJU1BMQVl8RVVJRHxHRE1TRVNTSU9OfEdETV9MQU5HfEdOT01FX0tFWVJJTkdfQ09OVFJPTHxHTk9NRV9LRVlSSU5HX1BJRHxHUEdfQUdFTlRfSU5GT3xHUk9VUFN8SElTVENPTlRST0x8SElTVEZJTEV8SElTVEZJTEVTSVpFfEhJU1RTSVpFfEhPTUV8SE9TVE5BTUV8SE9TVFRZUEV8SUZTfElOU1RBTkNFfEpPQnxMQU5HfExBTkdVQUdFfExDX0FERFJFU1N8TENfQUxMfExDX0lERU5USUZJQ0FUSU9OfExDX01FQVNVUkVNRU5UfExDX01PTkVUQVJZfExDX05BTUV8TENfTlVNRVJJQ3xMQ19QQVBFUnxMQ19URUxFUEhPTkV8TENfVElNRXxMRVNTQ0xPU0V8TEVTU09QRU58TElORVN8TE9HTkFNRXxMU19DT0xPUlN8TUFDSFRZUEV8TUFJTENIRUNLfE1BTkRBVE9SWV9QQVRIfE5PX0FUX0JSSURHRXxPTERQV0R8T1BURVJSfE9QVElORHxPUkJJVF9TT0NLRVRESVJ8T1NUWVBFfFBBUEVSU0laRXxQQVRIfFBJUEVTVEFUVVN8UFBJRHxQUzF8UFMyfFBTM3xQUzR8UFdEfFJBTkRPTXxSRVBMWXxTRUNPTkRTfFNFTElOVVhfSU5JVHxTRVNTSU9OfFNFU1NJT05UWVBFfFNFU1NJT05fTUFOQUdFUnxTSEVMTHxTSEVMTE9QVFN8U0hMVkx8U1NIX0FVVEhfU09DS3xURVJNfFVJRHxVUFNUQVJUX0VWRU5UU3xVUFNUQVJUX0lOU1RBTkNFfFVQU1RBUlRfSk9CfFVQU1RBUlRfU0VTU0lPTnxVU0VSfFdJTkRPV0lEfFhBVVRIT1JJVFl8WERHX0NPTkZJR19ESVJTfFhER19DVVJSRU5UX0RFU0tUT1B8WERHX0RBVEFfRElSU3xYREdfR1JFRVRFUl9EQVRBX0RJUnxYREdfTUVOVV9QUkVGSVh8WERHX1JVTlRJTUVfRElSfFhER19TRUFUfFhER19TRUFUX1BBVEh8WERHX1NFU1NJT05fREVTS1RPUHxYREdfU0VTU0lPTl9JRHxYREdfU0VTU0lPTl9QQVRIfFhER19TRVNTSU9OX1RZUEV8WERHX1ZUTlJ8WE1PRElGSUVSUylcXFxcYic7XG4gIHZhciBjb21tYW5kQWZ0ZXJIZXJlZG9jID0ge1xuICAgIHBhdHRlcm46IC8oXihbXCInXT8pXFx3K1xcMilbIFxcdF0rXFxTLiovLFxuICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgYWxpYXM6ICdwdW5jdHVhdGlvbicsXG4gICAgLy8gdGhpcyBsb29rcyByZWFzb25hYmx5IHdlbGwgaW4gYWxsIHRoZW1lc1xuICAgIGluc2lkZTogbnVsbCAvLyBzZWUgYmVsb3dcblxuICB9O1xuICB2YXIgaW5zaWRlU3RyaW5nID0ge1xuICAgICdiYXNoJzogY29tbWFuZEFmdGVySGVyZWRvYyxcbiAgICAnZW52aXJvbm1lbnQnOiB7XG4gICAgICBwYXR0ZXJuOiBSZWdFeHAoJ1xcXFwkJyArIGVudlZhcnMpLFxuICAgICAgYWxpYXM6ICdjb25zdGFudCdcbiAgICB9LFxuICAgICd2YXJpYWJsZSc6IFsvLyBbMF06IEFyaXRobWV0aWMgRW52aXJvbm1lbnRcbiAgICB7XG4gICAgICBwYXR0ZXJuOiAvXFwkP1xcKFxcKFtcXHNcXFNdKz9cXClcXCkvLFxuICAgICAgZ3JlZWR5OiB0cnVlLFxuICAgICAgaW5zaWRlOiB7XG4gICAgICAgIC8vIElmIHRoZXJlIGlzIGEgJCBzaWduIGF0IHRoZSBiZWdpbm5pbmcgaGlnaGxpZ2h0ICQoKCBhbmQgKSkgYXMgdmFyaWFibGVcbiAgICAgICAgJ3ZhcmlhYmxlJzogW3tcbiAgICAgICAgICBwYXR0ZXJuOiAvKF5cXCRcXChcXChbXFxzXFxTXSspXFwpXFwpLyxcbiAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgICAgIH0sIC9eXFwkXFwoXFwoL10sXG4gICAgICAgICdudW1iZXInOiAvXFxiMHhbXFxkQS1GYS1mXStcXGJ8KD86XFxiXFxkKyg/OlxcLlxcZCopP3xcXEJcXC5cXGQrKSg/OltFZV0tP1xcZCspPy8sXG4gICAgICAgIC8vIE9wZXJhdG9ycyBhY2NvcmRpbmcgdG8gaHR0cHM6Ly93d3cuZ251Lm9yZy9zb2Z0d2FyZS9iYXNoL21hbnVhbC9iYXNocmVmLmh0bWwjU2hlbGwtQXJpdGhtZXRpY1xuICAgICAgICAnb3BlcmF0b3InOiAvLS18XFwrXFwrfFxcKlxcKj0/fDw8PT98Pj49P3wmJnxcXHxcXHx8Wz0hK1xcLSovJTw+XiZ8XT0/fFs/fjpdLyxcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gJCBzaWduIGF0IHRoZSBiZWdpbm5pbmcgaGlnaGxpZ2h0ICgoIGFuZCApKSBhcyBwdW5jdHVhdGlvblxuICAgICAgICAncHVuY3R1YXRpb24nOiAvXFwoXFwoP3xcXClcXCk/fCx8Oy9cbiAgICAgIH1cbiAgICB9LCAvLyBbMV06IENvbW1hbmQgU3Vic3RpdHV0aW9uXG4gICAge1xuICAgICAgcGF0dGVybjogL1xcJFxcKCg/OlxcKFteKV0rXFwpfFteKCldKStcXCl8YFteYF0rYC8sXG4gICAgICBncmVlZHk6IHRydWUsXG4gICAgICBpbnNpZGU6IHtcbiAgICAgICAgJ3ZhcmlhYmxlJzogL15cXCRcXCh8XmB8XFwpJHxgJC9cbiAgICAgIH1cbiAgICB9LCAvLyBbMl06IEJyYWNlIGV4cGFuc2lvblxuICAgIHtcbiAgICAgIHBhdHRlcm46IC9cXCRcXHtbXn1dK1xcfS8sXG4gICAgICBncmVlZHk6IHRydWUsXG4gICAgICBpbnNpZGU6IHtcbiAgICAgICAgJ29wZXJhdG9yJzogLzpbLT0/K10/fFshXFwvXXwjIz98JSU/fFxcXlxcXj98LCw/LyxcbiAgICAgICAgJ3B1bmN0dWF0aW9uJzogL1tcXFtcXF1dLyxcbiAgICAgICAgJ2Vudmlyb25tZW50Jzoge1xuICAgICAgICAgIHBhdHRlcm46IFJlZ0V4cCgnKFxcXFx7KScgKyBlbnZWYXJzKSxcbiAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICAgIGFsaWFzOiAnY29uc3RhbnQnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCAvXFwkKD86XFx3K3xbIz8qIUAkXSkvXSxcbiAgICAvLyBFc2NhcGUgc2VxdWVuY2VzIGZyb20gZWNobyBhbmQgcHJpbnRmJ3MgbWFudWFscywgYW5kIGVzY2FwZWQgcXVvdGVzLlxuICAgICdlbnRpdHknOiAvXFxcXCg/OlthYmNlRWZucnR2XFxcXFwiXXxPP1swLTddezEsM318VVswLTlhLWZBLUZdezh9fHVbMC05YS1mQS1GXXs0fXx4WzAtOWEtZkEtRl17MSwyfSkvXG4gIH07XG4gIFByaXNtLmxhbmd1YWdlcy5iYXNoID0ge1xuICAgICdzaGViYW5nJzoge1xuICAgICAgcGF0dGVybjogL14jIVxccypcXC8uKi8sXG4gICAgICBhbGlhczogJ2ltcG9ydGFudCdcbiAgICB9LFxuICAgICdjb21tZW50Jzoge1xuICAgICAgcGF0dGVybjogLyhefFteXCJ7XFxcXCRdKSMuKi8sXG4gICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgfSxcbiAgICAnZnVuY3Rpb24tbmFtZSc6IFsvLyBhKSBmdW5jdGlvbiBmb28ge1xuICAgIC8vIGIpIGZvbygpIHtcbiAgICAvLyBjKSBmdW5jdGlvbiBmb28oKSB7XG4gICAgLy8gYnV0IG5vdCDigJxmb28ge+KAnVxuICAgIHtcbiAgICAgIC8vIGEpIGFuZCBjKVxuICAgICAgcGF0dGVybjogLyhcXGJmdW5jdGlvblxccyspW1xcdy1dKyg/PSg/OlxccypcXCg/OlxccypcXCkpP1xccypcXHspLyxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBhbGlhczogJ2Z1bmN0aW9uJ1xuICAgIH0sIHtcbiAgICAgIC8vIGIpXG4gICAgICBwYXR0ZXJuOiAvXFxiW1xcdy1dKyg/PVxccypcXChcXHMqXFwpXFxzKlxceykvLFxuICAgICAgYWxpYXM6ICdmdW5jdGlvbidcbiAgICB9XSxcbiAgICAvLyBIaWdobGlnaHQgdmFyaWFibGUgbmFtZXMgYXMgdmFyaWFibGVzIGluIGZvciBhbmQgc2VsZWN0IGJlZ2lubmluZ3MuXG4gICAgJ2Zvci1vci1zZWxlY3QnOiB7XG4gICAgICBwYXR0ZXJuOiAvKFxcYig/OmZvcnxzZWxlY3QpXFxzKylcXHcrKD89XFxzK2luXFxzKS8sXG4gICAgICBhbGlhczogJ3ZhcmlhYmxlJyxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICB9LFxuICAgIC8vIEhpZ2hsaWdodCB2YXJpYWJsZSBuYW1lcyBhcyB2YXJpYWJsZXMgaW4gdGhlIGxlZnQtaGFuZCBwYXJ0XG4gICAgLy8gb2YgYXNzaWdubWVudHMgKOKAnD3igJ0gYW5kIOKAnCs94oCdKS5cbiAgICAnYXNzaWduLWxlZnQnOiB7XG4gICAgICBwYXR0ZXJuOiAvKF58W1xcczt8Jl18Wzw+XVxcKClcXHcrKD89XFwrPz0pLyxcbiAgICAgIGluc2lkZToge1xuICAgICAgICAnZW52aXJvbm1lbnQnOiB7XG4gICAgICAgICAgcGF0dGVybjogUmVnRXhwKCcoXnxbXFxcXHM7fCZdfFs8Pl1cXFxcKCknICsgZW52VmFycyksXG4gICAgICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgICAgICBhbGlhczogJ2NvbnN0YW50J1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYWxpYXM6ICd2YXJpYWJsZScsXG4gICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgfSxcbiAgICAnc3RyaW5nJzogWy8vIFN1cHBvcnQgZm9yIEhlcmUtZG9jdW1lbnRzIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hlcmVfZG9jdW1lbnRcbiAgICB7XG4gICAgICBwYXR0ZXJuOiAvKCg/Ol58W148XSk8PC0/XFxzKikoXFx3KylcXHNbXFxzXFxTXSo/KD86XFxyP1xcbnxcXHIpXFwyLyxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBncmVlZHk6IHRydWUsXG4gICAgICBpbnNpZGU6IGluc2lkZVN0cmluZ1xuICAgIH0sIC8vIEhlcmUtZG9jdW1lbnQgd2l0aCBxdW90ZXMgYXJvdW5kIHRoZSB0YWdcbiAgICAvLyDihpIgTm8gZXhwYW5zaW9uIChzbyBubyDigJxpbnNpZGXigJ0pLlxuICAgIHtcbiAgICAgIHBhdHRlcm46IC8oKD86XnxbXjxdKTw8LT9cXHMqKShbXCInXSkoXFx3KylcXDJcXHNbXFxzXFxTXSo/KD86XFxyP1xcbnxcXHIpXFwzLyxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBncmVlZHk6IHRydWUsXG4gICAgICBpbnNpZGU6IHtcbiAgICAgICAgJ2Jhc2gnOiBjb21tYW5kQWZ0ZXJIZXJlZG9jXG4gICAgICB9XG4gICAgfSwgLy8g4oCcTm9ybWFs4oCdIHN0cmluZ1xuICAgIHtcbiAgICAgIC8vIGh0dHBzOi8vd3d3LmdudS5vcmcvc29mdHdhcmUvYmFzaC9tYW51YWwvaHRtbF9ub2RlL0RvdWJsZS1RdW90ZXMuaHRtbFxuICAgICAgcGF0dGVybjogLyhefFteXFxcXF0oPzpcXFxcXFxcXCkqKVwiKD86XFxcXFtcXHNcXFNdfFxcJFxcKFteKV0rXFwpfFxcJCg/IVxcKCl8YFteYF0rYHxbXlwiXFxcXGAkXSkqXCIvLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgIGdyZWVkeTogdHJ1ZSxcbiAgICAgIGluc2lkZTogaW5zaWRlU3RyaW5nXG4gICAgfSwge1xuICAgICAgLy8gaHR0cHM6Ly93d3cuZ251Lm9yZy9zb2Z0d2FyZS9iYXNoL21hbnVhbC9odG1sX25vZGUvU2luZ2xlLVF1b3Rlcy5odG1sXG4gICAgICBwYXR0ZXJuOiAvKF58W14kXFxcXF0pJ1teJ10qJy8sXG4gICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgZ3JlZWR5OiB0cnVlXG4gICAgfSwge1xuICAgICAgLy8gaHR0cHM6Ly93d3cuZ251Lm9yZy9zb2Z0d2FyZS9iYXNoL21hbnVhbC9odG1sX25vZGUvQU5TSV8wMDJkQy1RdW90aW5nLmh0bWxcbiAgICAgIHBhdHRlcm46IC9cXCQnKD86W14nXFxcXF18XFxcXFtcXHNcXFNdKSonLyxcbiAgICAgIGdyZWVkeTogdHJ1ZSxcbiAgICAgIGluc2lkZToge1xuICAgICAgICAnZW50aXR5JzogaW5zaWRlU3RyaW5nLmVudGl0eVxuICAgICAgfVxuICAgIH1dLFxuICAgICdlbnZpcm9ubWVudCc6IHtcbiAgICAgIHBhdHRlcm46IFJlZ0V4cCgnXFxcXCQ/JyArIGVudlZhcnMpLFxuICAgICAgYWxpYXM6ICdjb25zdGFudCdcbiAgICB9LFxuICAgICd2YXJpYWJsZSc6IGluc2lkZVN0cmluZy52YXJpYWJsZSxcbiAgICAnZnVuY3Rpb24nOiB7XG4gICAgICBwYXR0ZXJuOiAvKF58W1xcczt8Jl18Wzw+XVxcKCkoPzphZGR8YXByb3Bvc3xhcHR8YXB0LWNhY2hlfGFwdC1nZXR8YXB0aXR1ZGV8YXNwZWxsfGF1dG9teXNxbGJhY2t1cHxhd2t8YmFzZW5hbWV8YmFzaHxiY3xiY29uc29sZXxiZ3xiemlwMnxjYWx8Y2F0fGNmZGlza3xjaGdycHxjaGtjb25maWd8Y2htb2R8Y2hvd258Y2hyb290fGNrc3VtfGNsZWFyfGNtcHxjb2x1bW58Y29tbXxjb21wb3NlcnxjcHxjcm9ufGNyb250YWJ8Y3NwbGl0fGN1cmx8Y3V0fGRhdGV8ZGN8ZGR8ZGRyZXNjdWV8ZGVib290c3RyYXB8ZGZ8ZGlmZnxkaWZmM3xkaWd8ZGlyfGRpcmNvbG9yc3xkaXJuYW1lfGRpcnN8ZG1lc2d8ZG9ja2VyfGRvY2tlci1jb21wb3NlfGR1fGVncmVwfGVqZWN0fGVudnxldGh0b29sfGV4cGFuZHxleHBlY3R8ZXhwcnxmZGZvcm1hdHxmZGlza3xmZ3xmZ3JlcHxmaWxlfGZpbmR8Zm10fGZvbGR8Zm9ybWF0fGZyZWV8ZnNja3xmdHB8ZnVzZXJ8Z2F3a3xnaXR8Z3BhcnRlZHxncmVwfGdyb3VwYWRkfGdyb3VwZGVsfGdyb3VwbW9kfGdyb3Vwc3xncnViLW1rY29uZmlnfGd6aXB8aGFsdHxoZWFkfGhnfGhpc3Rvcnl8aG9zdHxob3N0bmFtZXxodG9wfGljb252fGlkfGlmY29uZmlnfGlmZG93bnxpZnVwfGltcG9ydHxpbnN0YWxsfGlwfGpvYnN8am9pbnxraWxsfGtpbGxhbGx8bGVzc3xsaW5rfGxufGxvY2F0ZXxsb2duYW1lfGxvZ3JvdGF0ZXxsb29rfGxwY3xscHJ8bHByaW50fGxwcmludGR8bHByaW50cXxscHJtfGxzfGxzb2Z8bHlueHxtYWtlfG1hbnxtY3xtZGFkbXxta2NvbmZpZ3xta2Rpcnxta2UyZnN8bWtmaWZvfG1rZnN8bWtpc29mc3xta25vZHxta3N3YXB8bW12fG1vcmV8bW9zdHxtb3VudHxtdG9vbHN8bXRyfG11dHR8bXZ8bmFub3xuY3xuZXRzdGF0fG5pY2V8bmx8bm9kZXxub2h1cHxub3RpZnktc2VuZHxucG18bnNsb29rdXB8b3B8b3BlbnxwYXJ0ZWR8cGFzc3dkfHBhc3RlfHBhdGhjaGt8cGluZ3xwa2lsbHxwbnBtfHBvZG1hbnxwb2RtYW4tY29tcG9zZXxwb3BkfHByfHByaW50Y2FwfHByaW50ZW52fHBzfHB1c2hkfHB2fHF1b3RhfHF1b3RhY2hlY2t8cXVvdGFjdGx8cmFtfHJhcnxyY3B8cmVib290fHJlbXN5bmN8cmVuYW1lfHJlbmljZXxyZXZ8cm18cm1kaXJ8cnBtfHJzeW5jfHNjcHxzY3JlZW58c2RpZmZ8c2VkfHNlbmRtYWlsfHNlcXxzZXJ2aWNlfHNmdHB8c2h8c2hlbGxjaGVja3xzaHVmfHNodXRkb3dufHNsZWVwfHNsb2NhdGV8c29ydHxzcGxpdHxzc2h8c3RhdHxzdHJhY2V8c3V8c3Vkb3xzdW18c3VzcGVuZHxzd2Fwb258c3luY3x0YWN8dGFpbHx0YXJ8dGVlfHRpbWV8dGltZW91dHx0b3B8dG91Y2h8dHJ8dHJhY2Vyb3V0ZXx0c29ydHx0dHl8dW1vdW50fHVuYW1lfHVuZXhwYW5kfHVuaXF8dW5pdHN8dW5yYXJ8dW5zaGFyfHVuemlwfHVwZGF0ZS1ncnVifHVwdGltZXx1c2VyYWRkfHVzZXJkZWx8dXNlcm1vZHx1c2Vyc3x1dWRlY29kZXx1dWVuY29kZXx2fHZjcGtnfHZkaXJ8dml8dmltfHZpcnNofHZtc3RhdHx3YWl0fHdhdGNofHdjfHdnZXR8d2hlcmVpc3x3aGljaHx3aG98d2hvYW1pfHdyaXRlfHhhcmdzfHhkZy1vcGVufHlhcm58eWVzfHplbml0eXx6aXB8enNofHp5cHBlcikoPz0kfFspXFxzO3wmXSkvLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZVxuICAgIH0sXG4gICAgJ2tleXdvcmQnOiB7XG4gICAgICBwYXR0ZXJuOiAvKF58W1xcczt8Jl18Wzw+XVxcKCkoPzpjYXNlfGRvfGRvbmV8ZWxpZnxlbHNlfGVzYWN8Zml8Zm9yfGZ1bmN0aW9ufGlmfGlufHNlbGVjdHx0aGVufHVudGlsfHdoaWxlKSg/PSR8WylcXHM7fCZdKS8sXG4gICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgfSxcbiAgICAvLyBodHRwczovL3d3dy5nbnUub3JnL3NvZnR3YXJlL2Jhc2gvbWFudWFsL2h0bWxfbm9kZS9TaGVsbC1CdWlsdGluLUNvbW1hbmRzLmh0bWxcbiAgICAnYnVpbHRpbic6IHtcbiAgICAgIHBhdHRlcm46IC8oXnxbXFxzO3wmXXxbPD5dXFwoKSg/OlxcLnw6fGFsaWFzfGJpbmR8YnJlYWt8YnVpbHRpbnxjYWxsZXJ8Y2R8Y29tbWFuZHxjb250aW51ZXxkZWNsYXJlfGVjaG98ZW5hYmxlfGV2YWx8ZXhlY3xleGl0fGV4cG9ydHxnZXRvcHRzfGhhc2h8aGVscHxsZXR8bG9jYWx8bG9nb3V0fG1hcGZpbGV8cHJpbnRmfHB3ZHxyZWFkfHJlYWRhcnJheXxyZWFkb25seXxyZXR1cm58c2V0fHNoaWZ0fHNob3B0fHNvdXJjZXx0ZXN0fHRpbWVzfHRyYXB8dHlwZXx0eXBlc2V0fHVsaW1pdHx1bWFza3x1bmFsaWFzfHVuc2V0KSg/PSR8WylcXHM7fCZdKS8sXG4gICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgLy8gQWxpYXMgYWRkZWQgdG8gbWFrZSB0aG9zZSBlYXNpZXIgdG8gZGlzdGluZ3Vpc2ggZnJvbSBzdHJpbmdzLlxuICAgICAgYWxpYXM6ICdjbGFzcy1uYW1lJ1xuICAgIH0sXG4gICAgJ2Jvb2xlYW4nOiB7XG4gICAgICBwYXR0ZXJuOiAvKF58W1xcczt8Jl18Wzw+XVxcKCkoPzpmYWxzZXx0cnVlKSg/PSR8WylcXHM7fCZdKS8sXG4gICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgfSxcbiAgICAnZmlsZS1kZXNjcmlwdG9yJzoge1xuICAgICAgcGF0dGVybjogL1xcQiZcXGRcXGIvLFxuICAgICAgYWxpYXM6ICdpbXBvcnRhbnQnXG4gICAgfSxcbiAgICAnb3BlcmF0b3InOiB7XG4gICAgICAvLyBMb3RzIG9mIHJlZGlyZWN0aW9ucyBoZXJlLCBidXQgbm90IGp1c3QgdGhhdC5cbiAgICAgIHBhdHRlcm46IC9cXGQ/PD58PlxcfHxcXCs9fD1bPX5dP3whPT98PDxbPC1dP3xbJlxcZF0/Pj58XFxkWzw+XSY/fFs8Pl1bJj1dP3wmWz4mXT98XFx8WyZ8XT8vLFxuICAgICAgaW5zaWRlOiB7XG4gICAgICAgICdmaWxlLWRlc2NyaXB0b3InOiB7XG4gICAgICAgICAgcGF0dGVybjogL15cXGQvLFxuICAgICAgICAgIGFsaWFzOiAnaW1wb3J0YW50J1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAncHVuY3R1YXRpb24nOiAvXFwkP1xcKFxcKD98XFwpXFwpP3xcXC5cXC58W3t9W1xcXTtcXFxcXS8sXG4gICAgJ251bWJlcic6IHtcbiAgICAgIHBhdHRlcm46IC8oXnxcXHMpKD86WzEtOV1cXGQqfDApKD86Wy4sXVxcZCspP1xcYi8sXG4gICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgfVxuICB9O1xuICBjb21tYW5kQWZ0ZXJIZXJlZG9jLmluc2lkZSA9IFByaXNtLmxhbmd1YWdlcy5iYXNoO1xuICAvKiBQYXR0ZXJucyBpbiBjb21tYW5kIHN1YnN0aXR1dGlvbi4gKi9cblxuICB2YXIgdG9CZUNvcGllZCA9IFsnY29tbWVudCcsICdmdW5jdGlvbi1uYW1lJywgJ2Zvci1vci1zZWxlY3QnLCAnYXNzaWduLWxlZnQnLCAnc3RyaW5nJywgJ2Vudmlyb25tZW50JywgJ2Z1bmN0aW9uJywgJ2tleXdvcmQnLCAnYnVpbHRpbicsICdib29sZWFuJywgJ2ZpbGUtZGVzY3JpcHRvcicsICdvcGVyYXRvcicsICdwdW5jdHVhdGlvbicsICdudW1iZXInXTtcbiAgdmFyIGluc2lkZSA9IGluc2lkZVN0cmluZy52YXJpYWJsZVsxXS5pbnNpZGU7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b0JlQ29waWVkLmxlbmd0aDsgaSsrKSB7XG4gICAgaW5zaWRlW3RvQmVDb3BpZWRbaV1dID0gUHJpc20ubGFuZ3VhZ2VzLmJhc2hbdG9CZUNvcGllZFtpXV07XG4gIH1cblxuICBQcmlzbS5sYW5ndWFnZXMuc2hlbGwgPSBQcmlzbS5sYW5ndWFnZXMuYmFzaDtcbn0pKHByaXNtKTtcbi8qIFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNsaWtlXCIgKi9cblxuXG5wcmlzbS5sYW5ndWFnZXMuY2xpa2UgPSB7XG4gICdjb21tZW50JzogW3tcbiAgICBwYXR0ZXJuOiAvKF58W15cXFxcXSlcXC9cXCpbXFxzXFxTXSo/KD86XFwqXFwvfCQpLyxcbiAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgIGdyZWVkeTogdHJ1ZVxuICB9LCB7XG4gICAgcGF0dGVybjogLyhefFteXFxcXDpdKVxcL1xcLy4qLyxcbiAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgIGdyZWVkeTogdHJ1ZVxuICB9XSxcbiAgJ3N0cmluZyc6IHtcbiAgICBwYXR0ZXJuOiAvKFtcIiddKSg/OlxcXFwoPzpcXHJcXG58W1xcc1xcU10pfCg/IVxcMSlbXlxcXFxcXHJcXG5dKSpcXDEvLFxuICAgIGdyZWVkeTogdHJ1ZVxuICB9LFxuICAnY2xhc3MtbmFtZSc6IHtcbiAgICBwYXR0ZXJuOiAvKFxcYig/OmNsYXNzfGV4dGVuZHN8aW1wbGVtZW50c3xpbnN0YW5jZW9mfGludGVyZmFjZXxuZXd8dHJhaXQpXFxzK3xcXGJjYXRjaFxccytcXCgpW1xcdy5cXFxcXSsvaSxcbiAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgIGluc2lkZToge1xuICAgICAgJ3B1bmN0dWF0aW9uJzogL1suXFxcXF0vXG4gICAgfVxuICB9LFxuICAna2V5d29yZCc6IC9cXGIoPzpicmVha3xjYXRjaHxjb250aW51ZXxkb3xlbHNlfGZpbmFsbHl8Zm9yfGZ1bmN0aW9ufGlmfGlufGluc3RhbmNlb2Z8bmV3fG51bGx8cmV0dXJufHRocm93fHRyeXx3aGlsZSlcXGIvLFxuICAnYm9vbGVhbic6IC9cXGIoPzpmYWxzZXx0cnVlKVxcYi8sXG4gICdmdW5jdGlvbic6IC9cXGJcXHcrKD89XFwoKS8sXG4gICdudW1iZXInOiAvXFxiMHhbXFxkYS1mXStcXGJ8KD86XFxiXFxkKyg/OlxcLlxcZCopP3xcXEJcXC5cXGQrKSg/OmVbKy1dP1xcZCspPy9pLFxuICAnb3BlcmF0b3InOiAvWzw+XT0/fFshPV09Pz0/fC0tP3xcXCtcXCs/fCYmP3xcXHxcXHw/fFs/Ki9+XiVdLyxcbiAgJ3B1bmN0dWF0aW9uJzogL1t7fVtcXF07KCksLjpdL1xufTtcbi8qIFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNcIiAqL1xuXG5wcmlzbS5sYW5ndWFnZXMuYyA9IHByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2NsaWtlJywge1xuICAnY29tbWVudCc6IHtcbiAgICBwYXR0ZXJuOiAvXFwvXFwvKD86W15cXHJcXG5cXFxcXXxcXFxcKD86XFxyXFxuP3xcXG58KD8hW1xcclxcbl0pKSkqfFxcL1xcKltcXHNcXFNdKj8oPzpcXCpcXC98JCkvLFxuICAgIGdyZWVkeTogdHJ1ZVxuICB9LFxuICAnc3RyaW5nJzoge1xuICAgIC8vIGh0dHBzOi8vZW4uY3BwcmVmZXJlbmNlLmNvbS93L2MvbGFuZ3VhZ2Uvc3RyaW5nX2xpdGVyYWxcbiAgICBwYXR0ZXJuOiAvXCIoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXxbXlwiXFxcXFxcclxcbl0pKlwiLyxcbiAgICBncmVlZHk6IHRydWVcbiAgfSxcbiAgJ2NsYXNzLW5hbWUnOiB7XG4gICAgcGF0dGVybjogLyhcXGIoPzplbnVtfHN0cnVjdClcXHMrKD86X19hdHRyaWJ1dGVfX1xccypcXChcXChbXFxzXFxTXSo/XFwpXFwpXFxzKik/KVxcdyt8XFxiW2Etel1cXHcqX3RcXGIvLFxuICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgfSxcbiAgJ2tleXdvcmQnOiAvXFxiKD86X0FsaWduYXN8X0FsaWdub2Z8X0F0b21pY3xfQm9vbHxfQ29tcGxleHxfR2VuZXJpY3xfSW1hZ2luYXJ5fF9Ob3JldHVybnxfU3RhdGljX2Fzc2VydHxfVGhyZWFkX2xvY2FsfF9fYXR0cmlidXRlX198YXNtfGF1dG98YnJlYWt8Y2FzZXxjaGFyfGNvbnN0fGNvbnRpbnVlfGRlZmF1bHR8ZG98ZG91YmxlfGVsc2V8ZW51bXxleHRlcm58ZmxvYXR8Zm9yfGdvdG98aWZ8aW5saW5lfGludHxsb25nfHJlZ2lzdGVyfHJldHVybnxzaG9ydHxzaWduZWR8c2l6ZW9mfHN0YXRpY3xzdHJ1Y3R8c3dpdGNofHR5cGVkZWZ8dHlwZW9mfHVuaW9ufHVuc2lnbmVkfHZvaWR8dm9sYXRpbGV8d2hpbGUpXFxiLyxcbiAgJ2Z1bmN0aW9uJzogL1xcYlthLXpfXVxcdyooPz1cXHMqXFwoKS9pLFxuICAnbnVtYmVyJzogLyg/OlxcYjB4KD86W1xcZGEtZl0rKD86XFwuW1xcZGEtZl0qKT98XFwuW1xcZGEtZl0rKSg/OnBbKy1dP1xcZCspP3woPzpcXGJcXGQrKD86XFwuXFxkKik/fFxcQlxcLlxcZCspKD86ZVsrLV0/XFxkKyk/KVtmdWxdezAsNH0vaSxcbiAgJ29wZXJhdG9yJzogLz4+PT98PDw9P3wtPnwoWy0rJnw6XSlcXDF8Wz86fl18Wy0rKi8lJnxeIT08Pl09Py9cbn0pO1xucHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnYycsICdzdHJpbmcnLCB7XG4gICdjaGFyJzoge1xuICAgIC8vIGh0dHBzOi8vZW4uY3BwcmVmZXJlbmNlLmNvbS93L2MvbGFuZ3VhZ2UvY2hhcmFjdGVyX2NvbnN0YW50XG4gICAgcGF0dGVybjogLycoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXxbXidcXFxcXFxyXFxuXSl7MCwzMn0nLyxcbiAgICBncmVlZHk6IHRydWVcbiAgfVxufSk7XG5wcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdjJywgJ3N0cmluZycsIHtcbiAgJ21hY3JvJzoge1xuICAgIC8vIGFsbG93IGZvciBtdWx0aWxpbmUgbWFjcm8gZGVmaW5pdGlvbnNcbiAgICAvLyBzcGFjZXMgYWZ0ZXIgdGhlICMgY2hhcmFjdGVyIGNvbXBpbGUgZmluZSB3aXRoIGdjY1xuICAgIHBhdHRlcm46IC8oXltcXHQgXSopI1xccypbYS16XSg/OlteXFxyXFxuXFxcXC9dfFxcLyg/IVxcKil8XFwvXFwqKD86W14qXXxcXCooPyFcXC8pKSpcXCpcXC98XFxcXCg/OlxcclxcbnxbXFxzXFxTXSkpKi9pbSxcbiAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgIGdyZWVkeTogdHJ1ZSxcbiAgICBhbGlhczogJ3Byb3BlcnR5JyxcbiAgICBpbnNpZGU6IHtcbiAgICAgICdzdHJpbmcnOiBbe1xuICAgICAgICAvLyBoaWdobGlnaHQgdGhlIHBhdGggb2YgdGhlIGluY2x1ZGUgc3RhdGVtZW50IGFzIGEgc3RyaW5nXG4gICAgICAgIHBhdHRlcm46IC9eKCNcXHMqaW5jbHVkZVxccyopPFtePl0rPi8sXG4gICAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICAgIH0sIHByaXNtLmxhbmd1YWdlcy5jWydzdHJpbmcnXV0sXG4gICAgICAnY2hhcic6IHByaXNtLmxhbmd1YWdlcy5jWydjaGFyJ10sXG4gICAgICAnY29tbWVudCc6IHByaXNtLmxhbmd1YWdlcy5jWydjb21tZW50J10sXG4gICAgICAnbWFjcm8tbmFtZSc6IFt7XG4gICAgICAgIHBhdHRlcm46IC8oXiNcXHMqZGVmaW5lXFxzKylcXHcrXFxiKD8hXFwoKS9pLFxuICAgICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgICB9LCB7XG4gICAgICAgIHBhdHRlcm46IC8oXiNcXHMqZGVmaW5lXFxzKylcXHcrXFxiKD89XFwoKS9pLFxuICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICBhbGlhczogJ2Z1bmN0aW9uJ1xuICAgICAgfV0sXG4gICAgICAvLyBoaWdobGlnaHQgbWFjcm8gZGlyZWN0aXZlcyBhcyBrZXl3b3Jkc1xuICAgICAgJ2RpcmVjdGl2ZSc6IHtcbiAgICAgICAgcGF0dGVybjogL14oI1xccyopW2Etel0rLyxcbiAgICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgICAgYWxpYXM6ICdrZXl3b3JkJ1xuICAgICAgfSxcbiAgICAgICdkaXJlY3RpdmUtaGFzaCc6IC9eIy8sXG4gICAgICAncHVuY3R1YXRpb24nOiAvIyN8XFxcXCg/PVtcXHJcXG5dKS8sXG4gICAgICAnZXhwcmVzc2lvbic6IHtcbiAgICAgICAgcGF0dGVybjogL1xcU1tcXHNcXFNdKi8sXG4gICAgICAgIGluc2lkZTogcHJpc20ubGFuZ3VhZ2VzLmNcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pO1xucHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnYycsICdmdW5jdGlvbicsIHtcbiAgLy8gaGlnaGxpZ2h0IHByZWRlZmluZWQgbWFjcm9zIGFzIGNvbnN0YW50c1xuICAnY29uc3RhbnQnOiAvXFxiKD86RU9GfE5VTEx8U0VFS19DVVJ8U0VFS19FTkR8U0VFS19TRVR8X19EQVRFX198X19GSUxFX198X19MSU5FX198X19USU1FU1RBTVBfX3xfX1RJTUVfX3xfX2Z1bmNfX3xzdGRlcnJ8c3RkaW58c3Rkb3V0KVxcYi9cbn0pO1xuZGVsZXRlIHByaXNtLmxhbmd1YWdlcy5jWydib29sZWFuJ107XG4vKiBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jcHBcIiAqL1xuXG4oZnVuY3Rpb24gKFByaXNtKSB7XG4gIHZhciBrZXl3b3JkID0gL1xcYig/OmFsaWduYXN8YWxpZ25vZnxhc218YXV0b3xib29sfGJyZWFrfGNhc2V8Y2F0Y2h8Y2hhcnxjaGFyMTZfdHxjaGFyMzJfdHxjaGFyOF90fGNsYXNzfGNvX2F3YWl0fGNvX3JldHVybnxjb195aWVsZHxjb21wbHxjb25jZXB0fGNvbnN0fGNvbnN0X2Nhc3R8Y29uc3RldmFsfGNvbnN0ZXhwcnxjb25zdGluaXR8Y29udGludWV8ZGVjbHR5cGV8ZGVmYXVsdHxkZWxldGV8ZG98ZG91YmxlfGR5bmFtaWNfY2FzdHxlbHNlfGVudW18ZXhwbGljaXR8ZXhwb3J0fGV4dGVybnxmaW5hbHxmbG9hdHxmb3J8ZnJpZW5kfGdvdG98aWZ8aW1wb3J0fGlubGluZXxpbnR8aW50MTZfdHxpbnQzMl90fGludDY0X3R8aW50OF90fGxvbmd8bW9kdWxlfG11dGFibGV8bmFtZXNwYWNlfG5ld3xub2V4Y2VwdHxudWxscHRyfG9wZXJhdG9yfG92ZXJyaWRlfHByaXZhdGV8cHJvdGVjdGVkfHB1YmxpY3xyZWdpc3RlcnxyZWludGVycHJldF9jYXN0fHJlcXVpcmVzfHJldHVybnxzaG9ydHxzaWduZWR8c2l6ZW9mfHN0YXRpY3xzdGF0aWNfYXNzZXJ0fHN0YXRpY19jYXN0fHN0cnVjdHxzd2l0Y2h8dGVtcGxhdGV8dGhpc3x0aHJlYWRfbG9jYWx8dGhyb3d8dHJ5fHR5cGVkZWZ8dHlwZWlkfHR5cGVuYW1lfHVpbnQxNl90fHVpbnQzMl90fHVpbnQ2NF90fHVpbnQ4X3R8dW5pb258dW5zaWduZWR8dXNpbmd8dmlydHVhbHx2b2lkfHZvbGF0aWxlfHdjaGFyX3R8d2hpbGUpXFxiLztcbiAgdmFyIG1vZE5hbWUgPSAvXFxiKD8hPGtleXdvcmQ+KVxcdysoPzpcXHMqXFwuXFxzKlxcdyspKlxcYi8uc291cmNlLnJlcGxhY2UoLzxrZXl3b3JkPi9nLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGtleXdvcmQuc291cmNlO1xuICB9KTtcbiAgUHJpc20ubGFuZ3VhZ2VzLmNwcCA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2MnLCB7XG4gICAgJ2NsYXNzLW5hbWUnOiBbe1xuICAgICAgcGF0dGVybjogUmVnRXhwKC8oXFxiKD86Y2xhc3N8Y29uY2VwdHxlbnVtfHN0cnVjdHx0eXBlbmFtZSlcXHMrKSg/ITxrZXl3b3JkPilcXHcrLy5zb3VyY2UucmVwbGFjZSgvPGtleXdvcmQ+L2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGtleXdvcmQuc291cmNlO1xuICAgICAgfSkpLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZVxuICAgIH0sIC8vIFRoaXMgaXMgaW50ZW5kZWQgdG8gY2FwdHVyZSB0aGUgY2xhc3MgbmFtZSBvZiBtZXRob2QgaW1wbGVtZW50YXRpb25zIGxpa2U6XG4gICAgLy8gICB2b2lkIGZvbzo6YmFyKCkgY29uc3Qge31cbiAgICAvLyBIb3dldmVyISBUaGUgYGZvb2AgaW4gdGhlIGFib3ZlIGV4YW1wbGUgY291bGQgYWxzbyBiZSBhIG5hbWVzcGFjZSwgc28gd2Ugb25seSBjYXB0dXJlIHRoZSBjbGFzcyBuYW1lIGlmXG4gICAgLy8gaXQgc3RhcnRzIHdpdGggYW4gdXBwZXJjYXNlIGxldHRlci4gVGhpcyBhcHByb3hpbWF0aW9uIHNob3VsZCBnaXZlIGRlY2VudCByZXN1bHRzLlxuICAgIC9cXGJbQS1aXVxcdyooPz1cXHMqOjpcXHMqXFx3K1xccypcXCgpLywgLy8gVGhpcyB3aWxsIGNhcHR1cmUgdGhlIGNsYXNzIG5hbWUgYmVmb3JlIGRlc3RydWN0b3JzIGxpa2U6XG4gICAgLy8gICBGb286On5Gb28oKSB7fVxuICAgIC9cXGJbQS1aX11cXHcqKD89XFxzKjo6XFxzKn5cXHcrXFxzKlxcKCkvaSwgLy8gVGhpcyBhbHNvIGludGVuZHMgdG8gY2FwdHVyZSB0aGUgY2xhc3MgbmFtZSBvZiBtZXRob2QgaW1wbGVtZW50YXRpb25zIGJ1dCBoZXJlIHRoZSBjbGFzcyBoYXMgdGVtcGxhdGVcbiAgICAvLyBwYXJhbWV0ZXJzLCBzbyBpdCBjYW4ndCBiZSBhIG5hbWVzcGFjZSAodW50aWwgQysrIGFkZHMgZ2VuZXJpYyBuYW1lc3BhY2VzKS5cbiAgICAvXFxiXFx3Kyg/PVxccyo8KD86W148Pl18PCg/OltePD5dfDxbXjw+XSo+KSo+KSo+XFxzKjo6XFxzKlxcdytcXHMqXFwoKS9dLFxuICAgICdrZXl3b3JkJzoga2V5d29yZCxcbiAgICAnbnVtYmVyJzoge1xuICAgICAgcGF0dGVybjogLyg/OlxcYjBiWzAxJ10rfFxcYjB4KD86W1xcZGEtZiddKyg/OlxcLltcXGRhLWYnXSopP3xcXC5bXFxkYS1mJ10rKSg/OnBbKy1dP1tcXGQnXSspP3woPzpcXGJbXFxkJ10rKD86XFwuW1xcZCddKik/fFxcQlxcLltcXGQnXSspKD86ZVsrLV0/W1xcZCddKyk/KVtmdWxdezAsNH0vaSxcbiAgICAgIGdyZWVkeTogdHJ1ZVxuICAgIH0sXG4gICAgJ29wZXJhdG9yJzogLz4+PT98PDw9P3wtPnwtLXxcXCtcXCt8JiZ8XFx8XFx8fFs/On5dfDw9PnxbLSsqLyUmfF4hPTw+XT0/fFxcYig/OmFuZHxhbmRfZXF8Yml0YW5kfGJpdG9yfG5vdHxub3RfZXF8b3J8b3JfZXF8eG9yfHhvcl9lcSlcXGIvLFxuICAgICdib29sZWFuJzogL1xcYig/OmZhbHNlfHRydWUpXFxiL1xuICB9KTtcbiAgUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnY3BwJywgJ3N0cmluZycsIHtcbiAgICAnbW9kdWxlJzoge1xuICAgICAgLy8gaHR0cHM6Ly9lbi5jcHByZWZlcmVuY2UuY29tL3cvY3BwL2xhbmd1YWdlL21vZHVsZXNcbiAgICAgIHBhdHRlcm46IFJlZ0V4cCgvKFxcYig/OmltcG9ydHxtb2R1bGUpXFxzKykvLnNvdXJjZSArICcoPzonICsgLy8gaGVhZGVyLW5hbWVcbiAgICAgIC9cIig/OlxcXFwoPzpcXHJcXG58W1xcc1xcU10pfFteXCJcXFxcXFxyXFxuXSkqXCJ8PFtePD5cXHJcXG5dKj4vLnNvdXJjZSArICd8JyArIC8vIG1vZHVsZSBuYW1lIG9yIHBhcnRpdGlvbiBvciBib3RoXG4gICAgICAvPG1vZC1uYW1lPig/Olxccyo6XFxzKjxtb2QtbmFtZT4pP3w6XFxzKjxtb2QtbmFtZT4vLnNvdXJjZS5yZXBsYWNlKC88bW9kLW5hbWU+L2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG1vZE5hbWU7XG4gICAgICB9KSArICcpJyksXG4gICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgZ3JlZWR5OiB0cnVlLFxuICAgICAgaW5zaWRlOiB7XG4gICAgICAgICdzdHJpbmcnOiAvXls8XCJdW1xcc1xcU10rLyxcbiAgICAgICAgJ29wZXJhdG9yJzogLzovLFxuICAgICAgICAncHVuY3R1YXRpb24nOiAvXFwuL1xuICAgICAgfVxuICAgIH0sXG4gICAgJ3Jhdy1zdHJpbmcnOiB7XG4gICAgICBwYXR0ZXJuOiAvUlwiKFteKClcXFxcIF17MCwxNn0pXFwoW1xcc1xcU10qP1xcKVxcMVwiLyxcbiAgICAgIGFsaWFzOiAnc3RyaW5nJyxcbiAgICAgIGdyZWVkeTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2NwcCcsICdrZXl3b3JkJywge1xuICAgICdnZW5lcmljLWZ1bmN0aW9uJzoge1xuICAgICAgcGF0dGVybjogL1xcYig/IW9wZXJhdG9yXFxiKVthLXpfXVxcdypcXHMqPCg/OltePD5dfDxbXjw+XSo+KSo+KD89XFxzKlxcKCkvaSxcbiAgICAgIGluc2lkZToge1xuICAgICAgICAnZnVuY3Rpb24nOiAvXlxcdysvLFxuICAgICAgICAnZ2VuZXJpYyc6IHtcbiAgICAgICAgICBwYXR0ZXJuOiAvPFtcXHNcXFNdKy8sXG4gICAgICAgICAgYWxpYXM6ICdjbGFzcy1uYW1lJyxcbiAgICAgICAgICBpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5jcHBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2NwcCcsICdvcGVyYXRvcicsIHtcbiAgICAnZG91YmxlLWNvbG9uJzoge1xuICAgICAgcGF0dGVybjogLzo6LyxcbiAgICAgIGFsaWFzOiAncHVuY3R1YXRpb24nXG4gICAgfVxuICB9KTtcbiAgUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnY3BwJywgJ2NsYXNzLW5hbWUnLCB7XG4gICAgLy8gdGhlIGJhc2UgY2xhdXNlIGlzIGFuIG9wdGlvbmFsIGxpc3Qgb2YgcGFyZW50IGNsYXNzZXNcbiAgICAvLyBodHRwczovL2VuLmNwcHJlZmVyZW5jZS5jb20vdy9jcHAvbGFuZ3VhZ2UvY2xhc3NcbiAgICAnYmFzZS1jbGF1c2UnOiB7XG4gICAgICBwYXR0ZXJuOiAvKFxcYig/OmNsYXNzfHN0cnVjdClcXHMrXFx3K1xccyo6XFxzKilbXjt7fVwiJ1xcc10rKD86XFxzK1teO3t9XCInXFxzXSspKig/PVxccypbO3tdKS8sXG4gICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgZ3JlZWR5OiB0cnVlLFxuICAgICAgaW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjcHAnLCB7fSlcbiAgICB9XG4gIH0pO1xuICBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdpbnNpZGUnLCAnZG91YmxlLWNvbG9uJywge1xuICAgIC8vIEFsbCB1bnRva2VuaXplZCB3b3JkcyB0aGF0IGFyZSBub3QgbmFtZXNwYWNlcyBzaG91bGQgYmUgY2xhc3MgbmFtZXNcbiAgICAnY2xhc3MtbmFtZSc6IC9cXGJbYS16X11cXHcqXFxiKD8hXFxzKjo6KS9pXG4gIH0sIFByaXNtLmxhbmd1YWdlcy5jcHBbJ2Jhc2UtY2xhdXNlJ10pO1xufSkocHJpc20pO1xuLyogXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3NzXCIgKi9cblxuXG4oZnVuY3Rpb24gKFByaXNtKSB7XG4gIHZhciBzdHJpbmcgPSAvKD86XCIoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXxbXlwiXFxcXFxcclxcbl0pKlwifCcoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXxbXidcXFxcXFxyXFxuXSkqJykvO1xuICBQcmlzbS5sYW5ndWFnZXMuY3NzID0ge1xuICAgICdjb21tZW50JzogL1xcL1xcKltcXHNcXFNdKj9cXCpcXC8vLFxuICAgICdhdHJ1bGUnOiB7XG4gICAgICBwYXR0ZXJuOiAvQFtcXHctXSg/OlteO3tcXHNdfFxccysoPyFbXFxze10pKSooPzo7fCg/PVxccypcXHspKS8sXG4gICAgICBpbnNpZGU6IHtcbiAgICAgICAgJ3J1bGUnOiAvXkBbXFx3LV0rLyxcbiAgICAgICAgJ3NlbGVjdG9yLWZ1bmN0aW9uLWFyZ3VtZW50Jzoge1xuICAgICAgICAgIHBhdHRlcm46IC8oXFxic2VsZWN0b3JcXHMqXFwoXFxzKig/IVtcXHMpXSkpKD86W14oKVxcc118XFxzKyg/IVtcXHMpXSl8XFwoKD86W14oKV18XFwoW14oKV0qXFwpKSpcXCkpKyg/PVxccypcXCkpLyxcbiAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICAgIGFsaWFzOiAnc2VsZWN0b3InXG4gICAgICAgIH0sXG4gICAgICAgICdrZXl3b3JkJzoge1xuICAgICAgICAgIHBhdHRlcm46IC8oXnxbXlxcdy1dKSg/OmFuZHxub3R8b25seXxvcikoPyFbXFx3LV0pLyxcbiAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgICAgIH0gLy8gU2VlIHJlc3QgYmVsb3dcblxuICAgICAgfVxuICAgIH0sXG4gICAgJ3VybCc6IHtcbiAgICAgIC8vIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgICAgIHBhdHRlcm46IFJlZ0V4cCgnXFxcXGJ1cmxcXFxcKCg/OicgKyBzdHJpbmcuc291cmNlICsgJ3wnICsgLyg/OlteXFxcXFxcclxcbigpXCInXXxcXFxcW1xcc1xcU10pKi8uc291cmNlICsgJylcXFxcKScsICdpJyksXG4gICAgICBncmVlZHk6IHRydWUsXG4gICAgICBpbnNpZGU6IHtcbiAgICAgICAgJ2Z1bmN0aW9uJzogL151cmwvaSxcbiAgICAgICAgJ3B1bmN0dWF0aW9uJzogL15cXCh8XFwpJC8sXG4gICAgICAgICdzdHJpbmcnOiB7XG4gICAgICAgICAgcGF0dGVybjogUmVnRXhwKCdeJyArIHN0cmluZy5zb3VyY2UgKyAnJCcpLFxuICAgICAgICAgIGFsaWFzOiAndXJsJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAnc2VsZWN0b3InOiB7XG4gICAgICBwYXR0ZXJuOiBSZWdFeHAoJyhefFt7fVxcXFxzXSlbXnt9XFxcXHNdKD86W157fTtcIlxcJ1xcXFxzXXxcXFxccysoPyFbXFxcXHN7XSl8JyArIHN0cmluZy5zb3VyY2UgKyAnKSooPz1cXFxccypcXFxceyknKSxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICB9LFxuICAgICdzdHJpbmcnOiB7XG4gICAgICBwYXR0ZXJuOiBzdHJpbmcsXG4gICAgICBncmVlZHk6IHRydWVcbiAgICB9LFxuICAgICdwcm9wZXJ0eSc6IHtcbiAgICAgIHBhdHRlcm46IC8oXnxbXi1cXHdcXHhBMC1cXHVGRkZGXSkoPyFcXHMpWy1fYS16XFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWy1cXHdcXHhBMC1cXHVGRkZGXSkqKD89XFxzKjopL2ksXG4gICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgfSxcbiAgICAnaW1wb3J0YW50JzogLyFpbXBvcnRhbnRcXGIvaSxcbiAgICAnZnVuY3Rpb24nOiB7XG4gICAgICBwYXR0ZXJuOiAvKF58W14tYS16MC05XSlbLWEtejAtOV0rKD89XFwoKS9pLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZVxuICAgIH0sXG4gICAgJ3B1bmN0dWF0aW9uJzogL1soKXt9OzosXS9cbiAgfTtcbiAgUHJpc20ubGFuZ3VhZ2VzLmNzc1snYXRydWxlJ10uaW5zaWRlLnJlc3QgPSBQcmlzbS5sYW5ndWFnZXMuY3NzO1xuICB2YXIgbWFya3VwID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblxuICBpZiAobWFya3VwKSB7XG4gICAgbWFya3VwLnRhZy5hZGRJbmxpbmVkKCdzdHlsZScsICdjc3MnKTtcbiAgICBtYXJrdXAudGFnLmFkZEF0dHJpYnV0ZSgnc3R5bGUnLCAnY3NzJyk7XG4gIH1cbn0pKHByaXNtKTtcbi8qIFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNzcy1leHRyYXNcIiAqL1xuXG5cbihmdW5jdGlvbiAoUHJpc20pIHtcbiAgdmFyIHN0cmluZyA9IC8oXCJ8JykoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXwoPyFcXDEpW15cXFxcXFxyXFxuXSkqXFwxLztcbiAgdmFyIHNlbGVjdG9ySW5zaWRlO1xuICBQcmlzbS5sYW5ndWFnZXMuY3NzLnNlbGVjdG9yID0ge1xuICAgIHBhdHRlcm46IFByaXNtLmxhbmd1YWdlcy5jc3Muc2VsZWN0b3IucGF0dGVybixcbiAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgIGluc2lkZTogc2VsZWN0b3JJbnNpZGUgPSB7XG4gICAgICAncHNldWRvLWVsZW1lbnQnOiAvOig/OmFmdGVyfGJlZm9yZXxmaXJzdC1sZXR0ZXJ8Zmlyc3QtbGluZXxzZWxlY3Rpb24pfDo6Wy1cXHddKy8sXG4gICAgICAncHNldWRvLWNsYXNzJzogLzpbLVxcd10rLyxcbiAgICAgICdjbGFzcyc6IC9cXC5bLVxcd10rLyxcbiAgICAgICdpZCc6IC8jWy1cXHddKy8sXG4gICAgICAnYXR0cmlidXRlJzoge1xuICAgICAgICBwYXR0ZXJuOiBSZWdFeHAoJ1xcXFxbKD86W15bXFxcXF1cIlxcJ118JyArIHN0cmluZy5zb3VyY2UgKyAnKSpcXFxcXScpLFxuICAgICAgICBncmVlZHk6IHRydWUsXG4gICAgICAgIGluc2lkZToge1xuICAgICAgICAgICdwdW5jdHVhdGlvbic6IC9eXFxbfFxcXSQvLFxuICAgICAgICAgICdjYXNlLXNlbnNpdGl2aXR5Jzoge1xuICAgICAgICAgICAgcGF0dGVybjogLyhcXHMpW3NpXSQvaSxcbiAgICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICAgICAgICBhbGlhczogJ2tleXdvcmQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnbmFtZXNwYWNlJzoge1xuICAgICAgICAgICAgcGF0dGVybjogL14oXFxzKikoPzooPyFcXHMpWy0qXFx3XFx4QTAtXFx1RkZGRl0pKlxcfCg/IT0pLyxcbiAgICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICAgICAgICBpbnNpZGU6IHtcbiAgICAgICAgICAgICAgJ3B1bmN0dWF0aW9uJzogL1xcfCQvXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnYXR0ci1uYW1lJzoge1xuICAgICAgICAgICAgcGF0dGVybjogL14oXFxzKikoPzooPyFcXHMpWy1cXHdcXHhBMC1cXHVGRkZGXSkrLyxcbiAgICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgICdhdHRyLXZhbHVlJzogW3N0cmluZywge1xuICAgICAgICAgICAgcGF0dGVybjogLyg9XFxzKikoPzooPyFcXHMpWy1cXHdcXHhBMC1cXHVGRkZGXSkrKD89XFxzKiQpLyxcbiAgICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICAgICAgICB9XSxcbiAgICAgICAgICAnb3BlcmF0b3InOiAvW3x+Kl4kXT89L1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ24tdGgnOiBbe1xuICAgICAgICBwYXR0ZXJuOiAvKFxcKFxccyopWystXT9cXGQqW1xcZG5dKD86XFxzKlsrLV1cXHMqXFxkKyk/KD89XFxzKlxcKSkvLFxuICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICBpbnNpZGU6IHtcbiAgICAgICAgICAnbnVtYmVyJzogL1tcXGRuXSsvLFxuICAgICAgICAgICdvcGVyYXRvcic6IC9bKy1dL1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIHBhdHRlcm46IC8oXFwoXFxzKikoPzpldmVufG9kZCkoPz1cXHMqXFwpKS9pLFxuICAgICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgICB9XSxcbiAgICAgICdjb21iaW5hdG9yJzogLz58XFwrfH58XFx8XFx8LyxcbiAgICAgIC8vIHRoZSBgdGFnYCB0b2tlbiBoYXMgYmVlbiBleGlzdGVkIGFuZCByZW1vdmVkLlxuICAgICAgLy8gYmVjYXVzZSB3ZSBjYW4ndCBmaW5kIGEgcGVyZmVjdCB0b2tlbml6ZSB0byBtYXRjaCBpdC5cbiAgICAgIC8vIGlmIHlvdSB3YW50IHRvIGFkZCBpdCwgcGxlYXNlIHJlYWQgaHR0cHM6Ly9naXRodWIuY29tL1ByaXNtSlMvcHJpc20vcHVsbC8yMzczIGZpcnN0LlxuICAgICAgJ3B1bmN0dWF0aW9uJzogL1soKSxdL1xuICAgIH1cbiAgfTtcbiAgUHJpc20ubGFuZ3VhZ2VzLmNzc1snYXRydWxlJ10uaW5zaWRlWydzZWxlY3Rvci1mdW5jdGlvbi1hcmd1bWVudCddLmluc2lkZSA9IHNlbGVjdG9ySW5zaWRlO1xuICBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdjc3MnLCAncHJvcGVydHknLCB7XG4gICAgJ3ZhcmlhYmxlJzoge1xuICAgICAgcGF0dGVybjogLyhefFteLVxcd1xceEEwLVxcdUZGRkZdKS0tKD8hXFxzKVstX2EtelxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVstXFx3XFx4QTAtXFx1RkZGRl0pKi9pLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIHZhciB1bml0ID0ge1xuICAgIHBhdHRlcm46IC8oXFxiXFxkKykoPzolfFthLXpdKyg/IVtcXHctXSkpLyxcbiAgICBsb29rYmVoaW5kOiB0cnVlXG4gIH07IC8vIDEyMyAtMTIzIC4xMjMgLS4xMjMgMTIuMyAtMTIuM1xuXG4gIHZhciBudW1iZXIgPSB7XG4gICAgcGF0dGVybjogLyhefFteXFx3Li1dKS0/KD86XFxkKyg/OlxcLlxcZCspP3xcXC5cXGQrKS8sXG4gICAgbG9va2JlaGluZDogdHJ1ZVxuICB9O1xuICBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdjc3MnLCAnZnVuY3Rpb24nLCB7XG4gICAgJ29wZXJhdG9yJzoge1xuICAgICAgcGF0dGVybjogLyhcXHMpWytcXC0qXFwvXSg/PVxccykvLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZVxuICAgIH0sXG4gICAgLy8gQ0FSRUZVTCFcbiAgICAvLyBQcmV2aWV3ZXJzIGFuZCBJbmxpbmUgY29sb3IgdXNlIGhleGNvZGUgYW5kIGNvbG9yLlxuICAgICdoZXhjb2RlJzoge1xuICAgICAgcGF0dGVybjogL1xcQiNbXFxkYS1mXXszLDh9XFxiL2ksXG4gICAgICBhbGlhczogJ2NvbG9yJ1xuICAgIH0sXG4gICAgJ2NvbG9yJzogW3tcbiAgICAgIHBhdHRlcm46IC8oXnxbXlxcdy1dKSg/OkFsaWNlQmx1ZXxBbnRpcXVlV2hpdGV8QXF1YXxBcXVhbWFyaW5lfEF6dXJlfEJlaWdlfEJpc3F1ZXxCbGFja3xCbGFuY2hlZEFsbW9uZHxCbHVlfEJsdWVWaW9sZXR8QnJvd258QnVybHlXb29kfENhZGV0Qmx1ZXxDaGFydHJldXNlfENob2NvbGF0ZXxDb3JhbHxDb3JuZmxvd2VyQmx1ZXxDb3Juc2lsa3xDcmltc29ufEN5YW58RGFya0JsdWV8RGFya0N5YW58RGFya0dvbGRlblJvZHxEYXJrR3JbYWVdeXxEYXJrR3JlZW58RGFya0toYWtpfERhcmtNYWdlbnRhfERhcmtPbGl2ZUdyZWVufERhcmtPcmFuZ2V8RGFya09yY2hpZHxEYXJrUmVkfERhcmtTYWxtb258RGFya1NlYUdyZWVufERhcmtTbGF0ZUJsdWV8RGFya1NsYXRlR3JbYWVdeXxEYXJrVHVycXVvaXNlfERhcmtWaW9sZXR8RGVlcFBpbmt8RGVlcFNreUJsdWV8RGltR3JbYWVdeXxEb2RnZXJCbHVlfEZpcmVCcmlja3xGbG9yYWxXaGl0ZXxGb3Jlc3RHcmVlbnxGdWNoc2lhfEdhaW5zYm9yb3xHaG9zdFdoaXRlfEdvbGR8R29sZGVuUm9kfEdyW2FlXXl8R3JlZW58R3JlZW5ZZWxsb3d8SG9uZXlEZXd8SG90UGlua3xJbmRpYW5SZWR8SW5kaWdvfEl2b3J5fEtoYWtpfExhdmVuZGVyfExhdmVuZGVyQmx1c2h8TGF3bkdyZWVufExlbW9uQ2hpZmZvbnxMaWdodEJsdWV8TGlnaHRDb3JhbHxMaWdodEN5YW58TGlnaHRHb2xkZW5Sb2RZZWxsb3d8TGlnaHRHclthZV15fExpZ2h0R3JlZW58TGlnaHRQaW5rfExpZ2h0U2FsbW9ufExpZ2h0U2VhR3JlZW58TGlnaHRTa3lCbHVlfExpZ2h0U2xhdGVHclthZV15fExpZ2h0U3RlZWxCbHVlfExpZ2h0WWVsbG93fExpbWV8TGltZUdyZWVufExpbmVufE1hZ2VudGF8TWFyb29ufE1lZGl1bUFxdWFNYXJpbmV8TWVkaXVtQmx1ZXxNZWRpdW1PcmNoaWR8TWVkaXVtUHVycGxlfE1lZGl1bVNlYUdyZWVufE1lZGl1bVNsYXRlQmx1ZXxNZWRpdW1TcHJpbmdHcmVlbnxNZWRpdW1UdXJxdW9pc2V8TWVkaXVtVmlvbGV0UmVkfE1pZG5pZ2h0Qmx1ZXxNaW50Q3JlYW18TWlzdHlSb3NlfE1vY2Nhc2lufE5hdmFqb1doaXRlfE5hdnl8T2xkTGFjZXxPbGl2ZXxPbGl2ZURyYWJ8T3JhbmdlfE9yYW5nZVJlZHxPcmNoaWR8UGFsZUdvbGRlblJvZHxQYWxlR3JlZW58UGFsZVR1cnF1b2lzZXxQYWxlVmlvbGV0UmVkfFBhcGF5YVdoaXB8UGVhY2hQdWZmfFBlcnV8UGlua3xQbHVtfFBvd2RlckJsdWV8UHVycGxlfFJlZHxSb3N5QnJvd258Um95YWxCbHVlfFNhZGRsZUJyb3dufFNhbG1vbnxTYW5keUJyb3dufFNlYUdyZWVufFNlYVNoZWxsfFNpZW5uYXxTaWx2ZXJ8U2t5Qmx1ZXxTbGF0ZUJsdWV8U2xhdGVHclthZV15fFNub3d8U3ByaW5nR3JlZW58U3RlZWxCbHVlfFRhbnxUZWFsfFRoaXN0bGV8VG9tYXRvfFRyYW5zcGFyZW50fFR1cnF1b2lzZXxWaW9sZXR8V2hlYXR8V2hpdGV8V2hpdGVTbW9rZXxZZWxsb3d8WWVsbG93R3JlZW4pKD8hW1xcdy1dKS9pLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZVxuICAgIH0sIHtcbiAgICAgIHBhdHRlcm46IC9cXGIoPzpoc2x8cmdiKVxcKFxccypcXGR7MSwzfVxccyosXFxzKlxcZHsxLDN9JT9cXHMqLFxccypcXGR7MSwzfSU/XFxzKlxcKVxcQnxcXGIoPzpoc2x8cmdiKWFcXChcXHMqXFxkezEsM31cXHMqLFxccypcXGR7MSwzfSU/XFxzKixcXHMqXFxkezEsM30lP1xccyosXFxzKig/OjB8MD9cXC5cXGQrfDEpXFxzKlxcKVxcQi9pLFxuICAgICAgaW5zaWRlOiB7XG4gICAgICAgICd1bml0JzogdW5pdCxcbiAgICAgICAgJ251bWJlcic6IG51bWJlcixcbiAgICAgICAgJ2Z1bmN0aW9uJzogL1tcXHctXSsoPz1cXCgpLyxcbiAgICAgICAgJ3B1bmN0dWF0aW9uJzogL1soKSxdL1xuICAgICAgfVxuICAgIH1dLFxuICAgIC8vIGl0J3MgaW1wb3J0YW50IHRoYXQgdGhlcmUgaXMgbm8gYm91bmRhcnkgYXNzZXJ0aW9uIGFmdGVyIHRoZSBoZXggZGlnaXRzXG4gICAgJ2VudGl0eSc6IC9cXFxcW1xcZGEtZl17MSw4fS9pLFxuICAgICd1bml0JzogdW5pdCxcbiAgICAnbnVtYmVyJzogbnVtYmVyXG4gIH0pO1xufSkocHJpc20pO1xuLyogXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tamF2YXNjcmlwdFwiICovXG5cblxucHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQgPSBwcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjbGlrZScsIHtcbiAgJ2NsYXNzLW5hbWUnOiBbcHJpc20ubGFuZ3VhZ2VzLmNsaWtlWydjbGFzcy1uYW1lJ10sIHtcbiAgICBwYXR0ZXJuOiAvKF58W14kXFx3XFx4QTAtXFx1RkZGRl0pKD8hXFxzKVtfJEEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxcLig/OmNvbnN0cnVjdG9yfHByb3RvdHlwZSkpLyxcbiAgICBsb29rYmVoaW5kOiB0cnVlXG4gIH1dLFxuICAna2V5d29yZCc6IFt7XG4gICAgcGF0dGVybjogLygoPzpefFxcfSlcXHMqKWNhdGNoXFxiLyxcbiAgICBsb29rYmVoaW5kOiB0cnVlXG4gIH0sIHtcbiAgICBwYXR0ZXJuOiAvKF58W14uXXxcXC5cXC5cXC5cXHMqKVxcYig/OmFzfGFzc2VydCg/PVxccypcXHspfGFzeW5jKD89XFxzKig/OmZ1bmN0aW9uXFxifFxcKHxbJFxcd1xceEEwLVxcdUZGRkZdfCQpKXxhd2FpdHxicmVha3xjYXNlfGNsYXNzfGNvbnN0fGNvbnRpbnVlfGRlYnVnZ2VyfGRlZmF1bHR8ZGVsZXRlfGRvfGVsc2V8ZW51bXxleHBvcnR8ZXh0ZW5kc3xmaW5hbGx5KD89XFxzKig/Olxce3wkKSl8Zm9yfGZyb20oPz1cXHMqKD86WydcIl18JCkpfGZ1bmN0aW9ufCg/OmdldHxzZXQpKD89XFxzKig/OlsjXFxbJFxcd1xceEEwLVxcdUZGRkZdfCQpKXxpZnxpbXBsZW1lbnRzfGltcG9ydHxpbnxpbnN0YW5jZW9mfGludGVyZmFjZXxsZXR8bmV3fG51bGx8b2Z8cGFja2FnZXxwcml2YXRlfHByb3RlY3RlZHxwdWJsaWN8cmV0dXJufHN0YXRpY3xzdXBlcnxzd2l0Y2h8dGhpc3x0aHJvd3x0cnl8dHlwZW9mfHVuZGVmaW5lZHx2YXJ8dm9pZHx3aGlsZXx3aXRofHlpZWxkKVxcYi8sXG4gICAgbG9va2JlaGluZDogdHJ1ZVxuICB9XSxcbiAgLy8gQWxsb3cgZm9yIGFsbCBub24tQVNDSUkgY2hhcmFjdGVycyAoU2VlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIwMDg0NDQpXG4gICdmdW5jdGlvbic6IC8jPyg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSooPz1cXHMqKD86XFwuXFxzKig/OmFwcGx5fGJpbmR8Y2FsbClcXHMqKT9cXCgpLyxcbiAgJ251bWJlcic6IHtcbiAgICBwYXR0ZXJuOiBSZWdFeHAoLyhefFteXFx3JF0pLy5zb3VyY2UgKyAnKD86JyArICggLy8gY29uc3RhbnRcbiAgICAvTmFOfEluZmluaXR5Ly5zb3VyY2UgKyAnfCcgKyAvLyBiaW5hcnkgaW50ZWdlclxuICAgIC8wW2JCXVswMV0rKD86X1swMV0rKSpuPy8uc291cmNlICsgJ3wnICsgLy8gb2N0YWwgaW50ZWdlclxuICAgIC8wW29PXVswLTddKyg/Ol9bMC03XSspKm4/Ly5zb3VyY2UgKyAnfCcgKyAvLyBoZXhhZGVjaW1hbCBpbnRlZ2VyXG4gICAgLzBbeFhdW1xcZEEtRmEtZl0rKD86X1tcXGRBLUZhLWZdKykqbj8vLnNvdXJjZSArICd8JyArIC8vIGRlY2ltYWwgYmlnaW50XG4gICAgL1xcZCsoPzpfXFxkKykqbi8uc291cmNlICsgJ3wnICsgLy8gZGVjaW1hbCBudW1iZXIgKGludGVnZXIgb3IgZmxvYXQpIGJ1dCBubyBiaWdpbnRcbiAgICAvKD86XFxkKyg/Ol9cXGQrKSooPzpcXC4oPzpcXGQrKD86X1xcZCspKik/KT98XFwuXFxkKyg/Ol9cXGQrKSopKD86W0VlXVsrLV0/XFxkKyg/Ol9cXGQrKSopPy8uc291cmNlKSArICcpJyArIC8oPyFbXFx3JF0pLy5zb3VyY2UpLFxuICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgfSxcbiAgJ29wZXJhdG9yJzogLy0tfFxcK1xcK3xcXCpcXCo9P3w9PnwmJj0/fFxcfFxcfD0/fFshPV09PXw8PD0/fD4+Pj89P3xbLSsqLyUmfF4hPTw+XT0/fFxcLnszfXxcXD9cXD89P3xcXD9cXC4/fFt+Ol0vXG59KTtcbnByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0WydjbGFzcy1uYW1lJ11bMF0ucGF0dGVybiA9IC8oXFxiKD86Y2xhc3N8ZXh0ZW5kc3xpbXBsZW1lbnRzfGluc3RhbmNlb2Z8aW50ZXJmYWNlfG5ldylcXHMrKVtcXHcuXFxcXF0rLztcbnByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2phdmFzY3JpcHQnLCAna2V5d29yZCcsIHtcbiAgJ3JlZ2V4Jzoge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWdleHAvbm8tZHVwZS1jaGFyYWN0ZXJzLWNoYXJhY3Rlci1jbGFzc1xuICAgIHBhdHRlcm46IC8oKD86XnxbXiRcXHdcXHhBMC1cXHVGRkZGLlwiJ1xcXSlcXHNdfFxcYig/OnJldHVybnx5aWVsZCkpXFxzKilcXC8oPzpcXFsoPzpbXlxcXVxcXFxcXHJcXG5dfFxcXFwuKSpcXF18XFxcXC58W14vXFxcXFxcW1xcclxcbl0pK1xcL1tkZ2lteXVzXXswLDd9KD89KD86XFxzfFxcL1xcKig/OlteKl18XFwqKD8hXFwvKSkqXFwqXFwvKSooPzokfFtcXHJcXG4sLjs6fSlcXF1dfFxcL1xcLykpLyxcbiAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgIGdyZWVkeTogdHJ1ZSxcbiAgICBpbnNpZGU6IHtcbiAgICAgICdyZWdleC1zb3VyY2UnOiB7XG4gICAgICAgIHBhdHRlcm46IC9eKFxcLylbXFxzXFxTXSsoPz1cXC9bYS16XSokKS8sXG4gICAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICAgIGFsaWFzOiAnbGFuZ3VhZ2UtcmVnZXgnLFxuICAgICAgICBpbnNpZGU6IHByaXNtLmxhbmd1YWdlcy5yZWdleFxuICAgICAgfSxcbiAgICAgICdyZWdleC1kZWxpbWl0ZXInOiAvXlxcL3xcXC8kLyxcbiAgICAgICdyZWdleC1mbGFncyc6IC9eW2Etel0rJC9cbiAgICB9XG4gIH0sXG4gIC8vIFRoaXMgbXVzdCBiZSBkZWNsYXJlZCBiZWZvcmUga2V5d29yZCBiZWNhdXNlIHdlIHVzZSBcImZ1bmN0aW9uXCIgaW5zaWRlIHRoZSBsb29rLWZvcndhcmRcbiAgJ2Z1bmN0aW9uLXZhcmlhYmxlJzoge1xuICAgIHBhdHRlcm46IC8jPyg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSooPz1cXHMqWz06XVxccyooPzphc3luY1xccyopPyg/OlxcYmZ1bmN0aW9uXFxifCg/OlxcKCg/OlteKCldfFxcKFteKCldKlxcKSkqXFwpfCg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSopXFxzKj0+KSkvLFxuICAgIGFsaWFzOiAnZnVuY3Rpb24nXG4gIH0sXG4gICdwYXJhbWV0ZXInOiBbe1xuICAgIHBhdHRlcm46IC8oZnVuY3Rpb24oPzpcXHMrKD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKik/XFxzKlxcKFxccyopKD8hXFxzKSg/OlteKClcXHNdfFxccysoPyFbXFxzKV0pfFxcKFteKCldKlxcKSkrKD89XFxzKlxcKSkvLFxuICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgaW5zaWRlOiBwcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuICB9LCB7XG4gICAgcGF0dGVybjogLyhefFteJFxcd1xceEEwLVxcdUZGRkZdKSg/IVxccylbXyRhLXpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSooPz1cXHMqPT4pL2ksXG4gICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICBpbnNpZGU6IHByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG4gIH0sIHtcbiAgICBwYXR0ZXJuOiAvKFxcKFxccyopKD8hXFxzKSg/OlteKClcXHNdfFxccysoPyFbXFxzKV0pfFxcKFteKCldKlxcKSkrKD89XFxzKlxcKVxccyo9PikvLFxuICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgaW5zaWRlOiBwcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuICB9LCB7XG4gICAgcGF0dGVybjogLygoPzpcXGJ8XFxzfF4pKD8hKD86YXN8YXN5bmN8YXdhaXR8YnJlYWt8Y2FzZXxjYXRjaHxjbGFzc3xjb25zdHxjb250aW51ZXxkZWJ1Z2dlcnxkZWZhdWx0fGRlbGV0ZXxkb3xlbHNlfGVudW18ZXhwb3J0fGV4dGVuZHN8ZmluYWxseXxmb3J8ZnJvbXxmdW5jdGlvbnxnZXR8aWZ8aW1wbGVtZW50c3xpbXBvcnR8aW58aW5zdGFuY2VvZnxpbnRlcmZhY2V8bGV0fG5ld3xudWxsfG9mfHBhY2thZ2V8cHJpdmF0ZXxwcm90ZWN0ZWR8cHVibGljfHJldHVybnxzZXR8c3RhdGljfHN1cGVyfHN3aXRjaHx0aGlzfHRocm93fHRyeXx0eXBlb2Z8dW5kZWZpbmVkfHZhcnx2b2lkfHdoaWxlfHdpdGh8eWllbGQpKD8hWyRcXHdcXHhBMC1cXHVGRkZGXSkpKD86KD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKlxccyopXFwoXFxzKnxcXF1cXHMqXFwoXFxzKikoPyFcXHMpKD86W14oKVxcc118XFxzKyg/IVtcXHMpXSl8XFwoW14oKV0qXFwpKSsoPz1cXHMqXFwpXFxzKlxceykvLFxuICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgaW5zaWRlOiBwcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuICB9XSxcbiAgJ2NvbnN0YW50JzogL1xcYltBLVpdKD86W0EtWl9dfFxcZHg/KSpcXGIvXG59KTtcbnByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2phdmFzY3JpcHQnLCAnc3RyaW5nJywge1xuICAnaGFzaGJhbmcnOiB7XG4gICAgcGF0dGVybjogL14jIS4qLyxcbiAgICBncmVlZHk6IHRydWUsXG4gICAgYWxpYXM6ICdjb21tZW50J1xuICB9LFxuICAndGVtcGxhdGUtc3RyaW5nJzoge1xuICAgIHBhdHRlcm46IC9gKD86XFxcXFtcXHNcXFNdfFxcJFxceyg/Oltee31dfFxceyg/Oltee31dfFxce1tefV0qXFx9KSpcXH0pK1xcfXwoPyFcXCRcXHspW15cXFxcYF0pKmAvLFxuICAgIGdyZWVkeTogdHJ1ZSxcbiAgICBpbnNpZGU6IHtcbiAgICAgICd0ZW1wbGF0ZS1wdW5jdHVhdGlvbic6IHtcbiAgICAgICAgcGF0dGVybjogL15gfGAkLyxcbiAgICAgICAgYWxpYXM6ICdzdHJpbmcnXG4gICAgICB9LFxuICAgICAgJ2ludGVycG9sYXRpb24nOiB7XG4gICAgICAgIHBhdHRlcm46IC8oKD86XnxbXlxcXFxdKSg/OlxcXFx7Mn0pKilcXCRcXHsoPzpbXnt9XXxcXHsoPzpbXnt9XXxcXHtbXn1dKlxcfSkqXFx9KStcXH0vLFxuICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICBpbnNpZGU6IHtcbiAgICAgICAgICAnaW50ZXJwb2xhdGlvbi1wdW5jdHVhdGlvbic6IHtcbiAgICAgICAgICAgIHBhdHRlcm46IC9eXFwkXFx7fFxcfSQvLFxuICAgICAgICAgICAgYWxpYXM6ICdwdW5jdHVhdGlvbidcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlc3Q6IHByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAnc3RyaW5nJzogL1tcXHNcXFNdKy9cbiAgICB9XG4gIH0sXG4gICdzdHJpbmctcHJvcGVydHknOiB7XG4gICAgcGF0dGVybjogLygoPzpefFsse10pWyBcXHRdKikoW1wiJ10pKD86XFxcXCg/OlxcclxcbnxbXFxzXFxTXSl8KD8hXFwyKVteXFxcXFxcclxcbl0pKlxcMig/PVxccyo6KS9tLFxuICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgZ3JlZWR5OiB0cnVlLFxuICAgIGFsaWFzOiAncHJvcGVydHknXG4gIH1cbn0pO1xucHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnamF2YXNjcmlwdCcsICdvcGVyYXRvcicsIHtcbiAgJ2xpdGVyYWwtcHJvcGVydHknOiB7XG4gICAgcGF0dGVybjogLygoPzpefFsse10pWyBcXHRdKikoPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKD89XFxzKjopL20sXG4gICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICBhbGlhczogJ3Byb3BlcnR5J1xuICB9XG59KTtcblxuaWYgKHByaXNtLmxhbmd1YWdlcy5tYXJrdXApIHtcbiAgcHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcuYWRkSW5saW5lZCgnc2NyaXB0JywgJ2phdmFzY3JpcHQnKTsgLy8gYWRkIGF0dHJpYnV0ZSBzdXBwb3J0IGZvciBhbGwgRE9NIGV2ZW50cy5cbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvRXZlbnRzI1N0YW5kYXJkX2V2ZW50c1xuXG4gIHByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLmFkZEF0dHJpYnV0ZSgvb24oPzphYm9ydHxibHVyfGNoYW5nZXxjbGlja3xjb21wb3NpdGlvbig/OmVuZHxzdGFydHx1cGRhdGUpfGRibGNsaWNrfGVycm9yfGZvY3VzKD86aW58b3V0KT98a2V5KD86ZG93bnx1cCl8bG9hZHxtb3VzZSg/OmRvd258ZW50ZXJ8bGVhdmV8bW92ZXxvdXR8b3Zlcnx1cCl8cmVzZXR8cmVzaXplfHNjcm9sbHxzZWxlY3R8c2xvdGNoYW5nZXxzdWJtaXR8dW5sb2FkfHdoZWVsKS8uc291cmNlLCAnamF2YXNjcmlwdCcpO1xufVxuXG5wcmlzbS5sYW5ndWFnZXMuanMgPSBwcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdDtcbi8qIFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNvZmZlZXNjcmlwdFwiICovXG5cbihmdW5jdGlvbiAoUHJpc20pIHtcbiAgLy8gSWdub3JlIGNvbW1lbnRzIHN0YXJ0aW5nIHdpdGggeyB0byBwcml2aWxlZ2Ugc3RyaW5nIGludGVycG9sYXRpb24gaGlnaGxpZ2h0aW5nXG4gIHZhciBjb21tZW50ID0gLyMoPyFcXHspLisvO1xuICB2YXIgaW50ZXJwb2xhdGlvbiA9IHtcbiAgICBwYXR0ZXJuOiAvI1xce1tefV0rXFx9LyxcbiAgICBhbGlhczogJ3ZhcmlhYmxlJ1xuICB9O1xuICBQcmlzbS5sYW5ndWFnZXMuY29mZmVlc2NyaXB0ID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnamF2YXNjcmlwdCcsIHtcbiAgICAnY29tbWVudCc6IGNvbW1lbnQsXG4gICAgJ3N0cmluZyc6IFsvLyBTdHJpbmdzIGFyZSBtdWx0aWxpbmVcbiAgICB7XG4gICAgICBwYXR0ZXJuOiAvJyg/OlxcXFxbXFxzXFxTXXxbXlxcXFwnXSkqJy8sXG4gICAgICBncmVlZHk6IHRydWVcbiAgICB9LCB7XG4gICAgICAvLyBTdHJpbmdzIGFyZSBtdWx0aWxpbmVcbiAgICAgIHBhdHRlcm46IC9cIig/OlxcXFxbXFxzXFxTXXxbXlxcXFxcIl0pKlwiLyxcbiAgICAgIGdyZWVkeTogdHJ1ZSxcbiAgICAgIGluc2lkZToge1xuICAgICAgICAnaW50ZXJwb2xhdGlvbic6IGludGVycG9sYXRpb25cbiAgICAgIH1cbiAgICB9XSxcbiAgICAna2V5d29yZCc6IC9cXGIoPzphbmR8YnJlYWt8Ynl8Y2F0Y2h8Y2xhc3N8Y29udGludWV8ZGVidWdnZXJ8ZGVsZXRlfGRvfGVhY2h8ZWxzZXxleHRlbmR8ZXh0ZW5kc3xmYWxzZXxmaW5hbGx5fGZvcnxpZnxpbnxpbnN0YW5jZW9mfGlzfGlzbnR8bGV0fGxvb3B8bmFtZXNwYWNlfG5ld3xub3xub3R8bnVsbHxvZnxvZmZ8b258b3J8b3dufHJldHVybnxzdXBlcnxzd2l0Y2h8dGhlbnx0aGlzfHRocm93fHRydWV8dHJ5fHR5cGVvZnx1bmRlZmluZWR8dW5sZXNzfHVudGlsfHdoZW58d2hpbGV8d2luZG93fHdpdGh8eWVzfHlpZWxkKVxcYi8sXG4gICAgJ2NsYXNzLW1lbWJlcic6IHtcbiAgICAgIHBhdHRlcm46IC9AKD8hXFxkKVxcdysvLFxuICAgICAgYWxpYXM6ICd2YXJpYWJsZSdcbiAgICB9XG4gIH0pO1xuICBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdjb2ZmZWVzY3JpcHQnLCAnY29tbWVudCcsIHtcbiAgICAnbXVsdGlsaW5lLWNvbW1lbnQnOiB7XG4gICAgICBwYXR0ZXJuOiAvIyMjW1xcc1xcU10rPyMjIy8sXG4gICAgICBhbGlhczogJ2NvbW1lbnQnXG4gICAgfSxcbiAgICAvLyBCbG9jayByZWdleHAgY2FuIGNvbnRhaW4gY29tbWVudHMgYW5kIGludGVycG9sYXRpb25cbiAgICAnYmxvY2stcmVnZXgnOiB7XG4gICAgICBwYXR0ZXJuOiAvXFwvezN9W1xcc1xcU10qP1xcL3szfS8sXG4gICAgICBhbGlhczogJ3JlZ2V4JyxcbiAgICAgIGluc2lkZToge1xuICAgICAgICAnY29tbWVudCc6IGNvbW1lbnQsXG4gICAgICAgICdpbnRlcnBvbGF0aW9uJzogaW50ZXJwb2xhdGlvblxuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2NvZmZlZXNjcmlwdCcsICdzdHJpbmcnLCB7XG4gICAgJ2lubGluZS1qYXZhc2NyaXB0Jzoge1xuICAgICAgcGF0dGVybjogL2AoPzpcXFxcW1xcc1xcU118W15cXFxcYF0pKmAvLFxuICAgICAgaW5zaWRlOiB7XG4gICAgICAgICdkZWxpbWl0ZXInOiB7XG4gICAgICAgICAgcGF0dGVybjogL15gfGAkLyxcbiAgICAgICAgICBhbGlhczogJ3B1bmN0dWF0aW9uJ1xuICAgICAgICB9LFxuICAgICAgICAnc2NyaXB0Jzoge1xuICAgICAgICAgIHBhdHRlcm46IC9bXFxzXFxTXSsvLFxuICAgICAgICAgIGFsaWFzOiAnbGFuZ3VhZ2UtamF2YXNjcmlwdCcsXG4gICAgICAgICAgaW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyBCbG9jayBzdHJpbmdzXG4gICAgJ211bHRpbGluZS1zdHJpbmcnOiBbe1xuICAgICAgcGF0dGVybjogLycnJ1tcXHNcXFNdKj8nJycvLFxuICAgICAgZ3JlZWR5OiB0cnVlLFxuICAgICAgYWxpYXM6ICdzdHJpbmcnXG4gICAgfSwge1xuICAgICAgcGF0dGVybjogL1wiXCJcIltcXHNcXFNdKj9cIlwiXCIvLFxuICAgICAgZ3JlZWR5OiB0cnVlLFxuICAgICAgYWxpYXM6ICdzdHJpbmcnLFxuICAgICAgaW5zaWRlOiB7XG4gICAgICAgIGludGVycG9sYXRpb246IGludGVycG9sYXRpb25cbiAgICAgIH1cbiAgICB9XVxuICB9KTtcbiAgUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnY29mZmVlc2NyaXB0JywgJ2tleXdvcmQnLCB7XG4gICAgLy8gT2JqZWN0IHByb3BlcnR5XG4gICAgJ3Byb3BlcnR5JzogLyg/IVxcZClcXHcrKD89XFxzKjooPyE6KSkvXG4gIH0pO1xuICBkZWxldGUgUHJpc20ubGFuZ3VhZ2VzLmNvZmZlZXNjcmlwdFsndGVtcGxhdGUtc3RyaW5nJ107XG4gIFByaXNtLmxhbmd1YWdlcy5jb2ZmZWUgPSBQcmlzbS5sYW5ndWFnZXMuY29mZmVlc2NyaXB0O1xufSkocHJpc20pO1xuLyogXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20teWFtbFwiICovXG5cblxuKGZ1bmN0aW9uIChQcmlzbSkge1xuICAvLyBodHRwczovL3lhbWwub3JnL3NwZWMvMS4yL3NwZWMuaHRtbCNjLW5zLWFuY2hvci1wcm9wZXJ0eVxuICAvLyBodHRwczovL3lhbWwub3JnL3NwZWMvMS4yL3NwZWMuaHRtbCNjLW5zLWFsaWFzLW5vZGVcbiAgdmFyIGFuY2hvck9yQWxpYXMgPSAvWyomXVteXFxzW1xcXXt9LF0rLzsgLy8gaHR0cHM6Ly95YW1sLm9yZy9zcGVjLzEuMi9zcGVjLmh0bWwjYy1ucy10YWctcHJvcGVydHlcblxuICB2YXIgdGFnID0gLyEoPzo8W1xcd1xcLSUjOy8/OkAmPSskLC4hfionKClbXFxdXSs+fCg/OlthLXpBLVpcXGQtXSohKT9bXFx3XFwtJSM7Lz86QCY9KyQufionKCldKyk/LzsgLy8gaHR0cHM6Ly95YW1sLm9yZy9zcGVjLzEuMi9zcGVjLmh0bWwjYy1ucy1wcm9wZXJ0aWVzKG4sYylcblxuICB2YXIgcHJvcGVydGllcyA9ICcoPzonICsgdGFnLnNvdXJjZSArICcoPzpbIFxcdF0rJyArIGFuY2hvck9yQWxpYXMuc291cmNlICsgJyk/fCcgKyBhbmNob3JPckFsaWFzLnNvdXJjZSArICcoPzpbIFxcdF0rJyArIHRhZy5zb3VyY2UgKyAnKT8pJzsgLy8gaHR0cHM6Ly95YW1sLm9yZy9zcGVjLzEuMi9zcGVjLmh0bWwjbnMtcGxhaW4obixjKVxuICAvLyBUaGlzIGlzIGEgc2ltcGxpZmllZCB2ZXJzaW9uIHRoYXQgZG9lc24ndCBzdXBwb3J0IFwiI1wiIGFuZCBtdWx0aWxpbmUga2V5c1xuICAvLyBBbGwgdGhlc2UgbG9uZyBzY2FycnkgY2hhcmFjdGVyIGNsYXNzZXMgYXJlIHNpbXBsaWZpZWQgdmVyc2lvbnMgb2YgWUFNTCdzIGNoYXJhY3RlcnNcblxuICB2YXIgcGxhaW5LZXkgPSAvKD86W15cXHNcXHgwMC1cXHgwOFxceDBlLVxceDFmIVwiIyUmJyosXFwtOj4/QFtcXF1ge3x9XFx4N2YtXFx4ODRcXHg4Ni1cXHg5ZlxcdWQ4MDAtXFx1ZGZmZlxcdWZmZmVcXHVmZmZmXXxbPzotXTxQTEFJTj4pKD86WyBcXHRdKig/Oig/IVsjOl0pPFBMQUlOPnw6PFBMQUlOPikpKi8uc291cmNlLnJlcGxhY2UoLzxQTEFJTj4vZywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAvW15cXHNcXHgwMC1cXHgwOFxceDBlLVxceDFmLFtcXF17fVxceDdmLVxceDg0XFx4ODYtXFx4OWZcXHVkODAwLVxcdWRmZmZcXHVmZmZlXFx1ZmZmZl0vLnNvdXJjZTtcbiAgfSk7XG4gIHZhciBzdHJpbmcgPSAvXCIoPzpbXlwiXFxcXFxcclxcbl18XFxcXC4pKlwifCcoPzpbXidcXFxcXFxyXFxuXXxcXFxcLikqJy8uc291cmNlO1xuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZmxhZ3NdXG4gICAqIEByZXR1cm5zIHtSZWdFeHB9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZVZhbHVlUGF0dGVybih2YWx1ZSwgZmxhZ3MpIHtcbiAgICBmbGFncyA9IChmbGFncyB8fCAnJykucmVwbGFjZSgvbS9nLCAnJykgKyAnbSc7IC8vIGFkZCBtIGZsYWdcblxuICAgIHZhciBwYXR0ZXJuID0gLyhbOlxcLSxbe11cXHMqKD86XFxzPDxwcm9wPj5bIFxcdF0rKT8pKD86PDx2YWx1ZT4+KSg/PVsgXFx0XSooPzokfCx8XFxdfFxcfXwoPzpbXFxyXFxuXVxccyopPyMpKS8uc291cmNlLnJlcGxhY2UoLzw8cHJvcD4+L2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuICAgIH0pLnJlcGxhY2UoLzw8dmFsdWU+Pi9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIFJlZ0V4cChwYXR0ZXJuLCBmbGFncyk7XG4gIH1cblxuICBQcmlzbS5sYW5ndWFnZXMueWFtbCA9IHtcbiAgICAnc2NhbGFyJzoge1xuICAgICAgcGF0dGVybjogUmVnRXhwKC8oW1xcLTpdXFxzKig/Olxcczw8cHJvcD4+WyBcXHRdKyk/W3w+XSlbIFxcdF0qKD86KCg/Olxccj9cXG58XFxyKVsgXFx0XSspXFxTW15cXHJcXG5dKig/OlxcMlteXFxyXFxuXSspKikvLnNvdXJjZS5yZXBsYWNlKC88PHByb3A+Pi9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuICAgICAgfSkpLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgIGFsaWFzOiAnc3RyaW5nJ1xuICAgIH0sXG4gICAgJ2NvbW1lbnQnOiAvIy4qLyxcbiAgICAna2V5Jzoge1xuICAgICAgcGF0dGVybjogUmVnRXhwKC8oKD86XnxbOlxcLSxbe1xcclxcbj9dKVsgXFx0XSooPzo8PHByb3A+PlsgXFx0XSspPyk8PGtleT4+KD89XFxzKjpcXHMpLy5zb3VyY2UucmVwbGFjZSgvPDxwcm9wPj4vZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcHJvcGVydGllcztcbiAgICAgIH0pLnJlcGxhY2UoLzw8a2V5Pj4vZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJyg/OicgKyBwbGFpbktleSArICd8JyArIHN0cmluZyArICcpJztcbiAgICAgIH0pKSxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBncmVlZHk6IHRydWUsXG4gICAgICBhbGlhczogJ2F0cnVsZSdcbiAgICB9LFxuICAgICdkaXJlY3RpdmUnOiB7XG4gICAgICBwYXR0ZXJuOiAvKF5bIFxcdF0qKSUuKy9tLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgIGFsaWFzOiAnaW1wb3J0YW50J1xuICAgIH0sXG4gICAgJ2RhdGV0aW1lJzoge1xuICAgICAgcGF0dGVybjogY3JlYXRlVmFsdWVQYXR0ZXJuKC9cXGR7NH0tXFxkXFxkPy1cXGRcXGQ/KD86W3RUXXxbIFxcdF0rKVxcZFxcZD86XFxkezJ9OlxcZHsyfSg/OlxcLlxcZCopPyg/OlsgXFx0XSooPzpafFstK11cXGRcXGQ/KD86OlxcZHsyfSk/KSk/fFxcZHs0fS1cXGR7Mn0tXFxkezJ9fFxcZFxcZD86XFxkezJ9KD86OlxcZHsyfSg/OlxcLlxcZCopPyk/Ly5zb3VyY2UpLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgIGFsaWFzOiAnbnVtYmVyJ1xuICAgIH0sXG4gICAgJ2Jvb2xlYW4nOiB7XG4gICAgICBwYXR0ZXJuOiBjcmVhdGVWYWx1ZVBhdHRlcm4oL2ZhbHNlfHRydWUvLnNvdXJjZSwgJ2knKSxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBhbGlhczogJ2ltcG9ydGFudCdcbiAgICB9LFxuICAgICdudWxsJzoge1xuICAgICAgcGF0dGVybjogY3JlYXRlVmFsdWVQYXR0ZXJuKC9udWxsfH4vLnNvdXJjZSwgJ2knKSxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBhbGlhczogJ2ltcG9ydGFudCdcbiAgICB9LFxuICAgICdzdHJpbmcnOiB7XG4gICAgICBwYXR0ZXJuOiBjcmVhdGVWYWx1ZVBhdHRlcm4oc3RyaW5nKSxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBncmVlZHk6IHRydWVcbiAgICB9LFxuICAgICdudW1iZXInOiB7XG4gICAgICBwYXR0ZXJuOiBjcmVhdGVWYWx1ZVBhdHRlcm4oL1srLV0/KD86MHhbXFxkYS1mXSt8MG9bMC03XSt8KD86XFxkKyg/OlxcLlxcZCopP3xcXC5cXGQrKSg/OmVbKy1dP1xcZCspP3xcXC5pbmZ8XFwubmFuKS8uc291cmNlLCAnaScpLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZVxuICAgIH0sXG4gICAgJ3RhZyc6IHRhZyxcbiAgICAnaW1wb3J0YW50JzogYW5jaG9yT3JBbGlhcyxcbiAgICAncHVuY3R1YXRpb24nOiAvLS0tfFs6W1xcXXt9XFwtLHw+P118XFwuXFwuXFwuL1xuICB9O1xuICBQcmlzbS5sYW5ndWFnZXMueW1sID0gUHJpc20ubGFuZ3VhZ2VzLnlhbWw7XG59KShwcmlzbSk7XG4vKiBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1tYXJrZG93blwiICovXG5cblxuKGZ1bmN0aW9uIChQcmlzbSkge1xuICAvLyBBbGxvdyBvbmx5IG9uZSBsaW5lIGJyZWFrXG4gIHZhciBpbm5lciA9IC8oPzpcXFxcLnxbXlxcXFxcXG5cXHJdfCg/OlxcbnxcXHJcXG4/KSg/IVtcXHJcXG5dKSkvLnNvdXJjZTtcbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gaXMgaW50ZW5kZWQgZm9yIHRoZSBjcmVhdGlvbiBvZiB0aGUgYm9sZCBvciBpdGFsaWMgcGF0dGVybi5cbiAgICpcbiAgICogVGhpcyBhbHNvIGFkZHMgYSBsb29rYmVoaW5kIGdyb3VwIHRvIHRoZSBnaXZlbiBwYXR0ZXJuIHRvIGVuc3VyZSB0aGF0IHRoZSBwYXR0ZXJuIGlzIG5vdCBiYWNrc2xhc2gtZXNjYXBlZC5cbiAgICpcbiAgICogX05vdGU6XyBLZWVwIGluIG1pbmQgdGhhdCB0aGlzIGFkZHMgYSBjYXB0dXJpbmcgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXR0ZXJuXG4gICAqIEByZXR1cm5zIHtSZWdFeHB9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUlubGluZShwYXR0ZXJuKSB7XG4gICAgcGF0dGVybiA9IHBhdHRlcm4ucmVwbGFjZSgvPGlubmVyPi9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gaW5uZXI7XG4gICAgfSk7XG4gICAgcmV0dXJuIFJlZ0V4cCgvKCg/Ol58W15cXFxcXSkoPzpcXFxcezJ9KSopLy5zb3VyY2UgKyAnKD86JyArIHBhdHRlcm4gKyAnKScpO1xuICB9XG5cbiAgdmFyIHRhYmxlQ2VsbCA9IC8oPzpcXFxcLnxgYCg/OlteYFxcclxcbl18YCg/IWApKStgYHxgW15gXFxyXFxuXStgfFteXFxcXHxcXHJcXG5gXSkrLy5zb3VyY2U7XG4gIHZhciB0YWJsZVJvdyA9IC9cXHw/X18oPzpcXHxfXykrXFx8Pyg/Oig/OlxcbnxcXHJcXG4/KXwoPyFbXFxzXFxTXSkpLy5zb3VyY2UucmVwbGFjZSgvX18vZywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0YWJsZUNlbGw7XG4gIH0pO1xuICB2YXIgdGFibGVMaW5lID0gL1xcfD9bIFxcdF0qOj8tezMsfTo/WyBcXHRdKig/OlxcfFsgXFx0XSo6Py17Myx9Oj9bIFxcdF0qKStcXHw/KD86XFxufFxcclxcbj8pLy5zb3VyY2U7XG4gIFByaXNtLmxhbmd1YWdlcy5tYXJrZG93biA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ21hcmt1cCcsIHt9KTtcbiAgUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya2Rvd24nLCAncHJvbG9nJywge1xuICAgICdmcm9udC1tYXR0ZXItYmxvY2snOiB7XG4gICAgICBwYXR0ZXJuOiAvKF4oPzpcXHMqW1xcclxcbl0pPyktLS0oPyEuKVtcXHNcXFNdKj9bXFxyXFxuXS0tLSg/IS4pLyxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBncmVlZHk6IHRydWUsXG4gICAgICBpbnNpZGU6IHtcbiAgICAgICAgJ3B1bmN0dWF0aW9uJzogL14tLS18LS0tJC8sXG4gICAgICAgICdmcm9udC1tYXR0ZXInOiB7XG4gICAgICAgICAgcGF0dGVybjogL1xcUysoPzpcXHMrXFxTKykqLyxcbiAgICAgICAgICBhbGlhczogWyd5YW1sJywgJ2xhbmd1YWdlLXlhbWwnXSxcbiAgICAgICAgICBpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy55YW1sXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgICdibG9ja3F1b3RlJzoge1xuICAgICAgLy8gPiAuLi5cbiAgICAgIHBhdHRlcm46IC9ePig/OltcXHQgXSo+KSovbSxcbiAgICAgIGFsaWFzOiAncHVuY3R1YXRpb24nXG4gICAgfSxcbiAgICAndGFibGUnOiB7XG4gICAgICBwYXR0ZXJuOiBSZWdFeHAoJ14nICsgdGFibGVSb3cgKyB0YWJsZUxpbmUgKyAnKD86JyArIHRhYmxlUm93ICsgJykqJywgJ20nKSxcbiAgICAgIGluc2lkZToge1xuICAgICAgICAndGFibGUtZGF0YS1yb3dzJzoge1xuICAgICAgICAgIHBhdHRlcm46IFJlZ0V4cCgnXignICsgdGFibGVSb3cgKyB0YWJsZUxpbmUgKyAnKSg/OicgKyB0YWJsZVJvdyArICcpKiQnKSxcbiAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICAgIGluc2lkZToge1xuICAgICAgICAgICAgJ3RhYmxlLWRhdGEnOiB7XG4gICAgICAgICAgICAgIHBhdHRlcm46IFJlZ0V4cCh0YWJsZUNlbGwpLFxuICAgICAgICAgICAgICBpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5tYXJrZG93blxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdwdW5jdHVhdGlvbic6IC9cXHwvXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAndGFibGUtbGluZSc6IHtcbiAgICAgICAgICBwYXR0ZXJuOiBSZWdFeHAoJ14oJyArIHRhYmxlUm93ICsgJyknICsgdGFibGVMaW5lICsgJyQnKSxcbiAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICAgIGluc2lkZToge1xuICAgICAgICAgICAgJ3B1bmN0dWF0aW9uJzogL1xcfHw6Py17Myx9Oj8vXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAndGFibGUtaGVhZGVyLXJvdyc6IHtcbiAgICAgICAgICBwYXR0ZXJuOiBSZWdFeHAoJ14nICsgdGFibGVSb3cgKyAnJCcpLFxuICAgICAgICAgIGluc2lkZToge1xuICAgICAgICAgICAgJ3RhYmxlLWhlYWRlcic6IHtcbiAgICAgICAgICAgICAgcGF0dGVybjogUmVnRXhwKHRhYmxlQ2VsbCksXG4gICAgICAgICAgICAgIGFsaWFzOiAnaW1wb3J0YW50JyxcbiAgICAgICAgICAgICAgaW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMubWFya2Rvd25cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAncHVuY3R1YXRpb24nOiAvXFx8L1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgJ2NvZGUnOiBbe1xuICAgICAgLy8gUHJlZml4ZWQgYnkgNCBzcGFjZXMgb3IgMSB0YWIgYW5kIHByZWNlZGVkIGJ5IGFuIGVtcHR5IGxpbmVcbiAgICAgIHBhdHRlcm46IC8oKD86XnxcXG4pWyBcXHRdKlxcbnwoPzpefFxcclxcbj8pWyBcXHRdKlxcclxcbj8pKD86IHs0fXxcXHQpLisoPzooPzpcXG58XFxyXFxuPykoPzogezR9fFxcdCkuKykqLyxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBhbGlhczogJ2tleXdvcmQnXG4gICAgfSwge1xuICAgICAgLy8gYGBgb3B0aW9uYWwgbGFuZ3VhZ2VcbiAgICAgIC8vIGNvZGUgYmxvY2tcbiAgICAgIC8vIGBgYFxuICAgICAgcGF0dGVybjogL15gYGBbXFxzXFxTXSo/XmBgYCQvbSxcbiAgICAgIGdyZWVkeTogdHJ1ZSxcbiAgICAgIGluc2lkZToge1xuICAgICAgICAnY29kZS1ibG9jayc6IHtcbiAgICAgICAgICBwYXR0ZXJuOiAvXihgYGAuKig/OlxcbnxcXHJcXG4/KSlbXFxzXFxTXSs/KD89KD86XFxufFxcclxcbj8pXmBgYCQpL20sXG4gICAgICAgICAgbG9va2JlaGluZDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICAnY29kZS1sYW5ndWFnZSc6IHtcbiAgICAgICAgICBwYXR0ZXJuOiAvXihgYGApLisvLFxuICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgJ3B1bmN0dWF0aW9uJzogL2BgYC9cbiAgICAgIH1cbiAgICB9XSxcbiAgICAndGl0bGUnOiBbe1xuICAgICAgLy8gdGl0bGUgMVxuICAgICAgLy8gPT09PT09PVxuICAgICAgLy8gdGl0bGUgMlxuICAgICAgLy8gLS0tLS0tLVxuICAgICAgcGF0dGVybjogL1xcUy4qKD86XFxufFxcclxcbj8pKD86PT0rfC0tKykoPz1bIFxcdF0qJCkvbSxcbiAgICAgIGFsaWFzOiAnaW1wb3J0YW50JyxcbiAgICAgIGluc2lkZToge1xuICAgICAgICBwdW5jdHVhdGlvbjogLz09KyR8LS0rJC9cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICAvLyAjIHRpdGxlIDFcbiAgICAgIC8vICMjIyMjIyB0aXRsZSA2XG4gICAgICBwYXR0ZXJuOiAvKF5cXHMqKSMuKy9tLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgIGFsaWFzOiAnaW1wb3J0YW50JyxcbiAgICAgIGluc2lkZToge1xuICAgICAgICBwdW5jdHVhdGlvbjogL14jK3wjKyQvXG4gICAgICB9XG4gICAgfV0sXG4gICAgJ2hyJzoge1xuICAgICAgLy8gKioqXG4gICAgICAvLyAtLS1cbiAgICAgIC8vICogKiAqXG4gICAgICAvLyAtLS0tLS0tLS0tLVxuICAgICAgcGF0dGVybjogLyheXFxzKikoWyotXSkoPzpbXFx0IF0qXFwyKXsyLH0oPz1cXHMqJCkvbSxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBhbGlhczogJ3B1bmN0dWF0aW9uJ1xuICAgIH0sXG4gICAgJ2xpc3QnOiB7XG4gICAgICAvLyAqIGl0ZW1cbiAgICAgIC8vICsgaXRlbVxuICAgICAgLy8gLSBpdGVtXG4gICAgICAvLyAxLiBpdGVtXG4gICAgICBwYXR0ZXJuOiAvKF5cXHMqKSg/OlsqKy1dfFxcZCtcXC4pKD89W1xcdCBdLikvbSxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBhbGlhczogJ3B1bmN0dWF0aW9uJ1xuICAgIH0sXG4gICAgJ3VybC1yZWZlcmVuY2UnOiB7XG4gICAgICAvLyBbaWRdOiBodHRwOi8vZXhhbXBsZS5jb20gXCJPcHRpb25hbCB0aXRsZVwiXG4gICAgICAvLyBbaWRdOiBodHRwOi8vZXhhbXBsZS5jb20gJ09wdGlvbmFsIHRpdGxlJ1xuICAgICAgLy8gW2lkXTogaHR0cDovL2V4YW1wbGUuY29tIChPcHRpb25hbCB0aXRsZSlcbiAgICAgIC8vIFtpZF06IDxodHRwOi8vZXhhbXBsZS5jb20+IFwiT3B0aW9uYWwgdGl0bGVcIlxuICAgICAgcGF0dGVybjogLyE/XFxbW15cXF1dK1xcXTpbXFx0IF0rKD86XFxTK3w8KD86XFxcXC58W14+XFxcXF0pKz4pKD86W1xcdCBdKyg/OlwiKD86XFxcXC58W15cIlxcXFxdKSpcInwnKD86XFxcXC58W14nXFxcXF0pKid8XFwoKD86XFxcXC58W14pXFxcXF0pKlxcKSkpPy8sXG4gICAgICBpbnNpZGU6IHtcbiAgICAgICAgJ3ZhcmlhYmxlJzoge1xuICAgICAgICAgIHBhdHRlcm46IC9eKCE/XFxbKVteXFxdXSsvLFxuICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgJ3N0cmluZyc6IC8oPzpcIig/OlxcXFwufFteXCJcXFxcXSkqXCJ8Jyg/OlxcXFwufFteJ1xcXFxdKSonfFxcKCg/OlxcXFwufFteKVxcXFxdKSpcXCkpJC8sXG4gICAgICAgICdwdW5jdHVhdGlvbic6IC9eW1xcW1xcXSE6XXxbPD5dL1xuICAgICAgfSxcbiAgICAgIGFsaWFzOiAndXJsJ1xuICAgIH0sXG4gICAgJ2JvbGQnOiB7XG4gICAgICAvLyAqKnN0cm9uZyoqXG4gICAgICAvLyBfX3N0cm9uZ19fXG4gICAgICAvLyBhbGxvdyBvbmUgbmVzdGVkIGluc3RhbmNlIG9mIGl0YWxpYyB0ZXh0IHVzaW5nIHRoZSBzYW1lIGRlbGltaXRlclxuICAgICAgcGF0dGVybjogY3JlYXRlSW5saW5lKC9cXGJfXyg/Oig/IV8pPGlubmVyPnxfKD86KD8hXyk8aW5uZXI+KStfKStfX1xcYnxcXCpcXCooPzooPyFcXCopPGlubmVyPnxcXCooPzooPyFcXCopPGlubmVyPikrXFwqKStcXCpcXCovLnNvdXJjZSksXG4gICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgZ3JlZWR5OiB0cnVlLFxuICAgICAgaW5zaWRlOiB7XG4gICAgICAgICdjb250ZW50Jzoge1xuICAgICAgICAgIHBhdHRlcm46IC8oXi4uKVtcXHNcXFNdKyg/PS4uJCkvLFxuICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICAgICAgaW5zaWRlOiB7fSAvLyBzZWUgYmVsb3dcblxuICAgICAgICB9LFxuICAgICAgICAncHVuY3R1YXRpb24nOiAvXFwqXFwqfF9fL1xuICAgICAgfVxuICAgIH0sXG4gICAgJ2l0YWxpYyc6IHtcbiAgICAgIC8vICplbSpcbiAgICAgIC8vIF9lbV9cbiAgICAgIC8vIGFsbG93IG9uZSBuZXN0ZWQgaW5zdGFuY2Ugb2YgYm9sZCB0ZXh0IHVzaW5nIHRoZSBzYW1lIGRlbGltaXRlclxuICAgICAgcGF0dGVybjogY3JlYXRlSW5saW5lKC9cXGJfKD86KD8hXyk8aW5uZXI+fF9fKD86KD8hXyk8aW5uZXI+KStfXykrX1xcYnxcXCooPzooPyFcXCopPGlubmVyPnxcXCpcXCooPzooPyFcXCopPGlubmVyPikrXFwqXFwqKStcXCovLnNvdXJjZSksXG4gICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgZ3JlZWR5OiB0cnVlLFxuICAgICAgaW5zaWRlOiB7XG4gICAgICAgICdjb250ZW50Jzoge1xuICAgICAgICAgIHBhdHRlcm46IC8oXi4pW1xcc1xcU10rKD89LiQpLyxcbiAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICAgIGluc2lkZToge30gLy8gc2VlIGJlbG93XG5cbiAgICAgICAgfSxcbiAgICAgICAgJ3B1bmN0dWF0aW9uJzogL1sqX10vXG4gICAgICB9XG4gICAgfSxcbiAgICAnc3RyaWtlJzoge1xuICAgICAgLy8gfn5zdHJpa2UgdGhyb3VnaH5+XG4gICAgICAvLyB+c3RyaWtlflxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlZ2V4cC9zdHJpY3RcbiAgICAgIHBhdHRlcm46IGNyZWF0ZUlubGluZSgvKH5+PykoPzooPyF+KTxpbm5lcj4pK1xcMi8uc291cmNlKSxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBncmVlZHk6IHRydWUsXG4gICAgICBpbnNpZGU6IHtcbiAgICAgICAgJ2NvbnRlbnQnOiB7XG4gICAgICAgICAgcGF0dGVybjogLyhefn4/KVtcXHNcXFNdKyg/PVxcMSQpLyxcbiAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICAgIGluc2lkZToge30gLy8gc2VlIGJlbG93XG5cbiAgICAgICAgfSxcbiAgICAgICAgJ3B1bmN0dWF0aW9uJzogL35+Py9cbiAgICAgIH1cbiAgICB9LFxuICAgICdjb2RlLXNuaXBwZXQnOiB7XG4gICAgICAvLyBgY29kZWBcbiAgICAgIC8vIGBgY29kZWBgXG4gICAgICBwYXR0ZXJuOiAvKF58W15cXFxcYF0pKD86YGBbXmBcXHJcXG5dKyg/OmBbXmBcXHJcXG5dKykqYGAoPyFgKXxgW15gXFxyXFxuXStgKD8hYCkpLyxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBncmVlZHk6IHRydWUsXG4gICAgICBhbGlhczogWydjb2RlJywgJ2tleXdvcmQnXVxuICAgIH0sXG4gICAgJ3VybCc6IHtcbiAgICAgIC8vIFtleGFtcGxlXShodHRwOi8vZXhhbXBsZS5jb20gXCJPcHRpb25hbCB0aXRsZVwiKVxuICAgICAgLy8gW2V4YW1wbGVdW2lkXVxuICAgICAgLy8gW2V4YW1wbGVdIFtpZF1cbiAgICAgIHBhdHRlcm46IGNyZWF0ZUlubGluZSgvIT9cXFsoPzooPyFcXF0pPGlubmVyPikrXFxdKD86XFwoW15cXHMpXSsoPzpbXFx0IF0rXCIoPzpcXFxcLnxbXlwiXFxcXF0pKlwiKT9cXCl8WyBcXHRdP1xcWyg/Oig/IVxcXSk8aW5uZXI+KStcXF0pLy5zb3VyY2UpLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgIGdyZWVkeTogdHJ1ZSxcbiAgICAgIGluc2lkZToge1xuICAgICAgICAnb3BlcmF0b3InOiAvXiEvLFxuICAgICAgICAnY29udGVudCc6IHtcbiAgICAgICAgICBwYXR0ZXJuOiAvKF5cXFspW15cXF1dKyg/PVxcXSkvLFxuICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICAgICAgaW5zaWRlOiB7fSAvLyBzZWUgYmVsb3dcblxuICAgICAgICB9LFxuICAgICAgICAndmFyaWFibGUnOiB7XG4gICAgICAgICAgcGF0dGVybjogLyheXFxdWyBcXHRdP1xcWylbXlxcXV0rKD89XFxdJCkvLFxuICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgJ3VybCc6IHtcbiAgICAgICAgICBwYXR0ZXJuOiAvKF5cXF1cXCgpW15cXHMpXSsvLFxuICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgJ3N0cmluZyc6IHtcbiAgICAgICAgICBwYXR0ZXJuOiAvKF5bIFxcdF0rKVwiKD86XFxcXC58W15cIlxcXFxdKSpcIig/PVxcKSQpLyxcbiAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBbJ3VybCcsICdib2xkJywgJ2l0YWxpYycsICdzdHJpa2UnXS5mb3JFYWNoKGZ1bmN0aW9uICh0b2tlbikge1xuICAgIFsndXJsJywgJ2JvbGQnLCAnaXRhbGljJywgJ3N0cmlrZScsICdjb2RlLXNuaXBwZXQnXS5mb3JFYWNoKGZ1bmN0aW9uIChpbnNpZGUpIHtcbiAgICAgIGlmICh0b2tlbiAhPT0gaW5zaWRlKSB7XG4gICAgICAgIFByaXNtLmxhbmd1YWdlcy5tYXJrZG93blt0b2tlbl0uaW5zaWRlLmNvbnRlbnQuaW5zaWRlW2luc2lkZV0gPSBQcmlzbS5sYW5ndWFnZXMubWFya2Rvd25baW5zaWRlXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIFByaXNtLmhvb2tzLmFkZCgnYWZ0ZXItdG9rZW5pemUnLCBmdW5jdGlvbiAoZW52KSB7XG4gICAgaWYgKGVudi5sYW5ndWFnZSAhPT0gJ21hcmtkb3duJyAmJiBlbnYubGFuZ3VhZ2UgIT09ICdtZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3YWxrVG9rZW5zKHRva2Vucykge1xuICAgICAgaWYgKCF0b2tlbnMgfHwgdHlwZW9mIHRva2VucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRva2Vucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICAgIGlmICh0b2tlbi50eXBlICE9PSAnY29kZScpIHtcbiAgICAgICAgICB3YWxrVG9rZW5zKHRva2VuLmNvbnRlbnQpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8qXG4gICAgICAgICAqIEFkZCB0aGUgY29ycmVjdCBgbGFuZ3VhZ2UteHh4eGAgY2xhc3MgdG8gdGhpcyBjb2RlIGJsb2NrLiBLZWVwIGluIG1pbmQgdGhhdCB0aGUgYGNvZGUtbGFuZ3VhZ2VgIHRva2VuXG4gICAgICAgICAqIGlzIG9wdGlvbmFsLiBCdXQgdGhlIGdyYW1tYXIgaXMgZGVmaW5lZCBzbyB0aGF0IHRoZXJlIGlzIG9ubHkgb25lIGNhc2Ugd2UgaGF2ZSB0byBoYW5kbGU6XG4gICAgICAgICAqXG4gICAgICAgICAqIHRva2VuLmNvbnRlbnQgPSBbXG4gICAgICAgICAqICAgICA8c3BhbiBjbGFzcz1cInB1bmN0dWF0aW9uXCI+YGBgPC9zcGFuPixcbiAgICAgICAgICogICAgIDxzcGFuIGNsYXNzPVwiY29kZS1sYW5ndWFnZVwiPnh4eHg8L3NwYW4+LFxuICAgICAgICAgKiAgICAgJ1xcbicsIC8vIGV4YWN0bHkgb25lIG5ldyBsaW5lcyAoXFxyIG9yIFxcbiBvciBcXHJcXG4pXG4gICAgICAgICAqICAgICA8c3BhbiBjbGFzcz1cImNvZGUtYmxvY2tcIj4uLi48L3NwYW4+LFxuICAgICAgICAgKiAgICAgJ1xcbicsIC8vIGV4YWN0bHkgb25lIG5ldyBsaW5lcyBhZ2FpblxuICAgICAgICAgKiAgICAgPHNwYW4gY2xhc3M9XCJwdW5jdHVhdGlvblwiPmBgYDwvc3Bhbj5cbiAgICAgICAgICogXTtcbiAgICAgICAgICovXG5cblxuICAgICAgICB2YXIgY29kZUxhbmcgPSB0b2tlbi5jb250ZW50WzFdO1xuICAgICAgICB2YXIgY29kZUJsb2NrID0gdG9rZW4uY29udGVudFszXTtcblxuICAgICAgICBpZiAoY29kZUxhbmcgJiYgY29kZUJsb2NrICYmIGNvZGVMYW5nLnR5cGUgPT09ICdjb2RlLWxhbmd1YWdlJyAmJiBjb2RlQmxvY2sudHlwZSA9PT0gJ2NvZGUtYmxvY2snICYmIHR5cGVvZiBjb2RlTGFuZy5jb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIC8vIHRoaXMgbWlnaHQgYmUgYSBsYW5ndWFnZSB0aGF0IFByaXNtIGRvZXMgbm90IHN1cHBvcnRcbiAgICAgICAgICAvLyBkbyBzb21lIHJlcGxhY2VtZW50cyB0byBzdXBwb3J0IEMrKywgQyMsIGFuZCBGI1xuICAgICAgICAgIHZhciBsYW5nID0gY29kZUxhbmcuY29udGVudC5yZXBsYWNlKC9cXGIjL2csICdzaGFycCcpLnJlcGxhY2UoL1xcYlxcK1xcKy9nLCAncHAnKTsgLy8gb25seSB1c2UgdGhlIGZpcnN0IHdvcmRcblxuICAgICAgICAgIGxhbmcgPSAoL1thLXpdW1xcdy1dKi9pLmV4ZWMobGFuZykgfHwgWycnXSlbMF0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICB2YXIgYWxpYXMgPSAnbGFuZ3VhZ2UtJyArIGxhbmc7IC8vIGFkZCBhbGlhc1xuXG4gICAgICAgICAgaWYgKCFjb2RlQmxvY2suYWxpYXMpIHtcbiAgICAgICAgICAgIGNvZGVCbG9jay5hbGlhcyA9IFthbGlhc107XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29kZUJsb2NrLmFsaWFzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29kZUJsb2NrLmFsaWFzID0gW2NvZGVCbG9jay5hbGlhcywgYWxpYXNdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2RlQmxvY2suYWxpYXMucHVzaChhbGlhcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgd2Fsa1Rva2VucyhlbnYudG9rZW5zKTtcbiAgfSk7XG4gIFByaXNtLmhvb2tzLmFkZCgnd3JhcCcsIGZ1bmN0aW9uIChlbnYpIHtcbiAgICBpZiAoZW52LnR5cGUgIT09ICdjb2RlLWJsb2NrJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBjb2RlTGFuZyA9ICcnO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBlbnYuY2xhc3Nlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBjbHMgPSBlbnYuY2xhc3Nlc1tpXTtcbiAgICAgIHZhciBtYXRjaCA9IC9sYW5ndWFnZS0oLispLy5leGVjKGNscyk7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBjb2RlTGFuZyA9IG1hdGNoWzFdO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZ3JhbW1hciA9IFByaXNtLmxhbmd1YWdlc1tjb2RlTGFuZ107XG5cbiAgICBpZiAoIWdyYW1tYXIpIHtcbiAgICAgIGlmIChjb2RlTGFuZyAmJiBjb2RlTGFuZyAhPT0gJ25vbmUnICYmIFByaXNtLnBsdWdpbnMuYXV0b2xvYWRlcikge1xuICAgICAgICB2YXIgaWQgPSAnbWQtJyArIG5ldyBEYXRlKCkudmFsdWVPZigpICsgJy0nICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMWUxNik7XG4gICAgICAgIGVudi5hdHRyaWJ1dGVzWydpZCddID0gaWQ7XG4gICAgICAgIFByaXNtLnBsdWdpbnMuYXV0b2xvYWRlci5sb2FkTGFuZ3VhZ2VzKGNvZGVMYW5nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGVsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICAgICAgICAgIGlmIChlbGUpIHtcbiAgICAgICAgICAgIGVsZS5pbm5lckhUTUwgPSBQcmlzbS5oaWdobGlnaHQoZWxlLnRleHRDb250ZW50LCBQcmlzbS5sYW5ndWFnZXNbY29kZUxhbmddLCBjb2RlTGFuZyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZW52LmNvbnRlbnQgPSBQcmlzbS5oaWdobGlnaHQodGV4dENvbnRlbnQoZW52LmNvbnRlbnQpLCBncmFtbWFyLCBjb2RlTGFuZyk7XG4gICAgfVxuICB9KTtcbiAgdmFyIHRhZ1BhdHRlcm4gPSBSZWdFeHAoUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcucGF0dGVybi5zb3VyY2UsICdnaScpO1xuICAvKipcbiAgICogQSBsaXN0IG9mIGtub3duIGVudGl0eSBuYW1lcy5cbiAgICpcbiAgICogVGhpcyB3aWxsIGFsd2F5cyBiZSBpbmNvbXBsZXRlIHRvIHNhdmUgc3BhY2UuIFRoZSBjdXJyZW50IGxpc3QgaXMgdGhlIG9uZSB1c2VkIGJ5IGxvd2Rhc2gncyB1bmVzY2FwZSBmdW5jdGlvbi5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2xvZGFzaC9sb2Rhc2gvYmxvYi8yZGEwMjRjM2I0Zjk5NDdhNDg1MTc2MzlkZTc1NjA0NTdjZDRlYzZjL3VuZXNjYXBlLmpzI0wyfVxuICAgKi9cblxuICB2YXIgS05PV05fRU5USVRZX05BTUVTID0ge1xuICAgICdhbXAnOiAnJicsXG4gICAgJ2x0JzogJzwnLFxuICAgICdndCc6ICc+JyxcbiAgICAncXVvdCc6ICdcIidcbiAgfTsgLy8gSUUgMTEgZG9lc24ndCBzdXBwb3J0IGBTdHJpbmcuZnJvbUNvZGVQb2ludGBcblxuICB2YXIgZnJvbUNvZGVQb2ludCA9IFN0cmluZy5mcm9tQ29kZVBvaW50IHx8IFN0cmluZy5mcm9tQ2hhckNvZGU7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0ZXh0IGNvbnRlbnQgb2YgYSBnaXZlbiBIVE1MIHNvdXJjZSBjb2RlIHN0cmluZy5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG5cbiAgZnVuY3Rpb24gdGV4dENvbnRlbnQoaHRtbCkge1xuICAgIC8vIHJlbW92ZSBhbGwgdGFnc1xuICAgIHZhciB0ZXh0ID0gaHRtbC5yZXBsYWNlKHRhZ1BhdHRlcm4sICcnKTsgLy8gZGVjb2RlIGtub3duIGVudGl0aWVzXG5cbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8mKFxcd3sxLDh9fCN4P1tcXGRhLWZdezEsOH0pOy9naSwgZnVuY3Rpb24gKG0sIGNvZGUpIHtcbiAgICAgIGNvZGUgPSBjb2RlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIGlmIChjb2RlWzBdID09PSAnIycpIHtcbiAgICAgICAgdmFyIHZhbHVlO1xuXG4gICAgICAgIGlmIChjb2RlWzFdID09PSAneCcpIHtcbiAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KGNvZGUuc2xpY2UoMiksIDE2KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSA9IE51bWJlcihjb2RlLnNsaWNlKDEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmcm9tQ29kZVBvaW50KHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBrbm93biA9IEtOT1dOX0VOVElUWV9OQU1FU1tjb2RlXTtcblxuICAgICAgICBpZiAoa25vd24pIHtcbiAgICAgICAgICByZXR1cm4ga25vd247XG4gICAgICAgIH0gLy8gdW5hYmxlIHRvIGRlY29kZVxuXG5cbiAgICAgICAgcmV0dXJuIG07XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICBQcmlzbS5sYW5ndWFnZXMubWQgPSBQcmlzbS5sYW5ndWFnZXMubWFya2Rvd247XG59KShwcmlzbSk7XG4vKiBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1ncmFwaHFsXCIgKi9cblxuXG5wcmlzbS5sYW5ndWFnZXMuZ3JhcGhxbCA9IHtcbiAgJ2NvbW1lbnQnOiAvIy4qLyxcbiAgJ2Rlc2NyaXB0aW9uJzoge1xuICAgIHBhdHRlcm46IC8oPzpcIlwiXCIoPzpbXlwiXXwoPyFcIlwiXCIpXCIpKlwiXCJcInxcIig/OlxcXFwufFteXFxcXFwiXFxyXFxuXSkqXCIpKD89XFxzKlthLXpfXSkvaSxcbiAgICBncmVlZHk6IHRydWUsXG4gICAgYWxpYXM6ICdzdHJpbmcnLFxuICAgIGluc2lkZToge1xuICAgICAgJ2xhbmd1YWdlLW1hcmtkb3duJzoge1xuICAgICAgICBwYXR0ZXJuOiAvKF5cIig/OlwiXCIpPykoPyFcXDEpW1xcc1xcU10rKD89XFwxJCkvLFxuICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICBpbnNpZGU6IHByaXNtLmxhbmd1YWdlcy5tYXJrZG93blxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgJ3N0cmluZyc6IHtcbiAgICBwYXR0ZXJuOiAvXCJcIlwiKD86W15cIl18KD8hXCJcIlwiKVwiKSpcIlwiXCJ8XCIoPzpcXFxcLnxbXlxcXFxcIlxcclxcbl0pKlwiLyxcbiAgICBncmVlZHk6IHRydWVcbiAgfSxcbiAgJ251bWJlcic6IC8oPzpcXEItfFxcYilcXGQrKD86XFwuXFxkKyk/KD86ZVsrLV0/XFxkKyk/XFxiL2ksXG4gICdib29sZWFuJzogL1xcYig/OmZhbHNlfHRydWUpXFxiLyxcbiAgJ3ZhcmlhYmxlJzogL1xcJFthLXpfXVxcdyovaSxcbiAgJ2RpcmVjdGl2ZSc6IHtcbiAgICBwYXR0ZXJuOiAvQFthLXpfXVxcdyovaSxcbiAgICBhbGlhczogJ2Z1bmN0aW9uJ1xuICB9LFxuICAnYXR0ci1uYW1lJzoge1xuICAgIHBhdHRlcm46IC9cXGJbYS16X11cXHcqKD89XFxzKig/OlxcKCg/OlteKClcIl18XCIoPzpcXFxcLnxbXlxcXFxcIlxcclxcbl0pKlwiKSpcXCkpPzopL2ksXG4gICAgZ3JlZWR5OiB0cnVlXG4gIH0sXG4gICdhdG9tLWlucHV0Jzoge1xuICAgIHBhdHRlcm46IC9cXGJbQS1aXVxcdypJbnB1dFxcYi8sXG4gICAgYWxpYXM6ICdjbGFzcy1uYW1lJ1xuICB9LFxuICAnc2NhbGFyJzogL1xcYig/OkJvb2xlYW58RmxvYXR8SUR8SW50fFN0cmluZylcXGIvLFxuICAnY29uc3RhbnQnOiAvXFxiW0EtWl1bQS1aX1xcZF0qXFxiLyxcbiAgJ2NsYXNzLW5hbWUnOiB7XG4gICAgcGF0dGVybjogLyhcXGIoPzplbnVtfGltcGxlbWVudHN8aW50ZXJmYWNlfG9ufHNjYWxhcnx0eXBlfHVuaW9uKVxccyt8Jlxccyp8Olxccyp8XFxbKVtBLVpfXVxcdyovLFxuICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgfSxcbiAgJ2ZyYWdtZW50Jzoge1xuICAgIHBhdHRlcm46IC8oXFxiZnJhZ21lbnRcXHMrfFxcLnszfVxccyooPyFvblxcYikpW2EtekEtWl9dXFx3Ki8sXG4gICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICBhbGlhczogJ2Z1bmN0aW9uJ1xuICB9LFxuICAnZGVmaW5pdGlvbi1tdXRhdGlvbic6IHtcbiAgICBwYXR0ZXJuOiAvKFxcYm11dGF0aW9uXFxzKylbYS16QS1aX11cXHcqLyxcbiAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgIGFsaWFzOiAnZnVuY3Rpb24nXG4gIH0sXG4gICdkZWZpbml0aW9uLXF1ZXJ5Jzoge1xuICAgIHBhdHRlcm46IC8oXFxicXVlcnlcXHMrKVthLXpBLVpfXVxcdyovLFxuICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgYWxpYXM6ICdmdW5jdGlvbidcbiAgfSxcbiAgJ2tleXdvcmQnOiAvXFxiKD86ZGlyZWN0aXZlfGVudW18ZXh0ZW5kfGZyYWdtZW50fGltcGxlbWVudHN8aW5wdXR8aW50ZXJmYWNlfG11dGF0aW9ufG9ufHF1ZXJ5fHJlcGVhdGFibGV8c2NhbGFyfHNjaGVtYXxzdWJzY3JpcHRpb258dHlwZXx1bmlvbilcXGIvLFxuICAnb3BlcmF0b3InOiAvWyE9fCZdfFxcLnszfS8sXG4gICdwcm9wZXJ0eS1xdWVyeSc6IC9cXHcrKD89XFxzKlxcKCkvLFxuICAnb2JqZWN0JzogL1xcdysoPz1cXHMqXFx7KS8sXG4gICdwdW5jdHVhdGlvbic6IC9bISgpe31cXFtcXF06PSxdLyxcbiAgJ3Byb3BlcnR5JzogL1xcdysvXG59O1xucHJpc20uaG9va3MuYWRkKCdhZnRlci10b2tlbml6ZScsIGZ1bmN0aW9uIGFmdGVyVG9rZW5pemVHcmFwaHFsKGVudikge1xuICBpZiAoZW52Lmxhbmd1YWdlICE9PSAnZ3JhcGhxbCcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLyoqXG4gICAqIGdldCB0aGUgZ3JhcGhxbCB0b2tlbiBzdHJlYW0gdGhhdCB3ZSB3YW50IHRvIGN1c3RvbWl6ZVxuICAgKlxuICAgKiBAdHlwZWRlZiB7SW5zdGFuY2VUeXBlPGltcG9ydChcIi4vcHJpc20tY29yZVwiKVtcIlRva2VuXCJdPn0gVG9rZW5cbiAgICogQHR5cGUge1Rva2VuW119XG4gICAqL1xuXG5cbiAgdmFyIHZhbGlkVG9rZW5zID0gZW52LnRva2Vucy5maWx0ZXIoZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0b2tlbiAhPT0gJ3N0cmluZycgJiYgdG9rZW4udHlwZSAhPT0gJ2NvbW1lbnQnICYmIHRva2VuLnR5cGUgIT09ICdzY2FsYXInO1xuICB9KTtcbiAgdmFyIGN1cnJlbnRJbmRleCA9IDA7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIHRva2VuIHJlbGF0aXZlIHRvIHRoZSBjdXJyZW50IGluZGV4IGhhcyB0aGUgZ2l2ZW4gdHlwZS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFxuICAgKiBAcmV0dXJucyB7VG9rZW4gfCB1bmRlZmluZWR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGdldFRva2VuKG9mZnNldCkge1xuICAgIHJldHVybiB2YWxpZFRva2Vuc1tjdXJyZW50SW5kZXggKyBvZmZzZXRdO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIHRva2VuIHJlbGF0aXZlIHRvIHRoZSBjdXJyZW50IGluZGV4IGhhcyB0aGUgZ2l2ZW4gdHlwZS5cbiAgICpcbiAgICogQHBhcmFtIHtyZWFkb25seSBzdHJpbmdbXX0gdHlwZXNcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvZmZzZXQ9MF1cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gaXNUb2tlblR5cGUodHlwZXMsIG9mZnNldCkge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRva2VuID0gZ2V0VG9rZW4oaSArIG9mZnNldCk7XG5cbiAgICAgIGlmICghdG9rZW4gfHwgdG9rZW4udHlwZSAhPT0gdHlwZXNbaV0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgY2xvc2luZyBicmFja2V0IHRvIGFuIG9wZW5pbmcgYnJhY2tldC5cbiAgICpcbiAgICogSXQgaXMgYXNzdW1lZCB0aGF0IGB0b2tlbltjdXJyZW50SW5kZXggLSAxXWAgaXMgYW4gb3BlbmluZyBicmFja2V0LlxuICAgKlxuICAgKiBJZiBubyBjbG9zaW5nIGJyYWNrZXQgY291bGQgYmUgZm91bmQsIGAtMWAgd2lsbCBiZSByZXR1cm5lZC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWdFeHB9IG9wZW5cbiAgICogQHBhcmFtIHtSZWdFeHB9IGNsb3NlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gZmluZENsb3NpbmdCcmFja2V0KG9wZW4sIGNsb3NlKSB7XG4gICAgdmFyIHN0YWNrSGVpZ2h0ID0gMTtcblxuICAgIGZvciAodmFyIGkgPSBjdXJyZW50SW5kZXg7IGkgPCB2YWxpZFRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRva2VuID0gdmFsaWRUb2tlbnNbaV07XG4gICAgICB2YXIgY29udGVudCA9IHRva2VuLmNvbnRlbnQ7XG5cbiAgICAgIGlmICh0b2tlbi50eXBlID09PSAncHVuY3R1YXRpb24nICYmIHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAob3Blbi50ZXN0KGNvbnRlbnQpKSB7XG4gICAgICAgICAgc3RhY2tIZWlnaHQrKztcbiAgICAgICAgfSBlbHNlIGlmIChjbG9zZS50ZXN0KGNvbnRlbnQpKSB7XG4gICAgICAgICAgc3RhY2tIZWlnaHQtLTtcblxuICAgICAgICAgIGlmIChzdGFja0hlaWdodCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIC8qKlxuICAgKiBBZGRzIGFuIGFsaWFzIHRvIHRoZSBnaXZlbiB0b2tlbi5cbiAgICpcbiAgICogQHBhcmFtIHtUb2tlbn0gdG9rZW5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGFsaWFzXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGFkZEFsaWFzKHRva2VuLCBhbGlhcykge1xuICAgIHZhciBhbGlhc2VzID0gdG9rZW4uYWxpYXM7XG5cbiAgICBpZiAoIWFsaWFzZXMpIHtcbiAgICAgIHRva2VuLmFsaWFzID0gYWxpYXNlcyA9IFtdO1xuICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoYWxpYXNlcykpIHtcbiAgICAgIHRva2VuLmFsaWFzID0gYWxpYXNlcyA9IFthbGlhc2VzXTtcbiAgICB9XG5cbiAgICBhbGlhc2VzLnB1c2goYWxpYXMpO1xuICB9XG5cbiAgZm9yICg7IGN1cnJlbnRJbmRleCA8IHZhbGlkVG9rZW5zLmxlbmd0aDspIHtcbiAgICB2YXIgc3RhcnRUb2tlbiA9IHZhbGlkVG9rZW5zW2N1cnJlbnRJbmRleCsrXTsgLy8gYWRkIHNwZWNpYWwgYWxpYXNlcyBmb3IgbXV0YXRpb24gdG9rZW5zXG5cbiAgICBpZiAoc3RhcnRUb2tlbi50eXBlID09PSAna2V5d29yZCcgJiYgc3RhcnRUb2tlbi5jb250ZW50ID09PSAnbXV0YXRpb24nKSB7XG4gICAgICAvLyBhbnkgYXJyYXkgb2YgdGhlIG5hbWVzIG9mIGFsbCBpbnB1dCB2YXJpYWJsZXMgKGlmIGFueSlcbiAgICAgIHZhciBpbnB1dFZhcmlhYmxlcyA9IFtdO1xuXG4gICAgICBpZiAoaXNUb2tlblR5cGUoWydkZWZpbml0aW9uLW11dGF0aW9uJywgJ3B1bmN0dWF0aW9uJ10pICYmIGdldFRva2VuKDEpLmNvbnRlbnQgPT09ICcoJykge1xuICAgICAgICAvLyBkZWZpbml0aW9uXG4gICAgICAgIGN1cnJlbnRJbmRleCArPSAyOyAvLyBza2lwICdkZWZpbml0aW9uLW11dGF0aW9uJyBhbmQgJ3B1bmN0dWF0aW9uJ1xuXG4gICAgICAgIHZhciBkZWZpbml0aW9uRW5kID0gZmluZENsb3NpbmdCcmFja2V0KC9eXFwoJC8sIC9eXFwpJC8pO1xuXG4gICAgICAgIGlmIChkZWZpbml0aW9uRW5kID09PSAtMSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IC8vIGZpbmQgYWxsIGlucHV0IHZhcmlhYmxlc1xuXG5cbiAgICAgICAgZm9yICg7IGN1cnJlbnRJbmRleCA8IGRlZmluaXRpb25FbmQ7IGN1cnJlbnRJbmRleCsrKSB7XG4gICAgICAgICAgdmFyIHQgPSBnZXRUb2tlbigwKTtcblxuICAgICAgICAgIGlmICh0LnR5cGUgPT09ICd2YXJpYWJsZScpIHtcbiAgICAgICAgICAgIGFkZEFsaWFzKHQsICd2YXJpYWJsZS1pbnB1dCcpO1xuICAgICAgICAgICAgaW5wdXRWYXJpYWJsZXMucHVzaCh0LmNvbnRlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRJbmRleCA9IGRlZmluaXRpb25FbmQgKyAxO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNUb2tlblR5cGUoWydwdW5jdHVhdGlvbicsICdwcm9wZXJ0eS1xdWVyeSddKSAmJiBnZXRUb2tlbigwKS5jb250ZW50ID09PSAneycpIHtcbiAgICAgICAgY3VycmVudEluZGV4Kys7IC8vIHNraXAgb3BlbmluZyBicmFja2V0XG5cbiAgICAgICAgYWRkQWxpYXMoZ2V0VG9rZW4oMCksICdwcm9wZXJ0eS1tdXRhdGlvbicpO1xuXG4gICAgICAgIGlmIChpbnB1dFZhcmlhYmxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdmFyIG11dGF0aW9uRW5kID0gZmluZENsb3NpbmdCcmFja2V0KC9eXFx7JC8sIC9eXFx9JC8pO1xuXG4gICAgICAgICAgaWYgKG11dGF0aW9uRW5kID09PSAtMSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSAvLyBnaXZlIHJlZmVyZW5jZXMgdG8gaW5wdXQgdmFyaWFibGVzIGEgc3BlY2lhbCBhbGlhc1xuXG5cbiAgICAgICAgICBmb3IgKHZhciBpID0gY3VycmVudEluZGV4OyBpIDwgbXV0YXRpb25FbmQ7IGkrKykge1xuICAgICAgICAgICAgdmFyIHZhclRva2VuID0gdmFsaWRUb2tlbnNbaV07XG5cbiAgICAgICAgICAgIGlmICh2YXJUb2tlbi50eXBlID09PSAndmFyaWFibGUnICYmIGlucHV0VmFyaWFibGVzLmluZGV4T2YodmFyVG9rZW4uY29udGVudCkgPj0gMCkge1xuICAgICAgICAgICAgICBhZGRBbGlhcyh2YXJUb2tlbiwgJ3ZhcmlhYmxlLWlucHV0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcbi8qIFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXNxbFwiICovXG5cbnByaXNtLmxhbmd1YWdlcy5zcWwgPSB7XG4gICdjb21tZW50Jzoge1xuICAgIHBhdHRlcm46IC8oXnxbXlxcXFxdKSg/OlxcL1xcKltcXHNcXFNdKj9cXCpcXC98KD86LS18XFwvXFwvfCMpLiopLyxcbiAgICBsb29rYmVoaW5kOiB0cnVlXG4gIH0sXG4gICd2YXJpYWJsZSc6IFt7XG4gICAgcGF0dGVybjogL0AoW1wiJ2BdKSg/OlxcXFxbXFxzXFxTXXwoPyFcXDEpW15cXFxcXSkrXFwxLyxcbiAgICBncmVlZHk6IHRydWVcbiAgfSwgL0BbXFx3LiRdKy9dLFxuICAnc3RyaW5nJzoge1xuICAgIHBhdHRlcm46IC8oXnxbXkBcXFxcXSkoXCJ8JykoPzpcXFxcW1xcc1xcU118KD8hXFwyKVteXFxcXF18XFwyXFwyKSpcXDIvLFxuICAgIGdyZWVkeTogdHJ1ZSxcbiAgICBsb29rYmVoaW5kOiB0cnVlXG4gIH0sXG4gICdpZGVudGlmaWVyJzoge1xuICAgIHBhdHRlcm46IC8oXnxbXkBcXFxcXSlgKD86XFxcXFtcXHNcXFNdfFteYFxcXFxdfGBgKSpgLyxcbiAgICBncmVlZHk6IHRydWUsXG4gICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICBpbnNpZGU6IHtcbiAgICAgICdwdW5jdHVhdGlvbic6IC9eYHxgJC9cbiAgICB9XG4gIH0sXG4gICdmdW5jdGlvbic6IC9cXGIoPzpBVkd8Q09VTlR8RklSU1R8Rk9STUFUfExBU1R8TENBU0V8TEVOfE1BWHxNSUR8TUlOfE1PRHxOT1d8Uk9VTkR8U1VNfFVDQVNFKSg/PVxccypcXCgpL2ksXG4gIC8vIFNob3VsZCB3ZSBoaWdobGlnaHQgdXNlciBkZWZpbmVkIGZ1bmN0aW9ucyB0b28/XG4gICdrZXl3b3JkJzogL1xcYig/OkFDVElPTnxBRER8QUZURVJ8QUxHT1JJVEhNfEFMTHxBTFRFUnxBTkFMWVpFfEFOWXxBUFBMWXxBU3xBU0N8QVVUSE9SSVpBVElPTnxBVVRPX0lOQ1JFTUVOVHxCQUNLVVB8QkRCfEJFR0lOfEJFUktFTEVZREJ8QklHSU5UfEJJTkFSWXxCSVR8QkxPQnxCT09MfEJPT0xFQU58QlJFQUt8QlJPV1NFfEJUUkVFfEJVTEt8Qll8Q0FMTHxDQVNDQURFRD98Q0FTRXxDSEFJTnxDSEFSKD86QUNURVJ8U0VUKT98Q0hFQ0soPzpQT0lOVCk/fENMT1NFfENMVVNURVJFRHxDT0FMRVNDRXxDT0xMQVRFfENPTFVNTlM/fENPTU1FTlR8Q09NTUlUKD86VEVEKT98Q09NUFVURXxDT05ORUNUfENPTlNJU1RFTlR8Q09OU1RSQUlOVHxDT05UQUlOUyg/OlRBQkxFKT98Q09OVElOVUV8Q09OVkVSVHxDUkVBVEV8Q1JPU1N8Q1VSUkVOVCg/Ol9EQVRFfF9USU1FfF9USU1FU1RBTVB8X1VTRVIpP3xDVVJTT1J8Q1lDTEV8REFUQSg/OkJBU0VTPyk/fERBVEUoPzpUSU1FKT98REFZfERCQ0N8REVBTExPQ0FURXxERUN8REVDSU1BTHxERUNMQVJFfERFRkFVTFR8REVGSU5FUnxERUxBWUVEfERFTEVURXxERUxJTUlURVJTP3xERU5ZfERFU0N8REVTQ1JJQkV8REVURVJNSU5JU1RJQ3xESVNBQkxFfERJU0NBUkR8RElTS3xESVNUSU5DVHxESVNUSU5DVFJPV3xESVNUUklCVVRFRHxET3xET1VCTEV8RFJPUHxEVU1NWXxEVU1QKD86RklMRSk/fERVUExJQ0FURXxFTFNFKD86SUYpP3xFTkFCTEV8RU5DTE9TRUR8RU5EfEVOR0lORXxFTlVNfEVSUkxWTHxFUlJPUlN8RVNDQVBFRD98RVhDRVBUfEVYRUMoPzpVVEUpP3xFWElTVFN8RVhJVHxFWFBMQUlOfEVYVEVOREVEfEZFVENIfEZJRUxEU3xGSUxFfEZJTExGQUNUT1J8RklSU1R8RklYRUR8RkxPQVR8Rk9MTE9XSU5HfEZPUig/OiBFQUNIIFJPVyk/fEZPUkNFfEZPUkVJR058RlJFRVRFWFQoPzpUQUJMRSk/fEZST018RlVMTHxGVU5DVElPTnxHRU9NRVRSWSg/OkNPTExFQ1RJT04pP3xHTE9CQUx8R09UT3xHUkFOVHxHUk9VUHxIQU5ETEVSfEhBU0h8SEFWSU5HfEhPTERMT0NLfEhPVVJ8SURFTlRJVFkoPzpDT0x8X0lOU0VSVCk/fElGfElHTk9SRXxJTVBPUlR8SU5ERVh8SU5GSUxFfElOTkVSfElOTk9EQnxJTk9VVHxJTlNFUlR8SU5UfElOVEVHRVJ8SU5URVJTRUNUfElOVEVSVkFMfElOVE98SU5WT0tFUnxJU09MQVRJT058SVRFUkFURXxKT0lOfEtFWVM/fEtJTEx8TEFOR1VBR0V8TEFTVHxMRUFWRXxMRUZUfExFVkVMfExJTUlUfExJTkVOT3xMSU5FU3xMSU5FU1RSSU5HfExPQUR8TE9DQUx8TE9DS3xMT05HKD86QkxPQnxURVhUKXxMT09QfE1BVENIKD86RUQpP3xNRURJVU0oPzpCTE9CfElOVHxURVhUKXxNRVJHRXxNSURETEVJTlR8TUlOVVRFfE1PREV8TU9ESUZJRVN8TU9ESUZZfE1PTlRIfE1VTFRJKD86TElORVNUUklOR3xQT0lOVHxQT0xZR09OKXxOQVRJT05BTHxOQVRVUkFMfE5DSEFSfE5FWFR8Tk98Tk9OQ0xVU1RFUkVEfE5VTExJRnxOVU1FUklDfE9GRj98T0ZGU0VUUz98T058T1BFTig/OkRBVEFTT1VSQ0V8UVVFUll8Uk9XU0VUKT98T1BUSU1JWkV8T1BUSU9OKD86QUxMWSk/fE9SREVSfE9VVCg/OkVSfEZJTEUpP3xPVkVSfFBBUlRJQUx8UEFSVElUSU9OfFBFUkNFTlR8UElWT1R8UExBTnxQT0lOVHxQT0xZR09OfFBSRUNFRElOR3xQUkVDSVNJT058UFJFUEFSRXxQUkVWfFBSSU1BUll8UFJJTlR8UFJJVklMRUdFU3xQUk9DKD86RURVUkUpP3xQVUJMSUN8UFVSR0V8UVVJQ0t8UkFJU0VSUk9SfFJFQURTP3xSRUFMfFJFQ09ORklHVVJFfFJFRkVSRU5DRVN8UkVMRUFTRXxSRU5BTUV8UkVQRUFUKD86QUJMRSk/fFJFUExBQ0V8UkVQTElDQVRJT058UkVRVUlSRXxSRVNJR05BTHxSRVNUT1JFfFJFU1RSSUNUfFJFVFVSTig/OklOR3xTKT98UkVWT0tFfFJJR0hUfFJPTExCQUNLfFJPVVRJTkV8Uk9XKD86Q09VTlR8R1VJRENPTHxTKT98UlRSRUV8UlVMRXxTQVZFKD86UE9JTlQpP3xTQ0hFTUF8U0VDT05EfFNFTEVDVHxTRVJJQUwoPzpJWkFCTEUpP3xTRVNTSU9OKD86X1VTRVIpP3xTRVQoPzpVU0VSKT98U0hBUkV8U0hPV3xTSFVURE9XTnxTSU1QTEV8U01BTExJTlR8U05BUFNIT1R8U09NRXxTT05BTUV8U1FMfFNUQVJUKD86SU5HKT98U1RBVElTVElDU3xTVEFUVVN8U1RSSVBFRHxTWVNURU1fVVNFUnxUQUJMRVM/fFRBQkxFU1BBQ0V8VEVNUCg/Ok9SQVJZfFRBQkxFKT98VEVSTUlOQVRFRHxURVhUKD86U0laRSk/fFRIRU58VElNRSg/OlNUQU1QKT98VElOWSg/OkJMT0J8SU5UfFRFWFQpfFRPUD98VFJBTig/OlNBQ1RJT05TPyk/fFRSSUdHRVJ8VFJVTkNBVEV8VFNFUVVBTHxUWVBFUz98VU5CT1VOREVEfFVOQ09NTUlUVEVEfFVOREVGSU5FRHxVTklPTnxVTklRVUV8VU5MT0NLfFVOUElWT1R8VU5TSUdORUR8VVBEQVRFKD86VEVYVCk/fFVTQUdFfFVTRXxVU0VSfFVTSU5HfFZBTFVFUz98VkFSKD86QklOQVJZfENIQVJ8Q0hBUkFDVEVSfFlJTkcpfFZJRVd8V0FJVEZPUnxXQVJOSU5HU3xXSEVOfFdIRVJFfFdISUxFfFdJVEgoPzogUk9MTFVQfElOKT98V09SS3xXUklURSg/OlRFWFQpP3xZRUFSKVxcYi9pLFxuICAnYm9vbGVhbic6IC9cXGIoPzpGQUxTRXxOVUxMfFRSVUUpXFxiL2ksXG4gICdudW1iZXInOiAvXFxiMHhbXFxkYS1mXStcXGJ8XFxiXFxkKyg/OlxcLlxcZCopP3xcXEJcXC5cXGQrXFxiL2ksXG4gICdvcGVyYXRvcic6IC9bLSsqXFwvPSVefl18JiY/fFxcfFxcfD98IT0/fDwoPzo9Pj98PHw+KT98Pls+PV0/fFxcYig/OkFORHxCRVRXRUVOfERJVnxJTElLRXxJTnxJU3xMSUtFfE5PVHxPUnxSRUdFWFB8UkxJS0V8U09VTkRTIExJS0V8WE9SKVxcYi9pLFxuICAncHVuY3R1YXRpb24nOiAvWztbXFxdKClgLC5dL1xufTtcbi8qIFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWpzLXRlbXBsYXRlc1wiICovXG5cbihmdW5jdGlvbiAoUHJpc20pIHtcbiAgdmFyIHRlbXBsYXRlU3RyaW5nID0gUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRbJ3RlbXBsYXRlLXN0cmluZyddOyAvLyBzZWUgdGhlIHBhdHRlcm4gaW4gcHJpc20tamF2YXNjcmlwdC5qc1xuXG4gIHZhciB0ZW1wbGF0ZUxpdGVyYWxQYXR0ZXJuID0gdGVtcGxhdGVTdHJpbmcucGF0dGVybi5zb3VyY2U7XG4gIHZhciBpbnRlcnBvbGF0aW9uT2JqZWN0ID0gdGVtcGxhdGVTdHJpbmcuaW5zaWRlWydpbnRlcnBvbGF0aW9uJ107XG4gIHZhciBpbnRlcnBvbGF0aW9uUHVuY3R1YXRpb25PYmplY3QgPSBpbnRlcnBvbGF0aW9uT2JqZWN0Lmluc2lkZVsnaW50ZXJwb2xhdGlvbi1wdW5jdHVhdGlvbiddO1xuICB2YXIgaW50ZXJwb2xhdGlvblBhdHRlcm4gPSBpbnRlcnBvbGF0aW9uT2JqZWN0LnBhdHRlcm4uc291cmNlO1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBwYXR0ZXJuIHRvIG1hdGNoIGEgdGVtcGxhdGUgc3RyaW5nIHdpdGggYSBzcGVjaWFsIHRhZy5cbiAgICpcbiAgICogVGhpcyB3aWxsIHJldHVybiBgdW5kZWZpbmVkYCBpZiB0aGVyZSBpcyBubyBncmFtbWFyIHdpdGggdGhlIGdpdmVuIGxhbmd1YWdlIGlkLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgVGhlIGxhbmd1YWdlIGlkIG9mIHRoZSBlbWJlZGRlZCBsYW5ndWFnZS4gRS5nLiBgbWFya2Rvd25gLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSByZWdleCBwYXR0ZXJuIHRvIG1hdGNoIHRoZSB0YWcuXG4gICAqIEByZXR1cm5zIHtvYmplY3QgfCB1bmRlZmluZWR9XG4gICAqIEBleGFtcGxlXG4gICAqIGNyZWF0ZVRlbXBsYXRlKCdjc3MnLCAvXFxiY3NzLy5zb3VyY2UpO1xuICAgKi9cblxuICBmdW5jdGlvbiBjcmVhdGVUZW1wbGF0ZShsYW5ndWFnZSwgdGFnKSB7XG4gICAgaWYgKCFQcmlzbS5sYW5ndWFnZXNbbGFuZ3VhZ2VdKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBwYXR0ZXJuOiBSZWdFeHAoJygoPzonICsgdGFnICsgJylcXFxccyopJyArIHRlbXBsYXRlTGl0ZXJhbFBhdHRlcm4pLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgIGdyZWVkeTogdHJ1ZSxcbiAgICAgIGluc2lkZToge1xuICAgICAgICAndGVtcGxhdGUtcHVuY3R1YXRpb24nOiB7XG4gICAgICAgICAgcGF0dGVybjogL15gfGAkLyxcbiAgICAgICAgICBhbGlhczogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgJ2VtYmVkZGVkLWNvZGUnOiB7XG4gICAgICAgICAgcGF0dGVybjogL1tcXHNcXFNdKy8sXG4gICAgICAgICAgYWxpYXM6IGxhbmd1YWdlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRbJ3RlbXBsYXRlLXN0cmluZyddID0gWy8vIHN0eWxlZC1qc3g6XG4gIC8vICAgY3NzYGEgeyBjb2xvcjogIzI1RjsgfWBcbiAgLy8gc3R5bGVkLWNvbXBvbmVudHM6XG4gIC8vICAgc3R5bGVkLmgxYGNvbG9yOiByZWQ7YFxuICBjcmVhdGVUZW1wbGF0ZSgnY3NzJywgL1xcYig/OnN0eWxlZCg/OlxcKFteKV0qXFwpKT8oPzpcXHMqXFwuXFxzKlxcdysoPzpcXChbXildKlxcKSkqKSp8Y3NzKD86XFxzKlxcLlxccyooPzpnbG9iYWx8cmVzb2x2ZSkpP3xjcmVhdGVHbG9iYWxTdHlsZXxrZXlmcmFtZXMpLy5zb3VyY2UpLCAvLyBodG1sYDxwPjwvcD5gXG4gIC8vIGRpdi5pbm5lckhUTUwgPSBgPHA+PC9wPmBcbiAgY3JlYXRlVGVtcGxhdGUoJ2h0bWwnLCAvXFxiaHRtbHxcXC5cXHMqKD86aW5uZXJ8b3V0ZXIpSFRNTFxccypcXCs/PS8uc291cmNlKSwgLy8gc3ZnYDxwYXRoIGZpbGw9XCIjZmZmXCIgZD1cIk01NS4zNyAuLi5cIi8+YFxuICBjcmVhdGVUZW1wbGF0ZSgnc3ZnJywgL1xcYnN2Zy8uc291cmNlKSwgLy8gbWRgIyBoMWAsIG1hcmtkb3duYCMjIGgyYFxuICBjcmVhdGVUZW1wbGF0ZSgnbWFya2Rvd24nLCAvXFxiKD86bWFya2Rvd258bWQpLy5zb3VyY2UpLCAvLyBncWxgLi4uYCwgZ3JhcGhxbGAuLi5gLCBncmFwaHFsLmV4cGVyaW1lbnRhbGAuLi5gXG4gIGNyZWF0ZVRlbXBsYXRlKCdncmFwaHFsJywgL1xcYig/OmdxbHxncmFwaHFsKD86XFxzKlxcLlxccypleHBlcmltZW50YWwpPykvLnNvdXJjZSksIC8vIHNxbGAuLi5gXG4gIGNyZWF0ZVRlbXBsYXRlKCdzcWwnLCAvXFxic3FsLy5zb3VyY2UpLCAvLyB2YW5pbGxhIHRlbXBsYXRlIHN0cmluZ1xuICB0ZW1wbGF0ZVN0cmluZ10uZmlsdGVyKEJvb2xlYW4pO1xuICAvKipcbiAgICogUmV0dXJucyBhIHNwZWNpZmljIHBsYWNlaG9sZGVyIGxpdGVyYWwgZm9yIHRoZSBnaXZlbiBsYW5ndWFnZS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGNvdW50ZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGdldFBsYWNlaG9sZGVyKGNvdW50ZXIsIGxhbmd1YWdlKSB7XG4gICAgcmV0dXJuICdfX18nICsgbGFuZ3VhZ2UudG9VcHBlckNhc2UoKSArICdfJyArIGNvdW50ZXIgKyAnX19fJztcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdG9rZW5zIG9mIGBQcmlzbS50b2tlbml6ZWAgYnV0IGFsc28gcnVucyB0aGUgYGJlZm9yZS10b2tlbml6ZWAgYW5kIGBhZnRlci10b2tlbml6ZWAgaG9va3MuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlXG4gICAqIEBwYXJhbSB7YW55fSBncmFtbWFyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxuICAgKiBAcmV0dXJucyB7KHN0cmluZ3xUb2tlbilbXX1cbiAgICovXG5cblxuICBmdW5jdGlvbiB0b2tlbml6ZVdpdGhIb29rcyhjb2RlLCBncmFtbWFyLCBsYW5ndWFnZSkge1xuICAgIHZhciBlbnYgPSB7XG4gICAgICBjb2RlOiBjb2RlLFxuICAgICAgZ3JhbW1hcjogZ3JhbW1hcixcbiAgICAgIGxhbmd1YWdlOiBsYW5ndWFnZVxuICAgIH07XG4gICAgUHJpc20uaG9va3MucnVuKCdiZWZvcmUtdG9rZW5pemUnLCBlbnYpO1xuICAgIGVudi50b2tlbnMgPSBQcmlzbS50b2tlbml6ZShlbnYuY29kZSwgZW52LmdyYW1tYXIpO1xuICAgIFByaXNtLmhvb2tzLnJ1bignYWZ0ZXItdG9rZW5pemUnLCBlbnYpO1xuICAgIHJldHVybiBlbnYudG9rZW5zO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0b2tlbiBvZiB0aGUgZ2l2ZW4gSmF2YVNjcmlwdCBpbnRlcnBvbGF0aW9uIGV4cHJlc3Npb24uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uIFRoZSBjb2RlIG9mIHRoZSBleHByZXNzaW9uLiBFLmcuIGBcIiR7NDJ9XCJgXG4gICAqIEByZXR1cm5zIHtUb2tlbn1cbiAgICovXG5cblxuICBmdW5jdGlvbiB0b2tlbml6ZUludGVycG9sYXRpb25FeHByZXNzaW9uKGV4cHJlc3Npb24pIHtcbiAgICB2YXIgdGVtcEdyYW1tYXIgPSB7fTtcbiAgICB0ZW1wR3JhbW1hclsnaW50ZXJwb2xhdGlvbi1wdW5jdHVhdGlvbiddID0gaW50ZXJwb2xhdGlvblB1bmN0dWF0aW9uT2JqZWN0O1xuICAgIC8qKiBAdHlwZSB7QXJyYXl9ICovXG5cbiAgICB2YXIgdG9rZW5zID0gUHJpc20udG9rZW5pemUoZXhwcmVzc2lvbiwgdGVtcEdyYW1tYXIpO1xuXG4gICAgaWYgKHRva2Vucy5sZW5ndGggPT09IDMpIHtcbiAgICAgIC8qKlxuICAgICAgICogVGhlIHRva2VuIGFycmF5IHdpbGwgbG9vayBsaWtlIHRoaXNcbiAgICAgICAqIFtcbiAgICAgICAqICAgICBbXCJpbnRlcnBvbGF0aW9uLXB1bmN0dWF0aW9uXCIsIFwiJHtcIl1cbiAgICAgICAqICAgICBcIi4uLlwiIC8vIEphdmFTY3JpcHQgZXhwcmVzc2lvbiBvZiB0aGUgaW50ZXJwb2xhdGlvblxuICAgICAgICogICAgIFtcImludGVycG9sYXRpb24tcHVuY3R1YXRpb25cIiwgXCJ9XCJdXG4gICAgICAgKiBdXG4gICAgICAgKi9cbiAgICAgIHZhciBhcmdzID0gWzEsIDFdO1xuICAgICAgYXJncy5wdXNoLmFwcGx5KGFyZ3MsIHRva2VuaXplV2l0aEhvb2tzKHRva2Vuc1sxXSwgUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQsICdqYXZhc2NyaXB0JykpO1xuICAgICAgdG9rZW5zLnNwbGljZS5hcHBseSh0b2tlbnMsIGFyZ3MpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJpc20uVG9rZW4oJ2ludGVycG9sYXRpb24nLCB0b2tlbnMsIGludGVycG9sYXRpb25PYmplY3QuYWxpYXMsIGV4cHJlc3Npb24pO1xuICB9XG4gIC8qKlxuICAgKiBUb2tlbml6ZXMgdGhlIGdpdmVuIGNvZGUgd2l0aCBzdXBwb3J0IGZvciBKYXZhU2NyaXB0IGludGVycG9sYXRpb24gZXhwcmVzc2lvbnMgbWl4ZWQgaW4uXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gaGFzIDMgcGhhc2VzOlxuICAgKlxuICAgKiAxLiBSZXBsYWNlIGFsbCBKYXZhU2NyaXB0IGludGVycG9sYXRpb24gZXhwcmVzc2lvbiB3aXRoIGEgcGxhY2Vob2xkZXIuXG4gICAqICAgIFRoZSBwbGFjZWhvbGRlciB3aWxsIGhhdmUgdGhlIHN5bnRheCBvZiBhIGlkZW50aWZ5IG9mIHRoZSB0YXJnZXQgbGFuZ3VhZ2UuXG4gICAqIDIuIFRva2VuaXplIHRoZSBjb2RlIHdpdGggcGxhY2Vob2xkZXJzLlxuICAgKiAzLiBUb2tlbml6ZSB0aGUgaW50ZXJwb2xhdGlvbiBleHByZXNzaW9ucyBhbmQgcmUtaW5zZXJ0IHRoZW0gaW50byB0aGUgdG9rZW5pemUgY29kZS5cbiAgICogICAgVGhlIGluc2VydGlvbiBvbmx5IHdvcmtzIGlmIGEgcGxhY2Vob2xkZXIgaGFzbid0IGJlZW4gXCJyaXBwZWQgYXBhcnRcIiBtZWFuaW5nIHRoYXQgdGhlIHBsYWNlaG9sZGVyIGhhcyBiZWVuXG4gICAqICAgIHRva2VuaXplZCBhcyB0d28gdG9rZW5zIGJ5IHRoZSBncmFtbWFyIG9mIHRoZSBlbWJlZGRlZCBsYW5ndWFnZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvZGVcbiAgICogQHBhcmFtIHtvYmplY3R9IGdyYW1tYXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlXG4gICAqIEByZXR1cm5zIHtUb2tlbn1cbiAgICovXG5cblxuICBmdW5jdGlvbiB0b2tlbml6ZUVtYmVkZGVkKGNvZGUsIGdyYW1tYXIsIGxhbmd1YWdlKSB7XG4gICAgLy8gMS4gRmlyc3QgZmlsdGVyIG91dCBhbGwgaW50ZXJwb2xhdGlvbnNcbiAgICAvLyBiZWNhdXNlIHRoZXkgbWlnaHQgYmUgZXNjYXBlZCwgd2UgbmVlZCBhIGxvb2tiZWhpbmQsIHNvIHdlIHVzZSBQcmlzbVxuXG4gICAgLyoqIEB0eXBlIHsoVG9rZW58c3RyaW5nKVtdfSAqL1xuICAgIHZhciBfdG9rZW5zID0gUHJpc20udG9rZW5pemUoY29kZSwge1xuICAgICAgJ2ludGVycG9sYXRpb24nOiB7XG4gICAgICAgIHBhdHRlcm46IFJlZ0V4cChpbnRlcnBvbGF0aW9uUGF0dGVybiksXG4gICAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICAgIH1cbiAgICB9KTsgLy8gcmVwbGFjZSBhbGwgaW50ZXJwb2xhdGlvbnMgd2l0aCBhIHBsYWNlaG9sZGVyIHdoaWNoIGlzIG5vdCBpbiB0aGUgY29kZSBhbHJlYWR5XG5cblxuICAgIHZhciBwbGFjZWhvbGRlckNvdW50ZXIgPSAwO1xuICAgIC8qKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn0gKi9cblxuICAgIHZhciBwbGFjZWhvbGRlck1hcCA9IHt9O1xuXG4gICAgdmFyIGVtYmVkZGVkQ29kZSA9IF90b2tlbnMubWFwKGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGludGVycG9sYXRpb25FeHByZXNzaW9uID0gdG9rZW4uY29udGVudDtcbiAgICAgICAgdmFyIHBsYWNlaG9sZGVyO1xuXG4gICAgICAgIHdoaWxlIChjb2RlLmluZGV4T2YocGxhY2Vob2xkZXIgPSBnZXRQbGFjZWhvbGRlcihwbGFjZWhvbGRlckNvdW50ZXIrKywgbGFuZ3VhZ2UpKSAhPT0gLTEpIHtcbiAgICAgICAgICAvKiBub29wICovXG4gICAgICAgIH1cblxuICAgICAgICBwbGFjZWhvbGRlck1hcFtwbGFjZWhvbGRlcl0gPSBpbnRlcnBvbGF0aW9uRXhwcmVzc2lvbjtcbiAgICAgICAgcmV0dXJuIHBsYWNlaG9sZGVyO1xuICAgICAgfVxuICAgIH0pLmpvaW4oJycpOyAvLyAyLiBUb2tlbml6ZSB0aGUgZW1iZWRkZWQgY29kZVxuXG5cbiAgICB2YXIgZW1iZWRkZWRUb2tlbnMgPSB0b2tlbml6ZVdpdGhIb29rcyhlbWJlZGRlZENvZGUsIGdyYW1tYXIsIGxhbmd1YWdlKTsgLy8gMy4gUmUtaW5zZXJ0IHRoZSBpbnRlcnBvbGF0aW9uXG5cbiAgICB2YXIgcGxhY2Vob2xkZXJzID0gT2JqZWN0LmtleXMocGxhY2Vob2xkZXJNYXApO1xuICAgIHBsYWNlaG9sZGVyQ291bnRlciA9IDA7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyhUb2tlbnxzdHJpbmcpW119IHRva2Vuc1xuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gd2Fsa1Rva2Vucyh0b2tlbnMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwbGFjZWhvbGRlckNvdW50ZXIgPj0gcGxhY2Vob2xkZXJzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdG9rZW4uY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcnNbcGxhY2Vob2xkZXJDb3VudGVyXTtcbiAgICAgICAgICB2YXIgcyA9IHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycgPyB0b2tlbiA6XG4gICAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgICAgdG9rZW4uY29udGVudDtcbiAgICAgICAgICB2YXIgaW5kZXggPSBzLmluZGV4T2YocGxhY2Vob2xkZXIpO1xuXG4gICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgKytwbGFjZWhvbGRlckNvdW50ZXI7XG4gICAgICAgICAgICB2YXIgYmVmb3JlID0gcy5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICAgICAgICAgICAgdmFyIG1pZGRsZSA9IHRva2VuaXplSW50ZXJwb2xhdGlvbkV4cHJlc3Npb24ocGxhY2Vob2xkZXJNYXBbcGxhY2Vob2xkZXJdKTtcbiAgICAgICAgICAgIHZhciBhZnRlciA9IHMuc3Vic3RyaW5nKGluZGV4ICsgcGxhY2Vob2xkZXIubGVuZ3RoKTtcbiAgICAgICAgICAgIHZhciByZXBsYWNlbWVudCA9IFtdO1xuXG4gICAgICAgICAgICBpZiAoYmVmb3JlKSB7XG4gICAgICAgICAgICAgIHJlcGxhY2VtZW50LnB1c2goYmVmb3JlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVwbGFjZW1lbnQucHVzaChtaWRkbGUpO1xuXG4gICAgICAgICAgICBpZiAoYWZ0ZXIpIHtcbiAgICAgICAgICAgICAgdmFyIGFmdGVyVG9rZW5zID0gW2FmdGVyXTtcbiAgICAgICAgICAgICAgd2Fsa1Rva2VucyhhZnRlclRva2Vucyk7XG4gICAgICAgICAgICAgIHJlcGxhY2VtZW50LnB1c2guYXBwbHkocmVwbGFjZW1lbnQsIGFmdGVyVG9rZW5zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgdG9rZW5zLnNwbGljZS5hcHBseSh0b2tlbnMsIFtpLCAxXS5jb25jYXQocmVwbGFjZW1lbnQpKTtcbiAgICAgICAgICAgICAgaSArPSByZXBsYWNlbWVudC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdG9rZW4uY29udGVudCA9IHJlcGxhY2VtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgY29udGVudCA9IHRva2VuLmNvbnRlbnQ7XG5cbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb250ZW50KSkge1xuICAgICAgICAgICAgd2Fsa1Rva2Vucyhjb250ZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2Fsa1Rva2VucyhbY29udGVudF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHdhbGtUb2tlbnMoZW1iZWRkZWRUb2tlbnMpO1xuICAgIHJldHVybiBuZXcgUHJpc20uVG9rZW4obGFuZ3VhZ2UsIGVtYmVkZGVkVG9rZW5zLCAnbGFuZ3VhZ2UtJyArIGxhbmd1YWdlLCBjb2RlKTtcbiAgfVxuICAvKipcbiAgICogVGhlIGxhbmd1YWdlcyBmb3Igd2hpY2ggSlMgdGVtcGxhdGluZyB3aWxsIGhhbmRsZSB0YWdnZWQgdGVtcGxhdGUgbGl0ZXJhbHMuXG4gICAqXG4gICAqIEpTIHRlbXBsYXRpbmcgaXNuJ3QgYWN0aXZlIGZvciBvbmx5IEphdmFTY3JpcHQgYnV0IGFsc28gcmVsYXRlZCBsYW5ndWFnZXMgbGlrZSBUeXBlU2NyaXB0LCBKU1gsIGFuZCBUU1guXG4gICAqL1xuXG5cbiAgdmFyIHN1cHBvcnRlZExhbmd1YWdlcyA9IHtcbiAgICAnamF2YXNjcmlwdCc6IHRydWUsXG4gICAgJ2pzJzogdHJ1ZSxcbiAgICAndHlwZXNjcmlwdCc6IHRydWUsXG4gICAgJ3RzJzogdHJ1ZSxcbiAgICAnanN4JzogdHJ1ZSxcbiAgICAndHN4JzogdHJ1ZVxuICB9O1xuICBQcmlzbS5ob29rcy5hZGQoJ2FmdGVyLXRva2VuaXplJywgZnVuY3Rpb24gKGVudikge1xuICAgIGlmICghKGVudi5sYW5ndWFnZSBpbiBzdXBwb3J0ZWRMYW5ndWFnZXMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbmRzIGFuZCB0b2tlbml6ZXMgYWxsIHRlbXBsYXRlIHN0cmluZ3Mgd2l0aCBhbiBlbWJlZGRlZCBsYW5ndWFnZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyhUb2tlbiB8IHN0cmluZylbXX0gdG9rZW5zXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG5cblxuICAgIGZ1bmN0aW9uIGZpbmRUZW1wbGF0ZVN0cmluZ3ModG9rZW5zKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRva2Vucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY29udGVudCA9IHRva2VuLmNvbnRlbnQ7XG5cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbnRlbnQpKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZmluZFRlbXBsYXRlU3RyaW5ncyhbY29udGVudF0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09ICd0ZW1wbGF0ZS1zdHJpbmcnKSB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQSBKYXZhU2NyaXB0IHRlbXBsYXRlLXN0cmluZyB0b2tlbiB3aWxsIGxvb2sgbGlrZSB0aGlzOlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogW1widGVtcGxhdGUtc3RyaW5nXCIsIFtcbiAgICAgICAgICAgKiAgICAgW1widGVtcGxhdGUtcHVuY3R1YXRpb25cIiwgXCJgXCJdLFxuICAgICAgICAgICAqICAgICAoXG4gICAgICAgICAgICogICAgICAgICBBbiBhcnJheSBvZiBcInN0cmluZ1wiIGFuZCBcImludGVycG9sYXRpb25cIiB0b2tlbnMuIFRoaXMgaXMgdGhlIHNpbXBsZSBzdHJpbmcgY2FzZS5cbiAgICAgICAgICAgKiAgICAgICAgIG9yXG4gICAgICAgICAgICogICAgICAgICBbXCJlbWJlZGRlZC1jb2RlXCIsIFwiLi4uXCJdIFRoaXMgaXMgdGhlIHRva2VuIGNvbnRhaW5pbmcgdGhlIGVtYmVkZGVkIGNvZGUuXG4gICAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXQgYWxzbyBoYXMgYW4gYWxpYXMgd2hpY2ggaXMgdGhlIGxhbmd1YWdlIG9mIHRoZSBlbWJlZGRlZCBjb2RlLlxuICAgICAgICAgICAqICAgICApLFxuICAgICAgICAgICAqICAgICBbXCJ0ZW1wbGF0ZS1wdW5jdHVhdGlvblwiLCBcImBcIl1cbiAgICAgICAgICAgKiBdXVxuICAgICAgICAgICAqL1xuICAgICAgICAgIHZhciBlbWJlZGRlZCA9IGNvbnRlbnRbMV07XG5cbiAgICAgICAgICBpZiAoY29udGVudC5sZW5ndGggPT09IDMgJiYgdHlwZW9mIGVtYmVkZGVkICE9PSAnc3RyaW5nJyAmJiBlbWJlZGRlZC50eXBlID09PSAnZW1iZWRkZWQtY29kZScpIHtcbiAgICAgICAgICAgIC8vIGdldCBzdHJpbmcgY29udGVudFxuICAgICAgICAgICAgdmFyIGNvZGUgPSBzdHJpbmdDb250ZW50KGVtYmVkZGVkKTtcbiAgICAgICAgICAgIHZhciBhbGlhcyA9IGVtYmVkZGVkLmFsaWFzO1xuICAgICAgICAgICAgdmFyIGxhbmd1YWdlID0gQXJyYXkuaXNBcnJheShhbGlhcykgPyBhbGlhc1swXSA6IGFsaWFzO1xuICAgICAgICAgICAgdmFyIGdyYW1tYXIgPSBQcmlzbS5sYW5ndWFnZXNbbGFuZ3VhZ2VdO1xuXG4gICAgICAgICAgICBpZiAoIWdyYW1tYXIpIHtcbiAgICAgICAgICAgICAgLy8gdGhlIGVtYmVkZGVkIGxhbmd1YWdlIGlzbid0IHJlZ2lzdGVyZWQuXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250ZW50WzFdID0gdG9rZW5pemVFbWJlZGRlZChjb2RlLCBncmFtbWFyLCBsYW5ndWFnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZpbmRUZW1wbGF0ZVN0cmluZ3MoY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kVGVtcGxhdGVTdHJpbmdzKGVudi50b2tlbnMpO1xuICB9KTtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHN0cmluZyBjb250ZW50IG9mIGEgdG9rZW4gb3IgdG9rZW4gc3RyZWFtLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZyB8IFRva2VuIHwgKHN0cmluZyB8IFRva2VuKVtdfSB2YWx1ZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cblxuICBmdW5jdGlvbiBzdHJpbmdDb250ZW50KHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUubWFwKHN0cmluZ0NvbnRlbnQpLmpvaW4oJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3RyaW5nQ29udGVudCh2YWx1ZS5jb250ZW50KTtcbiAgICB9XG4gIH1cbn0pKHByaXNtKTtcbi8qIFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXR5cGVzY3JpcHRcIiAqL1xuXG5cbihmdW5jdGlvbiAoUHJpc20pIHtcbiAgUHJpc20ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdqYXZhc2NyaXB0Jywge1xuICAgICdjbGFzcy1uYW1lJzoge1xuICAgICAgcGF0dGVybjogLyhcXGIoPzpjbGFzc3xleHRlbmRzfGltcGxlbWVudHN8aW5zdGFuY2VvZnxpbnRlcmZhY2V8bmV3fHR5cGUpXFxzKykoPyFrZXlvZlxcYikoPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKD86XFxzKjwoPzpbXjw+XXw8KD86W148Pl18PFtePD5dKj4pKj4pKj4pPy8sXG4gICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgZ3JlZWR5OiB0cnVlLFxuICAgICAgaW5zaWRlOiBudWxsIC8vIHNlZSBiZWxvd1xuXG4gICAgfSxcbiAgICAnYnVpbHRpbic6IC9cXGIoPzpBcnJheXxGdW5jdGlvbnxQcm9taXNlfGFueXxib29sZWFufGNvbnNvbGV8bmV2ZXJ8bnVtYmVyfHN0cmluZ3xzeW1ib2x8dW5rbm93bilcXGIvXG4gIH0pOyAvLyBUaGUga2V5d29yZHMgVHlwZVNjcmlwdCBhZGRzIHRvIEphdmFTY3JpcHRcblxuICBQcmlzbS5sYW5ndWFnZXMudHlwZXNjcmlwdC5rZXl3b3JkLnB1c2goL1xcYig/OmFic3RyYWN0fGRlY2xhcmV8aXN8a2V5b2Z8cmVhZG9ubHl8cmVxdWlyZSlcXGIvLCAvLyBrZXl3b3JkcyB0aGF0IGhhdmUgdG8gYmUgZm9sbG93ZWQgYnkgYW4gaWRlbnRpZmllclxuICAvXFxiKD86YXNzZXJ0c3xpbmZlcnxpbnRlcmZhY2V8bW9kdWxlfG5hbWVzcGFjZXx0eXBlKVxcYig/PVxccyooPzpbe18kYS16QS1aXFx4QTAtXFx1RkZGRl18JCkpLywgLy8gVGhpcyBpcyBmb3IgYGltcG9ydCB0eXBlICosIHt9YFxuICAvXFxidHlwZVxcYig/PVxccyooPzpbXFx7Kl18JCkpLyk7IC8vIGRvZXNuJ3Qgd29yayB3aXRoIFRTIGJlY2F1c2UgVFMgaXMgdG9vIGNvbXBsZXhcblxuICBkZWxldGUgUHJpc20ubGFuZ3VhZ2VzLnR5cGVzY3JpcHRbJ3BhcmFtZXRlciddO1xuICBkZWxldGUgUHJpc20ubGFuZ3VhZ2VzLnR5cGVzY3JpcHRbJ2xpdGVyYWwtcHJvcGVydHknXTsgLy8gYSB2ZXJzaW9uIG9mIHR5cGVzY3JpcHQgc3BlY2lmaWNhbGx5IGZvciBoaWdobGlnaHRpbmcgdHlwZXNcblxuICB2YXIgdHlwZUluc2lkZSA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ3R5cGVzY3JpcHQnLCB7fSk7XG4gIGRlbGV0ZSB0eXBlSW5zaWRlWydjbGFzcy1uYW1lJ107XG4gIFByaXNtLmxhbmd1YWdlcy50eXBlc2NyaXB0WydjbGFzcy1uYW1lJ10uaW5zaWRlID0gdHlwZUluc2lkZTtcbiAgUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgndHlwZXNjcmlwdCcsICdmdW5jdGlvbicsIHtcbiAgICAnZGVjb3JhdG9yJzoge1xuICAgICAgcGF0dGVybjogL0BbJFxcd1xceEEwLVxcdUZGRkZdKy8sXG4gICAgICBpbnNpZGU6IHtcbiAgICAgICAgJ2F0Jzoge1xuICAgICAgICAgIHBhdHRlcm46IC9eQC8sXG4gICAgICAgICAgYWxpYXM6ICdvcGVyYXRvcidcbiAgICAgICAgfSxcbiAgICAgICAgJ2Z1bmN0aW9uJzogL15bXFxzXFxTXSsvXG4gICAgICB9XG4gICAgfSxcbiAgICAnZ2VuZXJpYy1mdW5jdGlvbic6IHtcbiAgICAgIC8vIGUuZy4gZm9vPFQgZXh0ZW5kcyBcImJhclwiIHwgXCJiYXpcIj4oIC4uLlxuICAgICAgcGF0dGVybjogLyM/KD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKlxccyo8KD86W148Pl18PCg/OltePD5dfDxbXjw+XSo+KSo+KSo+KD89XFxzKlxcKCkvLFxuICAgICAgZ3JlZWR5OiB0cnVlLFxuICAgICAgaW5zaWRlOiB7XG4gICAgICAgICdmdW5jdGlvbic6IC9eIz8oPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqLyxcbiAgICAgICAgJ2dlbmVyaWMnOiB7XG4gICAgICAgICAgcGF0dGVybjogLzxbXFxzXFxTXSsvLFxuICAgICAgICAgIC8vIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IDxcbiAgICAgICAgICBhbGlhczogJ2NsYXNzLW5hbWUnLFxuICAgICAgICAgIGluc2lkZTogdHlwZUluc2lkZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgUHJpc20ubGFuZ3VhZ2VzLnRzID0gUHJpc20ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQ7XG59KShwcmlzbSk7XG4vKiBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qcy1leHRyYXNcIiAqL1xuXG5cbihmdW5jdGlvbiAoUHJpc20pIHtcbiAgUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnamF2YXNjcmlwdCcsICdmdW5jdGlvbi12YXJpYWJsZScsIHtcbiAgICAnbWV0aG9kLXZhcmlhYmxlJzoge1xuICAgICAgcGF0dGVybjogUmVnRXhwKCcoXFxcXC5cXFxccyopJyArIFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0WydmdW5jdGlvbi12YXJpYWJsZSddLnBhdHRlcm4uc291cmNlKSxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBhbGlhczogWydmdW5jdGlvbi12YXJpYWJsZScsICdtZXRob2QnLCAnZnVuY3Rpb24nLCAncHJvcGVydHktYWNjZXNzJ11cbiAgICB9XG4gIH0pO1xuICBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdqYXZhc2NyaXB0JywgJ2Z1bmN0aW9uJywge1xuICAgICdtZXRob2QnOiB7XG4gICAgICBwYXR0ZXJuOiBSZWdFeHAoJyhcXFxcLlxcXFxzKiknICsgUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRbJ2Z1bmN0aW9uJ10uc291cmNlKSxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBhbGlhczogWydmdW5jdGlvbicsICdwcm9wZXJ0eS1hY2Nlc3MnXVxuICAgIH1cbiAgfSk7XG4gIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2phdmFzY3JpcHQnLCAnY29uc3RhbnQnLCB7XG4gICAgJ2tub3duLWNsYXNzLW5hbWUnOiBbe1xuICAgICAgLy8gc3RhbmRhcmQgYnVpbHQtaW5zXG4gICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0c1xuICAgICAgcGF0dGVybjogL1xcYig/Oig/OkZsb2F0KD86MzJ8NjQpfCg/OkludHxVaW50KSg/Ojh8MTZ8MzIpfFVpbnQ4Q2xhbXBlZCk/QXJyYXl8QXJyYXlCdWZmZXJ8QmlnSW50fEJvb2xlYW58RGF0YVZpZXd8RGF0ZXxFcnJvcnxGdW5jdGlvbnxJbnRsfEpTT058KD86V2Vhayk/KD86TWFwfFNldCl8TWF0aHxOdW1iZXJ8T2JqZWN0fFByb21pc2V8UHJveHl8UmVmbGVjdHxSZWdFeHB8U3RyaW5nfFN5bWJvbHxXZWJBc3NlbWJseSlcXGIvLFxuICAgICAgYWxpYXM6ICdjbGFzcy1uYW1lJ1xuICAgIH0sIHtcbiAgICAgIC8vIGVycm9yc1xuICAgICAgcGF0dGVybjogL1xcYig/OltBLVpdXFx3KilFcnJvclxcYi8sXG4gICAgICBhbGlhczogJ2NsYXNzLW5hbWUnXG4gICAgfV1cbiAgfSk7XG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgYDxJRD5gIHBsYWNlaG9sZGVyIGluIHRoZSBnaXZlbiBwYXR0ZXJuIHdpdGggYSBwYXR0ZXJuIGZvciBnZW5lcmFsIEpTIGlkZW50aWZpZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc291cmNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZmxhZ3NdXG4gICAqIEByZXR1cm5zIHtSZWdFeHB9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHdpdGhJZChzb3VyY2UsIGZsYWdzKSB7XG4gICAgcmV0dXJuIFJlZ0V4cChzb3VyY2UucmVwbGFjZSgvPElEPi9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gLyg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSovLnNvdXJjZTtcbiAgICB9KSwgZmxhZ3MpO1xuICB9XG5cbiAgUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnamF2YXNjcmlwdCcsICdrZXl3b3JkJywge1xuICAgICdpbXBvcnRzJzoge1xuICAgICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pbXBvcnRzXG4gICAgICBwYXR0ZXJuOiB3aXRoSWQoLyhcXGJpbXBvcnRcXGJcXHMqKSg/OjxJRD4oPzpcXHMqLFxccyooPzpcXCpcXHMqYXNcXHMrPElEPnxcXHtbXnt9XSpcXH0pKT98XFwqXFxzKmFzXFxzKzxJRD58XFx7W157fV0qXFx9KSg/PVxccypcXGJmcm9tXFxiKS8uc291cmNlKSxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG4gICAgfSxcbiAgICAnZXhwb3J0cyc6IHtcbiAgICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZXhwb3J0c1xuICAgICAgcGF0dGVybjogd2l0aElkKC8oXFxiZXhwb3J0XFxiXFxzKikoPzpcXCooPzpcXHMqYXNcXHMrPElEPik/KD89XFxzKlxcYmZyb21cXGIpfFxce1tee31dKlxcfSkvLnNvdXJjZSksXG4gICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgaW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuICAgIH1cbiAgfSk7XG4gIFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0WydrZXl3b3JkJ10udW5zaGlmdCh7XG4gICAgcGF0dGVybjogL1xcYig/OmFzfGRlZmF1bHR8ZXhwb3J0fGZyb218aW1wb3J0KVxcYi8sXG4gICAgYWxpYXM6ICdtb2R1bGUnXG4gIH0sIHtcbiAgICBwYXR0ZXJuOiAvXFxiKD86YXdhaXR8YnJlYWt8Y2F0Y2h8Y29udGludWV8ZG98ZWxzZXxmaW5hbGx5fGZvcnxpZnxyZXR1cm58c3dpdGNofHRocm93fHRyeXx3aGlsZXx5aWVsZClcXGIvLFxuICAgIGFsaWFzOiAnY29udHJvbC1mbG93J1xuICB9LCB7XG4gICAgcGF0dGVybjogL1xcYm51bGxcXGIvLFxuICAgIGFsaWFzOiBbJ251bGwnLCAnbmlsJ11cbiAgfSwge1xuICAgIHBhdHRlcm46IC9cXGJ1bmRlZmluZWRcXGIvLFxuICAgIGFsaWFzOiAnbmlsJ1xuICB9KTtcbiAgUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnamF2YXNjcmlwdCcsICdvcGVyYXRvcicsIHtcbiAgICAnc3ByZWFkJzoge1xuICAgICAgcGF0dGVybjogL1xcLnszfS8sXG4gICAgICBhbGlhczogJ29wZXJhdG9yJ1xuICAgIH0sXG4gICAgJ2Fycm93Jzoge1xuICAgICAgcGF0dGVybjogLz0+LyxcbiAgICAgIGFsaWFzOiAnb3BlcmF0b3InXG4gICAgfVxuICB9KTtcbiAgUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnamF2YXNjcmlwdCcsICdwdW5jdHVhdGlvbicsIHtcbiAgICAncHJvcGVydHktYWNjZXNzJzoge1xuICAgICAgcGF0dGVybjogd2l0aElkKC8oXFwuXFxzKikjPzxJRD4vLnNvdXJjZSksXG4gICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgfSxcbiAgICAnbWF5YmUtY2xhc3MtbmFtZSc6IHtcbiAgICAgIHBhdHRlcm46IC8oXnxbXiRcXHdcXHhBMC1cXHVGRkZGXSlbQS1aXVskXFx3XFx4QTAtXFx1RkZGRl0rLyxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICB9LFxuICAgICdkb20nOiB7XG4gICAgICAvLyB0aGlzIGNvbnRhaW5zIG9ubHkgYSBmZXcgY29tbW9ubHkgdXNlZCBET00gdmFyaWFibGVzXG4gICAgICBwYXR0ZXJuOiAvXFxiKD86ZG9jdW1lbnR8KD86bG9jYWx8c2Vzc2lvbilTdG9yYWdlfGxvY2F0aW9ufG5hdmlnYXRvcnxwZXJmb3JtYW5jZXx3aW5kb3cpXFxiLyxcbiAgICAgIGFsaWFzOiAndmFyaWFibGUnXG4gICAgfSxcbiAgICAnY29uc29sZSc6IHtcbiAgICAgIHBhdHRlcm46IC9cXGJjb25zb2xlKD89XFxzKlxcLikvLFxuICAgICAgYWxpYXM6ICdjbGFzcy1uYW1lJ1xuICAgIH1cbiAgfSk7IC8vIGFkZCAnbWF5YmUtY2xhc3MtbmFtZScgdG8gdG9rZW5zIHdoaWNoIG1pZ2h0IGJlIGEgY2xhc3MgbmFtZVxuXG4gIHZhciBtYXliZUNsYXNzTmFtZVRva2VucyA9IFsnZnVuY3Rpb24nLCAnZnVuY3Rpb24tdmFyaWFibGUnLCAnbWV0aG9kJywgJ21ldGhvZC12YXJpYWJsZScsICdwcm9wZXJ0eS1hY2Nlc3MnXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG1heWJlQ2xhc3NOYW1lVG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRva2VuID0gbWF5YmVDbGFzc05hbWVUb2tlbnNbaV07XG4gICAgdmFyIHZhbHVlID0gUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRbdG9rZW5dOyAvLyBjb252ZXJ0IHJlZ2V4IHRvIG9iamVjdFxuXG4gICAgaWYgKFByaXNtLnV0aWwudHlwZSh2YWx1ZSkgPT09ICdSZWdFeHAnKSB7XG4gICAgICB2YWx1ZSA9IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0W3Rva2VuXSA9IHtcbiAgICAgICAgcGF0dGVybjogdmFsdWVcbiAgICAgIH07XG4gICAgfSAvLyBrZWVwIGluIG1pbmQgdGhhdCB3ZSBkb24ndCBzdXBwb3J0IGFycmF5c1xuXG5cbiAgICB2YXIgaW5zaWRlID0gdmFsdWUuaW5zaWRlIHx8IHt9O1xuICAgIHZhbHVlLmluc2lkZSA9IGluc2lkZTtcbiAgICBpbnNpZGVbJ21heWJlLWNsYXNzLW5hbWUnXSA9IC9eW0EtWl1bXFxzXFxTXSovO1xuICB9XG59KShwcmlzbSk7XG4vKiBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qc3hcIiAqL1xuXG5cbihmdW5jdGlvbiAoUHJpc20pIHtcbiAgdmFyIGphdmFzY3JpcHQgPSBQcmlzbS51dGlsLmNsb25lKFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0KTtcbiAgdmFyIHNwYWNlID0gLyg/Olxcc3xcXC9cXC8uKig/IS4pfFxcL1xcKig/OlteKl18XFwqKD8hXFwvKSlcXCpcXC8pLy5zb3VyY2U7XG4gIHZhciBicmFjZXMgPSAvKD86XFx7KD86XFx7KD86XFx7W157fV0qXFx9fFtee31dKSpcXH18W157fV0pKlxcfSkvLnNvdXJjZTtcbiAgdmFyIHNwcmVhZCA9IC8oPzpcXHs8Uz4qXFwuezN9KD86W157fV18PEJSQUNFUz4pKlxcfSkvLnNvdXJjZTtcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtmbGFnc11cbiAgICovXG5cbiAgZnVuY3Rpb24gcmUoc291cmNlLCBmbGFncykge1xuICAgIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKC88Uz4vZywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHNwYWNlO1xuICAgIH0pLnJlcGxhY2UoLzxCUkFDRVM+L2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBicmFjZXM7XG4gICAgfSkucmVwbGFjZSgvPFNQUkVBRD4vZywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHNwcmVhZDtcbiAgICB9KTtcbiAgICByZXR1cm4gUmVnRXhwKHNvdXJjZSwgZmxhZ3MpO1xuICB9XG5cbiAgc3ByZWFkID0gcmUoc3ByZWFkKS5zb3VyY2U7XG4gIFByaXNtLmxhbmd1YWdlcy5qc3ggPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdtYXJrdXAnLCBqYXZhc2NyaXB0KTtcbiAgUHJpc20ubGFuZ3VhZ2VzLmpzeC50YWcucGF0dGVybiA9IHJlKC88XFwvPyg/OltcXHcuOi1dKyg/OjxTPisoPzpbXFx3LjokLV0rKD86PSg/OlwiKD86XFxcXFtcXHNcXFNdfFteXFxcXFwiXSkqXCJ8Jyg/OlxcXFxbXFxzXFxTXXxbXlxcXFwnXSkqJ3xbXlxcc3snXCIvPj1dK3w8QlJBQ0VTPikpP3w8U1BSRUFEPikpKjxTPipcXC8/KT8+Ly5zb3VyY2UpO1xuICBQcmlzbS5sYW5ndWFnZXMuanN4LnRhZy5pbnNpZGVbJ3RhZyddLnBhdHRlcm4gPSAvXjxcXC8/W15cXHM+XFwvXSovO1xuICBQcmlzbS5sYW5ndWFnZXMuanN4LnRhZy5pbnNpZGVbJ2F0dHItdmFsdWUnXS5wYXR0ZXJuID0gLz0oPyFcXHspKD86XCIoPzpcXFxcW1xcc1xcU118W15cXFxcXCJdKSpcInwnKD86XFxcXFtcXHNcXFNdfFteXFxcXCddKSonfFteXFxzJ1wiPl0rKS87XG4gIFByaXNtLmxhbmd1YWdlcy5qc3gudGFnLmluc2lkZVsndGFnJ10uaW5zaWRlWydjbGFzcy1uYW1lJ10gPSAvXltBLVpdXFx3Kig/OlxcLltBLVpdXFx3KikqJC87XG4gIFByaXNtLmxhbmd1YWdlcy5qc3gudGFnLmluc2lkZVsnY29tbWVudCddID0gamF2YXNjcmlwdFsnY29tbWVudCddO1xuICBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdpbnNpZGUnLCAnYXR0ci1uYW1lJywge1xuICAgICdzcHJlYWQnOiB7XG4gICAgICBwYXR0ZXJuOiByZSgvPFNQUkVBRD4vLnNvdXJjZSksXG4gICAgICBpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5qc3hcbiAgICB9XG4gIH0sIFByaXNtLmxhbmd1YWdlcy5qc3gudGFnKTtcbiAgUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnaW5zaWRlJywgJ3NwZWNpYWwtYXR0cicsIHtcbiAgICAnc2NyaXB0Jzoge1xuICAgICAgLy8gQWxsb3cgZm9yIHR3byBsZXZlbHMgb2YgbmVzdGluZ1xuICAgICAgcGF0dGVybjogcmUoLz08QlJBQ0VTPi8uc291cmNlKSxcbiAgICAgIGFsaWFzOiAnbGFuZ3VhZ2UtamF2YXNjcmlwdCcsXG4gICAgICBpbnNpZGU6IHtcbiAgICAgICAgJ3NjcmlwdC1wdW5jdHVhdGlvbic6IHtcbiAgICAgICAgICBwYXR0ZXJuOiAvXj0oPz1cXHspLyxcbiAgICAgICAgICBhbGlhczogJ3B1bmN0dWF0aW9uJ1xuICAgICAgICB9LFxuICAgICAgICByZXN0OiBQcmlzbS5sYW5ndWFnZXMuanN4XG4gICAgICB9XG4gICAgfVxuICB9LCBQcmlzbS5sYW5ndWFnZXMuanN4LnRhZyk7IC8vIFRoZSBmb2xsb3dpbmcgd2lsbCBoYW5kbGUgcGxhaW4gdGV4dCBpbnNpZGUgdGFnc1xuXG4gIHZhciBzdHJpbmdpZnlUb2tlbiA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdG9rZW4uY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0b2tlbi5jb250ZW50O1xuICAgIH1cblxuICAgIHJldHVybiB0b2tlbi5jb250ZW50Lm1hcChzdHJpbmdpZnlUb2tlbikuam9pbignJyk7XG4gIH07XG5cbiAgdmFyIHdhbGtUb2tlbnMgPSBmdW5jdGlvbiAodG9rZW5zKSB7XG4gICAgdmFyIG9wZW5lZFRhZ3MgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICB2YXIgbm90VGFnTm9yQnJhY2UgPSBmYWxzZTtcblxuICAgICAgaWYgKHR5cGVvZiB0b2tlbiAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09ICd0YWcnICYmIHRva2VuLmNvbnRlbnRbMF0gJiYgdG9rZW4uY29udGVudFswXS50eXBlID09PSAndGFnJykge1xuICAgICAgICAgIC8vIFdlIGZvdW5kIGEgdGFnLCBub3cgZmluZCBpdHMga2luZFxuICAgICAgICAgIGlmICh0b2tlbi5jb250ZW50WzBdLmNvbnRlbnRbMF0uY29udGVudCA9PT0gJzwvJykge1xuICAgICAgICAgICAgLy8gQ2xvc2luZyB0YWdcbiAgICAgICAgICAgIGlmIChvcGVuZWRUYWdzLmxlbmd0aCA+IDAgJiYgb3BlbmVkVGFnc1tvcGVuZWRUYWdzLmxlbmd0aCAtIDFdLnRhZ05hbWUgPT09IHN0cmluZ2lmeVRva2VuKHRva2VuLmNvbnRlbnRbMF0uY29udGVudFsxXSkpIHtcbiAgICAgICAgICAgICAgLy8gUG9wIG1hdGNoaW5nIG9wZW5pbmcgdGFnXG4gICAgICAgICAgICAgIG9wZW5lZFRhZ3MucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0b2tlbi5jb250ZW50W3Rva2VuLmNvbnRlbnQubGVuZ3RoIC0gMV0uY29udGVudCA9PT0gJy8+JykgOyBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gT3BlbmluZyB0YWdcbiAgICAgICAgICAgICAgb3BlbmVkVGFncy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0YWdOYW1lOiBzdHJpbmdpZnlUb2tlbih0b2tlbi5jb250ZW50WzBdLmNvbnRlbnRbMV0pLFxuICAgICAgICAgICAgICAgIG9wZW5lZEJyYWNlczogMFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAob3BlbmVkVGFncy5sZW5ndGggPiAwICYmIHRva2VuLnR5cGUgPT09ICdwdW5jdHVhdGlvbicgJiYgdG9rZW4uY29udGVudCA9PT0gJ3snKSB7XG4gICAgICAgICAgLy8gSGVyZSB3ZSBtaWdodCBoYXZlIGVudGVyZWQgYSBKU1ggY29udGV4dCBpbnNpZGUgYSB0YWdcbiAgICAgICAgICBvcGVuZWRUYWdzW29wZW5lZFRhZ3MubGVuZ3RoIC0gMV0ub3BlbmVkQnJhY2VzKys7XG4gICAgICAgIH0gZWxzZSBpZiAob3BlbmVkVGFncy5sZW5ndGggPiAwICYmIG9wZW5lZFRhZ3Nbb3BlbmVkVGFncy5sZW5ndGggLSAxXS5vcGVuZWRCcmFjZXMgPiAwICYmIHRva2VuLnR5cGUgPT09ICdwdW5jdHVhdGlvbicgJiYgdG9rZW4uY29udGVudCA9PT0gJ30nKSB7XG4gICAgICAgICAgLy8gSGVyZSB3ZSBtaWdodCBoYXZlIGxlZnQgYSBKU1ggY29udGV4dCBpbnNpZGUgYSB0YWdcbiAgICAgICAgICBvcGVuZWRUYWdzW29wZW5lZFRhZ3MubGVuZ3RoIC0gMV0ub3BlbmVkQnJhY2VzLS07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbm90VGFnTm9yQnJhY2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChub3RUYWdOb3JCcmFjZSB8fCB0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmIChvcGVuZWRUYWdzLmxlbmd0aCA+IDAgJiYgb3BlbmVkVGFnc1tvcGVuZWRUYWdzLmxlbmd0aCAtIDFdLm9wZW5lZEJyYWNlcyA9PT0gMCkge1xuICAgICAgICAgIC8vIEhlcmUgd2UgYXJlIGluc2lkZSBhIHRhZywgYW5kIG5vdCBpbnNpZGUgYSBKU1ggY29udGV4dC5cbiAgICAgICAgICAvLyBUaGF0J3MgcGxhaW4gdGV4dDogZHJvcCBhbnkgdG9rZW5zIG1hdGNoZWQuXG4gICAgICAgICAgdmFyIHBsYWluVGV4dCA9IHN0cmluZ2lmeVRva2VuKHRva2VuKTsgLy8gQW5kIG1lcmdlIHRleHQgd2l0aCBhZGphY2VudCB0ZXh0XG5cbiAgICAgICAgICBpZiAoaSA8IHRva2Vucy5sZW5ndGggLSAxICYmICh0eXBlb2YgdG9rZW5zW2kgKyAxXSA9PT0gJ3N0cmluZycgfHwgdG9rZW5zW2kgKyAxXS50eXBlID09PSAncGxhaW4tdGV4dCcpKSB7XG4gICAgICAgICAgICBwbGFpblRleHQgKz0gc3RyaW5naWZ5VG9rZW4odG9rZW5zW2kgKyAxXSk7XG4gICAgICAgICAgICB0b2tlbnMuc3BsaWNlKGkgKyAxLCAxKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaSA+IDAgJiYgKHR5cGVvZiB0b2tlbnNbaSAtIDFdID09PSAnc3RyaW5nJyB8fCB0b2tlbnNbaSAtIDFdLnR5cGUgPT09ICdwbGFpbi10ZXh0JykpIHtcbiAgICAgICAgICAgIHBsYWluVGV4dCA9IHN0cmluZ2lmeVRva2VuKHRva2Vuc1tpIC0gMV0pICsgcGxhaW5UZXh0O1xuICAgICAgICAgICAgdG9rZW5zLnNwbGljZShpIC0gMSwgMSk7XG4gICAgICAgICAgICBpLS07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdG9rZW5zW2ldID0gbmV3IFByaXNtLlRva2VuKCdwbGFpbi10ZXh0JywgcGxhaW5UZXh0LCBudWxsLCBwbGFpblRleHQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0b2tlbi5jb250ZW50ICYmIHR5cGVvZiB0b2tlbi5jb250ZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICB3YWxrVG9rZW5zKHRva2VuLmNvbnRlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBQcmlzbS5ob29rcy5hZGQoJ2FmdGVyLXRva2VuaXplJywgZnVuY3Rpb24gKGVudikge1xuICAgIGlmIChlbnYubGFuZ3VhZ2UgIT09ICdqc3gnICYmIGVudi5sYW5ndWFnZSAhPT0gJ3RzeCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB3YWxrVG9rZW5zKGVudi50b2tlbnMpO1xuICB9KTtcbn0pKHByaXNtKTtcbi8qIFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWRpZmZcIiAqL1xuXG5cbihmdW5jdGlvbiAoUHJpc20pIHtcbiAgUHJpc20ubGFuZ3VhZ2VzLmRpZmYgPSB7XG4gICAgJ2Nvb3JkJzogWy8vIE1hdGNoIGFsbCBraW5kcyBvZiBjb29yZCBsaW5lcyAocHJlZml4ZWQgYnkgXCIrKytcIiwgXCItLS1cIiBvciBcIioqKlwiKS5cbiAgICAvXig/OlxcKnszfXwtezN9fFxcK3szfSkuKiQvbSwgLy8gTWF0Y2ggXCJAQCAuLi4gQEBcIiBjb29yZCBsaW5lcyBpbiB1bmlmaWVkIGRpZmYuXG4gICAgL15AQC4qQEAkL20sIC8vIE1hdGNoIGNvb3JkIGxpbmVzIGluIG5vcm1hbCBkaWZmIChzdGFydHMgd2l0aCBhIG51bWJlcikuXG4gICAgL15cXGQuKiQvbV0gLy8gZGVsZXRlZCwgaW5zZXJ0ZWQsIHVuY2hhbmdlZCwgZGlmZlxuXG4gIH07XG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIHRoZSBuYW1lIG9mIGEgYmxvY2sgdG8gaXRzIGxpbmUgcHJlZml4LlxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn1cbiAgICovXG5cbiAgdmFyIFBSRUZJWEVTID0ge1xuICAgICdkZWxldGVkLXNpZ24nOiAnLScsXG4gICAgJ2RlbGV0ZWQtYXJyb3cnOiAnPCcsXG4gICAgJ2luc2VydGVkLXNpZ24nOiAnKycsXG4gICAgJ2luc2VydGVkLWFycm93JzogJz4nLFxuICAgICd1bmNoYW5nZWQnOiAnICcsXG4gICAgJ2RpZmYnOiAnISdcbiAgfTsgLy8gYWRkIGEgdG9rZW4gZm9yIGVhY2ggcHJlZml4XG5cbiAgT2JqZWN0LmtleXMoUFJFRklYRVMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgcHJlZml4ID0gUFJFRklYRVNbbmFtZV07XG4gICAgdmFyIGFsaWFzID0gW107XG5cbiAgICBpZiAoIS9eXFx3KyQvLnRlc3QobmFtZSkpIHtcbiAgICAgIC8vIFwiZGVsZXRlZC1zaWduXCIgLT4gXCJkZWxldGVkXCJcbiAgICAgIGFsaWFzLnB1c2goL1xcdysvLmV4ZWMobmFtZSlbMF0pO1xuICAgIH1cblxuICAgIGlmIChuYW1lID09PSAnZGlmZicpIHtcbiAgICAgIGFsaWFzLnB1c2goJ2JvbGQnKTtcbiAgICB9XG5cbiAgICBQcmlzbS5sYW5ndWFnZXMuZGlmZltuYW1lXSA9IHtcbiAgICAgIHBhdHRlcm46IFJlZ0V4cCgnXig/OlsnICsgcHJlZml4ICsgJ10uKig/Olxcclxcbj98XFxufCg/IVtcXFxcc1xcXFxTXSkpKSsnLCAnbScpLFxuICAgICAgYWxpYXM6IGFsaWFzLFxuICAgICAgaW5zaWRlOiB7XG4gICAgICAgICdsaW5lJzoge1xuICAgICAgICAgIHBhdHRlcm46IC8oLikoPz1bXFxzXFxTXSkuKig/Olxcclxcbj98XFxuKT8vLFxuICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgJ3ByZWZpeCc6IHtcbiAgICAgICAgICBwYXR0ZXJuOiAvW1xcc1xcU10vLFxuICAgICAgICAgIGFsaWFzOiAvXFx3Ky8uZXhlYyhuYW1lKVswXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7IC8vIG1ha2UgcHJlZml4ZXMgYXZhaWxhYmxlIHRvIERpZmYgcGx1Z2luXG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFByaXNtLmxhbmd1YWdlcy5kaWZmLCAnUFJFRklYRVMnLCB7XG4gICAgdmFsdWU6IFBSRUZJWEVTXG4gIH0pO1xufSkocHJpc20pO1xuLyogXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tZ2l0XCIgKi9cblxuXG5wcmlzbS5sYW5ndWFnZXMuZ2l0ID0ge1xuICAvKlxuICAgKiBBIHNpbXBsZSBvbmUgbGluZSBjb21tZW50IGxpa2UgaW4gYSBnaXQgc3RhdHVzIGNvbW1hbmRcbiAgICogRm9yIGluc3RhbmNlOlxuICAgKiAkIGdpdCBzdGF0dXNcbiAgICogIyBPbiBicmFuY2ggaW5maW5pdGUtc2Nyb2xsXG4gICAqICMgWW91ciBicmFuY2ggYW5kICdvcmlnaW4vc2hhcmVkQnJhbmNoZXMvZnJvbnRlbmRUZWFtL2luZmluaXRlLXNjcm9sbCcgaGF2ZSBkaXZlcmdlZCxcbiAgICogIyBhbmQgaGF2ZSAxIGFuZCAyIGRpZmZlcmVudCBjb21taXRzIGVhY2gsIHJlc3BlY3RpdmVseS5cbiAgICogbm90aGluZyB0byBjb21taXQgKHdvcmtpbmcgZGlyZWN0b3J5IGNsZWFuKVxuICAgKi9cbiAgJ2NvbW1lbnQnOiAvXiMuKi9tLFxuXG4gIC8qXG4gICAqIFJlZ2V4cCB0byBtYXRjaCB0aGUgY2hhbmdlZCBsaW5lcyBpbiBhIGdpdCBkaWZmIG91dHB1dC4gQ2hlY2sgdGhlIGV4YW1wbGUgYmVsb3cuXG4gICAqL1xuICAnZGVsZXRlZCc6IC9eWy3igJNdLiovbSxcbiAgJ2luc2VydGVkJzogL15cXCsuKi9tLFxuXG4gIC8qXG4gICAqIGEgc3RyaW5nIChkb3VibGUgYW5kIHNpbXBsZSBxdW90ZSlcbiAgICovXG4gICdzdHJpbmcnOiAvKFwifCcpKD86XFxcXC58KD8hXFwxKVteXFxcXFxcclxcbl0pKlxcMS8sXG5cbiAgLypcbiAgICogYSBnaXQgY29tbWFuZC4gSXQgc3RhcnRzIHdpdGggYSByYW5kb20gcHJvbXB0IGZpbmlzaGluZyBieSBhICQsIHRoZW4gXCJnaXRcIiB0aGVuIHNvbWUgb3RoZXIgcGFyYW1ldGVyc1xuICAgKiBGb3IgaW5zdGFuY2U6XG4gICAqICQgZ2l0IGFkZCBmaWxlLnR4dFxuICAgKi9cbiAgJ2NvbW1hbmQnOiB7XG4gICAgcGF0dGVybjogL14uKlxcJCBnaXQgLiokL20sXG4gICAgaW5zaWRlOiB7XG4gICAgICAvKlxuICAgICAgICogQSBnaXQgY29tbWFuZCBjYW4gY29udGFpbiBhIHBhcmFtZXRlciBzdGFydGluZyBieSBhIHNpbmdsZSBvciBhIGRvdWJsZSBkYXNoIGZvbGxvd2VkIGJ5IGEgc3RyaW5nXG4gICAgICAgKiBGb3IgaW5zdGFuY2U6XG4gICAgICAgKiAkIGdpdCBkaWZmIC0tY2FjaGVkXG4gICAgICAgKiAkIGdpdCBsb2cgLXBcbiAgICAgICAqL1xuICAgICAgJ3BhcmFtZXRlcic6IC9cXHMtLT9cXHcrL1xuICAgIH1cbiAgfSxcblxuICAvKlxuICAgKiBDb29yZGluYXRlcyBkaXNwbGF5ZWQgaW4gYSBnaXQgZGlmZiBjb21tYW5kXG4gICAqIEZvciBpbnN0YW5jZTpcbiAgICogJCBnaXQgZGlmZlxuICAgKiBkaWZmIC0tZ2l0IGZpbGUudHh0IGZpbGUudHh0XG4gICAqIGluZGV4IDYyMTQ5NTMuLjFkNTRhNTIgMTAwNjQ0XG4gICAqIC0tLSBmaWxlLnR4dFxuICAgKiArKysgZmlsZS50eHRcbiAgICogQEAgLTEgKzEsMiBAQFxuICAgKiAtSGVyZSdzIG15IHRldHggZmlsZVxuICAgKiArSGVyZSdzIG15IHRleHQgZmlsZVxuICAgKiArQW5kIHRoaXMgaXMgdGhlIHNlY29uZCBsaW5lXG4gICAqL1xuICAnY29vcmQnOiAvXkBALipAQCQvbSxcblxuICAvKlxuICAgKiBNYXRjaCBhIFwiY29tbWl0IFtTSEExXVwiIGxpbmUgaW4gYSBnaXQgbG9nIG91dHB1dC5cbiAgICogRm9yIGluc3RhbmNlOlxuICAgKiAkIGdpdCBsb2dcbiAgICogY29tbWl0IGExMWExNGVmN2UyNmYyY2E2MmQ0YjM1ZWFjNDU1Y2U2MzZkMGRjMDlcbiAgICogQXV0aG9yOiBsZ2lyYXVkZWxcbiAgICogRGF0ZTogICBNb24gRmViIDE3IDExOjE4OjM0IDIwMTQgKzAxMDBcbiAgICpcbiAgICogICAgIEFkZCBvZiBhIG5ldyBsaW5lXG4gICAqL1xuICAnY29tbWl0LXNoYTEnOiAvXmNvbW1pdCBcXHd7NDB9JC9tXG59O1xuLyogXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tZ29cIiAqL1xuXG5wcmlzbS5sYW5ndWFnZXMuZ28gPSBwcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjbGlrZScsIHtcbiAgJ3N0cmluZyc6IHtcbiAgICBwYXR0ZXJuOiAvKF58W15cXFxcXSlcIig/OlxcXFwufFteXCJcXFxcXFxyXFxuXSkqXCJ8YFteYF0qYC8sXG4gICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICBncmVlZHk6IHRydWVcbiAgfSxcbiAgJ2tleXdvcmQnOiAvXFxiKD86YnJlYWt8Y2FzZXxjaGFufGNvbnN0fGNvbnRpbnVlfGRlZmF1bHR8ZGVmZXJ8ZWxzZXxmYWxsdGhyb3VnaHxmb3J8ZnVuY3xnbyg/OnRvKT98aWZ8aW1wb3J0fGludGVyZmFjZXxtYXB8cGFja2FnZXxyYW5nZXxyZXR1cm58c2VsZWN0fHN0cnVjdHxzd2l0Y2h8dHlwZXx2YXIpXFxiLyxcbiAgJ2Jvb2xlYW4nOiAvXFxiKD86X3xmYWxzZXxpb3RhfG5pbHx0cnVlKVxcYi8sXG4gICdudW1iZXInOiBbLy8gYmluYXJ5IGFuZCBvY3RhbCBpbnRlZ2Vyc1xuICAvXFxiMCg/OmJbMDFfXSt8b1swLTdfXSspaT9cXGIvaSwgLy8gaGV4YWRlY2ltYWwgaW50ZWdlcnMgYW5kIGZsb2F0c1xuICAvXFxiMHgoPzpbYS1mXFxkX10rKD86XFwuW2EtZlxcZF9dKik/fFxcLlthLWZcXGRfXSspKD86cFsrLV0/XFxkKyg/Ol9cXGQrKSopP2k/KD8hXFx3KS9pLCAvLyBkZWNpbWFsIGludGVnZXJzIGFuZCBmbG9hdHNcbiAgLyg/OlxcYlxcZFtcXGRfXSooPzpcXC5bXFxkX10qKT98XFxCXFwuXFxkW1xcZF9dKikoPzplWystXT9bXFxkX10rKT9pPyg/IVxcdykvaV0sXG4gICdvcGVyYXRvcic6IC9bKlxcLyVeIT1dPT98XFwrWz0rXT98LVs9LV0/fFxcfFs9fF0/fCYoPzo9fCZ8XFxePT8pP3w+KD86Pj0/fD0pP3w8KD86PD0/fD18LSk/fDo9fFxcLlxcLlxcLi8sXG4gICdidWlsdGluJzogL1xcYig/OmFwcGVuZHxib29sfGJ5dGV8Y2FwfGNsb3NlfGNvbXBsZXh8Y29tcGxleCg/OjY0fDEyOCl8Y29weXxkZWxldGV8ZXJyb3J8ZmxvYXQoPzozMnw2NCl8dT9pbnQoPzo4fDE2fDMyfDY0KT98aW1hZ3xsZW58bWFrZXxuZXd8cGFuaWN8cHJpbnQoPzpsbik/fHJlYWx8cmVjb3ZlcnxydW5lfHN0cmluZ3x1aW50cHRyKVxcYi9cbn0pO1xucHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnZ28nLCAnc3RyaW5nJywge1xuICAnY2hhcic6IHtcbiAgICBwYXR0ZXJuOiAvJyg/OlxcXFwufFteJ1xcXFxcXHJcXG5dKXswLDEwfScvLFxuICAgIGdyZWVkeTogdHJ1ZVxuICB9XG59KTtcbmRlbGV0ZSBwcmlzbS5sYW5ndWFnZXMuZ29bJ2NsYXNzLW5hbWUnXTtcbi8qIFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLW1hcmt1cC10ZW1wbGF0aW5nXCIgKi9cblxuKGZ1bmN0aW9uIChQcmlzbSkge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgcGxhY2Vob2xkZXIgZm9yIHRoZSBnaXZlbiBsYW5ndWFnZSBpZCBhbmQgaW5kZXguXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxuICAgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IGluZGV4XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRQbGFjZWhvbGRlcihsYW5ndWFnZSwgaW5kZXgpIHtcbiAgICByZXR1cm4gJ19fXycgKyBsYW5ndWFnZS50b1VwcGVyQ2FzZSgpICsgaW5kZXggKyAnX19fJztcbiAgfVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFByaXNtLmxhbmd1YWdlc1snbWFya3VwLXRlbXBsYXRpbmcnXSA9IHt9LCB7XG4gICAgYnVpbGRQbGFjZWhvbGRlcnM6IHtcbiAgICAgIC8qKlxuICAgICAgICogVG9rZW5pemUgYWxsIGlubGluZSB0ZW1wbGF0aW5nIGV4cHJlc3Npb25zIG1hdGNoaW5nIGBwbGFjZWhvbGRlclBhdHRlcm5gLlxuICAgICAgICpcbiAgICAgICAqIElmIGByZXBsYWNlRmlsdGVyYCBpcyBwcm92aWRlZCwgb25seSBtYXRjaGVzIG9mIGBwbGFjZWhvbGRlclBhdHRlcm5gIGZvciB3aGljaCBgcmVwbGFjZUZpbHRlcmAgcmV0dXJuc1xuICAgICAgICogYHRydWVgIHdpbGwgYmUgcmVwbGFjZWQuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IGVudiBUaGUgZW52aXJvbm1lbnQgb2YgdGhlIGBiZWZvcmUtdG9rZW5pemVgIGhvb2suXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgVGhlIGxhbmd1YWdlIGlkLlxuICAgICAgICogQHBhcmFtIHtSZWdFeHB9IHBsYWNlaG9sZGVyUGF0dGVybiBUaGUgbWF0Y2hlcyBvZiB0aGlzIHBhdHRlcm4gd2lsbCBiZSByZXBsYWNlZCBieSBwbGFjZWhvbGRlcnMuXG4gICAgICAgKiBAcGFyYW0geyhtYXRjaDogc3RyaW5nKSA9PiBib29sZWFufSBbcmVwbGFjZUZpbHRlcl1cbiAgICAgICAqL1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIChlbnYsIGxhbmd1YWdlLCBwbGFjZWhvbGRlclBhdHRlcm4sIHJlcGxhY2VGaWx0ZXIpIHtcbiAgICAgICAgaWYgKGVudi5sYW5ndWFnZSAhPT0gbGFuZ3VhZ2UpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG9rZW5TdGFjayA9IGVudi50b2tlblN0YWNrID0gW107XG4gICAgICAgIGVudi5jb2RlID0gZW52LmNvZGUucmVwbGFjZShwbGFjZWhvbGRlclBhdHRlcm4sIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVwbGFjZUZpbHRlciA9PT0gJ2Z1bmN0aW9uJyAmJiAhcmVwbGFjZUZpbHRlcihtYXRjaCkpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaSA9IHRva2VuU3RhY2subGVuZ3RoO1xuICAgICAgICAgIHZhciBwbGFjZWhvbGRlcjsgLy8gQ2hlY2sgZm9yIGV4aXN0aW5nIHN0cmluZ3NcblxuICAgICAgICAgIHdoaWxlIChlbnYuY29kZS5pbmRleE9mKHBsYWNlaG9sZGVyID0gZ2V0UGxhY2Vob2xkZXIobGFuZ3VhZ2UsIGkpKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICsraTtcbiAgICAgICAgICB9IC8vIENyZWF0ZSBhIHNwYXJzZSBhcnJheVxuXG5cbiAgICAgICAgICB0b2tlblN0YWNrW2ldID0gbWF0Y2g7XG4gICAgICAgICAgcmV0dXJuIHBsYWNlaG9sZGVyO1xuICAgICAgICB9KTsgLy8gU3dpdGNoIHRoZSBncmFtbWFyIHRvIG1hcmt1cFxuXG4gICAgICAgIGVudi5ncmFtbWFyID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRva2VuaXplUGxhY2Vob2xkZXJzOiB7XG4gICAgICAvKipcbiAgICAgICAqIFJlcGxhY2UgcGxhY2Vob2xkZXJzIHdpdGggcHJvcGVyIHRva2VucyBhZnRlciB0b2tlbml6aW5nLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlbnYgVGhlIGVudmlyb25tZW50IG9mIHRoZSBgYWZ0ZXItdG9rZW5pemVgIGhvb2suXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgVGhlIGxhbmd1YWdlIGlkLlxuICAgICAgICovXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gKGVudiwgbGFuZ3VhZ2UpIHtcbiAgICAgICAgaWYgKGVudi5sYW5ndWFnZSAhPT0gbGFuZ3VhZ2UgfHwgIWVudi50b2tlblN0YWNrKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIFN3aXRjaCB0aGUgZ3JhbW1hciBiYWNrXG5cblxuICAgICAgICBlbnYuZ3JhbW1hciA9IFByaXNtLmxhbmd1YWdlc1tsYW5ndWFnZV07XG4gICAgICAgIHZhciBqID0gMDtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhlbnYudG9rZW5TdGFjayk7XG5cbiAgICAgICAgZnVuY3Rpb24gd2Fsa1Rva2Vucyh0b2tlbnMpIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gYWxsIHBsYWNlaG9sZGVycyBhcmUgcmVwbGFjZWQgYWxyZWFkeVxuICAgICAgICAgICAgaWYgKGogPj0ga2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycgfHwgdG9rZW4uY29udGVudCAmJiB0eXBlb2YgdG9rZW4uY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgdmFyIGsgPSBrZXlzW2pdO1xuICAgICAgICAgICAgICB2YXIgdCA9IGVudi50b2tlblN0YWNrW2tdO1xuICAgICAgICAgICAgICB2YXIgcyA9IHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycgPyB0b2tlbiA6IHRva2VuLmNvbnRlbnQ7XG4gICAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlciA9IGdldFBsYWNlaG9sZGVyKGxhbmd1YWdlLCBrKTtcbiAgICAgICAgICAgICAgdmFyIGluZGV4ID0gcy5pbmRleE9mKHBsYWNlaG9sZGVyKTtcblxuICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICsrajtcbiAgICAgICAgICAgICAgICB2YXIgYmVmb3JlID0gcy5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIHZhciBtaWRkbGUgPSBuZXcgUHJpc20uVG9rZW4obGFuZ3VhZ2UsIFByaXNtLnRva2VuaXplKHQsIGVudi5ncmFtbWFyKSwgJ2xhbmd1YWdlLScgKyBsYW5ndWFnZSwgdCk7XG4gICAgICAgICAgICAgICAgdmFyIGFmdGVyID0gcy5zdWJzdHJpbmcoaW5kZXggKyBwbGFjZWhvbGRlci5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudCA9IFtdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGJlZm9yZSkge1xuICAgICAgICAgICAgICAgICAgcmVwbGFjZW1lbnQucHVzaC5hcHBseShyZXBsYWNlbWVudCwgd2Fsa1Rva2VucyhbYmVmb3JlXSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50LnB1c2gobWlkZGxlKTtcblxuICAgICAgICAgICAgICAgIGlmIChhZnRlcikge1xuICAgICAgICAgICAgICAgICAgcmVwbGFjZW1lbnQucHVzaC5hcHBseShyZXBsYWNlbWVudCwgd2Fsa1Rva2VucyhbYWZ0ZXJdKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgIHRva2Vucy5zcGxpY2UuYXBwbHkodG9rZW5zLCBbaSwgMV0uY29uY2F0KHJlcGxhY2VtZW50KSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRva2VuLmNvbnRlbnQgPSByZXBsYWNlbWVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW4uY29udGVudFxuICAgICAgICAgICAgLyogJiYgdHlwZW9mIHRva2VuLmNvbnRlbnQgIT09ICdzdHJpbmcnICovXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB3YWxrVG9rZW5zKHRva2VuLmNvbnRlbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRva2VucztcbiAgICAgICAgfVxuXG4gICAgICAgIHdhbGtUb2tlbnMoZW52LnRva2Vucyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pKHByaXNtKTtcbi8qIFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWhhbmRsZWJhcnNcIiAqL1xuXG5cbihmdW5jdGlvbiAoUHJpc20pIHtcbiAgUHJpc20ubGFuZ3VhZ2VzLmhhbmRsZWJhcnMgPSB7XG4gICAgJ2NvbW1lbnQnOiAvXFx7XFx7IVtcXHNcXFNdKj9cXH1cXH0vLFxuICAgICdkZWxpbWl0ZXInOiB7XG4gICAgICBwYXR0ZXJuOiAvXlxce1xce1xcez98XFx9XFx9XFx9PyQvLFxuICAgICAgYWxpYXM6ICdwdW5jdHVhdGlvbidcbiAgICB9LFxuICAgICdzdHJpbmcnOiAvKFtcIiddKSg/OlxcXFwufCg/IVxcMSlbXlxcXFxcXHJcXG5dKSpcXDEvLFxuICAgICdudW1iZXInOiAvXFxiMHhbXFxkQS1GYS1mXStcXGJ8KD86XFxiXFxkKyg/OlxcLlxcZCopP3xcXEJcXC5cXGQrKSg/OltFZV1bKy1dP1xcZCspPy8sXG4gICAgJ2Jvb2xlYW4nOiAvXFxiKD86ZmFsc2V8dHJ1ZSlcXGIvLFxuICAgICdibG9jayc6IHtcbiAgICAgIHBhdHRlcm46IC9eKFxccyooPzp+XFxzKik/KVsjXFwvXVxcUys/KD89XFxzKig/On5cXHMqKT8kfFxccykvLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgIGFsaWFzOiAna2V5d29yZCdcbiAgICB9LFxuICAgICdicmFja2V0cyc6IHtcbiAgICAgIHBhdHRlcm46IC9cXFtbXlxcXV0rXFxdLyxcbiAgICAgIGluc2lkZToge1xuICAgICAgICBwdW5jdHVhdGlvbjogL1xcW3xcXF0vLFxuICAgICAgICB2YXJpYWJsZTogL1tcXHNcXFNdKy9cbiAgICAgIH1cbiAgICB9LFxuICAgICdwdW5jdHVhdGlvbic6IC9bIVwiIyUmJzooKSorLC5cXC87PD0+QFxcW1xcXFxcXF1eYHt8fX5dLyxcbiAgICAndmFyaWFibGUnOiAvW14hXCIjJSYnKCkqKyxcXC87PD0+QFxcW1xcXFxcXF1eYHt8fX5cXHNdKy9cbiAgfTtcbiAgUHJpc20uaG9va3MuYWRkKCdiZWZvcmUtdG9rZW5pemUnLCBmdW5jdGlvbiAoZW52KSB7XG4gICAgdmFyIGhhbmRsZWJhcnNQYXR0ZXJuID0gL1xce1xce1xce1tcXHNcXFNdKz9cXH1cXH1cXH18XFx7XFx7W1xcc1xcU10rP1xcfVxcfS9nO1xuICAgIFByaXNtLmxhbmd1YWdlc1snbWFya3VwLXRlbXBsYXRpbmcnXS5idWlsZFBsYWNlaG9sZGVycyhlbnYsICdoYW5kbGViYXJzJywgaGFuZGxlYmFyc1BhdHRlcm4pO1xuICB9KTtcbiAgUHJpc20uaG9va3MuYWRkKCdhZnRlci10b2tlbml6ZScsIGZ1bmN0aW9uIChlbnYpIHtcbiAgICBQcmlzbS5sYW5ndWFnZXNbJ21hcmt1cC10ZW1wbGF0aW5nJ10udG9rZW5pemVQbGFjZWhvbGRlcnMoZW52LCAnaGFuZGxlYmFycycpO1xuICB9KTtcbiAgUHJpc20ubGFuZ3VhZ2VzLmhicyA9IFByaXNtLmxhbmd1YWdlcy5oYW5kbGViYXJzO1xufSkocHJpc20pO1xuLyogXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tanNvblwiICovXG4vLyBodHRwczovL3d3dy5qc29uLm9yZy9qc29uLWVuLmh0bWxcblxuXG5wcmlzbS5sYW5ndWFnZXMuanNvbiA9IHtcbiAgJ3Byb3BlcnR5Jzoge1xuICAgIHBhdHRlcm46IC8oXnxbXlxcXFxdKVwiKD86XFxcXC58W15cXFxcXCJcXHJcXG5dKSpcIig/PVxccyo6KS8sXG4gICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICBncmVlZHk6IHRydWVcbiAgfSxcbiAgJ3N0cmluZyc6IHtcbiAgICBwYXR0ZXJuOiAvKF58W15cXFxcXSlcIig/OlxcXFwufFteXFxcXFwiXFxyXFxuXSkqXCIoPyFcXHMqOikvLFxuICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgZ3JlZWR5OiB0cnVlXG4gIH0sXG4gICdjb21tZW50Jzoge1xuICAgIHBhdHRlcm46IC9cXC9cXC8uKnxcXC9cXCpbXFxzXFxTXSo/KD86XFwqXFwvfCQpLyxcbiAgICBncmVlZHk6IHRydWVcbiAgfSxcbiAgJ251bWJlcic6IC8tP1xcYlxcZCsoPzpcXC5cXGQrKT8oPzplWystXT9cXGQrKT9cXGIvaSxcbiAgJ3B1bmN0dWF0aW9uJzogL1t7fVtcXF0sXS8sXG4gICdvcGVyYXRvcic6IC86LyxcbiAgJ2Jvb2xlYW4nOiAvXFxiKD86ZmFsc2V8dHJ1ZSlcXGIvLFxuICAnbnVsbCc6IHtcbiAgICBwYXR0ZXJuOiAvXFxibnVsbFxcYi8sXG4gICAgYWxpYXM6ICdrZXl3b3JkJ1xuICB9XG59O1xucHJpc20ubGFuZ3VhZ2VzLndlYm1hbmlmZXN0ID0gcHJpc20ubGFuZ3VhZ2VzLmpzb247XG4vKiBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1sZXNzXCIgKi9cblxuLyogRklYTUUgOlxuIDpleHRlbmQoKSBpcyBub3QgaGFuZGxlZCBzcGVjaWZpY2FsbHkgOiBpdHMgaGlnaGxpZ2h0aW5nIGlzIGJ1Z2d5LlxuIE1peGluIHVzYWdlIG11c3QgYmUgaW5zaWRlIGEgcnVsZXNldCB0byBiZSBoaWdobGlnaHRlZC5cbiBBdC1ydWxlcyAoZS5nLiBpbXBvcnQpIGNvbnRhaW5pbmcgaW50ZXJwb2xhdGlvbnMgYXJlIGJ1Z2d5LlxuIERldGFjaGVkIHJ1bGVzZXRzIGFyZSBoaWdobGlnaHRlZCBhcyBhdC1ydWxlcy5cbiBBIGNvbW1lbnQgYmVmb3JlIGEgbWl4aW4gdXNhZ2UgcHJldmVudHMgdGhlIGxhdHRlciB0byBiZSBwcm9wZXJseSBoaWdobGlnaHRlZC5cbiAqL1xuXG5wcmlzbS5sYW5ndWFnZXMubGVzcyA9IHByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2NzcycsIHtcbiAgJ2NvbW1lbnQnOiBbL1xcL1xcKltcXHNcXFNdKj9cXCpcXC8vLCB7XG4gICAgcGF0dGVybjogLyhefFteXFxcXF0pXFwvXFwvLiovLFxuICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgfV0sXG4gICdhdHJ1bGUnOiB7XG4gICAgcGF0dGVybjogL0BbXFx3LV0oPzpcXCgoPzpbXigpe31dfFxcKFteKCl7fV0qXFwpKSpcXCl8W14oKXt9O1xcc118XFxzKyg/IVxccykpKj8oPz1cXHMqXFx7KS8sXG4gICAgaW5zaWRlOiB7XG4gICAgICAncHVuY3R1YXRpb24nOiAvWzooKV0vXG4gICAgfVxuICB9LFxuICAvLyBzZWxlY3RvcnMgYW5kIG1peGlucyBhcmUgY29uc2lkZXJlZCB0aGUgc2FtZVxuICAnc2VsZWN0b3InOiB7XG4gICAgcGF0dGVybjogLyg/OkBcXHtbXFx3LV0rXFx9fFtee307XFxzQF0pKD86QFxce1tcXHctXStcXH18XFwoKD86W14oKXt9XXxcXChbXigpe31dKlxcKSkqXFwpfFteKCl7fTtAXFxzXXxcXHMrKD8hXFxzKSkqPyg/PVxccypcXHspLyxcbiAgICBpbnNpZGU6IHtcbiAgICAgIC8vIG1peGluIHBhcmFtZXRlcnNcbiAgICAgICd2YXJpYWJsZSc6IC9AK1tcXHctXSsvXG4gICAgfVxuICB9LFxuICAncHJvcGVydHknOiAvKD86QFxce1tcXHctXStcXH18W1xcdy1dKSsoPzpcXCtfPyk/KD89XFxzKjopLyxcbiAgJ29wZXJhdG9yJzogL1srXFwtKlxcL10vXG59KTtcbnByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2xlc3MnLCAncHJvcGVydHknLCB7XG4gICd2YXJpYWJsZSc6IFsvLyBWYXJpYWJsZSBkZWNsYXJhdGlvbiAodGhlIGNvbG9uIG11c3QgYmUgY29uc3VtZWQhKVxuICB7XG4gICAgcGF0dGVybjogL0BbXFx3LV0rXFxzKjovLFxuICAgIGluc2lkZToge1xuICAgICAgJ3B1bmN0dWF0aW9uJzogLzovXG4gICAgfVxuICB9LCAvLyBWYXJpYWJsZSB1c2FnZVxuICAvQEA/W1xcdy1dKy9dLFxuICAnbWl4aW4tdXNhZ2UnOiB7XG4gICAgcGF0dGVybjogLyhbeztdXFxzKilbLiNdKD8hXFxkKVtcXHctXS4qPyg/PVsoO10pLyxcbiAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgIGFsaWFzOiAnZnVuY3Rpb24nXG4gIH1cbn0pO1xuLyogXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tbWFrZWZpbGVcIiAqL1xuXG5wcmlzbS5sYW5ndWFnZXMubWFrZWZpbGUgPSB7XG4gICdjb21tZW50Jzoge1xuICAgIHBhdHRlcm46IC8oXnxbXlxcXFxdKSMoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXxbXlxcXFxcXHJcXG5dKSovLFxuICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgfSxcbiAgJ3N0cmluZyc6IHtcbiAgICBwYXR0ZXJuOiAvKFtcIiddKSg/OlxcXFwoPzpcXHJcXG58W1xcc1xcU10pfCg/IVxcMSlbXlxcXFxcXHJcXG5dKSpcXDEvLFxuICAgIGdyZWVkeTogdHJ1ZVxuICB9LFxuICAnYnVpbHRpbi10YXJnZXQnOiB7XG4gICAgcGF0dGVybjogL1xcLltBLVpdW146Iz1cXHNdKyg/PVxccyo6KD8hPSkpLyxcbiAgICBhbGlhczogJ2J1aWx0aW4nXG4gIH0sXG4gICd0YXJnZXQnOiB7XG4gICAgcGF0dGVybjogL14oPzpbXjo9XFxzXXxbIFxcdF0rKD8hW1xcczpdKSkrKD89XFxzKjooPyE9KSkvbSxcbiAgICBhbGlhczogJ3N5bWJvbCcsXG4gICAgaW5zaWRlOiB7XG4gICAgICAndmFyaWFibGUnOiAvXFwkKyg/Oig/IVxcJClbXigpe306Iz1cXHNdK3woPz1bKHtdKSkvXG4gICAgfVxuICB9LFxuICAndmFyaWFibGUnOiAvXFwkKyg/Oig/IVxcJClbXigpe306Iz1cXHNdK3xcXChbQColPF4rP11bREZdXFwpfCg/PVsoe10pKS8sXG4gIC8vIERpcmVjdGl2ZXNcbiAgJ2tleXdvcmQnOiAvLWluY2x1ZGVcXGJ8XFxiKD86ZGVmaW5lfGVsc2V8ZW5kZWZ8ZW5kaWZ8ZXhwb3J0fGlmbj9kZWZ8aWZuP2VxfGluY2x1ZGV8b3ZlcnJpZGV8cHJpdmF0ZXxzaW5jbHVkZXx1bmRlZmluZXx1bmV4cG9ydHx2cGF0aClcXGIvLFxuICAnZnVuY3Rpb24nOiB7XG4gICAgcGF0dGVybjogLyhcXCgpKD86YWJzcGF0aHxhZGRzdWZmaXh8YW5kfGJhc2VuYW1lfGNhbGx8ZGlyfGVycm9yfGV2YWx8ZmlsZXxmaWx0ZXIoPzotb3V0KT98ZmluZHN0cmluZ3xmaXJzdHdvcmR8Zmxhdm9yfGZvcmVhY2h8Z3VpbGV8aWZ8aW5mb3xqb2lufGxhc3R3b3JkfGxvYWR8bm90ZGlyfG9yfG9yaWdpbnxwYXRzdWJzdHxyZWFscGF0aHxzaGVsbHxzb3J0fHN0cmlwfHN1YnN0fHN1ZmZpeHx2YWx1ZXx3YXJuaW5nfHdpbGRjYXJkfHdvcmQoPzpsaXN0fHMpPykoPz1bIFxcdF0pLyxcbiAgICBsb29rYmVoaW5kOiB0cnVlXG4gIH0sXG4gICdvcGVyYXRvcic6IC8oPzo6OnxbPzorIV0pPz18W3xAXS8sXG4gICdwdW5jdHVhdGlvbic6IC9bOjsoKXt9XS9cbn07XG4vKiBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1vYmplY3RpdmVjXCIgKi9cblxucHJpc20ubGFuZ3VhZ2VzLm9iamVjdGl2ZWMgPSBwcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjJywge1xuICAnc3RyaW5nJzoge1xuICAgIHBhdHRlcm46IC9AP1wiKD86XFxcXCg/OlxcclxcbnxbXFxzXFxTXSl8W15cIlxcXFxcXHJcXG5dKSpcIi8sXG4gICAgZ3JlZWR5OiB0cnVlXG4gIH0sXG4gICdrZXl3b3JkJzogL1xcYig/OmFzbXxhdXRvfGJyZWFrfGNhc2V8Y2hhcnxjb25zdHxjb250aW51ZXxkZWZhdWx0fGRvfGRvdWJsZXxlbHNlfGVudW18ZXh0ZXJufGZsb2F0fGZvcnxnb3RvfGlmfGlufGlubGluZXxpbnR8bG9uZ3xyZWdpc3RlcnxyZXR1cm58c2VsZnxzaG9ydHxzaWduZWR8c2l6ZW9mfHN0YXRpY3xzdHJ1Y3R8c3VwZXJ8c3dpdGNofHR5cGVkZWZ8dHlwZW9mfHVuaW9ufHVuc2lnbmVkfHZvaWR8dm9sYXRpbGV8d2hpbGUpXFxifCg/OkBpbnRlcmZhY2V8QGVuZHxAaW1wbGVtZW50YXRpb258QHByb3RvY29sfEBjbGFzc3xAcHVibGljfEBwcm90ZWN0ZWR8QHByaXZhdGV8QHByb3BlcnR5fEB0cnl8QGNhdGNofEBmaW5hbGx5fEB0aHJvd3xAc3ludGhlc2l6ZXxAZHluYW1pY3xAc2VsZWN0b3IpXFxiLyxcbiAgJ29wZXJhdG9yJzogLy1bLT5dP3xcXCtcXCs/fCE9P3w8PD89P3w+Pj89P3w9PT98JiY/fFxcfFxcfD98W35eJT8qXFwvQF0vXG59KTtcbmRlbGV0ZSBwcmlzbS5sYW5ndWFnZXMub2JqZWN0aXZlY1snY2xhc3MtbmFtZSddO1xucHJpc20ubGFuZ3VhZ2VzLm9iamMgPSBwcmlzbS5sYW5ndWFnZXMub2JqZWN0aXZlYztcbi8qIFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLW9jYW1sXCIgKi9cbi8vIGh0dHBzOi8vb2NhbWwub3JnL21hbnVhbC9sZXguaHRtbFxuXG5wcmlzbS5sYW5ndWFnZXMub2NhbWwgPSB7XG4gICdjb21tZW50Jzoge1xuICAgIHBhdHRlcm46IC9cXChcXCpbXFxzXFxTXSo/XFwqXFwpLyxcbiAgICBncmVlZHk6IHRydWVcbiAgfSxcbiAgJ2NoYXInOiB7XG4gICAgcGF0dGVybjogLycoPzpbXlxcXFxcXHJcXG4nXXxcXFxcKD86Lnxbb3hdP1swLTlhLWZdezEsM30pKScvaSxcbiAgICBncmVlZHk6IHRydWVcbiAgfSxcbiAgJ3N0cmluZyc6IFt7XG4gICAgcGF0dGVybjogL1wiKD86XFxcXCg/OltcXHNcXFNdfFxcclxcbil8W15cXFxcXFxyXFxuXCJdKSpcIi8sXG4gICAgZ3JlZWR5OiB0cnVlXG4gIH0sIHtcbiAgICBwYXR0ZXJuOiAvXFx7KFthLXpfXSopXFx8W1xcc1xcU10qP1xcfFxcMVxcfS8sXG4gICAgZ3JlZWR5OiB0cnVlXG4gIH1dLFxuICAnbnVtYmVyJzogWy8vIGJpbmFyeSBhbmQgb2N0YWxcbiAgL1xcYig/OjBiWzAxXVswMV9dKnwwb1swLTddWzAtN19dKilcXGIvaSwgLy8gaGV4YWRlY2ltYWxcbiAgL1xcYjB4W2EtZjAtOV1bYS1mMC05X10qKD86XFwuW2EtZjAtOV9dKik/KD86cFsrLV0/XFxkW1xcZF9dKik/KD8hXFx3KS9pLCAvLyBkZWNpbWFsXG4gIC9cXGJcXGRbXFxkX10qKD86XFwuW1xcZF9dKik/KD86ZVsrLV0/XFxkW1xcZF9dKik/KD8hXFx3KS9pXSxcbiAgJ2RpcmVjdGl2ZSc6IHtcbiAgICBwYXR0ZXJuOiAvXFxCI1xcdysvLFxuICAgIGFsaWFzOiAncHJvcGVydHknXG4gIH0sXG4gICdsYWJlbCc6IHtcbiAgICBwYXR0ZXJuOiAvXFxCflxcdysvLFxuICAgIGFsaWFzOiAncHJvcGVydHknXG4gIH0sXG4gICd0eXBlLXZhcmlhYmxlJzoge1xuICAgIHBhdHRlcm46IC9cXEInXFx3Ky8sXG4gICAgYWxpYXM6ICdmdW5jdGlvbidcbiAgfSxcbiAgJ3ZhcmlhbnQnOiB7XG4gICAgcGF0dGVybjogL2BcXHcrLyxcbiAgICBhbGlhczogJ3N5bWJvbCdcbiAgfSxcbiAgLy8gRm9yIHRoZSBsaXN0IG9mIGtleXdvcmRzIGFuZCBvcGVyYXRvcnMsXG4gIC8vIHNlZTogaHR0cDovL2NhbWwuaW5yaWEuZnIvcHViL2RvY3MvbWFudWFsLW9jYW1sL2xleC5odG1sI3NlYzg0XG4gICdrZXl3b3JkJzogL1xcYig/OmFzfGFzc2VydHxiZWdpbnxjbGFzc3xjb25zdHJhaW50fGRvfGRvbmV8ZG93bnRvfGVsc2V8ZW5kfGV4Y2VwdGlvbnxleHRlcm5hbHxmb3J8ZnVufGZ1bmN0aW9ufGZ1bmN0b3J8aWZ8aW58aW5jbHVkZXxpbmhlcml0fGluaXRpYWxpemVyfGxhenl8bGV0fG1hdGNofG1ldGhvZHxtb2R1bGV8bXV0YWJsZXxuZXd8bm9ucmVjfG9iamVjdHxvZnxvcGVufHByaXZhdGV8cmVjfHNpZ3xzdHJ1Y3R8dGhlbnx0b3x0cnl8dHlwZXx2YWx8dmFsdWV8dmlydHVhbHx3aGVufHdoZXJlfHdoaWxlfHdpdGgpXFxiLyxcbiAgJ2Jvb2xlYW4nOiAvXFxiKD86ZmFsc2V8dHJ1ZSlcXGIvLFxuICAnb3BlcmF0b3ItbGlrZS1wdW5jdHVhdGlvbic6IHtcbiAgICBwYXR0ZXJuOiAvXFxbWzw+fF18Wz58XVxcXXxcXHs8fD5cXH0vLFxuICAgIGFsaWFzOiAncHVuY3R1YXRpb24nXG4gIH0sXG4gIC8vIEN1c3RvbSBvcGVyYXRvcnMgYXJlIGFsbG93ZWRcbiAgJ29wZXJhdG9yJzogL1xcLlsufl18Ols9Pl18Wz08PkBefCYrXFwtKlxcLyQlIT9+XVshJCUmKitcXC0uXFwvOjw9Pj9AXnx+XSp8XFxiKD86YW5kfGFzcnxsYW5kfGxvcnxsc2x8bHNyfGx4b3J8bW9kfG9yKVxcYi8sXG4gICdwdW5jdHVhdGlvbic6IC87O3w6OnxbKCl7fVxcW1xcXS4sOjsjXXxcXGJfXFxiL1xufTtcbi8qIFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXB5dGhvblwiICovXG5cbnByaXNtLmxhbmd1YWdlcy5weXRob24gPSB7XG4gICdjb21tZW50Jzoge1xuICAgIHBhdHRlcm46IC8oXnxbXlxcXFxdKSMuKi8sXG4gICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICBncmVlZHk6IHRydWVcbiAgfSxcbiAgJ3N0cmluZy1pbnRlcnBvbGF0aW9uJzoge1xuICAgIHBhdHRlcm46IC8oPzpmfGZyfHJmKSg/OihcIlwiXCJ8JycnKVtcXHNcXFNdKj9cXDF8KFwifCcpKD86XFxcXC58KD8hXFwyKVteXFxcXFxcclxcbl0pKlxcMikvaSxcbiAgICBncmVlZHk6IHRydWUsXG4gICAgaW5zaWRlOiB7XG4gICAgICAnaW50ZXJwb2xhdGlvbic6IHtcbiAgICAgICAgLy8gXCJ7XCIgPGV4cHJlc3Npb24+IDxvcHRpb25hbCBcIiFzXCIsIFwiIXJcIiwgb3IgXCIhYVwiPiA8b3B0aW9uYWwgXCI6XCIgZm9ybWF0IHNwZWNpZmllcj4gXCJ9XCJcbiAgICAgICAgcGF0dGVybjogLygoPzpefFtee10pKD86XFx7XFx7KSopXFx7KD8hXFx7KSg/Oltee31dfFxceyg/IVxceykoPzpbXnt9XXxcXHsoPyFcXHspKD86W157fV0pK1xcfSkrXFx9KStcXH0vLFxuICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICBpbnNpZGU6IHtcbiAgICAgICAgICAnZm9ybWF0LXNwZWMnOiB7XG4gICAgICAgICAgICBwYXR0ZXJuOiAvKDopW146KCl7fV0rKD89XFx9JCkvLFxuICAgICAgICAgICAgbG9va2JlaGluZDogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ2NvbnZlcnNpb24tb3B0aW9uJzoge1xuICAgICAgICAgICAgcGF0dGVybjogLyFbc3JhXSg/PVs6fV0kKS8sXG4gICAgICAgICAgICBhbGlhczogJ3B1bmN0dWF0aW9uJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVzdDogbnVsbFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ3N0cmluZyc6IC9bXFxzXFxTXSsvXG4gICAgfVxuICB9LFxuICAndHJpcGxlLXF1b3RlZC1zdHJpbmcnOiB7XG4gICAgcGF0dGVybjogLyg/OltydWJdfGJyfHJiKT8oXCJcIlwifCcnJylbXFxzXFxTXSo/XFwxL2ksXG4gICAgZ3JlZWR5OiB0cnVlLFxuICAgIGFsaWFzOiAnc3RyaW5nJ1xuICB9LFxuICAnc3RyaW5nJzoge1xuICAgIHBhdHRlcm46IC8oPzpbcnViXXxicnxyYik/KFwifCcpKD86XFxcXC58KD8hXFwxKVteXFxcXFxcclxcbl0pKlxcMS9pLFxuICAgIGdyZWVkeTogdHJ1ZVxuICB9LFxuICAnZnVuY3Rpb24nOiB7XG4gICAgcGF0dGVybjogLygoPzpefFxccylkZWZbIFxcdF0rKVthLXpBLVpfXVxcdyooPz1cXHMqXFwoKS9nLFxuICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgfSxcbiAgJ2NsYXNzLW5hbWUnOiB7XG4gICAgcGF0dGVybjogLyhcXGJjbGFzc1xccyspXFx3Ky9pLFxuICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgfSxcbiAgJ2RlY29yYXRvcic6IHtcbiAgICBwYXR0ZXJuOiAvKF5bXFx0IF0qKUBcXHcrKD86XFwuXFx3KykqL20sXG4gICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICBhbGlhczogWydhbm5vdGF0aW9uJywgJ3B1bmN0dWF0aW9uJ10sXG4gICAgaW5zaWRlOiB7XG4gICAgICAncHVuY3R1YXRpb24nOiAvXFwuL1xuICAgIH1cbiAgfSxcbiAgJ2tleXdvcmQnOiAvXFxiKD86Xyg/PVxccyo6KXxhbmR8YXN8YXNzZXJ0fGFzeW5jfGF3YWl0fGJyZWFrfGNhc2V8Y2xhc3N8Y29udGludWV8ZGVmfGRlbHxlbGlmfGVsc2V8ZXhjZXB0fGV4ZWN8ZmluYWxseXxmb3J8ZnJvbXxnbG9iYWx8aWZ8aW1wb3J0fGlufGlzfGxhbWJkYXxtYXRjaHxub25sb2NhbHxub3R8b3J8cGFzc3xwcmludHxyYWlzZXxyZXR1cm58dHJ5fHdoaWxlfHdpdGh8eWllbGQpXFxiLyxcbiAgJ2J1aWx0aW4nOiAvXFxiKD86X19pbXBvcnRfX3xhYnN8YWxsfGFueXxhcHBseXxhc2NpaXxiYXNlc3RyaW5nfGJpbnxib29sfGJ1ZmZlcnxieXRlYXJyYXl8Ynl0ZXN8Y2FsbGFibGV8Y2hyfGNsYXNzbWV0aG9kfGNtcHxjb2VyY2V8Y29tcGlsZXxjb21wbGV4fGRlbGF0dHJ8ZGljdHxkaXJ8ZGl2bW9kfGVudW1lcmF0ZXxldmFsfGV4ZWNmaWxlfGZpbGV8ZmlsdGVyfGZsb2F0fGZvcm1hdHxmcm96ZW5zZXR8Z2V0YXR0cnxnbG9iYWxzfGhhc2F0dHJ8aGFzaHxoZWxwfGhleHxpZHxpbnB1dHxpbnR8aW50ZXJufGlzaW5zdGFuY2V8aXNzdWJjbGFzc3xpdGVyfGxlbnxsaXN0fGxvY2Fsc3xsb25nfG1hcHxtYXh8bWVtb3J5dmlld3xtaW58bmV4dHxvYmplY3R8b2N0fG9wZW58b3JkfHBvd3xwcm9wZXJ0eXxyYW5nZXxyYXdfaW5wdXR8cmVkdWNlfHJlbG9hZHxyZXByfHJldmVyc2VkfHJvdW5kfHNldHxzZXRhdHRyfHNsaWNlfHNvcnRlZHxzdGF0aWNtZXRob2R8c3RyfHN1bXxzdXBlcnx0dXBsZXx0eXBlfHVuaWNocnx1bmljb2RlfHZhcnN8eHJhbmdlfHppcClcXGIvLFxuICAnYm9vbGVhbic6IC9cXGIoPzpGYWxzZXxOb25lfFRydWUpXFxiLyxcbiAgJ251bWJlcic6IC9cXGIwKD86Yig/Ol8/WzAxXSkrfG8oPzpfP1swLTddKSt8eCg/Ol8/W2EtZjAtOV0pKylcXGJ8KD86XFxiXFxkKyg/Ol9cXGQrKSooPzpcXC4oPzpcXGQrKD86X1xcZCspKik/KT98XFxCXFwuXFxkKyg/Ol9cXGQrKSopKD86ZVsrLV0/XFxkKyg/Ol9cXGQrKSopP2o/KD8hXFx3KS9pLFxuICAnb3BlcmF0b3InOiAvWy0rJT1dPT98IT18Oj18XFwqXFwqPz0/fFxcL1xcLz89P3w8Wzw9Pl0/fD5bPT5dP3xbJnxefl0vLFxuICAncHVuY3R1YXRpb24nOiAvW3t9W1xcXTsoKSwuOl0vXG59O1xucHJpc20ubGFuZ3VhZ2VzLnB5dGhvblsnc3RyaW5nLWludGVycG9sYXRpb24nXS5pbnNpZGVbJ2ludGVycG9sYXRpb24nXS5pbnNpZGUucmVzdCA9IHByaXNtLmxhbmd1YWdlcy5weXRob247XG5wcmlzbS5sYW5ndWFnZXMucHkgPSBwcmlzbS5sYW5ndWFnZXMucHl0aG9uO1xuLyogXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcmVhc29uXCIgKi9cblxucHJpc20ubGFuZ3VhZ2VzLnJlYXNvbiA9IHByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2NsaWtlJywge1xuICAnc3RyaW5nJzoge1xuICAgIHBhdHRlcm46IC9cIig/OlxcXFwoPzpcXHJcXG58W1xcc1xcU10pfFteXFxcXFxcclxcblwiXSkqXCIvLFxuICAgIGdyZWVkeTogdHJ1ZVxuICB9LFxuICAvLyAnY2xhc3MtbmFtZScgbXVzdCBiZSBtYXRjaGVkICphZnRlciogJ2NvbnN0cnVjdG9yJyBkZWZpbmVkIGJlbG93XG4gICdjbGFzcy1uYW1lJzogL1xcYltBLVpdXFx3Ki8sXG4gICdrZXl3b3JkJzogL1xcYig/OmFuZHxhc3xhc3NlcnR8YmVnaW58Y2xhc3N8Y29uc3RyYWludHxkb3xkb25lfGRvd250b3xlbHNlfGVuZHxleGNlcHRpb258ZXh0ZXJuYWx8Zm9yfGZ1bnxmdW5jdGlvbnxmdW5jdG9yfGlmfGlufGluY2x1ZGV8aW5oZXJpdHxpbml0aWFsaXplcnxsYXp5fGxldHxtZXRob2R8bW9kdWxlfG11dGFibGV8bmV3fG5vbnJlY3xvYmplY3R8b2Z8b3Blbnxvcnxwcml2YXRlfHJlY3xzaWd8c3RydWN0fHN3aXRjaHx0aGVufHRvfHRyeXx0eXBlfHZhbHx2aXJ0dWFsfHdoZW58d2hpbGV8d2l0aClcXGIvLFxuICAnb3BlcmF0b3InOiAvXFwuezN9fDpbOj1dfFxcfD58LT58PSg/Oj09P3w+KT98PD0/fD49P3xbfF4/JyMhfmBdfFsrXFwtKlxcL11cXC4/fFxcYig/OmFzcnxsYW5kfGxvcnxsc2x8bHNyfGx4b3J8bW9kKVxcYi9cbn0pO1xucHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgncmVhc29uJywgJ2NsYXNzLW5hbWUnLCB7XG4gICdjaGFyJzoge1xuICAgIHBhdHRlcm46IC8nKD86XFxcXHhbXFxkYS1mXXsyfXxcXFxcb1swLTNdWzAtN11bMC03XXxcXFxcXFxkezN9fFxcXFwufFteJ1xcXFxcXHJcXG5dKScvLFxuICAgIGdyZWVkeTogdHJ1ZVxuICB9LFxuICAvLyBOZWdhdGl2ZSBsb29rLWFoZWFkIHByZXZlbnRzIGZyb20gbWF0Y2hpbmcgdGhpbmdzIGxpa2UgU3RyaW5nLmNhcGl0YWxpemVcbiAgJ2NvbnN0cnVjdG9yJzogL1xcYltBLVpdXFx3KlxcYig/IVxccypcXC4pLyxcbiAgJ2xhYmVsJzoge1xuICAgIHBhdHRlcm46IC9cXGJbYS16XVxcdyooPz06OikvLFxuICAgIGFsaWFzOiAnc3ltYm9sJ1xuICB9XG59KTsgLy8gV2UgY2FuJ3QgbWF0Y2ggZnVuY3Rpb25zIHByb3BlcnR5LCBzbyBsZXQncyBub3QgZXZlbiB0cnkuXG5cbmRlbGV0ZSBwcmlzbS5sYW5ndWFnZXMucmVhc29uLmZ1bmN0aW9uO1xuLyogXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tc2Fzc1wiICovXG5cbihmdW5jdGlvbiAoUHJpc20pIHtcbiAgUHJpc20ubGFuZ3VhZ2VzLnNhc3MgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjc3MnLCB7XG4gICAgLy8gU2FzcyBjb21tZW50cyBkb24ndCBuZWVkIHRvIGJlIGNsb3NlZCwgb25seSBpbmRlbnRlZFxuICAgICdjb21tZW50Jzoge1xuICAgICAgcGF0dGVybjogL14oWyBcXHRdKilcXC9bXFwvKl0uKig/Oig/Olxccj9cXG58XFxyKVxcMVsgXFx0XS4rKSovbSxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBncmVlZHk6IHRydWVcbiAgICB9XG4gIH0pO1xuICBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdzYXNzJywgJ2F0cnVsZScsIHtcbiAgICAvLyBXZSB3YW50IHRvIGNvbnN1bWUgdGhlIHdob2xlIGxpbmVcbiAgICAnYXRydWxlLWxpbmUnOiB7XG4gICAgICAvLyBJbmNsdWRlcyBzdXBwb3J0IGZvciA9IGFuZCArIHNob3J0Y3V0c1xuICAgICAgcGF0dGVybjogL14oPzpbIFxcdF0qKVtAKz1dLisvbSxcbiAgICAgIGdyZWVkeTogdHJ1ZSxcbiAgICAgIGluc2lkZToge1xuICAgICAgICAnYXRydWxlJzogLyg/OkBbXFx3LV0rfFsrPV0pL1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIGRlbGV0ZSBQcmlzbS5sYW5ndWFnZXMuc2Fzcy5hdHJ1bGU7XG4gIHZhciB2YXJpYWJsZSA9IC9cXCRbLVxcd10rfCNcXHtcXCRbLVxcd10rXFx9LztcbiAgdmFyIG9wZXJhdG9yID0gWy9bKypcXC8lXXxbPSFdPXw8PT98Pj0/fFxcYig/OmFuZHxub3R8b3IpXFxiLywge1xuICAgIHBhdHRlcm46IC8oXFxzKS0oPz1cXHMpLyxcbiAgICBsb29rYmVoaW5kOiB0cnVlXG4gIH1dO1xuICBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdzYXNzJywgJ3Byb3BlcnR5Jywge1xuICAgIC8vIFdlIHdhbnQgdG8gY29uc3VtZSB0aGUgd2hvbGUgbGluZVxuICAgICd2YXJpYWJsZS1saW5lJzoge1xuICAgICAgcGF0dGVybjogL15bIFxcdF0qXFwkLisvbSxcbiAgICAgIGdyZWVkeTogdHJ1ZSxcbiAgICAgIGluc2lkZToge1xuICAgICAgICAncHVuY3R1YXRpb24nOiAvOi8sXG4gICAgICAgICd2YXJpYWJsZSc6IHZhcmlhYmxlLFxuICAgICAgICAnb3BlcmF0b3InOiBvcGVyYXRvclxuICAgICAgfVxuICAgIH0sXG4gICAgLy8gV2Ugd2FudCB0byBjb25zdW1lIHRoZSB3aG9sZSBsaW5lXG4gICAgJ3Byb3BlcnR5LWxpbmUnOiB7XG4gICAgICBwYXR0ZXJuOiAvXlsgXFx0XSooPzpbXjpcXHNdKyAqOi4qfDpbXjpcXHNdLiopL20sXG4gICAgICBncmVlZHk6IHRydWUsXG4gICAgICBpbnNpZGU6IHtcbiAgICAgICAgJ3Byb3BlcnR5JzogWy9bXjpcXHNdKyg/PVxccyo6KS8sIHtcbiAgICAgICAgICBwYXR0ZXJuOiAvKDopW146XFxzXSsvLFxuICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICAgICAgfV0sXG4gICAgICAgICdwdW5jdHVhdGlvbic6IC86LyxcbiAgICAgICAgJ3ZhcmlhYmxlJzogdmFyaWFibGUsXG4gICAgICAgICdvcGVyYXRvcic6IG9wZXJhdG9yLFxuICAgICAgICAnaW1wb3J0YW50JzogUHJpc20ubGFuZ3VhZ2VzLnNhc3MuaW1wb3J0YW50XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgZGVsZXRlIFByaXNtLmxhbmd1YWdlcy5zYXNzLnByb3BlcnR5O1xuICBkZWxldGUgUHJpc20ubGFuZ3VhZ2VzLnNhc3MuaW1wb3J0YW50OyAvLyBOb3cgdGhhdCB3aG9sZSBsaW5lcyBmb3Igb3RoZXIgcGF0dGVybnMgYXJlIGNvbnN1bWVkLFxuICAvLyB3aGF0J3MgbGVmdCBzaG91bGQgYmUgc2VsZWN0b3JzXG5cbiAgUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnc2FzcycsICdwdW5jdHVhdGlvbicsIHtcbiAgICAnc2VsZWN0b3InOiB7XG4gICAgICBwYXR0ZXJuOiAvXihbIFxcdF0qKVxcUyg/OixbXixcXHJcXG5dK3xbXixcXHJcXG5dKikoPzosW14sXFxyXFxuXSspKig/OiwoPzpcXHI/XFxufFxccilcXDFbIFxcdF0rXFxTKD86LFteLFxcclxcbl0rfFteLFxcclxcbl0qKSg/OixbXixcXHJcXG5dKykqKSovbSxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBncmVlZHk6IHRydWVcbiAgICB9XG4gIH0pO1xufSkocHJpc20pO1xuLyogXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tc2Nzc1wiICovXG5cblxucHJpc20ubGFuZ3VhZ2VzLnNjc3MgPSBwcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjc3MnLCB7XG4gICdjb21tZW50Jzoge1xuICAgIHBhdHRlcm46IC8oXnxbXlxcXFxdKSg/OlxcL1xcKltcXHNcXFNdKj9cXCpcXC98XFwvXFwvLiopLyxcbiAgICBsb29rYmVoaW5kOiB0cnVlXG4gIH0sXG4gICdhdHJ1bGUnOiB7XG4gICAgcGF0dGVybjogL0BbXFx3LV0oPzpcXChbXigpXStcXCl8W14oKVxcc118XFxzKyg/IVxccykpKj8oPz1cXHMrW3s7XSkvLFxuICAgIGluc2lkZToge1xuICAgICAgJ3J1bGUnOiAvQFtcXHctXSsvIC8vIFNlZSByZXN0IGJlbG93XG5cbiAgICB9XG4gIH0sXG4gIC8vIHVybCwgY29tcGFzc2lmaWVkXG4gICd1cmwnOiAvKD86Wy1hLXpdKy0pP3VybCg/PVxcKCkvaSxcbiAgLy8gQ1NTIHNlbGVjdG9yIHJlZ2V4IGlzIG5vdCBhcHByb3ByaWF0ZSBmb3IgU2Fzc1xuICAvLyBzaW5jZSB0aGVyZSBjYW4gYmUgbG90IG1vcmUgdGhpbmdzICh2YXIsIEAgZGlyZWN0aXZlLCBuZXN0aW5nLi4pXG4gIC8vIGEgc2VsZWN0b3IgbXVzdCBzdGFydCBhdCB0aGUgZW5kIG9mIGEgcHJvcGVydHkgb3IgYWZ0ZXIgYSBicmFjZSAoZW5kIG9mIG90aGVyIHJ1bGVzIG9yIG5lc3RpbmcpXG4gIC8vIGl0IGNhbiBjb250YWluIHNvbWUgY2hhcmFjdGVycyB0aGF0IGFyZW4ndCB1c2VkIGZvciBkZWZpbmluZyBydWxlcyBvciBlbmQgb2Ygc2VsZWN0b3IsICYgKHBhcmVudCBzZWxlY3RvciksIG9yIGludGVycG9sYXRlZCB2YXJpYWJsZVxuICAvLyB0aGUgZW5kIG9mIGEgc2VsZWN0b3IgaXMgZm91bmQgd2hlbiB0aGVyZSBpcyBubyBydWxlcyBpbiBpdCAoIHt9IG9yIHtcXHN9KSBvciBpZiB0aGVyZSBpcyBhIHByb3BlcnR5IChiZWNhdXNlIGFuIGludGVycG9sYXRlZCB2YXJcbiAgLy8gY2FuIFwicGFzc1wiIGFzIGEgc2VsZWN0b3ItIGUuZzogcHJvcGVyI3skZXJ0eX0pXG4gIC8vIHRoaXMgb25lIHdhcyBoYXJkIHRvIGRvLCBzbyBwbGVhc2UgYmUgY2FyZWZ1bCBpZiB5b3UgZWRpdCB0aGlzIG9uZSA6KVxuICAnc2VsZWN0b3InOiB7XG4gICAgLy8gSW5pdGlhbCBsb29rLWFoZWFkIGlzIHVzZWQgdG8gcHJldmVudCBtYXRjaGluZyBvZiBibGFuayBzZWxlY3RvcnNcbiAgICBwYXR0ZXJuOiAvKD89XFxTKVteQDt7fSgpXT8oPzpbXkA7e30oKVxcc118XFxzKyg/IVxccyl8I1xce1xcJFstXFx3XStcXH0pKyg/PVxccypcXHsoPzpcXH18XFxzfFtefV1bXjp7fV0qWzp7XVtefV0pKS8sXG4gICAgaW5zaWRlOiB7XG4gICAgICAncGFyZW50Jzoge1xuICAgICAgICBwYXR0ZXJuOiAvJi8sXG4gICAgICAgIGFsaWFzOiAnaW1wb3J0YW50J1xuICAgICAgfSxcbiAgICAgICdwbGFjZWhvbGRlcic6IC8lWy1cXHddKy8sXG4gICAgICAndmFyaWFibGUnOiAvXFwkWy1cXHddK3wjXFx7XFwkWy1cXHddK1xcfS9cbiAgICB9XG4gIH0sXG4gICdwcm9wZXJ0eSc6IHtcbiAgICBwYXR0ZXJuOiAvKD86Wy1cXHddfFxcJFstXFx3XXwjXFx7XFwkWy1cXHddK1xcfSkrKD89XFxzKjopLyxcbiAgICBpbnNpZGU6IHtcbiAgICAgICd2YXJpYWJsZSc6IC9cXCRbLVxcd10rfCNcXHtcXCRbLVxcd10rXFx9L1xuICAgIH1cbiAgfVxufSk7XG5wcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdzY3NzJywgJ2F0cnVsZScsIHtcbiAgJ2tleXdvcmQnOiBbL0AoPzpjb250ZW50fGRlYnVnfGVhY2h8ZWxzZSg/OiBpZik/fGV4dGVuZHxmb3J8Zm9yd2FyZHxmdW5jdGlvbnxpZnxpbXBvcnR8aW5jbHVkZXxtaXhpbnxyZXR1cm58dXNlfHdhcm58d2hpbGUpXFxiL2ksIHtcbiAgICBwYXR0ZXJuOiAvKCApKD86ZnJvbXx0aHJvdWdoKSg/PSApLyxcbiAgICBsb29rYmVoaW5kOiB0cnVlXG4gIH1dXG59KTtcbnByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ3Njc3MnLCAnaW1wb3J0YW50Jywge1xuICAvLyB2YXIgYW5kIGludGVycG9sYXRlZCB2YXJzXG4gICd2YXJpYWJsZSc6IC9cXCRbLVxcd10rfCNcXHtcXCRbLVxcd10rXFx9L1xufSk7XG5wcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdzY3NzJywgJ2Z1bmN0aW9uJywge1xuICAnbW9kdWxlLW1vZGlmaWVyJzoge1xuICAgIHBhdHRlcm46IC9cXGIoPzphc3xoaWRlfHNob3d8d2l0aClcXGIvaSxcbiAgICBhbGlhczogJ2tleXdvcmQnXG4gIH0sXG4gICdwbGFjZWhvbGRlcic6IHtcbiAgICBwYXR0ZXJuOiAvJVstXFx3XSsvLFxuICAgIGFsaWFzOiAnc2VsZWN0b3InXG4gIH0sXG4gICdzdGF0ZW1lbnQnOiB7XG4gICAgcGF0dGVybjogL1xcQiEoPzpkZWZhdWx0fG9wdGlvbmFsKVxcYi9pLFxuICAgIGFsaWFzOiAna2V5d29yZCdcbiAgfSxcbiAgJ2Jvb2xlYW4nOiAvXFxiKD86ZmFsc2V8dHJ1ZSlcXGIvLFxuICAnbnVsbCc6IHtcbiAgICBwYXR0ZXJuOiAvXFxibnVsbFxcYi8sXG4gICAgYWxpYXM6ICdrZXl3b3JkJ1xuICB9LFxuICAnb3BlcmF0b3InOiB7XG4gICAgcGF0dGVybjogLyhcXHMpKD86Wy0rKlxcLyVdfFs9IV09fDw9P3w+PT98YW5kfG5vdHxvcikoPz1cXHMpLyxcbiAgICBsb29rYmVoaW5kOiB0cnVlXG4gIH1cbn0pO1xucHJpc20ubGFuZ3VhZ2VzLnNjc3NbJ2F0cnVsZSddLmluc2lkZS5yZXN0ID0gcHJpc20ubGFuZ3VhZ2VzLnNjc3M7XG4vKiBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1zdHlsdXNcIiAqL1xuXG4oZnVuY3Rpb24gKFByaXNtKSB7XG4gIHZhciB1bml0ID0ge1xuICAgIHBhdHRlcm46IC8oXFxiXFxkKykoPzolfFthLXpdKykvLFxuICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgfTsgLy8gMTIzIC0xMjMgLjEyMyAtLjEyMyAxMi4zIC0xMi4zXG5cbiAgdmFyIG51bWJlciA9IHtcbiAgICBwYXR0ZXJuOiAvKF58W15cXHcuLV0pLT8oPzpcXGQrKD86XFwuXFxkKyk/fFxcLlxcZCspLyxcbiAgICBsb29rYmVoaW5kOiB0cnVlXG4gIH07XG4gIHZhciBpbnNpZGUgPSB7XG4gICAgJ2NvbW1lbnQnOiB7XG4gICAgICBwYXR0ZXJuOiAvKF58W15cXFxcXSkoPzpcXC9cXCpbXFxzXFxTXSo/XFwqXFwvfFxcL1xcLy4qKS8sXG4gICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgfSxcbiAgICAndXJsJzoge1xuICAgICAgcGF0dGVybjogL1xcYnVybFxcKChbXCInXT8pLio/XFwxXFwpL2ksXG4gICAgICBncmVlZHk6IHRydWVcbiAgICB9LFxuICAgICdzdHJpbmcnOiB7XG4gICAgICBwYXR0ZXJuOiAvKFwifCcpKD86KD8hXFwxKVteXFxcXFxcclxcbl18XFxcXCg/OlxcclxcbnxbXFxzXFxTXSkpKlxcMS8sXG4gICAgICBncmVlZHk6IHRydWVcbiAgICB9LFxuICAgICdpbnRlcnBvbGF0aW9uJzogbnVsbCxcbiAgICAvLyBTZWUgYmVsb3dcbiAgICAnZnVuYyc6IG51bGwsXG4gICAgLy8gU2VlIGJlbG93XG4gICAgJ2ltcG9ydGFudCc6IC9cXEIhKD86aW1wb3J0YW50fG9wdGlvbmFsKVxcYi9pLFxuICAgICdrZXl3b3JkJzoge1xuICAgICAgcGF0dGVybjogLyhefFxccyspKD86KD86ZWxzZXxmb3J8aWZ8cmV0dXJufHVubGVzcykoPz1cXHN8JCl8QFtcXHctXSspLyxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICB9LFxuICAgICdoZXhjb2RlJzogLyNbXFxkYS1mXXszLDZ9L2ksXG4gICAgJ2NvbG9yJzogWy9cXGIoPzpBbGljZUJsdWV8QW50aXF1ZVdoaXRlfEFxdWF8QXF1YW1hcmluZXxBenVyZXxCZWlnZXxCaXNxdWV8QmxhY2t8QmxhbmNoZWRBbG1vbmR8Qmx1ZXxCbHVlVmlvbGV0fEJyb3dufEJ1cmx5V29vZHxDYWRldEJsdWV8Q2hhcnRyZXVzZXxDaG9jb2xhdGV8Q29yYWx8Q29ybmZsb3dlckJsdWV8Q29ybnNpbGt8Q3JpbXNvbnxDeWFufERhcmtCbHVlfERhcmtDeWFufERhcmtHb2xkZW5Sb2R8RGFya0dyW2FlXXl8RGFya0dyZWVufERhcmtLaGFraXxEYXJrTWFnZW50YXxEYXJrT2xpdmVHcmVlbnxEYXJrT3JhbmdlfERhcmtPcmNoaWR8RGFya1JlZHxEYXJrU2FsbW9ufERhcmtTZWFHcmVlbnxEYXJrU2xhdGVCbHVlfERhcmtTbGF0ZUdyW2FlXXl8RGFya1R1cnF1b2lzZXxEYXJrVmlvbGV0fERlZXBQaW5rfERlZXBTa3lCbHVlfERpbUdyW2FlXXl8RG9kZ2VyQmx1ZXxGaXJlQnJpY2t8RmxvcmFsV2hpdGV8Rm9yZXN0R3JlZW58RnVjaHNpYXxHYWluc2Jvcm98R2hvc3RXaGl0ZXxHb2xkfEdvbGRlblJvZHxHclthZV15fEdyZWVufEdyZWVuWWVsbG93fEhvbmV5RGV3fEhvdFBpbmt8SW5kaWFuUmVkfEluZGlnb3xJdm9yeXxLaGFraXxMYXZlbmRlcnxMYXZlbmRlckJsdXNofExhd25HcmVlbnxMZW1vbkNoaWZmb258TGlnaHRCbHVlfExpZ2h0Q29yYWx8TGlnaHRDeWFufExpZ2h0R29sZGVuUm9kWWVsbG93fExpZ2h0R3JbYWVdeXxMaWdodEdyZWVufExpZ2h0UGlua3xMaWdodFNhbG1vbnxMaWdodFNlYUdyZWVufExpZ2h0U2t5Qmx1ZXxMaWdodFNsYXRlR3JbYWVdeXxMaWdodFN0ZWVsQmx1ZXxMaWdodFllbGxvd3xMaW1lfExpbWVHcmVlbnxMaW5lbnxNYWdlbnRhfE1hcm9vbnxNZWRpdW1BcXVhTWFyaW5lfE1lZGl1bUJsdWV8TWVkaXVtT3JjaGlkfE1lZGl1bVB1cnBsZXxNZWRpdW1TZWFHcmVlbnxNZWRpdW1TbGF0ZUJsdWV8TWVkaXVtU3ByaW5nR3JlZW58TWVkaXVtVHVycXVvaXNlfE1lZGl1bVZpb2xldFJlZHxNaWRuaWdodEJsdWV8TWludENyZWFtfE1pc3R5Um9zZXxNb2NjYXNpbnxOYXZham9XaGl0ZXxOYXZ5fE9sZExhY2V8T2xpdmV8T2xpdmVEcmFifE9yYW5nZXxPcmFuZ2VSZWR8T3JjaGlkfFBhbGVHb2xkZW5Sb2R8UGFsZUdyZWVufFBhbGVUdXJxdW9pc2V8UGFsZVZpb2xldFJlZHxQYXBheWFXaGlwfFBlYWNoUHVmZnxQZXJ1fFBpbmt8UGx1bXxQb3dkZXJCbHVlfFB1cnBsZXxSZWR8Um9zeUJyb3dufFJveWFsQmx1ZXxTYWRkbGVCcm93bnxTYWxtb258U2FuZHlCcm93bnxTZWFHcmVlbnxTZWFTaGVsbHxTaWVubmF8U2lsdmVyfFNreUJsdWV8U2xhdGVCbHVlfFNsYXRlR3JbYWVdeXxTbm93fFNwcmluZ0dyZWVufFN0ZWVsQmx1ZXxUYW58VGVhbHxUaGlzdGxlfFRvbWF0b3xUcmFuc3BhcmVudHxUdXJxdW9pc2V8VmlvbGV0fFdoZWF0fFdoaXRlfFdoaXRlU21va2V8WWVsbG93fFllbGxvd0dyZWVuKVxcYi9pLCB7XG4gICAgICBwYXR0ZXJuOiAvXFxiKD86aHNsfHJnYilcXChcXHMqXFxkezEsM31cXHMqLFxccypcXGR7MSwzfSU/XFxzKixcXHMqXFxkezEsM30lP1xccypcXClcXEJ8XFxiKD86aHNsfHJnYilhXFwoXFxzKlxcZHsxLDN9XFxzKixcXHMqXFxkezEsM30lP1xccyosXFxzKlxcZHsxLDN9JT9cXHMqLFxccyooPzowfDA/XFwuXFxkK3wxKVxccypcXClcXEIvaSxcbiAgICAgIGluc2lkZToge1xuICAgICAgICAndW5pdCc6IHVuaXQsXG4gICAgICAgICdudW1iZXInOiBudW1iZXIsXG4gICAgICAgICdmdW5jdGlvbic6IC9bXFx3LV0rKD89XFwoKS8sXG4gICAgICAgICdwdW5jdHVhdGlvbic6IC9bKCksXS9cbiAgICAgIH1cbiAgICB9XSxcbiAgICAnZW50aXR5JzogL1xcXFxbXFxkYS1mXXsxLDh9L2ksXG4gICAgJ3VuaXQnOiB1bml0LFxuICAgICdib29sZWFuJzogL1xcYig/OmZhbHNlfHRydWUpXFxiLyxcbiAgICAnb3BlcmF0b3InOiBbLy8gV2Ugd2FudCBub24td29yZCBjaGFycyBhcm91bmQgXCItXCIgYmVjYXVzZSBpdCBpc1xuICAgIC8vIGFjY2VwdGVkIGluIHByb3BlcnR5IG5hbWVzLlxuICAgIC9+fFsrIVxcLyU8Pj89XT0/fFstOl09fFxcKlsqPV0/fFxcLnsyLDN9fCYmfFxcfFxcfHxcXEItXFxCfFxcYig/OmFuZHxpbnxpcyg/OiBhfCBkZWZpbmVkfCBub3R8bnQpP3xub3R8b3IpXFxiL10sXG4gICAgJ251bWJlcic6IG51bWJlcixcbiAgICAncHVuY3R1YXRpb24nOiAvW3t9KClcXFtcXF07OixdL1xuICB9O1xuICBpbnNpZGVbJ2ludGVycG9sYXRpb24nXSA9IHtcbiAgICBwYXR0ZXJuOiAvXFx7W15cXHJcXG59Ol0rXFx9LyxcbiAgICBhbGlhczogJ3ZhcmlhYmxlJyxcbiAgICBpbnNpZGU6IHtcbiAgICAgICdkZWxpbWl0ZXInOiB7XG4gICAgICAgIHBhdHRlcm46IC9eXFx7fFxcfSQvLFxuICAgICAgICBhbGlhczogJ3B1bmN0dWF0aW9uJ1xuICAgICAgfSxcbiAgICAgIHJlc3Q6IGluc2lkZVxuICAgIH1cbiAgfTtcbiAgaW5zaWRlWydmdW5jJ10gPSB7XG4gICAgcGF0dGVybjogL1tcXHctXStcXChbXildKlxcKS4qLyxcbiAgICBpbnNpZGU6IHtcbiAgICAgICdmdW5jdGlvbic6IC9eW14oXSsvLFxuICAgICAgcmVzdDogaW5zaWRlXG4gICAgfVxuICB9O1xuICBQcmlzbS5sYW5ndWFnZXMuc3R5bHVzID0ge1xuICAgICdhdHJ1bGUtZGVjbGFyYXRpb24nOiB7XG4gICAgICBwYXR0ZXJuOiAvKF5bIFxcdF0qKUAuKy9tLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgIGluc2lkZToge1xuICAgICAgICAnYXRydWxlJzogL15AW1xcdy1dKy8sXG4gICAgICAgIHJlc3Q6IGluc2lkZVxuICAgICAgfVxuICAgIH0sXG4gICAgJ3ZhcmlhYmxlLWRlY2xhcmF0aW9uJzoge1xuICAgICAgcGF0dGVybjogLyheWyBcXHRdKilbXFx3JC1dK1xccyouPz1bIFxcdF0qKD86XFx7W157fV0qXFx9fFxcUy4qfCQpL20sXG4gICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgaW5zaWRlOiB7XG4gICAgICAgICd2YXJpYWJsZSc6IC9eXFxTKy8sXG4gICAgICAgIHJlc3Q6IGluc2lkZVxuICAgICAgfVxuICAgIH0sXG4gICAgJ3N0YXRlbWVudCc6IHtcbiAgICAgIHBhdHRlcm46IC8oXlsgXFx0XSopKD86ZWxzZXxmb3J8aWZ8cmV0dXJufHVubGVzcylbIFxcdF0uKy9tLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgIGluc2lkZToge1xuICAgICAgICAna2V5d29yZCc6IC9eXFxTKy8sXG4gICAgICAgIHJlc3Q6IGluc2lkZVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8gQSBwcm9wZXJ0eS92YWx1ZSBwYWlyIGNhbm5vdCBlbmQgd2l0aCBhIGNvbW1hIG9yIGEgYnJhY2VcbiAgICAvLyBJdCBjYW5ub3QgaGF2ZSBpbmRlbnRlZCBjb250ZW50IHVubGVzcyBpdCBlbmRlZCB3aXRoIGEgc2VtaWNvbG9uXG4gICAgJ3Byb3BlcnR5LWRlY2xhcmF0aW9uJzoge1xuICAgICAgcGF0dGVybjogLygoPzpefFxceykoWyBcXHRdKikpKD86W1xcdy1dfFxce1tefVxcclxcbl0rXFx9KSsoPzpcXHMqOlxccyp8WyBcXHRdKykoPyFcXHMpW157XFxyXFxuXSooPzo7fFtee1xcclxcbixdJCg/ISg/Olxccj9cXG58XFxyKSg/Olxce3xcXDJbIFxcdF0pKSkvbSxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBpbnNpZGU6IHtcbiAgICAgICAgJ3Byb3BlcnR5Jzoge1xuICAgICAgICAgIHBhdHRlcm46IC9eW15cXHM6XSsvLFxuICAgICAgICAgIGluc2lkZToge1xuICAgICAgICAgICAgJ2ludGVycG9sYXRpb24nOiBpbnNpZGUuaW50ZXJwb2xhdGlvblxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVzdDogaW5zaWRlXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyBBIHNlbGVjdG9yIGNhbiBjb250YWluIHBhcmVudGhlc2VzIG9ubHkgYXMgcGFydCBvZiBhIHBzZXVkby1lbGVtZW50XG4gICAgLy8gSXQgY2FuIHNwYW4gbXVsdGlwbGUgbGluZXMuXG4gICAgLy8gSXQgbXVzdCBlbmQgd2l0aCBhIGNvbW1hIG9yIGFuIGFjY29sYWRlIG9yIGhhdmUgaW5kZW50ZWQgY29udGVudC5cbiAgICAnc2VsZWN0b3InOiB7XG4gICAgICBwYXR0ZXJuOiAvKF5bIFxcdF0qKSg/Oig/PVxcUykoPzpbXnt9XFxyXFxuOigpXXw6Oj9bXFx3LV0rKD86XFwoW14pXFxyXFxuXSpcXCl8KD8hW1xcdy1dKSl8XFx7W159XFxyXFxuXStcXH0pKykoPzooPzpcXHI/XFxufFxccikoPzpcXDEoPzooPz1cXFMpKD86W157fVxcclxcbjooKV18Ojo/W1xcdy1dKyg/OlxcKFteKVxcclxcbl0qXFwpfCg/IVtcXHctXSkpfFxce1tefVxcclxcbl0rXFx9KSspKSkqKD86LCR8XFx7fCg/PSg/Olxccj9cXG58XFxyKSg/Olxce3xcXDFbIFxcdF0pKSkvbSxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBpbnNpZGU6IHtcbiAgICAgICAgJ2ludGVycG9sYXRpb24nOiBpbnNpZGUuaW50ZXJwb2xhdGlvbixcbiAgICAgICAgJ2NvbW1lbnQnOiBpbnNpZGUuY29tbWVudCxcbiAgICAgICAgJ3B1bmN0dWF0aW9uJzogL1t7fSxdL1xuICAgICAgfVxuICAgIH0sXG4gICAgJ2Z1bmMnOiBpbnNpZGUuZnVuYyxcbiAgICAnc3RyaW5nJzogaW5zaWRlLnN0cmluZyxcbiAgICAnY29tbWVudCc6IHtcbiAgICAgIHBhdHRlcm46IC8oXnxbXlxcXFxdKSg/OlxcL1xcKltcXHNcXFNdKj9cXCpcXC98XFwvXFwvLiopLyxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBncmVlZHk6IHRydWVcbiAgICB9LFxuICAgICdpbnRlcnBvbGF0aW9uJzogaW5zaWRlLmludGVycG9sYXRpb24sXG4gICAgJ3B1bmN0dWF0aW9uJzogL1t7fSgpXFxbXFxdOzouXS9cbiAgfTtcbn0pKHByaXNtKTtcbi8qIFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXRzeFwiICovXG5cblxuKGZ1bmN0aW9uIChQcmlzbSkge1xuICB2YXIgdHlwZXNjcmlwdCA9IFByaXNtLnV0aWwuY2xvbmUoUHJpc20ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQpO1xuICBQcmlzbS5sYW5ndWFnZXMudHN4ID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnanN4JywgdHlwZXNjcmlwdCk7IC8vIGRvZXNuJ3Qgd29yayB3aXRoIFRTIGJlY2F1c2UgVFMgaXMgdG9vIGNvbXBsZXhcblxuICBkZWxldGUgUHJpc20ubGFuZ3VhZ2VzLnRzeFsncGFyYW1ldGVyJ107XG4gIGRlbGV0ZSBQcmlzbS5sYW5ndWFnZXMudHN4WydsaXRlcmFsLXByb3BlcnR5J107IC8vIFRoaXMgd2lsbCBwcmV2ZW50IGNvbGxpc2lvbnMgYmV0d2VlbiBUU1ggdGFncyBhbmQgVFMgZ2VuZXJpYyB0eXBlcy5cbiAgLy8gSWRlYSBieSBodHRwczovL2dpdGh1Yi5jb20va2FybGhvcmt5XG4gIC8vIERpc2N1c3Npb246IGh0dHBzOi8vZ2l0aHViLmNvbS9QcmlzbUpTL3ByaXNtL2lzc3Vlcy8yNTk0I2lzc3VlY29tbWVudC03MTA2NjY5MjhcblxuICB2YXIgdGFnID0gUHJpc20ubGFuZ3VhZ2VzLnRzeC50YWc7XG4gIHRhZy5wYXR0ZXJuID0gUmVnRXhwKC8oXnxbXlxcdyRdfCg/PTxcXC8pKS8uc291cmNlICsgJyg/OicgKyB0YWcucGF0dGVybi5zb3VyY2UgKyAnKScsIHRhZy5wYXR0ZXJuLmZsYWdzKTtcbiAgdGFnLmxvb2tiZWhpbmQgPSB0cnVlO1xufSkocHJpc20pO1xuLyogXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20td2FzbVwiICovXG5cblxucHJpc20ubGFuZ3VhZ2VzLndhc20gPSB7XG4gICdjb21tZW50JzogWy9cXCg7W1xcc1xcU10qPztcXCkvLCB7XG4gICAgcGF0dGVybjogLzs7LiovLFxuICAgIGdyZWVkeTogdHJ1ZVxuICB9XSxcbiAgJ3N0cmluZyc6IHtcbiAgICBwYXR0ZXJuOiAvXCIoPzpcXFxcW1xcc1xcU118W15cIlxcXFxdKSpcIi8sXG4gICAgZ3JlZWR5OiB0cnVlXG4gIH0sXG4gICdrZXl3b3JkJzogW3tcbiAgICBwYXR0ZXJuOiAvXFxiKD86YWxpZ258b2Zmc2V0KT0vLFxuICAgIGluc2lkZToge1xuICAgICAgJ29wZXJhdG9yJzogLz0vXG4gICAgfVxuICB9LCB7XG4gICAgcGF0dGVybjogL1xcYig/Oig/OmYzMnxmNjR8aTMyfGk2NCkoPzpcXC4oPzphYnN8YWRkfGFuZHxjZWlsfGNsenxjb25zdHxjb252ZXJ0X1tzdV1cXC9pKD86MzJ8NjQpfGNvcHlzaWdufGN0enxkZW1vdGVcXC9mNjR8ZGl2KD86X1tzdV0pP3xlcXo/fGV4dGVuZF9bc3VdXFwvaTMyfGZsb29yfGdlKD86X1tzdV0pP3xndCg/Ol9bc3VdKT98bGUoPzpfW3N1XSk/fGxvYWQoPzooPzo4fDE2fDMyKV9bc3VdKT98bHQoPzpfW3N1XSk/fG1heHxtaW58bXVsfG5lZz98bmVhcmVzdHxvcnxwb3BjbnR8cHJvbW90ZVxcL2YzMnxyZWludGVycHJldFxcL1tmaV0oPzozMnw2NCl8cmVtX1tzdV18cm90W2xyXXxzaGx8c2hyX1tzdV18c3FydHxzdG9yZSg/Ojh8MTZ8MzIpP3xzdWJ8dHJ1bmMoPzpfW3N1XVxcL2YoPzozMnw2NCkpP3x3cmFwXFwvaTY0fHhvcikpP3xtZW1vcnlcXC4oPzpncm93fHNpemUpKVxcYi8sXG4gICAgaW5zaWRlOiB7XG4gICAgICAncHVuY3R1YXRpb24nOiAvXFwuL1xuICAgIH1cbiAgfSwgL1xcYig/OmFueWZ1bmN8YmxvY2t8YnIoPzpfaWZ8X3RhYmxlKT98Y2FsbCg/Ol9pbmRpcmVjdCk/fGRhdGF8ZHJvcHxlbGVtfGVsc2V8ZW5kfGV4cG9ydHxmdW5jfGdldF8oPzpnbG9iYWx8bG9jYWwpfGdsb2JhbHxpZnxpbXBvcnR8bG9jYWx8bG9vcHxtZW1vcnl8bW9kdWxlfG11dHxub3B8b2Zmc2V0fHBhcmFtfHJlc3VsdHxyZXR1cm58c2VsZWN0fHNldF8oPzpnbG9iYWx8bG9jYWwpfHN0YXJ0fHRhYmxlfHRlZV9sb2NhbHx0aGVufHR5cGV8dW5yZWFjaGFibGUpXFxiL10sXG4gICd2YXJpYWJsZSc6IC9cXCRbXFx3ISMkJSYnKitcXC0uLzo8PT4/QFxcXFxeYHx+XSsvLFxuICAnbnVtYmVyJzogL1srLV0/XFxiKD86XFxkKD86Xz9cXGQpKig/OlxcLlxcZCg/Ol8/XFxkKSopPyg/OltlRV1bKy1dP1xcZCg/Ol8/XFxkKSopP3wweFtcXGRhLWZBLUZdKD86Xz9bXFxkYS1mQS1GXSkqKD86XFwuW1xcZGEtZkEtRl0oPzpfP1tcXGRhLWZBLURdKSopPyg/OltwUF1bKy1dP1xcZCg/Ol8/XFxkKSopPylcXGJ8XFxiaW5mXFxifFxcYm5hbig/OjoweFtcXGRhLWZBLUZdKD86Xz9bXFxkYS1mQS1EXSkqKT9cXGIvLFxuICAncHVuY3R1YXRpb24nOiAvWygpXS9cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHByaXNtO1xuIiwiLy8gRHVvdG9uZSBEYXJrXG4vLyBBdXRob3I6IFNpbXVyYWksIGFkYXB0ZWQgZnJvbSBEdW9Ub25lIHRoZW1lcyBmb3IgQXRvbSAoaHR0cDovL3NpbXVyYWkuY29tL3Byb2plY3RzLzIwMTYvMDEvMDEvZHVvdG9uZS10aGVtZXMpXG4vLyBDb252ZXJzaW9uOiBCcmFtIGRlIEhhYW4gKGh0dHA6Ly9hdGVsaWVyYnJhbS5naXRodWIuaW8vQmFzZTJUb25lLXByaXNtL291dHB1dC9wcmlzbS9wcmlzbS1iYXNlMnRvbmUtZXZlbmluZy1kYXJrLmNzcylcbi8vIEdlbmVyYXRlZCB3aXRoIEJhc2UxNiBCdWlsZGVyIChodHRwczovL2dpdGh1Yi5jb20vYmFzZTE2LWJ1aWxkZXIvYmFzZTE2LWJ1aWxkZXIpXG52YXIgdGhlbWUgPSB7XG4gIHBsYWluOiB7XG4gICAgYmFja2dyb3VuZENvbG9yOiBcIiMyYTI3MzRcIixcbiAgICBjb2xvcjogXCIjOWE4NmZkXCJcbiAgfSxcbiAgc3R5bGVzOiBbe1xuICAgIHR5cGVzOiBbXCJjb21tZW50XCIsIFwicHJvbG9nXCIsIFwiZG9jdHlwZVwiLCBcImNkYXRhXCIsIFwicHVuY3R1YXRpb25cIl0sXG4gICAgc3R5bGU6IHtcbiAgICAgIGNvbG9yOiBcIiM2YzY3ODNcIlxuICAgIH1cbiAgfSwge1xuICAgIHR5cGVzOiBbXCJuYW1lc3BhY2VcIl0sXG4gICAgc3R5bGU6IHtcbiAgICAgIG9wYWNpdHk6IDAuN1xuICAgIH1cbiAgfSwge1xuICAgIHR5cGVzOiBbXCJ0YWdcIiwgXCJvcGVyYXRvclwiLCBcIm51bWJlclwiXSxcbiAgICBzdHlsZToge1xuICAgICAgY29sb3I6IFwiI2UwOTE0MlwiXG4gICAgfVxuICB9LCB7XG4gICAgdHlwZXM6IFtcInByb3BlcnR5XCIsIFwiZnVuY3Rpb25cIl0sXG4gICAgc3R5bGU6IHtcbiAgICAgIGNvbG9yOiBcIiM5YTg2ZmRcIlxuICAgIH1cbiAgfSwge1xuICAgIHR5cGVzOiBbXCJ0YWctaWRcIiwgXCJzZWxlY3RvclwiLCBcImF0cnVsZS1pZFwiXSxcbiAgICBzdHlsZToge1xuICAgICAgY29sb3I6IFwiI2VlZWJmZlwiXG4gICAgfVxuICB9LCB7XG4gICAgdHlwZXM6IFtcImF0dHItbmFtZVwiXSxcbiAgICBzdHlsZToge1xuICAgICAgY29sb3I6IFwiI2M0YjlmZVwiXG4gICAgfVxuICB9LCB7XG4gICAgdHlwZXM6IFtcImJvb2xlYW5cIiwgXCJzdHJpbmdcIiwgXCJlbnRpdHlcIiwgXCJ1cmxcIiwgXCJhdHRyLXZhbHVlXCIsIFwia2V5d29yZFwiLCBcImNvbnRyb2xcIiwgXCJkaXJlY3RpdmVcIiwgXCJ1bml0XCIsIFwic3RhdGVtZW50XCIsIFwicmVnZXhcIiwgXCJhdHJ1bGVcIiwgXCJwbGFjZWhvbGRlclwiLCBcInZhcmlhYmxlXCJdLFxuICAgIHN0eWxlOiB7XG4gICAgICBjb2xvcjogXCIjZmZjYzk5XCJcbiAgICB9XG4gIH0sIHtcbiAgICB0eXBlczogW1wiZGVsZXRlZFwiXSxcbiAgICBzdHlsZToge1xuICAgICAgdGV4dERlY29yYXRpb25MaW5lOiBcImxpbmUtdGhyb3VnaFwiXG4gICAgfVxuICB9LCB7XG4gICAgdHlwZXM6IFtcImluc2VydGVkXCJdLFxuICAgIHN0eWxlOiB7XG4gICAgICB0ZXh0RGVjb3JhdGlvbkxpbmU6IFwidW5kZXJsaW5lXCJcbiAgICB9XG4gIH0sIHtcbiAgICB0eXBlczogW1wiaXRhbGljXCJdLFxuICAgIHN0eWxlOiB7XG4gICAgICBmb250U3R5bGU6IFwiaXRhbGljXCJcbiAgICB9XG4gIH0sIHtcbiAgICB0eXBlczogW1wiaW1wb3J0YW50XCIsIFwiYm9sZFwiXSxcbiAgICBzdHlsZToge1xuICAgICAgZm9udFdlaWdodDogXCJib2xkXCJcbiAgICB9XG4gIH0sIHtcbiAgICB0eXBlczogW1wiaW1wb3J0YW50XCJdLFxuICAgIHN0eWxlOiB7XG4gICAgICBjb2xvcjogXCIjYzRiOWZlXCJcbiAgICB9XG4gIH1dXG59O1xuXG5leHBvcnQgZGVmYXVsdCB0aGVtZTtcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEhpZ2hsaWdodCwgeyBkZWZhdWx0UHJvcHMgfSBmcm9tICdwcmlzbS1yZWFjdC1yZW5kZXJlcic7XHJcbi8vIE9yaWdpbmFsOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vUHJpc21KUy9wcmlzbS10aGVtZXMvbWFzdGVyL3RoZW1lcy9wcmlzbS1naGNvbG9ycy5jc3NcclxuXHJcbi8qOjogaW1wb3J0IHR5cGUgeyBQcmlzbVRoZW1lIH0gZnJvbSAnLi4vc3JjL3R5cGVzJyAqL1xyXG5jb25zdCB0aGVtZVxyXG4vKjogUHJpc21UaGVtZSAqL1xyXG49IHtcclxuICBwbGFpbjoge1xyXG4gICAgY29sb3I6ICcjMjkzNzQyJyxcclxuICAgIGJvcmRlclJhZGl1czogMTIsXHJcbiAgICBmb250RmFtaWx5OiBgU0ZNb25vLVJlZ3VsYXIsQ29uc29sYXMsTGliZXJhdGlvbiBNb25vLE1lbmxvLENvdXJpZXIsbW9ub3NwYWNlYCxcclxuICAgIGZvbnRTaXplOiAxNCxcclxuICAgIGxpbmVIZWlnaHQ6ICcxLjUnXHJcbiAgfSxcclxuICBzdHlsZXM6IFt7XHJcbiAgICB0eXBlczogWydjb21tZW50JywgJ3Byb2xvZycsICdkb2N0eXBlJywgJ2NkYXRhJ10sXHJcbiAgICBzdHlsZToge1xyXG4gICAgICBjb2xvcjogJyNBN0I2QzInLFxyXG4gICAgICBmb250U3R5bGU6ICdpdGFsaWMnXHJcbiAgICB9XHJcbiAgfSwge1xyXG4gICAgdHlwZXM6IFsnbmFtZXNwYWNlJ10sXHJcbiAgICBzdHlsZToge1xyXG4gICAgICBvcGFjaXR5OiAwLjdcclxuICAgIH1cclxuICB9LCB7XHJcbiAgICB0eXBlczogWydzdHJpbmcnLCAnYXR0ci12YWx1ZSddLFxyXG4gICAgc3R5bGU6IHtcclxuICAgICAgY29sb3I6ICcjREIyQzZGJ1xyXG4gICAgfVxyXG4gIH0sIHtcclxuICAgIHR5cGVzOiBbJ3B1bmN0dWF0aW9uJywgJ29wZXJhdG9yJ10sXHJcbiAgICBzdHlsZToge1xyXG4gICAgICBjb2xvcjogJyMzOTRCNTknXHJcbiAgICB9XHJcbiAgfSwge1xyXG4gICAgdHlwZXM6IFsnZW50aXR5JywgJ3VybCcsICdzeW1ib2wnLCAnbnVtYmVyJywgJ2Jvb2xlYW4nLCAndmFyaWFibGUnLCAnY29uc3RhbnQnLCAncHJvcGVydHknLCAncmVnZXgnLCAnaW5zZXJ0ZWQnXSxcclxuICAgIHN0eWxlOiB7XHJcbiAgICAgIGNvbG9yOiAnIzM2YWNhYSdcclxuICAgIH1cclxuICB9LCB7XHJcbiAgICB0eXBlczogWydhdHJ1bGUnLCAna2V5d29yZCcsICdhdHRyLW5hbWUnLCAnc2VsZWN0b3InXSxcclxuICAgIHN0eWxlOiB7XHJcbiAgICAgIGNvbG9yOiAnIzAwQjNBNCdcclxuICAgIH1cclxuICB9LCB7XHJcbiAgICB0eXBlczogWydmdW5jdGlvbicsICdkZWxldGVkJywgJ3RhZyddLFxyXG4gICAgc3R5bGU6IHtcclxuICAgICAgY29sb3I6ICcjREIyQzZGJ1xyXG4gICAgfVxyXG4gIH0sIHtcclxuICAgIHR5cGVzOiBbJ2Z1bmN0aW9uLXZhcmlhYmxlJ10sXHJcbiAgICBzdHlsZToge1xyXG4gICAgICBjb2xvcjogJyM2MzREQkYnXHJcbiAgICB9XHJcbiAgfSwge1xyXG4gICAgdHlwZXM6IFsndGFnJywgJ3NlbGVjdG9yJywgJ2tleXdvcmQnXSxcclxuICAgIHN0eWxlOiB7XHJcbiAgICAgIGNvbG9yOiAnIzFhNTZkYidcclxuICAgIH1cclxuICB9XVxyXG59O1xyXG5cclxuY29uc3QgQ29kZSA9ICh7XHJcbiAgY2hpbGRyZW4sXHJcbiAgY29kZVN0cmluZyxcclxuICBjbGFzc05hbWUgPSAnbGFuZ3VhZ2UtanMnLFxyXG4gIC4uLnByb3BzXHJcbn0pID0+IHtcclxuICBjb25zdCBsYW5ndWFnZSA9IGNsYXNzTmFtZS5yZXBsYWNlKC9sYW5ndWFnZS0vLCAnJyk7XHJcbiAgcmV0dXJuIDxIaWdobGlnaHQgey4uLmRlZmF1bHRQcm9wc30gY29kZT17Y2hpbGRyZW4udHJpbSgpfSBsYW5ndWFnZT17bGFuZ3VhZ2V9IHRoZW1lPXt0aGVtZX0+XHJcbiAgICAgIHsoe1xyXG4gICAgICBjbGFzc05hbWUsXHJcbiAgICAgIHN0eWxlLFxyXG4gICAgICB0b2tlbnMsXHJcbiAgICAgIGdldExpbmVQcm9wcyxcclxuICAgICAgZ2V0VG9rZW5Qcm9wc1xyXG4gICAgfSkgPT4gPHByZSBjbGFzc05hbWU9e2NsYXNzTmFtZSArICcgYmctZ3JheS01MCBwYi00IHB0LTQgcHItNCBvdmVyZmxvdy1zY3JvbGwnfSBzdHlsZT17eyAuLi5zdHlsZSxcclxuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlZWUnLFxyXG4gICAgICBmb250U2l6ZTogMTMsXHJcbiAgICAgIGxpbmVIZWlnaHQ6ICcxLjUnXHJcbiAgICB9fT5cclxuICAgICAgICAgIHt0b2tlbnMubWFwKChsaW5lLCBpKSA9PiA8ZGl2IGtleT17aX0gey4uLmdldExpbmVQcm9wcyh7XHJcbiAgICAgICAgbGluZSxcclxuICAgICAgICBrZXk6IGlcclxuICAgICAgfSl9PlxyXG4gICAgICAgICAgICAgIHt0b2tlbnMubGVuZ3RoID4gMSA/IDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNlbGVjdC1ub25lIHRleHQtZ3JheS0zMDAgdGV4dC1yaWdodCB3LTUgaW5saW5lLWJsb2NrIG14LTJcIj5cclxuICAgICAgICAgICAgICAgICAge2kgKyAxfVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPiA6IDxzcGFuIGNsYXNzTmFtZT1cIm14LTIgdy01XCIgLz59eycgJ31cclxuICAgICAgICAgICAgICB7bGluZS5tYXAoKHRva2VuLCBrZXkpID0+IDxzcGFuIGtleT17a2V5fSB7Li4uZ2V0VG9rZW5Qcm9wcyh7XHJcbiAgICAgICAgICB0b2tlbixcclxuICAgICAgICAgIGtleVxyXG4gICAgICAgIH0pfSAvPil9XHJcbiAgICAgICAgICAgIDwvZGl2Pil9XHJcbiAgICAgICAgPC9wcmU+fVxyXG4gICAgPC9IaWdobGlnaHQ+O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29kZTsiXSwic291cmNlUm9vdCI6IiJ9