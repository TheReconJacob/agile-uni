import {
    inputBuilder,
    selectBuilder,
    richTextBuilder,
    buttonBuilder
  } from "./FormComponents/";

const typeToBuilderMap = {
    text: inputBuilder,
    email: inputBuilder,
    tel: inputBuilder,
    password: inputBuilder,
    number: inputBuilder,
    time: inputBuilder,
    date: inputBuilder,
  
    select: selectBuilder,
  
    rich_text: richTextBuilder,
  
    button: buttonBuilder
};

export default typeToBuilderMap;