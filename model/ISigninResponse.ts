import { ITokensPair } from "./ITokensPair";
import { IUser } from "./IUser";

export interface ISigninResponse extends ITokensPair {
  user: IUser
}

