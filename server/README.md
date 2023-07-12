## Ecommerce MERNS Stark Projects

## lesson -1

1.Course Plan

## lesson -2

2.Environment Setup

## lesson -3

3.Create Express server --->express(npm init -y, install express)

## lesson -4

4.HTTP(hypertext tranfer protocol) request & response--->( Request--->http method/verbs:GET,PUT,DELETE,UPDATE. HTTP Headers:Content Type, Cookis. Body: Data. Response-->Status Code:200,404,500,400. HTTP Headers: Cookis. Body: JSON,HTML Code)

Informational responses (100 – 199)
Successful responses (200 – 299)
Redirection messages (300 – 399)
Client error responses (400 – 499)
Server error responses (500 – 599)
[HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

## Lesson -5

5.nodemon & morgan packges --->nodemon----( nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected ) , morgan----(morgan ar maddome clined side thake ja request pathabor tar kisu information amra dekte pabo. const morgan=require("morgan"); app.use(morgan("dev")))

## Lesson -6

6.API testing with postman

## Lesson -7

7.Middleware & type of Middleware
Middleware holo amon akta function jekhane 3ta parametter thake (req,res,next) . amara je route a middleware add korbo firsly oi middleware ar kaj complete hobe then oi route ar kaj hobe. Aber amara chaile req, ba reponse ar data change korte pabo Middleware function thake-</d>

Application level Middleware Sob route a kaj kore ..

```javascript
app.use(morgan("dev"))  // Third-party middleware
app.use(express.json()) // Express ar build in Middleware method use for parses incoming requests with JSON payloads.
app.use(express.urlencoded({extended: true})) // Form ar data niea kaj korar jonnne ai middleware amara use korbo

const isLoggdin=(req,res,next)==>{
   const isLoggin=true;
   if(isLoggin){
    req.body.id=2001
       next();
   }
   else{
      return res.status(401).json({
           message:"Your are Unauthorized person . Please login if first"
       })
   }
}

app.get("/users",isLoggdin,(req,res)==>{
   res.status(2000).json({
       message:"User information is "
   })
})

```

Express Middleware Type and Details information is here- [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)

## Lesson -8

8.Express Error handling Middleware --->
Body parser Middle ware use.
Firsty Body Parser Packages Install..

```bash
npm i body-parser
```

```javascript
const bodyParser = require("body-parser");
app.use(bodyParser.json()) / app.use(bodyParser.urlencoded({ extended: true }));
```

### error Handaling

firstly we are client side error handle then server side Error handle

```javascript
// cliend seide error handle.  here we are see 3 perameeters (req,res,next)
app.use((req,res,next)==>{
    res.status(404).json({
        message:"route not found"
    })
    next();

})

// server side error handeling .. here 4 perameeters(error,req,res,next)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

```

Noted: Server.js a only app ta run korabo . baki kaj amra app.js file a korbo.

## Lesson -9

9.How to handle HTTP Errors --->

HTTP_Errors Package Install

```bash
npm i http-errors
```

Code

```javascript
const createError = require("http-errors"); // protome amra requare kore nibo
// Cline Side Error Handle
 app.use((req,res,next)==>{
next(createError(404,"route not found"));

})

// Server Error Handaling
app.use((err, req, res, next) => {
   return res.status(err.status || 500).json({
   success: false,
    message: err.message,
  });

});

```

## Lesson -10

10.How to secure API --> xss-clean ,express-rate-limit
Amader jekono API ke Secure korte hobe jate kore kono nirdisto time a akadik bar request korte na pare.
ar fole kono program hack hote pare ba onno kono problem hote pare.

### Firstly two Package Install

xxs-clean Package

```bash
npm i xss
```

and express-rate-limit

```bash
npm i express-rate-limit
```

```javascript
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
// MiddleWare ar Thik Upore Bosabo ......becuse this is a  middleware
// Then limiter  Create korbo
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 5, // Limit each IP to 5 requests per `window` (here, per 1 minutes)
  message:
    "Too many accounts created from this IP, please try again after 1 minuts",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// Apply the rate limiting middleware only call this API request
app.get("/test", limiter, async (req, res) => {
  res.status(200).send({
    message: "Server  test is Running",
  });
});

//
```

## Lesson -11

11.Environmnet Variable & Gitignore ---> dotenv, (.env,.gitignore)

### .env and .gitignore

First we will create .env and .gitignore file in server root folder
.env ar vitore amra inportent file rakbo like... db password, db url, server port

```javascript
SERVER_PORT=5000
DATA_BASE_URL=mongodb+srv://<DatabaseName>:<password>@cluster0.t90v0gz.mongodb.net/ecommerceMernDB2023
```

.env file ar data ke access korar jonne akta package install korte hobe

```bash
npm i dotenv
```

then jekhane .env ar data access korte jabo sekhane ake require korte hobe

```javascript
require("dotenv").config();
const serverPort = process.env.SERVER_PORT || 5001;
const mongodbURL = process.env.DATA_BASE_URL;
module.exports = { serverPort, mongodbURL, userDefaultImagePath };
```

Noted: Sob secret data akta Secret.js file a .env file theke nibo then onno jekon jaigai use korbo

.gitignore file ar vitore ja rakbo segula git hub a jabe na

## Lesson -12

12.MVC file Structure - (Model View Controler)

### Model View controler

#### Model

Model a sob data thakbe .. Like models name akta folder thakbe then amar user ar kisu data thakbe
tahole ami userModel.js name akta file kore user ar sokol data rekhe dibo den exports kore dibo .. like
module.exports = User;

#### Controllers

Controller a sob Logic Thakbe like amar kata userController.js name file ace akhane user ar sob logic
likhbo hote pare

1. Amara ki vabe server theke sokol user pate pari .
2. Amra user ar id diea kivabe oi user ke pate pari tar jonne logic likhbo
3. Amra user k kivabe delete korbo ar jonne logic likhob

##### then amra ai logic function gula exprt kore dibo

```javascript
const getUser = async (req, res, next) => {
  try {
    const option = { password: 0 };
    const id = req.params.id;
    // const option = { password: 0 };
    // const user = await User.findById(id, option);
    // if (!user) {
    //   throw createError(404, "User does not exit wiht this id");
    // }

    const user = await findItemById(id, option);
    return successResponse(res, {
      statusCode: 200,
      message: "User were return succefuly",
      payloat: {
        user,
      },
    });
  } catch (error) {
    // Mongose error Hanlde .....
    // if (error instanceof mongoose.Error) {
    //   next(createError(400, "Invalid User Id"));
    //   return;
    // }
    next(error);
  }
};
module.exports = { getUsers, getUser, deleteUser };
```

### routers

routers ar vitore amara sokol route rakbo prothome amar userRouter.js name file kore sekhane user ar sokol router rakbo .. like code

```javascript
const express = require("express");
const {
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/userController");
const userRouter = express.Router();

//Get /api/users
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);

// Delete /api/users
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
```

then app.js a giea amara ai router gula access korbo .

```javascript
app.use("/api/users", userRouter);
```

## Lesson -13

13.Connect to Databse

## Lesson -14

14.Schema & Model--->bcrypt install for password (incrypt and decrypt)

## Lesson -15

15.create seed route for teasting

## Lesson -16

16.Get/api/users -->isAdmin-->getAllusers-->Serch Bay->Name,email,and phone And alse not retrurn users Password with setup pagination functionality.

## Lesson -17

17.responseHandler controller for errorResponse & successResponse

## Lesson -18

18.Get/api/users/:id --> get a single user by id with handle mongose error.

## Lesson -19

19.How to create a services in the backend

## Lesson -20

20.18.DELETE/api/users/:id --> Delete a single user by id with handle mongose error.
