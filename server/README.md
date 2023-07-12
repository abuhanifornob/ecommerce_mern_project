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

## Lesson -10 How to secure API

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

## Lesson -11 Environmnet Variable & Gitignore

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

#### gitignore code

```javascript
# Created by https://www.toptal.com/developers/gitignore/api/node
# Edit at https://www.toptal.com/developers/gitignore?templates=node

### Node ###
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/
node_modules

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional stylelint cache
.stylelintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variable files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next
out

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
# Comment in the public line in if your project uses Gatsby and not Next.js
# https://nextjs.org/blog/next-9-1#public-directory-support
# public

# vuepress build output
.vuepress/dist

# vuepress v2.x temp and cache directory
.temp

# Docusaurus cache and generated files
.docusaurus

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*

### Node Patch ###
# Serverless Webpack directories
.webpack/

# Optional stylelint cache

# SvelteKit build / generate output
.svelte-kit

# End of https://www.toptal.com/developers/gitignore/api/node


```

## Lesson -12 MVC file Structure

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

## Lesson -13 Connect to Databse

13.Connect to Databse

### Connect Database

Database Connect ar joone amar mongoose package ta install korte hobe

```bash
npm i mongoose
```

then amara config name akta file create kore then bd.js ar connection ar sokol code rakthe pari

```javascript
const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");

const connectDatabase = async (option = {}) => {
  try {
    await mongoose.connect(mongodbURL, option);
    console.log("Connet to MongoDB Succesfully estabalis");

    // Find out to connection error
    mongoose.connection.on("error", (error) => {
      console.error("Data Base Connection Error is: ", error);
    });
  } catch (error) {
    console.error("Cantnot connet to DB", error.toString());
  }
};

module.exports = connectDatabase;
```

then amar server.js server run hober pore connect kore dibo

```javascript
app.listen(serverPort, async () => {
  console.log(`Server is running on http://localhost:${serverPort}`);
  await connectDatabase();
});
```

## Lesson -14 Schema & Model

14.Schema & Model--->

bcrypt install for password (incrypt and decrypt)

```bash
npm i bcrypt
```

User Schema Create ....

```javascript
// firsly mongoose thake Schema, model k niea nite hobe

const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { Timestamp } = require("mongodb");
const userDefaultImagePath = require("../secret");

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "Name is Required"],
      trim: true,
      maxLength: [31, "User Name will be  Maximum 31 Charecter"],
      minLength: [3, "User Name will be  Minimum 3 Charecter"],
    },
    email: {
      type: String,
      require: [true, "Name is Required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please Enter the valid Email id",
      },
    },
    password: {
      type: String,
      require: [true, "Password is Required"],
      trim: true,
      minLength: [6, "The user Password Minimum 6 charecter"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: {
      type: String,
      userDefaultImagePath,
    },
    address: {
      type: String,
      require: [true, "Address is Required"],
    },
    phone: {
      type: String,
      require: [true, "User Phone Number is Required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("Users", userSchema);
module.exports = User;
```

Model create

```javascript
const User = model("Users", userSchema);
// then Exports

module.exports = User;
```

## Lesson -15 create seed route for teasting

15.create seed route for teasting

### Dummay Data

Firsty we create dummay. data.js file create in src folder then store dummy data ... like data is.

```javascript
const data = {
  users: [
    {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "pass123",
      phone: "123-456-7890",
      address: "123 Main St, City, State, Zip",
      image: "puplic/images/users/defaultUser-1.jpg",
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      password: "pass123",
      phone: "987-654-3210",
      address: "456 Elm St, City, State, Zip",
      image: "puplic/images/users/defaultUser-2.jpg",
    },
    {
      name: "Michael Johnson",
      email: "michaeljohnson@example.com",
      password: "pass123",
      phone: "555-123-4567",
      address: "789 Oak St, City, State, Zip",
      image: "puplic/images/users/defaultUser-3.jpg",
    },
    {
      name: "Emily Wilson",
      email: "emilywilson@example.com",
      password: "pass123",
      phone: "999-888-7777",
      address: "321 Pine St, City, State, Zip",
      image: "puplic/images/users/defaultUser.jpg",
    },
    {
      name: "David Brown",
      email: "davidbrown@example.com",
      password: "pass123",
      phone: "111-222-3333",
      address: "654 Cedar St, City, State, Zip",
      image: "puplic/images/users/defaultUser.jpg",
    },
  ],
};

module.exports = data;
```

then export data for outside access this data.

### seedController Create

akhon amara datagulake database a rakhar jonne akta controller korbo .. jaha mongose Schema model ar maddome amara data gula database a sotre korbo.

```javascript
const data = require("../data");
const User = require("../models/userModel");

const seedUser = async (req, res, next) => {
  try {
    // Deleting all existing Users
    await User.deleteMany({});
    // Insert new Users
    const users = await User.insertMany(data.users);

    return res.status(201).json(users); // status code 201 holo success code
  } catch (error) {
    next(error);
  }
};

module.exports = { seedUser };
```

when seedcontroller create success then create SeedRouter

### seedRouter Create

```javascript
const express = require("express");
const { seedUser } = require("../controllers/seedController");

const seedRouter = express.Router(); // express ar router theke amara seedRouder create korlam

seedRouter.get("/users", seedUser); // then create get route

module.exports = seedRouter; //  export seed Route for other file theke excess korar jonne
```

seedRoter Create korar por amara atake app.js ar sathe connect kore dibo.

```javascript
app.use("/api/seed", seedRouter);
```

finaly amara jokhon amra http://localhost:5000/api/seed/users route call dibo
tahole previous data delete hoew new dummay data add hobe.

## Lesson -16 Get/api/users

16.Get/api/users -->isAdmin-->getAllusers-->Serch Bay->Name,email,and phone And alse not retrurn users Password with setup pagination functionality.

```javascript
const User = require("../models/userModel");
const createError = require("http-errors");
const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || " "; // this is Sercing parameter
    const page = Number(req.query.page) || 1; //  page number for pagination section
    const limit = Number(req.query.limit) || 1; // limit is how much number of users amara detece chaiteece

    const searchRegExp = new RegExp(".*" + search + ".*", "i"); // ar maddomoe prothome and last a kono kisu thaleo segila ignore korbe and ata case insencetive

    const filter = {
      isAdmin: { $ne: true }, // ar maddome amara je user admin na tader k select korbe
      // or operation ar maddome amra 3 field ar upor operetion chalete parbo
      // name,email, phone je kono akter sathe match korlai pabo
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };
    const option = { password: 0 }; // password retrun korbe na

    const users = await User.find(filter, option)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await User.find(filter).countDocuments(); //  total match kora users ar number
    if (!users) throw createError(404, "Users are not Founds"); // jodi kono match na kore then ai message show korbe

    res.status(200).json({
      message: "Users were are return", // maseage
      users, // users
      pagination: {
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers };
```

## Lesson -17 responseHandler

17.responseHandler controller for errorResponse & successResponse

### errorResponse & successResponse

i.firstly controllers a responseController.js name akta file kore nibo then
errorResponse and Success Response name 2ta function korbo ja dara amra response k handle korte pabo

```javascript
const errorResponse = (
  res,
  { statusCode = 500, message = "Internal Server Error" }
) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

const successResponse = (
  res,
  { statusCode = 200, message = "Success", payloat = {} }
) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    payloat,
  });
};
module.exports = { errorResponse, successResponse };
```

then amara erro and success response call korbo .

```javascript
// Server Error Handaling
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

// sucees response a amara getusers ar data dibo

return successResponse(res, {
  statusCode: 200,
  message: "Users were are return",
  payloat: {
    users,
    pagination: {
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      previousPage: page - 1 > 0 ? page - 1 : null,
      nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
    },
  },
});
```

## Lesson -18

18.Get/api/users/:id --> get a single user by id with handle mongose error.

## Lesson -19

19.How to create a services in the backend

## Lesson -20

20.18.DELETE/api/users/:id --> Delete a single user by id with handle mongose error.
