# agile-uni

The repo for the agile university website

## Install

The password for the database and the authtoken for the sky node library are encrypted on github. You will need a key to unlock these files.

Make sure [Homebrew](https://brew.sh/) is installed. Install gitcrypt  
`brew install git-crypt`

Download the file called "agile_key" which is pinned in the agile-university slack channel. You can put this in any directory EXCEPT that linked to the github repo (e.g. you could store it in your home directory - run `echo \$HOME` to find this).

Run `git-crypt unlock <path to key>`

## Database

Read the github wiki section if you want. Otherwise

### Local DB

`brew install mysql`

`brew services start mysql`

Login with `mysql -u root`

Execute `CREATE DATABASE agileuni;` & `USE agileuni;`

Then execute `SOURCE ddl_script/db_0.sql` and any other sql files necessary

To connect to the local database, change the backend/config file:
`host: "127.0.0.1", port: "3306", user: "root", password: "", ....`

[Something weird happens when there is no password when connnecting to nodejs](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server).

Run below to fix

```
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_new_password';
mysql> FLUSH PRIVILEGES;
mysql> quit
```

### Dev DB

Our db is hosted on Nimbus. You need to create your own dev credentials for the db. The db is a service instance which eventually will be [bound to an application](https://docs.pivotal.io/p-mysql/2-7/use.html#bind). This allows environment variables to be used to login to the db. See the pivotal mysql docs for more info

To create your own user to login follow https://docs.pivotal.io/p-mysql/2-7/customize-access.html#username

Our database is called `dev_db` run `cf service-keys dev_db` to find all the keys then `cf service-key dev_db key1` to see the credentials. The DB name is in the credentials. Use that in config.js

## Nimbus

Follow the getting started guide https://developer.bskyb.com/wiki/display/cloud/Nimbus+Getting+started

We have a dev server on M25 so login to https://api.cf.dev-paas.bskyb.com

You need to attempt a login to the `DL-SoftwareEngineeringAcademy` org before you can be added to it. Ask someone on slack to find who the Space Manager is. You want to be added as a Space Manager and a Space Developer.

## Testing

You'll need an AUTHTOKEN as a env to run the test (**see wiki as to why**). Install JWT debugger on chrome or search localstorage for the token. Using the JWT debugger, select the latest token (not the msal.idtoken) from drop down next to "OPEN JWT FROM", copy the encoded token. Then in your terminal set `AUTHTOKEN=ey68t53tyoeg......... npm test`

## Emails

We have set up email sending with a dummy gmail account. This will need updating to an agile university account, but I suggest that you use a boiler account for just sending the notification emails.  The email credentials are encrypted in emailConfig.js. To change the account over to a sky email account, you will need to update the credentials, and the settings in the server.js transport variables. 

## Useful Links

We used the sky react library for some components. This can be found on [pages-lib page](https://github.com/sky-uk/pages-lib) for the sky github. [Library of components](https://pages-lib.cf.dev-paas.bskyb.com/storybook/?path=/story/*)

We also used the [sky toolkit](https://www.sky.com/toolkit)
