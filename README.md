# agile-uni

The repo for the agile university website

## Install
Install Homebrew (https://brew.sh/)
The passwords/authtokens for the database and some node libraries are encrypted. Download the file called agile-key which is pinned in the agile-university slack channel. Place this in your home directory (run echo \$HOME to find this). This contains a key to unlock the encrypting done by github. 
To access this run `git-crypt unlock <path to key>`


## Testing 

Currently the server needs to be running before you can run the tets. We'll fix it eventually.

Run `npm start` in the backend folder and then `npm test` in the same folder

## Text editor

`npm install react-quill`

See more info: https://github.com/zenoamaro/react-quill#theme

