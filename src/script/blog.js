var style = require("../style/style.css");
style.use();
var cm = require("./common.js");
var database = firebase.database();
var loadMenu = new Promise(function loadMenu(resolve, reject) {
  var menu = database.ref("/menu/data");
  menu.orderByKey().once('value').then((datas) => {
    try {
      var ul = document.querySelector('ul.menu');
      var data = datas.val();
      for (var key in data) {
        var label = document.createElement("label");
        var text = document.createTextNode(data[key]);
        label.appendChild(text);
        var a = document.createElement("a");
        a.appendChild(label);
        a.setAttribute("href", "#menu=" + key);
        a.setAttribute("title", data[key]);
        a.onclick = ((key) => {
          return () => {
            console.log(key)
          };
        })(key);
        var li = document.createElement("li");
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
  cm.show(cm._q("body"));
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
// saveData("-KnhPm67thcpzcZo_HuE", "test", "<head>2</head>")
loadPost("-KnhPm67thcpzcZo_HuE")

function loadPost(menu) {
  database.ref("/board/" + menu + "/data").orderByChild('createDate').limitToLast(1).once("value").then(function(data) {
    var snap = data.val();
    var firstData;
    for (var key in snap) {
      if (snap.hasOwnProperty(key)) {
        firstData = snap[key];
        break;
      }
    }
    if(firstData){
      // console.log(firstData.data)
      cm._q('div.post .title').innerHTML= firstData.title;
      cm._q('div.post .data').innerHTML= firstData.data;
    }
    // data.val()[0].data
    // cm._q('div.post').innerHTML= data.val()[0];
  })
}

function saveData(menu, title, data) {
  let saveData = new postData();
  saveData.title = title;
  saveData.data = data;
  saveData.createDate = (new Date()).getTime();

  database.ref("/board/" + menu + "/boardTime").transaction(function(boardTime) {

    if (!boardTime || boardTime < saveData.createDate) {
      boardTime = saveData.createDate;
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
          } else if (!committed) {
            console.log('We aborted the transaction (because ada already exists).');
          } else {
            database.ref("/board/" + menu + "/data").push(saveData);
          }
        });
      } else {

      }
    }
  });

}
// saveMenu("test")
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
    } else {
      database.ref("/menu/data").push(menu);
    }
  });
}


document.body.onhashchange = () => {
  console.log("fdsa")
}
