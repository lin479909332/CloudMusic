import service from "..";
/*

export function getBanner() {
  return service({
    method: "GET",
    url: "/banner?type=2"
  })
}


export function getMusicList() {
  return service({
    method: "get",
    url: ""
  })
}

*/

// 首页轮播图
export const getBanner = () => { return service({ method: "GET", url: "/banner?type=2" }) }

// 发现好歌单
export const getMusicList = () => { return service({ method: "GET", url: "/personalized?limit=10" }) }

// 搜索
export const getSearchMusic = (data) => { return service({ method: "GET", url: `/search?keywords=${data}` }) }

// 登录 /login/cellphone?phone=xxx&password=yyy
export const getPhoneLogin = (data) => { return service({ method: "GET", url: `/login/cellphone?phone=${data.phone}&password=${data.password}` }) }

// 获取用户详情 /user/detail?uid=32953014
export const getLoginUser = (data) => { return service({ method: "GET", url: `/user/detail?uid=${data}` }) }



