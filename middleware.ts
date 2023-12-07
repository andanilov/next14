import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  return response;
  
  // -- Get current user info
  // const user = await UserService.getMyselfFromServer();


  // console.log('request.nextUrl = ', request.nextUrl);
  

  // if (request.nextUrl.pathname === '/api/refresh') {

  //   response.cookies.set('NEWTOKEN', '!!!!', { path: "/" });
  //   return 
    // return redirect('http://localhost:3001/login')
//     const oldRefresh = request.cookies.get('refreshToken');
// console.log('oldRefresh = ', oldRefresh);

//     if (oldRefresh) {
//       const refreshResponse = await fetch(`${process.env.API_URL}oauth/refresh/`, {
//         method: 'POST',
//         cache: 'no-store',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ refresh: oldRefresh })
//       });
//       const data = await refreshResponse.json();
//       const { accessToken, refreshToken } = data;
  
//       console.log('refresh response = ', data);      
//       console.log('NEW accessToken, refreshToken = ', accessToken, refreshToken);      

//       if (accessToken && refreshToken) {
//         response.cookies.set('accessToken', accessToken, { path: "/" });
//         response.cookies.set('refreshToken', refreshToken, { path: "/" });
//       }
//     } 

    // return response;
    // return NextResponse.json({ msg: 'ok' });
    // return response.json({ msg: 'ok' }); // .rewrite(new URL('/portal', request.url))
    // response.cookies.set('accessToken', 'test', { path: "/" });
    // response.cookies.set('refreshToken', 'test', { path: "/" });
    // response.cookies.set('accessToken', 'test-access', { path: "/" });
    // response.cookies.set('NEWTOKEN', 'test-refresh', { path: "/" });
  // }
  
  // return response;
  // if (request.nextUrl.pathname === '/login' && user?.userRole)
  //   return NextResponse.rewrite(new URL('/portal', request.url))
  
  // if (!user?.userRole)
  //   return NextResponse.rewrite(new URL('/login', request.url)) 
  
  // if (request.nextUrl.pathname.startsWith('/about')) {
  //   return NextResponse.rewrite(new URL('/about-2', request.url))
  // }
}

// export const config = {
//   matcher: ['/login', '/portal', '/offer', '/refresh'],
// }
