# ATM

Hosted on
```sh
http://ec2-54-81-140-182.compute-1.amazonaws.com
```
### Run it locally


# Features

  - Generate random empty card number and pin
  - Login with correct card number and pin
  - A simple dash board displaying current balance after login
  - Deposite money with simple validation for the input
  - Withdrawal money with 1000 daily limit
  - Logout
  - Block unauthorized access

### Tech

Dillinger uses a number of open source projects to work properly:

* Frontend- [Angular]
* Backend- [Node.js]  --version: 10.15.3
* Database- [Mysql] --version 5.7.26
* Hosted on AWS EC2

### Installation

ATM requires [angular-cli](https://cli.angular.io/) to run the frontend.

Install the dependencies and start the server.

```sh
$ npm install
$ npm start
```
Open a new terminal and install [angular-cli] and dependencies and start the frontend.
```sh
$ cd public/frontend
$ npm install -g @angular/cli
$ npm install
$ npm start
```
Open browser and type
```sh
http://localhost:4200
```
### Todos

 - Write Test cases
 - Session timeout
 - Better UI
 - Allow one account has multiple cards and handle multiple transactions happen at same time
 - Automatic deployment/ pipeline
 - Safety
 - Sacllablility

License
----

MIT

   [node.js]: <http://nodejs.org>
   [Angular]: <https://angular.io/>
   [Mysql]: <https://www.mysql.com/>

