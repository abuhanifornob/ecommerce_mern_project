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

# error Handaling

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

## Lesson -9

9.How to handle HTTP Errors --->http-errors

## Lesson -10

10.How to secure API --> xss-clean ,express-rate-limit

## Lesson -11

11.Environmnet Variable & Gitignore ---> dotenv, (.env,.gitignore)

## Lesson -12

12.MVC(Model View Controler)

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
