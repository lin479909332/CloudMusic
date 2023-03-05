// rem适配
function remSize() {
  // 获取设备的宽度
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
  // 保持与设计稿差距不大的样子，不能过大不能过小
  if (deviceWidth >= 750) {
    deviceWidth = 750;
  }
  if (deviceWidth <= 320) {
    deviceWidth = 320;
  }
  // 750px => 1rem = 100px , 375px => 1rem = 50px
  // 控制字体大小
  document.documentElement.style.fontSize = (deviceWidth / 7.5) + "px";
  document.querySelector("body").style.fontSize = 0.3 + "rem";
}
// 上来就调用一次
remSize();
// 窗口发生变化的时候也调用
window.onresize = function () { 
  remSize();
 }