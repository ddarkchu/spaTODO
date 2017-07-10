function hide(el) {
  if (el) {
    el.classList.add('hide')
  }
}

function show(el) {
  if (el) {
    el.classList.remove('hide')
  }
}
var _q = (string) => {
  return document.querySelector(string);
}
var _qs = (string) => {
  return document.querySelectorAll(string);
}
// login("portars@naver.com","test123");

function changeViewDisplay(selector) {
  for (var i of _qs(".js_layout")) {
    hide(i);
  }
  show(_q(selector));
  show(document.body);
}

function validCheck(query) {
  let result = false;
  let list = _qs(query);
  for (let item of list) {
    for (let temp of item.querySelectorAll('[valid]')) {
      var reg = new RegExp(temp.getAttribute('valid'));
      if (temp.value.match(reg) == null) {
        temp.classList.add("valid_fail");
        if (!result) result = true;
      } else {
        temp.classList.remove("valid_fail");
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
}
Date.customString = (longTime) => {
  var check = (string) => {
    string += "";
    return string.length == 1 ? "0" + string : string;
  }

  var date;
  var result = "";
  if (longTime) {
    date = new Date(longTime);
  } else {
    date = new Date();
  }
  
  if (date) {
    result = date.getFullYear() + "/" + check(date.getMonth() + 1) + "/" + check(date.getDate()) + " " +
      check(date.getHours()) +
      ":" + check(date.getMinutes());
  }
  return result;
}
