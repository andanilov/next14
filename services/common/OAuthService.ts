import { ERROR_MESSAGES } from "@/messages/errorMessages";
import { HttpService } from "./HttpService";
import { TokenService } from "./TokenService";

export const OAuthService = {

  // --
  // -- Return string if an error happens or the tokens pair if success
  // --
  // signIn: async function({
  //   login,
  //   password,
  //   tokenCaptcha,
  // } : {
  //   login: string,
  //   password: string,
  //   tokenCaptcha: string,
  // }) : Promise<string | ISigninResponse> {
  //   // -- Try to login using API and get tokens
  //   const response = await HttpService.post('oauth/login', {
  //     cache: 'no-store',
  //     body: { login, password, tokenCaptcha },
  //     isTryRefresh: false,
  //   });

  //   if (response?.error)
  //     return response?.error;
    
  //   if ([response.accessToken, response.refreshToken].includes(undefined))
  //     return ERROR_MESSAGES['signin-failed'];

  //   return response;
  // },

  signIn: async function({
    login,
    password,
    token,
  } : {
    login: string,
    password: string,
    token: string,
  }) : Promise<string> {
    // 1. Try to login using API and get tokens if successful
    //    and put tokens to the cookies
    const response = await HttpService.post('oauth/login', {
      cache: 'no-store',
      body: { login, password, token },
      isTryRefresh: false,
    });
console.log('response = ', response);

    if (response?.error) return response?.error;
    
    const { accessToken, refreshToken } = response;
    if (!accessToken || !refreshToken) return ERROR_MESSAGES['signin-failed'];

    // 2. Put tokens to the store (cookie)
    await TokenService.setAccess(accessToken);
    await TokenService.setRefresh(refreshToken);

    return '';
  },

  

}