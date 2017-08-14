const style = require("../style/style.css");
style.use();
const cm = require("./common.js");
const util = require("./util.js");
const database = firebase.database();
const loadMenu = new Promise(function loadMenu(resolve, reject) {
  let menu = database.ref("/menu/data");
  menu.orderByKey().once('value').then((datas) => {
    try {
      let ul = document.querySelector('ul.menu');
      let data = datas.val();
      let firstMenu = "";
      for (let key in data) {
        if (firstMenu == "") {
          firstMenu = key;
        }
        let label = document.createElement("label");
        let text = document.createTextNode(data[key]);
        label.appendChild(text);
        let a = document.createElement("a");
        a.appendChild(label);
        a.setAttribute("href", "/post?menu=" + key);
        a.setAttribute("title", data[key]);
        a.onclick = () => {
          return ((key) => {
            window.history.pushState("", "", "/post?menu=" + key);
            dataReload();
            return false
          })(key);
        }
        let li = document.createElement("li");
        li.appendChild(a);
        ul.appendChild(li);
      }
      resolve(firstMenu);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
});

function dataReload() {
  cm.show(cm._q(".loading"))
  loadMenu.then(function(menu) {
    let t = util.getParams();
    if (!t.menu || t.menu == "") {
      t.menu = menu;
    }
    loadPost(t).then(() => {
      cm.hide(cm._q(".loading"))
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
  }
}
window.onpopstate = function(event) {
  dataReload();
};

// saveData("-KnhPm67thcpzcZo_HuE", "firebase이용 개발", "realtime database 기존 디비에 비해 제약사항이 너무 많아서 생각해야 할것이 많다.");
function setPost(menu = "", id = "", data = {
  title: "",
  data: "",
  createData: 0
}) {
  let title = cm._q('div.post .title');
  let divData = cm._q('div.post .data');
  let label = cm._q('div.post .date label');
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
        database.ref("/board/" + params.menu + "/data/").orderByKey().limitToLast(1).once("value").then(function(data) {
          let snap = data.val();
          let firstData = {
            postId: undefined
          };
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
      if (menu) menu.click();
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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    contentTools();
  }
});
newData();

function newData() {
  cm._q('.menu_icon .new_post').onclick = () => {
    menuHide();
    let editor = ContentTools.EditorApp.get();
    let title = cm._q('div.post .title');
    let divData = cm._q('div.post .data');
    let date = cm._q('div.post .date > label');
    date.innerHTML = "";
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
    ContentTools.IMAGE_UPLOADER = ImageUploader.createImageUploader;
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
        saveData(menu, data.title, data.data).then((_) => {
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
              let url = "/post?menu=" + boardId + "&post=" + key[0];
              cm._q(selector).setAttribute("href", url);
              // cm._q(selector).onclick = () => {
              //   return ((url) => {
              //     window.history.pushState("", "", url);
              //     dataReload();
              //     return false
              //   })(url);
              // }
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
var ImageUploader;
ImageUploader = (function() {
  ImageUploader.imagePath = 'image.png';
  ImageUploader.imageSize = [600, 174];

  function ImageUploader(dialog) {
    this._dialog = dialog;
    this._dialog.addEventListener('cancel', (function(_this) {
      return function() {
        return _this._onCancel();
      };
    })(this));
    this._dialog.addEventListener('imageuploader.cancelupload', (function(_this) {
      return function() {
        return _this._onCancelUpload();
      };
    })(this));
    this._dialog.addEventListener('imageuploader.clear', (function(_this) {
      return function() {
        return _this._onClear();
      };
    })(this));
    this._dialog.addEventListener('imageuploader.fileready', (function(_this) {
      return function(ev) {
        return _this._onFileReady(ev.detail().file);
      };
    })(this));
    this._dialog.addEventListener('imageuploader.mount', (function(_this) {
      return function() {
        return _this._onMount();
      };
    })(this));
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
    this._dialog.addEventListener('imageuploader.save', (function(_this) {
      return function() {
        return _this._onSave();
      };
    })(this));
    this._dialog.addEventListener('imageuploader.unmount', (function(_this) {
      return function() {
        return _this._onUnmount();
      };
    })(this));
  }
  ImageUploader.prototype._onCancel = function() {};
  ImageUploader.prototype._onCancelUpload = function() {
    if (this._uploading.cancel) {
      this._uploading.cancel();
    }
    return this._dialog.state('empty');
  };
  ImageUploader.prototype._onClear = function() {
    return this._dialog.clear();
  };
  ImageUploader.prototype._onFileReady = function(file) {
    var upload;
    console.log(file);
    this._dialog.progress(0);
    this._dialog.state('uploading');
    var storageRef = firebase.storage().ref('images');
    var uploadTask = storageRef.child(file.name).put(file);
    ((_this) => {
      uploadTask.on('state_changed', function(snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        _this._dialog.progress(progress);
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {}, function() {
        _this.imagePath = uploadTask.snapshot.downloadURL;
        var fr = new FileReader;
        fr.onload = function() { // file is loaded
          var img = new Image;
          img.onload = function() {
            _this.imageSize = [img.width, img.height];
            _this._dialog.populate(_this.imagePath, _this.imageSize);
          };
          img.src = fr.result; // is the data URL because called with readAsDataURL
        };
        fr.readAsDataURL(file); //
        return;
      });
    })(this)
    return this._uploading = uploadTask;
  };
  ImageUploader.prototype._onMount = function() {};
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
  ImageUploader.prototype._onSave = function() {
    var clearBusy;
    this._dialog.busy(true);
    clearBusy = (function(_this) {
      return function() {
        _this._dialog.busy(false);
        return _this._dialog.save(_this.imagePath, _this.imageSize, {
          alt: 'Example of bad variable names'
        });
      };
    })(this);
    return setTimeout(clearBusy, 1500);
  };
  ImageUploader.prototype._onUnmount = function() {};
  ImageUploader.createImageUploader = function(dialog) {
    return new ImageUploader(dialog);
  };
  return ImageUploader;
})();
window.ImageUploader = ImageUploader;
