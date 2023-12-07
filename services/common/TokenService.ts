import { CookiesService } from "./CookiesService";

export const TokenService = {
  // getAccessKey: process.env.ACCESS_TOKEN_NAME || 'accessToken',
  // getRefreshKey: process.env.REFRESH_TOKEN_NAME || 'refreshToken',

  setAccess: async function (token: string) {
    return CookiesService.server().set(process.env.ACCESS_TOKEN_NAME || 'accessToken', token);
  },  
  getAccess: async function () {
    return CookiesService.server().get(process.env.ACCESS_TOKEN_NAME || 'accessToken');
  },  
  deleteAccess: async function () {
    return CookiesService.server().delete(process.env.ACCESS_TOKEN_NAME || 'accessToken');
  },

  setRefresh: async function (token: string) {
    return CookiesService.server().set(process.env.REFRESH_TOKEN_NAME || 'refreshToken', token);
  },  
  getRefresh: async function () {
    return CookiesService.server().get(process.env.REFRESH_TOKEN_NAME || 'refreshToken');
  },
  deleteRefresh: async function () {
    return CookiesService.server().delete(process.env.REFRESH_TOKEN_NAME || 'refreshToken');
  },
}