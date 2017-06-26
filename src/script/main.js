var style = require("../style/style.css")
style.use();
var cm = require("./common.js")

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


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {


    let cell = cm._q('.data');
    while (cell.hasChildNodes()) {
      cell.removeChild(cell.firstChild);
    }
    console.log("login");
    let table = firebase.database().ref('/menu');
    let div = cm._q('#main_layout .data');
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
      cm._q('.' + data.key).remove();
    });
    cm.changeViewDisplay('#main_layout');
  } else {
    cm.changeViewDisplay('#signin_layout');
    console.log("need login");
  }
});


cm._q('#main_layout ._input_btn').onclick = (e) => {
  let el_text = cm._q('#main_layout ._input');
  let text = cm._q('#main_layout ._input').value;
  if (text.trim() != "") {
    var database = firebase.database();
    if (database) {
      database.ref("/menu").push(text).then((e) => {
        el_text.value = "";
        console.log("success", e)
      }).catch((e) => {
        console.log("error", e)
      });
    }
  }
}

cm._q('#sign_out ._signout').onclick = (e) => {
  e.preventDefault();
  signOut();
}

cm._q('#signup_layout ._signup').onclick = (e) => {
  e.preventDefault();
  cm.validCheck('#signup_layout');
  let els = cm._qs('#signup_layout .valid_fail');
  if (els.length == 0) {
    let id = cm._q('#signup_layout ._user_id').value;
    let pw = cm._q('#signup_layout ._user_password').value;
    signUp(id, pw);
  }
}

cm._q('#signin_layout ._signin').onclick = (e) => {
  e.preventDefault();
  cm.validCheck('#signin_layout');
  let els = cm._qs('#signin_layout .valid_fail');
  if (els.length == 0) {
    let id = cm._q('#signin_layout ._user_id').value;
    let pw = cm._q('#signin_layout ._user_password').value;
    signIn(id, pw);
  }
}

cm._q('#signin_layout ._signup').onclick = (e) => {
  e.preventDefault();
  changeViewDisplay('#signup_layout');
}
