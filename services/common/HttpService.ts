import { redirect } from "next/navigation";
import { TokenService } from "./TokenService";

export interface IErrorResponse {
  error?: string,
}
interface IHttpRequestOptions {  
  urlBase?: string,
  method?: 'POST' | 'GET',
  headers?: Record<string, string>,
  cache?: 'force-cache' | 'no-store' | false | number,
  tags?: string[],
  isClient?: boolean,
  body?: Record<string, any>,
  queryParams?: Record<string, string>,
  isTryRefresh?: boolean,
  isFromAction?: boolean,
}
type IHttpRequestShortOptions = Omit<IHttpRequestOptions, 'method'>

export const HttpService = {

  // -- Common http request
  http: async function (url: string, options: IHttpRequestOptions): Promise<any | IErrorResponse> {
    const {
      urlBase = process.env.API_URL,
      method = 'GET',
      headers = {},
      cache = 'no-store',
      tags,
      body,
      isTryRefresh = true,
      queryParams,
      isFromAction = false,
    } = options;
    
    // 1. Get access token if exists
    const accessToken = await TokenService.getAccess();
    const refreshToken = await TokenService.getRefresh();

    // const session = await auth();
    // const accessToken = (session as any)?.accessToken;
    // const refreshToken = (session as any)?.refreshToken;
    // console.log('!!!! = session ftokens', accessToken, refreshToken);
    // console.log('!!!! = accessToken from session in request', accessToken);
    
// console.log('I am: ', typeof window === 'undefined' ? 'server' : 'client');

    // 2. Try to send request
    const queryString = queryParams
      ? `?${new URLSearchParams(queryParams)}`
      : '';

// console.log(`${method}: ${urlBase}${url}${queryString}`);
// body && console.log('body: ', body);
    try {
      const response = await fetch(`${urlBase}${url}${queryString}`, {
        method,
        ...(typeof cache === 'string' ? { cache } : {}),
        next: {
          ...(typeof cache != 'string' ? { revalidate: cache } : {}),
          ...(tags?.length ? { tags } : {}),
        },
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          ...headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });   
// console.log('RAW RESPONSE: ', response);
      // 3. If response status is 401 and isTryRefresh is true
      //    try to get refresh signing tokens and repeat the attempt
      if (response?.status === 401 && isTryRefresh) {
        if (!refreshToken)
          throw new Error('401');
        // SERVER ACTION FLOW: get tokens, set tokens to store (cookie)
        if (isFromAction && (await HttpService.updateTokensPair()))
          return await HttpService.http(url, { ...options, isTryRefresh: false })
        // SERVER COMPONENT FLOW: go to next api: /api/refresh
        else if (!isFromAction)
          throw new Error('/api/refresh');
        throw new Error('401');
      }

      const data = await response.json();
// console.log('RESPONSE: ', data);
      // 4. If response has status 400+ call error
      if (response?.status >= 400)
        throw new Error(data?.error);

      return data;
    } catch (e) {
        // SERVER COMPONENT FLOW (no way to set cookies)
        if ((e as Error)?.message === '/api/refresh')
          redirect(`/api/refresh?origin=${`${url}?${new URLSearchParams(queryParams)}`}`);

        if ((e as Error)?.message === '401') redirect('/login');

        return { error: `Error occured: ${(e as Error)?.message || e}` }
    }    
  },  

  get: async function (url: string, options?: IHttpRequestShortOptions): Promise<any | IErrorResponse> {
    return this.http(url, {
      ...(options || {}),
      method: 'GET'
    });
  },

  post: async function (url: string, options?: IHttpRequestShortOptions): Promise<any | IErrorResponse> {
    return this.http(url, {
      ...(options || {}), method: 'POST' });
  },

  // --
  // -- Try to refresh tokens
  // -- when we get tokens pair we try to add them to store (server action flow)
  // -- if we fails we send tokens pair to next api route for cookie updating
  // --
//   setRefresh: async function () : Promise<boolean | never> {
// console.log('Refresh token flow');

//     // 1. Get new tokens pair
//     const data = await this.gerTokenPairByRefresh();
//     if (!data) return false;
//     const { refreshToken, accessToken } = data;
// console.log('New tokens pair = ', refreshToken, accessToken);
//     // 2. Try to update store using new tokens pair, if no - go to next api refresh
//     try {
//       console.log('!!!!!!!!!!!!!!!!! --- enter');
//       await TokenService.setAccess(accessToken);
//       await TokenService.setRefresh(refreshToken);
//       console.log('!!!!!!!!!!!!!!!!! --- exit');
      
//       return true;
//     } catch (err) {
//       console.log('ERROR!');      
//       return redirect(`${process.env.NEXT_PUBLIC_SITE_URL}api/refresh?${String(new URLSearchParams({ refreshToken, accessToken }))}`);
//     }
//   },

  // --
  // -- Try to get new tokens using refresh token
  // --
  updateTokensPair : async function() : Promise<boolean> {
console.log('Inner token refresh flow');

    // 1. Get current refresh token
    const oldRefreshToken = await TokenService.getRefresh();
    if (!oldRefreshToken) return false;

    // 2. Try to get token pairs from API
    try {
      const { accessToken, refreshToken } = await HttpService.post(`oauth/refresh/`, {
        isTryRefresh: false,
        headers: {
          'Content-Type': 'application/json',
        },
        body: { refreshToken: oldRefreshToken },
      });

      if (!accessToken || !refreshToken) {        
        await TokenService.deleteAccess();
        await TokenService.deleteRefresh();
        return false;
      }

      await TokenService.setAccess(accessToken);
      await TokenService.setRefresh(refreshToken);

      return true;
    } catch (error) {      
      return false;
    }
  }

}