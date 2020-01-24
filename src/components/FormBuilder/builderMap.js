import {
  inputBuilder,
  selectBuilder,
  richTextBuilder,
  buttonBuilder,
  headerBuilder
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

  button: buttonBuilder,

  header: headerBuilder
};

export default typeToBuilderMap;
