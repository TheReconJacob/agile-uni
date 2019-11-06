# agile-uni

The repo for the agile university website

## Install

To use the Sky page-lib we needed an auth token, this is encypted. Download the git-crypt secret key and place a copy of it in your home directory (run echo \$HOME to find this)
To access this run `git-crypt unlock <path to key>`


## Testing 

Currently the server needs to be running before you can run the tets. We'll fix it eventually.

Run `npm start` in the backend folder and then `npm test` in the same folder