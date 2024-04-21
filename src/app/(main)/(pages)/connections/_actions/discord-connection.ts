'use server'

import axios from "axios";

export const postContentToWebHook = async (content: string, url: string) => {
  console.log(content);
  if (content != "") {
    const posted = await axios.post(url, { content });
    if (posted) {
      return { message: "success" };
    }
    
    return { message: "failed request" };
  }
  return { message: "String empty" };
};
