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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
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

function signIn(id, password) {
  if (!firebase.auth().currentUser) {
    firebase.auth().signInWithEmailAndPassword(id, password).catch(function (error) {
      console.log(error);
      alert(error);
    });
  } else {
    console.log("already login");
  }
}

function signUp(id, password) {
  if (!firebase.auth().currentUser) {
    firebase.auth().createUserWithEmailAndPassword(id, password).catch(function (error) {
      console.log(error);
      alert(error);
    });
  } else {
    console.log("already login");
  }
}

function signOut() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut().catch(function (error) {
      alert(error);
      console.log(error);
    });
  } else {
    console.log("already SignOut");
  }
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

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {

    var cell = _q('.data');
    while (cell.hasChildNodes()) {
      cell.removeChild(cell.firstChild);
    }
    console.log("login");
    var table = firebase.database().ref('/');
    var div = _q('#main_layout .data');
    table.on('child_added', function (data) {
      console.log("dataAdd");
      var temp = document.createElement('div');
      temp.classList.add(data.key);
      temp.innerHTML = data.val();
      div.append(temp);
    });
    table.on('child_changed', function (data) {
      console.log(data.key);
      var temp = div.querySelector('.' + data.key);
      temp.innerHTML = data.val();
    });
    table.on('child_removed', function (data) {
      _q('.' + data.key).remove();
    });
    changeViewDisplay('#main_layout');
  } else {
    changeViewDisplay('#signin_layout');
    console.log("need login");
  }
});

_q('#main_layout ._input_btn').onclick = function (e) {
  var el_text = _q('#main_layout ._input');
  var text = _q('#main_layout ._input').value;
  if (text.trim() != "") {
    var database = firebase.database();
    if (database) {
      database.ref("/").push(text).then(function (e) {
        el_text.value = "";
        console.log("success", e);
      }).catch(function (e) {
        console.log("error", e);
      });
    }
  }
};

_q('#sign_out ._signout').onclick = function (e) {
  e.preventDefault();
  signOut();
};

_q('#signup_layout ._signup').onclick = function (e) {
  e.preventDefault();
  validCheck('#signup_layout');
  var els = _qs('#signup_layout .valid_fail');
  if (els.length == 0) {
    var id = _q('#signup_layout ._user_id').value;
    var pw = _q('#signup_layout ._user_password').value;
    signUp(id, pw);
  }
};

_q('#signin_layout ._signin').onclick = function (e) {
  e.preventDefault();
  validCheck('#signin_layout');
  var els = _qs('#signin_layout .valid_fail');
  if (els.length == 0) {
    var id = _q('#signin_layout ._user_id').value;
    var pw = _q('#signin_layout ._user_password').value;
    signIn(id, pw);
  }
};

_q('#signin_layout ._signup').onclick = function (e) {
  e.preventDefault();
  changeViewDisplay('#signup_layout');
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map