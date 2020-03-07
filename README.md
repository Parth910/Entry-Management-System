# Entry Management Software
---------------------------------------
### Problem Statement
Given the visitors that we have in office and outside, there is a need to for an entry management software. 


### Technology Stack
##### MERN Stack Application
This Entry Management Syetem(EMS) uses a number of open source projects to work properly:
 * **[ReactJS](https://reactjs.org/)** - HTML enhanced for web apps! (FrontEnd/UI)
* **[Node.js](https://nodejs.org/)** - evented I/O for the backend
* **[Express](http://expressjs.com/)** - fast node.js network app framework
* **[MongoDB](https://www.mongodb.com/)** - database 
* **[AWS](https://aws.amazon.com/)** - for deployment
* **[NGINX](https://www.nginx.com/)** - web-server in AWS
* **[NodeMailer](https://nodemailer.com/about/)** - mail service
* **[WAY2SMS API](https://www.way2sms.com/)** - sms service

<blockquote>
<h4>Note:</h4><p>All other dependencies and dev-dependencies are mentioned in packege.JSON. </p>
</blockquote>

### Installation

EMS requires [Node.js](https://nodejs.org/) v4+ to run, [NPM(Node Packege Manager)]() for handling node package, [MongoDB]() to database handling.

1: Clone this Repository
```sh
$ git clone https://github.com/Parth910/Entry-Management-System.git
```
2: Change diractory
```sh
$ cd Entry-Management-System
```
3: Start MongoDB server after installing MongoDB

```sh
$ sudo service mongod start
```
3: Install the dependencies

```sh
$ npm install
```

4: Run build for react build ...

```sh
$ npm run build
```
5: Add you gmail credential in .env file for sending mails by authorised account
```
  EMAIL = "YOUREMAIL",
  PASS = "EMAILPASSWORD"
```
6: Go to link given below and allow "Less secure app access" for above account
 https://www.google.com/settings/security/lesssecureapps

7: Now you are ready for run Application
```sh
$ npm start
```
You can see this output in Teminal
```sh
> client@0.1.0 start /home/tony/assignments/entry_mangement_system
> node server/app.js 

--------------------------------------
-------------------
----------
==> App is Running at http://localhost:9000
==> Connected to mongoDB
```
### Folder Structure
![Image](https://github.com/Parth910/innovaccer_src/blob/master/Screenshot%20from%202019-11-28%2000-22-26.png)


## How it Works!!!
### FrontEnd(UI)
* UI Structure
    * Home Page       
    * Add Host Page
    * Add Visitor/CheckIn Page
    * Visitor card Page

#### 1.  Home Page
 * This Home Page includes three Components
   * Main Component : It contains two buttons **CHECK IN** and **ADD HOST**. from CheckIn you can CheckIn visitor and from addHost you can add new host.
   * Visitor Dashboard Component : It contains visitors list in tabular formate which includes Name, Email, Address and Action coloums. from Action you can view visitor card of visitor with checkout option.
   * Host Dashboard Component : It contains hosts list in tabular formate which includes Name, Email and Action coloums. from Action you can remove host.
   ![Image](https://github.com/Parth910/innovaccer_src/blob/master/Screenshot%20from%202019-11-28%2004-14-26.png)
#### 2. Add Host Page
 * This contains basic entry form which has Name, Email and Phone fields.
 * Host can fill information and be a host !!
 * Submit it will redirect to Home Page
  ![Image](https://github.com/Parth910/innovaccer_src/blob/master/Screenshot%20from%202019-11-28%2004-15-41.png)
#### 3. Add Visitor/CheckIn Page
 * This contains basic Entry form which has Name, Email, Phone, Select Host and Address person want to visit.
 * Visitor can fill information and CheckIn !!
 * Submit it will redirect to Visitorcard Page
  ![Image](https://github.com/Parth910/innovaccer_src/blob/master/Screenshot%20from%202019-11-28%2005-52-07.png)
#### 4. Visitor card Page
 * This contains Visitor Details Card which has Name, Email, Phone, Host and Address.
 * It also contains two buttons, Home and CheckOut.
  ![Image](https://github.com/Parth910/innovaccer_src/blob/master/Screenshot%20from%202019-11-28%2005-52-55.png)
  
#### After checkIn, Host gets an Email and SMS stating details of visitor.
 <img src="https://github.com/Parth910/innovaccer_src/blob/master/Screenshot_20191128-182431.png" width="420" height="790"><img src="https://github.com/Parth910/innovaccer_src/blob/master/Screenshot_20191128-182452.png" width="420" height="790">
#### After checkIn, Home Page
  ![Image](https://github.com/Parth910/innovaccer_src/blob/master/Screenshot%20from%202019-11-28%2005-13-13.png)
  
  
#### After checkOut, Visitor gets an Email stating details of visit.
  ![Image](https://github.com/Parth910/innovaccer_src/blob/master/WhatsApp%20Image%202019-11-28%20at%205.36.46%20AM.jpeg)


### BackEnd(API)

#### Visitor API
  1. GET : http://localhost:9000/visitor/
     * API for list of visitors.
  2. GET : http://localhost:9000/visitor/inVisitor
     * API for list of visitors whose status is 'In'.
  3. POST : http://localhost:9000/visitor/addInfo
     * API for adding Visitor.
     * it also handles send checkout mail and sms to host.
  4. GET : http://localhost:9000/visitor/:uniqId.
     * API for get visitor who has uniqId which is asked in request.
  5. POST : http://localhost:9000/visitor/:uniqId
     * API for checkout visitor with paticular uniqId.
     * it also handles send checkout mail to visitor.
#### Host API
  1. GET : http://localhost:9000/host/
     * API for list of hosts.
  2. GET : http://localhost:9000/host/:id
     * API to get host with asking _id.
  3. POST : http://localhost:9000/host/addHost
     * API for adding Host.
  4. DELETE : http://localhost:9000/host/:id
     * API to delete host with asking _id.
  
### Models(Database Schemas)
#### Visitor Schema
```
    name: String,
    email: String,
    phone:String,
    checkInTime:{
        type:Date
    },
    checkOutTime:{
        type:Date
    },
    address:String,
    status:String,
    uniqId:String,
    hostName:{ type: mongoose.Schema.Types.ObjectId, ref: 'host' },         
    hostEmail:String,
    hostPhone:String
```
#### Host Schema
```
    name: String,
    email: String,
    phone: String
```

 


### Deployment
* I have deployed this application on Amazon Web Services EC2.
* I have create one instance and deploy this application on that instace.
* Basically I have used [nginx](https://www.nginx.com/) server and [pm2](https://pm2.keymetrics.io/) for running server on AWS Instance.
* you can visit it at http://ec2-34-229-241-96.compute-1.amazonaws.com/
<blockquote>
<h4>Note:</h4><p>All required features (Mail and Sms) are working in this deployment. 
  PS : with valid Email and Mobile Number </p>
</blockquote>

### Conatact Details
* Name: **Parth Patel**
* Phone: **+91 6354813121**
* Email: **prp4203@gmail.com**
* altEmail: **17ucs107@lnmiit.ac.in**
* website: **[Parth910.github.io](https://Parth910.github.io)**

## Want to Contribute!!
  :+1::tada: First off, thanks for taking the time to contribute! :tada::+1:


### Development Setup
* To contribute in this you have this application locally.so first install from [here](https://github.com/Parth910/Innovaccer-SummerGeeks-Assignment-EMS/blob/master/README.md#installation).
### Styleguides

#### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

#### JavaScript Styleguide

* All JavaScript must adhere to [JavaScript Standard Style](https://standardjs.com/)
#### Git Issues and Pull request
 * Feel free to submit issues and enhancement requests.
