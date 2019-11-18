# agile-uni

The repo for the agile university website

## Install

To use the Sky page-lib we needed an auth token, this is encypted. Download the git-crypt secret key and place a copy of it in your home directory (run echo \$HOME to find this)
To access this run `git-crypt unlock <path to key>`


## Testing 

You'll need an AUTHTOKEN as a env to run the test. Install JWT debugger on chrome or search localstorage for the token. Then in your terminal set `AUTHTOKEN=ey68t53tyoeg......... npm test`


## Text editor

`npm install react-quill`

See more info: https://github.com/zenoamaro/react-quill#theme

