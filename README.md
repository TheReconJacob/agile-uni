# agile-uni

The repo for the agile university website

## Install
The password for the database and the authtoken for the sky node library are encrypted on github. You will need a key to unlock these files. 

Make sure Homebrew is installed (https://brew.sh/). Install gitcrypt `brew install git-crypt`

 Download the file called "agile_key" which is pinned in the agile-university slack channel. You can put this in any directory EXCEPT that linked to the github repo (e.g. you could store it in your home directory - run `echo \$HOME` to find this). 
 
 Run `git-crypt unlock <path to key>`

## Testing 

Currently the server needs to be running before you can run the tets. We'll fix it eventually.

Run `npm start` in the backend folder and then `npm test` in the same folder

## Text editor

`npm install react-quill`

See more info: https://github.com/zenoamaro/react-quill#theme

## Useful Links

We used the sky react library for some components. This can be found on pages-lib page for the sky github  https://github.com/sky-uk/pages-lib. The access the library of the compents visit https://pages-lib.cf.dev-paas.bskyb.com/storybook/?path=/story/*

We also used the sky toolkit https://www.sky.com/toolkit
