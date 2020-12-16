

<h1 align="center" style="color:#0091EA; font-weight:bold;">
     <img 
    src="https://user-images.githubusercontent.com/42190754/102017043-2a7efa80-3d43-11eb-804d-e8cef0bdb7cc.png"
    float="center"
    width="40" height="40"
    /> 
  <a href="#"> Spaces Scheduling </a>
</h1>

<h3 align="center">
Application to manage space reservations.
</h3>

<p align="center">
 <a href="#about">About</a> •
 <a href="#features">Features</a> •
 <a href="#layout">Layout</a> •
 <a href="#how-it-works">How it works</a> •
 <a href="#tech-stack">Tech Stack</a> •
 <a href="#author">Authors</a> •
 <a href="#user-content-license">License</a>

</p>

## ℹ️ About
<img 
    src="https://user-images.githubusercontent.com/42190754/102017043-2a7efa80-3d43-11eb-804d-e8cef0bdb7cc.png"
    float="center"
    width="15" height="15"
    />
Spaces Scheduling - is a application to manage the spaces of the computer sector of EAJ.

---

## ⚙️ Features

<!-- - [x] 
   - [x] 
   - [x] 
   - [x] 
   - [x]
- [x] 
   - [x]
   - [x] -->

---
## 🎨 Layout

---
## 🚀 How it works

This project is divided into three parts:
1. Backend ([backend folder](https://github.com/BiaChacon/spaces-scheduling/tree/master/backend))
2. Frontend ([frontend folder](https://github.com/BiaChacon/spaces-scheduling/tree/master/frontend))

💡Frontend need the Backend to be running to work.

### Pre-requisites
Before you begin, you will need to have the following tools installed on your machine: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Docker](https://www.docker.com/). In addition, it is good to have an editor to work with the code like [VSCode](https://code.visualstudio.com/).

#### 🏁 Start
```bash

# Clone this repository
$ git clone git@github.com:biachacon/spaces-scheduling.git

# Access the project folder cmd/terminal
$ cd spaces-scheduling

```
#### 🐳 If you don't have the docker
```bash

# download generic installer from docker oficial site
$ curl -fsSL https://get.docker.com -o get-docker.sh

# using generic installer
$ sh get-docker.sh

```

#### 🎲 Rodando o Backend (servidor)

```bash

# go to the server folder
$ cd backend

# install the dependencies
$ npm install

# Run the application
$ docker-compose up --build

# The server will start at port: 3333 - go to http://localhost:3333

# Running the tests
$ docker exec api-server npm test

```

#### 🧭 Running the web application (Frontend)

```bash

# Go to the Front End application folder
$ cd frontend

# Install the dependencies
$ npm install

# Run the application in development mode
$ npm run start

# The application will open on the port: 3000 - go to http://localhost:3000

# Compiles and minifies for production
npm run build

```

---
## 🛠 Tech Stack

The following tools were used in the construction of the project:

### 🌐 **Backend** ([Node.js](https://nodejs.org/en/))
- **[Express](https://expressjs.com/)**
- **[Celebrate](https://github.com/arb/celebrate)**
- **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
- **[KnexJS](http://knexjs.org/)**
- **[Dotenv-safe](https://www.npmjs.com/package/dotenv-safe)**
- **[Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)**
- **[Morgan](https://github.com/expressjs/morgan)**
- **[Pg](https://github.com/brianc/node-postgres)**

> See the file  [package.json](https://github.com/BiaChacon/spaces-scheduling/blob/master/backend/package.json)

### 💻 **Frontend** ([Vue.js](https://vuejs.org/))
- **[Axios](https://github.com/axios/axios)**
- **[Vuetify](https://vuetifyjs.com/en/)**
- **[Vue Router](https://router.vuejs.org/)**
- **[Vuex](https://vuex.vuejs.org/)**
- **[Vue Simple Alert](https://github.com/constkhi/vue-simple-alert)**
- **[Rrule](https://github.com/jakubroztocil/rrule)**
- **[Vue input mask](https://github.com/probil/v-mask)**
- **[Decode JWT](https://github.com/auth0/jwt-decode)**

> See the file  [package.json](https://github.com/BiaChacon/spaces-scheduling/blob/master/frontend/package.json)

---

## 👩🏽‍💻 Authors
<table>
  <tr>
    <td align="center"><a href="https://github.com/biachacon"><img src="https://avatars1.githubusercontent.com/u/42190754?s=460&u=a5cbe42a4868b2bac9615226044b9cec15cee418&v=4" width="100px;" alt=""/><br /><sub><b>Bia Chacon</b></sub></a><br /><a href="https://github.com/BiaChacon/spaces-scheduling" title="Code">💻 🎨</a></td>
    <td align="center"><a href="https://github.com/brunojamelli"><img src="https://avatars0.githubusercontent.com/u/21262825?s=400&u=8d99e00b964f6e0eb0684b34b9094a6c6163b65e&v=4" width="100px;" alt=""/><br /><sub><b>Bruno Jamelli</b></sub></a><br /><a href="https://github.com/BiaChacon/spaces-scheduling" title="Code">💻 🎨</a></td>
  <tr>
</table>

---

## 📝 License
This project is under MIT. See at here [LICENSE](https://github.com/BiaChacon/spaces-scheduling/blob/master/LICENSE) for more informations.