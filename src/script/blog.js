const style = require("../style/style.css");
style.use();
const cm = require("./common.js");
const database = firebase.database();
const loadMenu = new Promise(function loadMenu(resolve, reject) {
  let menu = database.ref("/menu/data");
  menu.orderByKey().once('value').then((datas) => {
    try {
      let ul = document.querySelector('ul.menu');
      let data = datas.val();
      for (let key in data) {
        let label = document.createElement("label");
        let text = document.createTextNode(data[key]);
        label.appendChild(text);
        let a = document.createElement("a");
        a.appendChild(label);
        a.setAttribute("href", "#menu=" + key);
        a.setAttribute("title", data[key]);
        a.onclick = ((key) => {
          return () => {
            console.log(key)
            if (location.hash == "#menu=" + key) {
              cm.show(cm._q(".loading"));
              loadPost({
                menu: key
              }).then(() => {
                cm.hide(cm._q(".loading"))
              });
            }
          }
        })(key);
        //
        let li = document.createElement("li");
        li.appendChild(a);
        ul.appendChild(li);
      }
      resolve();
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
});
loadMenu.then(function() {
  let t = hashToValue();
  loadPost(t).then(() => {
    cm.hide(cm._q(".loading"))
  });
});
// menu 메뉴 id
// postId 게시글 아이디

function postData() {
  return {
    title: "",
    createDate: 0,
    data: ""
  }
}

function hashToValue() {
  let data = {};
  for (let item of location.hash.replace("#", "").split("&")) {
    let keyValue = item.split('=');
    data[keyValue[0]] = keyValue[1];
  }
  return data;
}
// saveData("-KnhPm67thcpzcZo_HuE", "firebase이용 개발", "realtime database 기존 디비에 비해 제약사항이 너무 많아서 생각해야 할것이 많다.");

function setPost(menu = "", id = "", data = {
  title: "",
  data: "",
  createData: 0
}) {
  let title = cm._q('div.post .title');
  let divData = cm._q('div.post .data');
  title.className = "title";
  title.setAttribute('menu_id', menu);
  title.setAttribute('post_id', id);
  title.innerHTML = data.title;
  divData.innerHTML = data.data;
}
// getOldCurrent("-KnhPm67thcpzcZo_HuE","6",true)
// cm._q('.location .older').onclick = () => {
//   let title = cm._q('.post .title');
//   getOldCurrent(title.getAttribute("menu_id"), title.getAttribute("post_id"), true)
// }
//
// cm._q('.location .newer').onclick = () => {
//   let title = cm._q('.post .title');
//   getOldCurrent(title.getAttribute("menu_id"), title.getAttribute("post_id"))
// }

function getOldCurrent(boardId, postId, old) {
  cm.show(cm._q(".loading"));
  // loadPost(t).then(() => {
  //   cm.hide(cm._q(".loading"));
  // }).catch(() => {
  //   cm.hide(cm._q(".loading"));
  // });
  let db = database.ref("/board/" + boardId + "/data/");
  if (postId) {
    postId = +postId;
    var promise;
    if (old) { //과거
      postId = "" + (postId - 1);
      promise = db.orderByKey().endAt(postId).limitToLast(1).once('value');
    } else { //최신
      postId = "" + (postId + 1);
      promise = db.orderByKey().startAt(postId).limitToFirst(1).once('value');
    }
    promise.then((snap) => {
      let data = snap.val();
      if (data) {
        let keys = Object.keys(data);
        if (keys.length > 0) {
          setPost(boardId, keys[0], data[keys[0]]);
        }
      } else {
        alert("페이지가 없습니다.")
      }
    }).then(() => {
      cm.hide(cm._q(".loading"));
    })
  } else {
    cm.hide(cm._q(".loading"));
  }
  // return new Promise((s, f))
}

function loadPost(params) {


  return new Promise(function(sucess, fail) {
    let editor = ContentTools.EditorApp.get();
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
        database.ref("/board/" + params.menu + "/data/" + params.post).once("value").then((snap) => {
          let data = {
            menu: params.menu,
            post: params.post,
            data: snap.val()
          };
          if (!data.data) {
            alert("해당 글이 없습니다.");
          }
          setOldCurrent(data.menu, data.post).then(() => {
            setPost(data.menu, data.post, data.data)
          });
          menuHide();
          sucess();
        });
      } else {
        database.ref("/board/" + params.menu + "/data/").orderByChild('createDate').limitToLast(1).once("value").then(function(data) {
          let snap = data.val();
          let firstData;
          for (let key in snap) {
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
      let menu = document.querySelector('.menu li:nth-child(1) > a');
      if (menu)
        menu.click();
      return;
    }

  });
}

function saveData(menu, title, data) {
  return new Promise((s, f) => {
    let saveData = new postData();
    saveData.title = title;
    saveData.data = data;
    saveData.createDate = (new Date()).getTime();

    database.ref("/board/" + menu + "/boardTime").transaction(function(boardTime) {

      if (!boardTime || boardTime < saveData.createDate) {
        boardTime = saveData.createDate;
      } else {
        boardTime = undefined;
      }
      return boardTime;
    }, function(error, committed, snapshot) {
      if (error) {
        console.log('Transaction failed abnormally!', error);
      } else if (!committed) {
        console.log('We aborted the transaction (because ada already exists).');
      } else {
        if (snapshot.val() == saveData.createDate) {
          database.ref("/board/" + menu + "/boardCount").transaction(function(boardCount) {
            if (!boardCount) {
              boardCount = 0;
            }
            return boardCount + 1;
          }, function(error, committed, snapshot) {
            if (error) {
              console.log('Transaction failed abnormally!', error);
              s();
            } else if (!committed) {
              console.log('We aborted the transaction (because ada already exists).');
              s();
            } else {
              var postId = snapshot.val();
              database.ref("/board/" + menu + "/data/" + postId).set(saveData).then((snap) => {
                let title = cm._q('title');
                if (title) {
                  title.setAttribute("post_id", postId);
                  s();
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
  let menuCount = database.ref("/menu/menuCount");
  return menuCount.transaction(function(menuCount) {
    if (!menuCount) {
      menuCount = 0;
    }
    return menuCount + 1;
  }, function(error, committed, snapshot) {
    if (error) {
      console.log('Transaction failed abnormally!', error);
    } else if (!committed) {
      console.log('We aborted the transaction (because ada already exists).');
    }
  }).then(() => {
    return database.ref("/menu/data").push(menu);
  }).catch(() => {
    menuCount.transaction(function(menuCount) {
      if (!menuCount) {
        menuCount = 1;
      }
      return menuCount - 1;
    }, function(error, committend, snapshot) {
      if (error || !committed) {
        console.log('server error');
      }
    });
  });
}

document.body.onhashchange = () => {
  let t = hashToValue();
  cm.show(cm._q(".loading"));
  loadPost(t).then(() => {
    cm.hide(cm._q(".loading"));
  }).catch(() => {
    cm.hide(cm._q(".loading"));
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    contentTools();
  }
});
newData();

function newData() {

  cm._q('.menu_icon .new_post').onclick = () => {
    menuHide();
    let temp = hashToValue();
    let editor = ContentTools.EditorApp.get();
    let title = cm._q('div.post .title');
    let divData = cm._q('div.post .data');
    title.setAttribute('menu_id', temp.menu);
    title.setAttribute('post_id', "");
    title.innerHTML = "";
    divData.innerHTML = "";
    if (editor.getState() != "editing");
    cm._q('.ct-ignition__button.ct-ignition__button--edit').click();
  }
}

function contentTools() {
  let editor = ContentTools.EditorApp.get();
  if (editor && firebase.auth().currentUser) {
    cm.show(cm._q(".menu_icon .new_post"));
    editor.init('[data-editable], [data-fixture]', 'data-name');
    editor.addEventListener('stop', function(ev) {
      let title = cm._q('div.post .title');
      title.className = "title";
    });
    editor.addEventListener('saved', function(ev) {
      let data = ev.detail().regions;
      if (Object.keys(data).length === 0) {
        return;
      }
      // let menu = hashToValue();
      let postId = cm._q('.post .title').getAttribute("post_id");
      let menu = cm._q('.post .title').getAttribute("menu_id");
      cm.show(cm._q('.loading'));
      editor.busy(true);
      if (menu && postId) {
        firebase.database().ref("/board/" + menu + "/data/" + postId).update(data).then(function() {
          editor.busy(false);
          cm.hide(cm._q('.loading'));
        }).catch(function() {
          editor.busy(false);
          cm.hide(cm._q('.loading'));
        });
      } else if (menu) {
        saveData(menu, data.title, data.data).then(() => {
          editor.busy(false);
          cm.hide(cm._q('.loading'));
        });

      }
    });
  }

}
initMenuButton();

function initMenuButton() {
  let div = cm._q('.menu_icon .terminal.icon').parentElement
  div.onclick = () => {
    let main = cm._q('.main');
    if (main.className.indexOf("left_hide") >= 0) {
      main.classList.remove('left_hide')
    } else {
      main.classList.add('left_hide')
    }
  }
}

// window.onload = function() {
//
//     FIXTURE_TOOLS = [['undo', 'redo', 'remove']];
//     ContentEdit.Root.get().bind('focus', function(element) {
//       var tools;
//       if (element.isFixed()) {
//         tools = FIXTURE_TOOLS;
//       } else {
//         tools = ContentTools.DEFAULT_TOOLS;
//       }
//       if (editor.toolbox().tools() !== tools) {
//         return editor.toolbox().tools(tools);
//       }
//     });
//     req = new XMLHttpRequest();
//     req.overrideMimeType('application/json');
//     req.open('GET', 'https://raw.githubusercontent.com/GetmeUK/ContentTools/master/translations/lp.json', true);
//     return req.onreadystatechange = function(ev) {
//       var translations;
//       if (ev.target.readyState === 4) {
//         translations = JSON.parse(ev.target.responseText);
//         ContentEdit.addTranslations('lp', translations);
//         return ContentEdit.LANGUAGE = 'lp';
//       }
//     };
//   };
//
// }).call(this);
//
function menuHide() {
  let main = cm._q('.main');
  if (main.className.indexOf("left_hide") < 0) {
    main.classList.add('left_hide');
  }
}

function menuShow() {
  let main = cm._q('.main');
  if (main.className.indexOf("left_hide") >= 0) {
    main.classList.remove('left_hide')
  }
}


function setOldCurrent(boardId, postId) {
  if (!postId) {
    cm._q(".location").classList.add('hide');
    return new Promise((s, f) => {
      console.log("postId가 없음.");
      f("postId가 없음.");
    });
  }
  let db = database.ref("/board/" + boardId + "/data/");
  if (postId) {
    postId = +postId;
    let promiseList = [];
    promiseList.push(db.orderByKey().endAt("" + (postId - 1)).limitToLast(1).once('value')); //과거
    promiseList.push(db.orderByKey().startAt("" + (postId + 1)).limitToFirst(1).once('value')); // 최신
    return Promise.all(promiseList).then((snap) => {
      for (let i = 0; i < snap.length; i++) {
        let selector = ".location .newer";
        if (i == 0) {
          selector = ".location .older";
        }
        if (snap[i]) {
          let data = snap[i].val();
          if (data) {
            let key = Object.keys(data);
            if (key[0]) {
              cm._q(selector).classList.remove('hide');
              cm._q(selector).setAttribute("href", location.pathname + "#menu=" + boardId + "&post=" + key[0]);
            }
          } else {
            cm._q(selector).classList.add('hide');
          }
        } else {
          cm._q(selector).classList.add('hide');
        }
      }
      cm._q(".location").classList.remove('hide');
    })
  }
}
