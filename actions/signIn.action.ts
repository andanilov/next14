'use server';

import { ERROR_MESSAGES } from "@/messages/errorMessages";
import { ILoginState } from "@/Components/user/LoginForm";
import { IErrorResponse } from "@/services/common/HttpService";
import { OAuthService } from "@/services/common/OAuthService";
import checkFormStateByZod from "@/utils/checkFormStateByZod";
import { z } from "zod";
import { IFromState } from "./TServerAction";

type TSignInAction = (
  state: IFromState<ILoginState>,
  payload: ILoginState,
) => Promise<IFromState<ILoginState>>

// -- Determine the form schema
const LoginSchema = z.object({
  login: z
    .string({
      required_error: ERROR_MESSAGES['login-field-empty']
    }).email(
      ERROR_MESSAGES['login-field-no-email']
    ),
  password: z
    .string({
      required_error: ERROR_MESSAGES['password-field-empty']})
    .min(3,
      ERROR_MESSAGES['password-field-too-short']
    ),
  token: z
    .string({
      required_error: ERROR_MESSAGES['token-empty']
    }),
});

export const signInAction: TSignInAction = async (state, data) => {
  const checkResult = checkFormStateByZod(LoginSchema, data);
  if (checkResult?.errors) return checkResult;

  const result = await OAuthService.signIn(data);

  return {
    id: Math.random(),
    ...((result as IErrorResponse)?.error
      ? { error: `Failed to sign in ${(result as IErrorResponse).error}` }
      : { success: 'success sign in' }
    ),
    data,
  }
  };

  // 4. Try to set logged user info to the store (cookie)
  // await UserService.setMyself();
//   redirect('/portal');
// }