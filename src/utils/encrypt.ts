import { MD5_SALT } from "@/config";
import CryptoJS from "crypto-js";

export const md5 = (str: string) => {
  return CryptoJS.MD5(`${MD5_SALT}${str}`).toString();
};
