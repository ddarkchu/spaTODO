var style = require("../style/style.css");
style.use();
var cm = require("./common.js");
var loadMenu = new Promise(function loadMenu(resolve, reject) {
  var menu = firebase.database().ref("/menu");
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
})
loadMenu.then(function() {
  cm.show(cm._q("body"));
});
// menu 메뉴 id
// postId 게시글 아이디

var postData = {
  title:"",
  createDate:0,
  data:"",
  menu:""
}

// loadMenu();
//
// function pagiNation() {
//   var endAt;
//   return (size, page, callback) => {
//     if (page != 1) {
//
//     }
//     firebase.database().ref("/menu").orderByKey().endAt('-KnIvHSvAt_QYoWBLtxx').limitToLast(2).once("value").then((s) => {
//       console.log(s.val())
//     })
//   };
// }
//
//
// var menuCount = firebase.database().ref('menuCount');
// menuCount.transaction(function(menuCount) {
//   if (!menuCount) {
//     menuCount = 0;
//   }
//   return menuCount + 1;
// }, function(error, committed, snapshot) {
//   if (error) {
//     console.log('Transaction failed abnormally!', error);
//   } else if (!committed) {
//     console.log('We aborted the transaction (because ada already exists).');
//   } else {
//     console.log('User ada added!');
//   }
//   console.log("Ada's data: ", snapshot.val());
// });
