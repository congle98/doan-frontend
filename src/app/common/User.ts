import {Role} from "./Role";

export class User {
  id:number;
  username:string;
  password:string;
  fullName:string;
  email:string;
  phone:string;
  avatarUrl:string;
  role:Role;
  status:boolean;
}
