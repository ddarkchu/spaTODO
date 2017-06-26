var style = require("../style/style.css")
style.use();
var cm = require("./common.js")
cm.show(cm._q("body"))

function loadMenu(){
  var menu = firebase.database().ref("/menu");
  menu.orderByKey().onece().then((data)=>{
    
  });

}

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
