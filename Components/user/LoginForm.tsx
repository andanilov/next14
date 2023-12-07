'use client';

import { FC, FormEventHandler, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
// import { load } from "recaptcha-v3";
// import Button from "../form/Button";
// import Input from "../form/Input";
import { useFormState } from "react-dom";
// import { IFromState, TServerAction } from "@/actions/TServerAction";
import Button from "../common/form/Button";
import Input from "../common/form/Input";
import { signInAction } from "@/actions/signIn.action";

export interface ILoginState {
  login: string,
  password: string,
  token: string,
}

const LoginForm : FC = () => {
  const [responseState, serverAction] = useFormState(signInAction, {});
  const [loginState, setLoginState] = useState<ILoginState>({
    login: '',
    password: '',
    token: '',
  });

  const handleSignIn = async () => {
    // const formData = new FormData(event.currentTarget);
    const result = await signIn('credentials', {
      email: 'test',
      // password: loginState.password,
      callbackUrl: '/dashboard',
      // redirect: '/dashboard',
    });
    console.log('result = ', result);    
  }

  const handleSignOut = async () => {
    // const formData = new FormData(event.currentTarget);
    const result = await signOut();
    console.log('result = ', result);    
  }

  return (
    <>
      <Input
        label="Username"
        name="login"
        size="large"
        value={loginState?.login}
        handle={(e) => setLoginState((prevState) => ({ ...prevState, login: e?.target?.value || ''}))}
        // disabled={status.pending}
        error={responseState?.errors?.login}
      />
      <Input
        label="Password"
        name="password"
        size="large"
        type="password"
        value={loginState?.password}
        handle={(e) => setLoginState((prevState) => ({ ...prevState, password: e?.target?.value || ''}))}
        // disabled={status.pending}
        error={responseState?.errors?.password}
      />          
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
          <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">Remember me</label>
        </div>

        <div className="text-sm leading-6">
          <a href="#" className="text-primary hover:text-primary_hover">Forgot password?</a>
        </div>
      </div>
      <div>
        <Button
          size="large"
          // type="submit"
          // disabled={status.pending || !!formState?.errors?.length}
          // onClick={handleSignIn}
          onClick={() => {
            serverAction(loginState);
          }}
        >
          Sign IN
        </Button>  
        {/* <Button
          size="large"
          // type="submit"
          // disabled={status.pending || !!formState?.errors?.length}
          onClick={handleSignOut}
        >
          Sign OUT
        </Button>              */}
      </div>
       
    </>
  );
}

export default LoginForm;

// export default function UserLoginForm({
//   signInAction
// } : {
//   signInAction: TServerAction
// }) {
//   // -- Get form state after server action
//   const [formState, formAction] = useFormState(signInAction, {});

//   // -- Generate recaptcha token
//   // -- We generate tokens for each rerender
//   const [token, setToken] = useState('');

//   useEffect(() => {
//     (async () => {
//       const recaptcha = await load(process.env.RECAPTCHA_KEY || '');
//       const tkn = await recaptcha.execute(process.env.LOGIN_ACTION);
//       setToken(() => tkn);      
//     })();
//   }, [formState?.id]);
  
//   // -- Output error toast when we have any errors
//   useEffect(() => {
//     formState?.errors && toast.error(Object.values(formState.errors).join('\n'));
//   }, [formState?.id]);


//   return (
//     <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
//       <form className="space-y-6" action={formAction}>        
//         <Fields formState={formState}/>
//         <input type="hidden" name="token" value={token} />
//       </form>
//       <Toaster />
//     </div>
//   );  
// }
