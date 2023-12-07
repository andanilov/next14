import { HttpService } from "@/services/common/HttpService";
import { NextRequest, NextResponse } from 'next/server';

export async function GET (request: NextRequest) {
  console.log('API refresh flow ', process.env.NEXT_PUBLIC_SITE_URL);  

  // -- Get original address
  const originAddress = request.headers.get('referer')
    || request.headers.get('host')
    || request.headers.get('x-forwarded-host')
    || request.headers.get('x-invoke-path')
    || process.env.NEXT_PUBLIC_SITE_URL
    || '/';

  // -- Try to update tokens
    return (await HttpService.updateTokensPair())
      // ? NextResponse.redirect(originAddress)
      ? NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}`)
      : NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login`);
}

  
  // console.log('request = ', request.nextUrl.origin);
  

    // const { accessToken, refreshToken } = await request.json();

    // if (!accessToken || !refreshToken)
    //   return Response.json({ message: 'no!'});

  // const cookie = serialize("newRefresh", '---', {
  //     // httpOnly: true,
  //     path: "/",
  //   });

  //   const res = new NextResponse(JSON.stringify({ message: "Welcome John Doe" }), {
  //     status: 200,
  //     headers: {
  //       "Set-Cookie": cookie,
  //       "location": request.nextUrl.origin,
  //     }
  //   });

    // return new NextResponse(JSON.stringify({ message: "Welcome John Doe" }));
    // return NextResponse.redirect(request.nextUrl.origin + '/1')

    // return redirect(response, request.nextUrl.origin);
// } 

// export async function POST (request: NextRequest) {
//   const { accessToken, refreshToken } = await request.json();

//   if (!accessToken || !refreshToken)
//     return Response.json({ message: 'no!'});

// const cookie = serialize("newRefresh", refreshToken, {
//     // httpOnly: true,
//     path: "/",
//   });

//   return new NextResponse(JSON.stringify({ message: "Welcome John Doe" }), {
//     status: 200,
//     headers: {
//       "Set-Cookie": cookie,
//     }
//   });
// } 