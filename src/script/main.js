var style = require("../style/style.css")
style.use();

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

function signIn(id, password) {
  if (!firebase.auth().currentUser) {
    firebase.auth().signInWithEmailAndPassword(id, password).catch(function(error) {
      console.log(error);
      alert(error);
    });
  } else {
    console.log("already login");
  }
}

function signUp(id, password) {
  if (!firebase.auth().currentUser) {
    firebase.auth().createUserWithEmailAndPassword(id, password).catch(function(error) {
      console.log(error);
      alert(error);
    });
  } else {
    console.log("already login");
  }
}

function signOut() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut().catch(function(error) {
      alert(error);
      console.log(error);
    });
  } else {
    console.log("already SignOut");
  }
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


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {


    let cell = _q('.data');
    while (cell.hasChildNodes()) {
      cell.removeChild(cell.firstChild);
    }
    console.log("login");
    let table = firebase.database().ref('/');
    let div = _q('#main_layout .data');
    table.on('child_added', function(data) {
      console.log("dataAdd")
      let temp = document.createElement('div');
      temp.classList.add(data.key);
      temp.innerHTML = data.val();
      div.append(temp);
    });
    table.on('child_changed', function(data) {
      console.log(data.key)
      let temp = div.querySelector('.' + data.key);
      temp.innerHTML = data.val();
    });
    table.on('child_removed', function(data) {
      _q('.' + data.key).remove();
    });
    changeViewDisplay('#main_layout');
  } else {
    changeViewDisplay('#signin_layout');
    console.log("need login");
  }
});


_q('#main_layout ._input_btn').onclick = (e) => {
  let el_text = _q('#main_layout ._input');
  let text = _q('#main_layout ._input').value;
  if (text.trim() != "") {
    var database = firebase.database();
    if (database) {
      database.ref("/").push(text).then((e) => {
        el_text.value = "";
        console.log("success", e)
      }).catch((e) => {
        console.log("error", e)
      });
    }
  }
}

_q('#sign_out ._signout').onclick = (e) => {
  e.preventDefault();
  signOut();
}

_q('#signup_layout ._signup').onclick = (e) => {
  e.preventDefault();
  validCheck('#signup_layout');
  let els = _qs('#signup_layout .valid_fail');
  if (els.length == 0) {
    let id = _q('#signup_layout ._user_id').value;
    let pw = _q('#signup_layout ._user_password').value;
    signUp(id, pw);
  }
}

_q('#signin_layout ._signin').onclick = (e) => {
  e.preventDefault();
  validCheck('#signin_layout');
  let els = _qs('#signin_layout .valid_fail');
  if (els.length == 0) {
    let id = _q('#signin_layout ._user_id').value;
    let pw = _q('#signin_layout ._user_password').value;
    signIn(id, pw);
  }
}

_q('#signin_layout ._signup').onclick = (e) => {
  e.preventDefault();
  changeViewDisplay('#signup_layout');
}
