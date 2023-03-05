import service from "..";

// 获取歌单详情  根据id获取
export const getMusicItemList = (data) => { return service({ method: "GET", url: `/playlist/detail?id=${data}` }) };

// 获取歌单列表  根据id获取
export const getItemList = (data) => { return service({ method: "GET", url: `/playlist/track/all?id=${data}&limit=20&offset=0` }) };

// 获取歌词 根据id获取
export const getMusicLyric = (data) => { return service({ method: "GET", url: `/lyric?id=${data}` }) };