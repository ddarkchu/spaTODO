/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function hide(el) {
  if (el) {
    el.classList.add('hide');
  }
}

function show(el) {
  if (el) {
    el.classList.remove('hide');
  }
}
var _q = function _q(string) {
  return document.querySelector(string);
};
var _qs = function _qs(string) {
  return document.querySelectorAll(string);
};
// login("portars@naver.com","test123");

function changeViewDisplay(selector) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _qs(".js_layout")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;

      hide(i);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  show(_q(selector));
  show(document.body);
}

function validCheck(query) {
  var result = false;
  var list = _qs(query);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var item = _step2.value;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = item.querySelectorAll('[valid]')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var temp = _step3.value;

          var reg = new RegExp(temp.getAttribute('valid'));
          if (temp.value.match(reg) == null) {
            temp.classList.add("valid_fail");
            if (!result) result = true;
          } else {
            temp.classList.remove("valid_fail");
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return result;
}

module.exports = {
  validCheck: validCheck,
  changeViewDisplay: changeViewDisplay,
  _q: _q,
  _qs: _qs,
  show: show,
  hide: hide
};
Date.customString = function (longTime) {
  var check = function check(string) {
    string += "";
    return string.length == 1 ? "0" + string : string;
  };

  var date;
  var result = "";
  if (longTime) {
    date = new Date(longTime);
  } else {
    date = new Date();
  }

  if (date) {
    result = date.getFullYear() + "/" + check(date.getMonth() + 1) + "/" + check(date.getDate()) + " " + check(date.getHours()) + ":" + check(date.getMinutes());
  }
  return result;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var refs = 0;
var dispose;
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) exports.locals = content.locals;
exports.use = exports.ref = function() {
	if(!(refs++)) {
		dispose = __webpack_require__(4)(content, {});
	}
	return exports;
};
exports.unuse = exports.unref = function() {
       if(refs > 0 && !(--refs)) {
		dispose();
		dispose = null;
	}
};
if(false) {
	var lastRefs = module.hot.data && module.hot.data.refs || 0;
	if(lastRefs) {
		exports.ref();
		if(!content.locals) {
			refs = lastRefs;
		}
	}
	if(!content.locals) {
		module.hot.accept();
	}
	module.hot.dispose(function(data) {
		data.refs = content.locals ? 0 : refs;
		if(dispose) {
			dispose();
		}
	});
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "body{margin:0}html{height:100%;font-size:16px}.hide{display:none!important}.left{z-index:1;-moz-transition:all 1s;-webkit-transition:all 1s;-ms-transition:all 1s;-o-transition:all 1s;transition:all 1s;position:fixed;background-color:red;width:300px;left:0;background:#a9a9a9}.left,.right{height:inherit}.right{max-width:920px;margin:0 auto}.main{width:100%;height:100%;position:relative}.fl,.main{float:left}.fr{float:right}.main.left_hide .left{left:-300px}ul.menu{list-style-type:none;padding:0;text-align:center}ul.menu,ul.menu li{width:100%}ul.menu a{width:inherit;text-overflow:ellipsis;overflow:hidden;display:inline-block}ul.menu a:hover{background-color:gray}div.loading{position:absolute;width:100%;z-index:9999999;text-align:center;height:100%;line-height:320pt;background-color:#000;opacity:.4;color:#fff}div.loading>div:after{content:\"Loading\";animation:changeLetter 3s linear infinite alternate}@keyframes changeLetter{0%{font-size:10pt}50%{font-size:15pt}to{font-size:20pt}}.menu_icon{position:fixed;display:block;bottom:0;z-index:1}.menu_icon>div{bottom:50px;z-index:1;width:48px;height:48px;background:gray;border-radius:30%;left:10px;position:absolute;display:block;text-align:center}.menu_icon>div>i{font-size:35px}.menu_icon>div.new_post,.menu_icon>div>i{line-height:48px;color:#fff;cursor:pointer}.menu_icon>div.new_post{background-color:#cd5c5c;bottom:100px;font-size:20px}@media (max-width:1000px){.menu_icon>div{width:80px;height:80px}.menu_icon>div>i{line-height:80px;font-size:35pt}.menu_icon>div.new_post{bottom:135px;line-height:80px;font-size:35px;color:#fff;text-align:center;cursor:pointer}}.menu_icon>div>i:hover{-ms-transform:rotate(-10deg);-webkit-transform:rotate(-10deg);transform:rotate(-10deg)}.left .version{bottom:0;position:fixed}.footer{height:300px}.location{width:100%;display:inline-block}.date{margin-bottom:10px}", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var style = __webpack_require__(1);
style.use();
var cm = __webpack_require__(0);
var util = __webpack_require__(9);
var database = firebase.database();
var loadMenu = new Promise(function loadMenu(resolve, reject) {
  var menu = database.ref("/menu/data");
  menu.orderByKey().once('value').then(function (datas) {
    try {
      var ul = document.querySelector('ul.menu');
      var data = datas.val();
      var firstMenu = "";

      var _loop = function _loop(key) {
        if (firstMenu == "") {
          firstMenu = key;
        }
        var label = document.createElement("label");
        var text = document.createTextNode(data[key]);
        label.appendChild(text);
        var a = document.createElement("a");
        a.appendChild(label);
        a.setAttribute("href", "/post?menu=" + key);
        a.setAttribute("title", data[key]);
        a.onclick = function () {
          return function (key) {
            window.history.pushState("", "", "/post?menu=" + key);
            dataReload();
            return false;
          }(key);
        };
        var li = document.createElement("li");
        li.appendChild(a);
        ul.appendChild(li);
      };

      for (var key in data) {
        _loop(key);
      }
      resolve(firstMenu);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
});

function dataReload() {
  cm.show(cm._q(".loading"));
  loadMenu.then(function (menu) {
    var t = util.getParams();
    if (!t.menu || t.menu == "") {
      t.menu = menu;
    }
    loadPost(t).then(function () {
      cm.hide(cm._q(".loading"));
    });
  });
}
dataReload();
// menu 메뉴 id
// postId 게시글 아이디
function postData() {
  return {
    title: "",
    createDate: 0,
    data: ""
  };
}
window.onpopstate = function (event) {
  dataReload();
};

// saveData("-KnhPm67thcpzcZo_HuE", "firebase이용 개발", "realtime database 기존 디비에 비해 제약사항이 너무 많아서 생각해야 할것이 많다.");
function setPost() {
  var menu = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    title: "",
    data: "",
    createData: 0
  };

  var title = cm._q('div.post .title');
  var divData = cm._q('div.post .data');
  var label = cm._q('div.post .date label');
  if (title) {
    title.className = "title";
    if (menu && menu != "") {
      title.setAttribute('menu_id', menu);
    }
    if (id != "") {
      title.setAttribute('post_id', id);
      title.innerHTML = data.title;
      if (label) label.innerText = Date.customString(data.createDate);
      if (divData) divData.innerHTML = data.data;
    } else {
      title.innerHTML = "";
      if (label) label.innerText = "";
      if (divData) divData.innerHTML = "";
    }
  }
}

function loadPost(params) {
  return new Promise(function (sucess, fail) {
    var editor = ContentTools.EditorApp.get();
    if (editor._ignition) {
      editor._ignition.cancel();
      if (editor.getState() == "editing") {
        menuHide();
        sucess();
        return;
      }
    }
    if (params.menu) {
      if (params.post) {
        database.ref("/board/" + params.menu + "/data/" + params.post).once("value").then(function (snap) {
          var data = {
            menu: params.menu,
            post: params.post,
            data: snap.val()
          };
          if (!data.data) {
            alert("해당 글이 없습니다.");
          }
          setOldCurrent(data.menu, data.post).then(function () {
            setPost(data.menu, data.post, data.data);
          });
          menuHide();
          sucess();
        });
      } else {
        database.ref("/board/" + params.menu + "/data/").orderByKey().limitToLast(1).once("value").then(function (data) {
          var snap = data.val();
          var firstData = {
            postId: undefined
          };
          for (var key in snap) {
            if (snap.hasOwnProperty(key)) {
              firstData = snap[key];
              firstData['postId'] = key;
              break;
            }
          }
          setOldCurrent(params.menu, firstData.postId);
          setPost(params.menu, firstData.postId, firstData);
          menuHide();
          sucess();
        });
      }
    } else {
      var menu = document.querySelector('.menu li:nth-child(1) > a');
      if (menu) menu.click();
      return;
    }
  });
}

function saveData(menu, title, data) {
  return new Promise(function (s, f) {
    var saveData = new postData();
    saveData.title = title;
    saveData.data = data;
    saveData.createDate = new Date().getTime();
    database.ref("/board/" + menu + "/boardTime").transaction(function (boardTime) {
      if (!boardTime || boardTime < saveData.createDate) {
        boardTime = saveData.createDate;
      } else {
        boardTime = undefined;
      }
      return boardTime;
    }, function (error, committed, snapshot) {
      if (error) {
        console.log('Transaction failed abnormally!', error);
      } else if (!committed) {
        console.log('We aborted the transaction (because ada already exists).');
      } else {
        if (snapshot.val() == saveData.createDate) {
          database.ref("/board/" + menu + "/boardCount").transaction(function (boardCount) {
            if (!boardCount) {
              boardCount = 0;
            }
            return boardCount + 1;
          }, function (error, committed, snapshot) {
            if (error) {
              console.log('Transaction failed abnormally!', error);
              s();
            } else if (!committed) {
              console.log('We aborted the transaction (because ada already exists).');
              s();
            } else {
              var postId = snapshot.val();
              database.ref("/board/" + menu + "/data/" + postId).set(saveData).then(function (snap) {
                var title = cm._q('title');
                if (title) {
                  title.setAttribute("post_id", postId);
                  s("/post?menu=" + menu + "&post=" + postId);
                }
              });
            }
          });
        } else {
          s();
        }
      }
    });
  });
}
// saveMenu("test2");
function saveMenu(menu) {
  var menuCount = database.ref("/menu/menuCount");
  return menuCount.transaction(function (menuCount) {
    if (!menuCount) {
      menuCount = 0;
    }
    return menuCount + 1;
  }, function (error, committed, snapshot) {
    if (error) {
      console.log('Transaction failed abnormally!', error);
    } else if (!committed) {
      console.log('We aborted the transaction (because ada already exists).');
    }
  }).then(function () {
    return database.ref("/menu/data").push(menu);
  }).catch(function () {
    menuCount.transaction(function (menuCount) {
      if (!menuCount) {
        menuCount = 1;
      }
      return menuCount - 1;
    }, function (error, committend, snapshot) {
      if (error || !committed) {
        console.log('server error');
      }
    });
  });
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    contentTools();
  }
});
newData();

function newData() {
  cm._q('.menu_icon .new_post').onclick = function () {
    menuHide();
    var editor = ContentTools.EditorApp.get();
    var title = cm._q('div.post .title');
    var divData = cm._q('div.post .data');
    var date = cm._q('div.post .date > label');
    date.innerHTML = "";
    title.setAttribute('post_id', "");
    title.innerHTML = "";
    divData.innerHTML = "";
    if (editor.getState() != "editing") ;
    cm._q('.ct-ignition__button.ct-ignition__button--edit').click();
  };
}

function contentTools() {
  var editor = ContentTools.EditorApp.get();
  if (editor && firebase.auth().currentUser) {
    ContentTools.IMAGE_UPLOADER = ImageUploader.createImageUploader;
    cm.show(cm._q(".menu_icon .new_post"));
    editor.init('[data-editable], [data-fixture]', 'data-name');
    editor.addEventListener('stop', function (ev) {
      var title = cm._q('div.post .title');
      title.className = "title";
    });
    editor.addEventListener('saved', function (ev) {
      var data = ev.detail().regions;
      if (Object.keys(data).length === 0) {
        return;
      }
      // let menu = hashToValue();
      var postId = cm._q('.post .title').getAttribute("post_id");
      var menu = cm._q('.post .title').getAttribute("menu_id");
      cm.show(cm._q('.loading'));
      editor.busy(true);
      if (menu && postId) {
        firebase.database().ref("/board/" + menu + "/data/" + postId).update(data).then(function () {
          editor.busy(false);
          cm.hide(cm._q('.loading'));
        }).catch(function () {
          editor.busy(false);
          cm.hide(cm._q('.loading'));
        });
      } else if (menu) {
        saveData(menu, data.title, data.data).then(function (_) {
          editor.busy(false);
          window.history.pushState("", "", _);
          dataReload();
        });
      }
    });
  }
}
initMenuButton();

function initMenuButton() {
  var div = cm._q('.menu_icon .terminal.icon').parentElement;
  div.onclick = function () {
    var main = cm._q('.main');
    if (main.className.indexOf("left_hide") >= 0) {
      main.classList.remove('left_hide');
    } else {
      main.classList.add('left_hide');
    }
  };
}

function menuHide() {
  var main = cm._q('.main');
  if (main.className.indexOf("left_hide") < 0) {
    main.classList.add('left_hide');
  }
}

function menuShow() {
  var main = cm._q('.main');
  if (main.className.indexOf("left_hide") >= 0) {
    main.classList.remove('left_hide');
  }
}

function setOldCurrent(boardId, postId) {
  if (!postId) {
    cm._q(".location").classList.add('hide');
    return new Promise(function (s, f) {
      console.log("postId가 없음.");
      f("postId가 없음.");
    });
  }
  var db = database.ref("/board/" + boardId + "/data/");
  if (postId) {
    postId = +postId;
    var promiseList = [];
    promiseList.push(db.orderByKey().endAt("" + (postId - 1)).limitToLast(1).once('value')); //과거
    promiseList.push(db.orderByKey().startAt("" + (postId + 1)).limitToFirst(1).once('value')); // 최신
    return Promise.all(promiseList).then(function (snap) {
      for (var i = 0; i < snap.length; i++) {
        var selector = ".location .newer";
        if (i == 0) {
          selector = ".location .older";
        }
        if (snap[i]) {
          var data = snap[i].val();
          if (data) {
            var key = Object.keys(data);
            if (key[0]) {
              (function () {
                cm._q(selector).classList.remove('hide');
                var url = "/post?menu=" + boardId + "&post=" + key[0];
                cm._q(selector).setAttribute("href", url);
                cm._q(selector).onclick = function () {
                  return function (url) {
                    window.history.pushState("", "", url);
                    dataReload();
                    return false;
                  }(url);
                };
              })();
            }
          } else {
            cm._q(selector).classList.add('hide');
          }
        } else {
          cm._q(selector).classList.add('hide');
        }
      }
      cm._q(".location").classList.remove('hide');
    });
  }
}
var ImageUploader;
ImageUploader = function () {
  ImageUploader.imagePath = 'image.png';
  ImageUploader.imageSize = [600, 174];

  function ImageUploader(dialog) {
    this._dialog = dialog;
    this._dialog.addEventListener('cancel', function (_this) {
      return function () {
        return _this._onCancel();
      };
    }(this));
    this._dialog.addEventListener('imageuploader.cancelupload', function (_this) {
      return function () {
        return _this._onCancelUpload();
      };
    }(this));
    this._dialog.addEventListener('imageuploader.clear', function (_this) {
      return function () {
        return _this._onClear();
      };
    }(this));
    this._dialog.addEventListener('imageuploader.fileready', function (_this) {
      return function (ev) {
        return _this._onFileReady(ev.detail().file);
      };
    }(this));
    this._dialog.addEventListener('imageuploader.mount', function (_this) {
      return function () {
        return _this._onMount();
      };
    }(this));
    // this._dialog.addEventListener('imageuploader.rotateccw', (function(_this) {
    //   return function() {
    //     return _this._onRotateCCW();
    //   };
    // })(this));
    // this._dialog.addEventListener('imageuploader.rotatecw', (function(_this) {
    //   return function() {
    //     return _this._onRotateCW();
    //   };
    // })(this));
    this._dialog.addEventListener('imageuploader.save', function (_this) {
      return function () {
        return _this._onSave();
      };
    }(this));
    this._dialog.addEventListener('imageuploader.unmount', function (_this) {
      return function () {
        return _this._onUnmount();
      };
    }(this));
  }
  ImageUploader.prototype._onCancel = function () {};
  ImageUploader.prototype._onCancelUpload = function () {
    if (this._uploading.cancel) {
      this._uploading.cancel();
    }
    return this._dialog.state('empty');
  };
  ImageUploader.prototype._onClear = function () {
    return this._dialog.clear();
  };
  ImageUploader.prototype._onFileReady = function (file) {
    var upload;
    console.log(file);
    this._dialog.progress(0);
    this._dialog.state('uploading');
    var storageRef = firebase.storage().ref('images');
    var uploadTask = storageRef.child(file.name).put(file);
    (function (_this) {
      uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        console.log('Upload is ' + progress + '% done');
        _this._dialog.progress(progress);
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING:
            // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function (error) {}, function () {
        _this.imagePath = uploadTask.snapshot.downloadURL;
        var fr = new FileReader();
        fr.onload = function () {
          // file is loaded
          var img = new Image();
          img.onload = function () {
            _this.imageSize = [img.width, img.height];
            _this._dialog.populate(_this.imagePath, _this.imageSize);
          };
          img.src = fr.result; // is the data URL because called with readAsDataURL
        };
        fr.readAsDataURL(file); //
        return;
      });
    })(this);
    return this._uploading = uploadTask;
  };
  ImageUploader.prototype._onMount = function () {};
  // ImageUploader.prototype._onRotateCCW = function() {
  //   var clearBusy;
  //   this._dialog.busy(true);
  //   clearBusy = (function(_this) {
  //     return function() {
  //       return _this._dialog.busy(false);
  //     };
  //   })(this);
  //   return setTimeout(clearBusy, 1500);
  // };
  //
  // ImageUploader.prototype._onRotateCW = function() {
  //   var clearBusy;
  //   this._dialog.busy(true);
  //   clearBusy = (function(_this) {
  //     return function() {
  //       return _this._dialog.busy(false);
  //     };
  //   })(this);
  //   return setTimeout(clearBusy, 1500);
  // };
  ImageUploader.prototype._onSave = function () {
    var clearBusy;
    this._dialog.busy(true);
    clearBusy = function (_this) {
      return function () {
        _this._dialog.busy(false);
        return _this._dialog.save(_this.imagePath, _this.imageSize, {
          alt: 'Example of bad variable names'
        });
      };
    }(this);
    return setTimeout(clearBusy, 1500);
  };
  ImageUploader.prototype._onUnmount = function () {};
  ImageUploader.createImageUploader = function (dialog) {
    return new ImageUploader(dialog);
  };
  return ImageUploader;
}();
window.ImageUploader = ImageUploader;

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getParams = getParams;
exports.hashToValue = hashToValue;
function getParams() {
	var data = {};
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = location.search.replace("?", "").split("&")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var item = _step.value;

			var keyValue = item.split('=');
			data[keyValue[0]] = keyValue[1];
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return data;
}
function hashToValue() {
	var data = {};
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = location.hash.replace("#/", "").split("&")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var item = _step2.value;

			var keyValue = item.split('=');
			data[keyValue[0]] = keyValue[1];
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	return data;
}

/***/ })
/******/ ]);
//# sourceMappingURL=blog.js.map