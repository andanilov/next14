import { CookiesService } from '@/services/common/CookiesService';
import { HttpService } from '@/services/common/HttpService';
import { redirect } from 'next/navigation';

export default async function Home() {
  // console.log('1');  
  // await CookiesService.server().set('test', '!!!!!!!!!!');
  // console.log('2');  
  // const response = await HttpService.get('users/me');
  // redirect('api/refresh');
  // console.log('response = ', response);  


  return (
    <main>
      Home page
    </main>
  )
}
