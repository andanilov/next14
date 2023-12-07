import { auth } from '@/config/auth';
import { CookiesService } from '@/services/common/CookiesService';
import { HttpService } from '@/services/common/HttpService';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { useRouter } from 'next/router';

export default async function DashboardPage({ searchParams } : { searchParams: Record<string, string> }) {
  // const session = await getSession();
  // session.user = "John Doe";
  
  // console.log('searchParams = ', searchParams);  
  // const headersList = headers();
  // const { asPath } = useRouter();
  // console.log('headers = ', 
  // headersList.get('referer'),
  // headersList.get('host'),
  // headersList.get('x-forwarded-host'),
  // headersList.get('x-invoke-path'));
  
  
  // const session = await auth();


  // console.log('session = ', session);
  // if (!session) redirect('/signin');

  // console.log('session = ', session?.user);
  
  // console.log('1');  
  // await CookiesService.server().set('test', '!!!!!!!!!!');
  // console.log('2');  
  const response = await HttpService.get('users/me');
  console.log('RESPONSE! = ', response);
  
  // redirect('api/refresh');
  // console.log('response = ', response);  


  return (
    <main>
      Dashboard page
    </main>
  )
}
