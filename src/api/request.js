import { axiosInstance } from "../api/config";

export const getBannerRequest = () => {
  return axiosInstance.get("/banner");
};

export const getRecommendListRequest = () => {
  return axiosInstance.get("/personalized");
};

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};

/**
 *
 * @param {*} area 地区
 * @param {*} type 类型
 * @param {*} alpha 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列
 * @param {*} count 分页
 * @returns
 */
export const getSingerListRequest = (area = -1, type = -1, alpha, count) => {
  return axiosInstance.get(
    `/artist/list?area=${area}&type=${type}&initial=${alpha.toLowerCase()}&offset=${count}`
  );
};

export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`);
};
