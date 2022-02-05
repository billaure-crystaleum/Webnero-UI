# [Webnero UI]

This is the User Interface for Webnero. 
Webnero is the Web Wallet for Electronero Network coins/tokens. 
Support for ETNX, ETNXP, LTNX, GLDX, CRFI and all EI-2.0 XRC20 tokens, Electronero Smart Chain xASSETS out-of-the-box. 

Deposit, Withdrawal, Transaction History, Swaps (soon), Stake (soon), Farm (soon), and more.  

To use the UI, connect to Electronero Passport API 
Get an API key here: <insert API key>
  
## Connection Scheme
```
------[server]-------<<->>-------[blockchain]-----<<->>------[private API]-------<<->>------[public API]------<<->>---[UX/UI]---
electronero network | <-> | electronerod (nodes) | <-> | electronero-Wallet-RPC | <-> | Electronero Passport | <-> | Webnero UI
----node clusters---|<<->>|--blockchain daemons--|<<->>|-- wallets JSON API's --|<<->>|public Electronero API|<<->>| front-end
```
  
# Requirements
- Must have a connection to Electronero Passport API or your own API for the UI to function as intended. This is the live repository of Webnero hosted at https://webnero.electronero.org
- NodeJS/NPM or NodeJS/Yarn
- Bower
  
# Install (one-liner)
  ```bower init && bower install && npm i && gulp less && gulp deploy``` 
  The sym linked `*.html` files located in `./` will be hot loaded to `wallet/*` and you can serve the `*.html` directly from `./`
  
# Install (walk-through)
## Building from Source Files
  
  After cloning the repo take a look at the `gulpfile.js` and check out the tasks available:
* `gulp less` The less task will compile the LESS into the `dist` directory and minify the output.
* `gulp deploy` The default task will compile templates from NJK to HTML, and LESS and JS, then output into the `dist` directory and minify the output, and it will copy all vendor libraries from `bower_components` 
 
  Node Packages:
  Use npm or yarn to install dependencies.
```
npm install gulp-nunjucks-render --save-dev
npm install gulp-data --save-dev
```
  Bower Packages:
To update dependencies, run `bower update` and then run `gulp less && gulp deploy` to copy the updated dependencies
```
bower init
bower install
bower update
```

The public Electronero Passport API is exposed at the following endpoints;
  
```
    etnxApi: 'https://passport.electronero.org/api-etnx/api.php',
    etnxpApi: 'https://passport.electronero.org/etnxp-api/api.php',
    etnxcApi: 'https://passport.electronero.org/etnxc-api/api.php',
    ltnxApi: 'https://passport.electronero.org/ltnx-api/api.php',
    gldxApi: 'https://passport.electronero.org/gldx-api/api.php',
    crfiApi: 'https://passport.crystaleum.org/crfi-api/api.php',
    passportAPI: 'https://passport.electronero.org/passport/api.php';```
  
  These following expressions contain Electronero Passport API public function names, and expected variables in order for a POST to return true, or with data; 
```
		case "register_webnero": expects (email), (password), (code)
		case "login_webnero": expects (email), (password), (code)  
    case "reset_password_webnero": expects (email)
		case "transfer_webnero": expects (coin), (uid), (password), (amount), (receiver), (pid) 
		case "transfer_split_webnero":  expects (coin), (uid), (password), (amount), (receiver), (pid) 
		case "getaddr_webnero": expects (email), (password), (code)```
