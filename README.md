<h1 align="center" style="color:#0091EA; font-weight:bold;">
     <img 
    src="https://user-images.githubusercontent.com/42190754/102017043-2a7efa80-3d43-11eb-804d-e8cef0bdb7cc.png"
    float="center"
    width="40" height="40"
    /> 
  <a href="#"> Agendamento De Espaços </a>
</h1>

<p align="center">
 <a href="#ℹ%EF%B8%8F-sobre-o-projeto">Sobre</a> •
 <a href="#%EF%B8%8F-funcionalidades">Funcionalidades</a> •
 <a href="#-layout">Layout</a> •
 <a href="#-como-executar-o-projeto">Como executar</a> •
 <a href="#-tecnologias">Tecnologias</a> •
 <a href="#-autores">Autores</a> •
 <a href="#-licença">Licença</a>
</p>

## ℹ️ Sobre o projeto
Sistema desenvolvido para o gerenciamento de espaços do setor de informática da [Escola Agrícola de Jundiaí](https://eaj.ufrn.br/).

---

## ⚙️ Funcionalidades

- [x] Cadastrar espaço
- [x] Editar espaço
- [x] Ver detalhes do espaço
- [x] Ver reservas do espaço
- [x] Cadastrar reserva normal
- [x] Cadastrar reserva recorrente
- [x] Ver detalhes da reserva
- [x] Cancelar reserva
- [x] Checar disponibilidade dos espaços

---

## 🎨 Layout

<details>
  <summary>Login</summary>
  <p align="center" style="display: flex; align-items: flex-start; justify-content: center; margin:5px">
      <img style="margin:5px" alt="Login" src="./assets/login.png" width="800px">
    </p>
</details>

<details>
  <summary>Espaços</summary>
  <p align="center" style="display: flex; align-items: flex-start; justify-content: center; margin:5px">
      <img style="margin:5px" alt="Home" src="./assets/home.png" width="800px">
    </p>
</details>

<details>
  <summary>Detalhes Do Espaço</summary>
  <p align="center" style="display: flex; align-items: flex-start; justify-content: center; margin:5px">
      <img style="margin:5px" alt="spaceDetail" src="./assets/spaceDetail.png" width="600px">
      <img style="margin:5px" alt="spaceDetail1" src="./assets/spaceDetail2.png" width="600px">
    </p>
</details>

<details>
  <summary>Cadastro De Espaço</summary>
  <p align="center" style="display: flex; align-items: flex-start; justify-content: center; margin:5px">
      <img style="margin:5px" alt="registerSpace" src="./assets/registerSpace.png" width="600px">
    </p>
</details>

<details>
  <summary>Ver Disponibilidade</summary>
  <p align="center" style="display: flex; align-items: flex-start; justify-content: center; margin:5px">
      <img style="margin:5px" alt="checkAvailability" src="./assets/checkAvailability.png" width="600px">
      <img style="margin:5px" alt="checkAvailability2" src="./assets/checkAvailability2.png" width="600px">
    </p>
</details>

<details>
  <summary>Detalhes Da Reserva</summary>
  <p align="center" style="display: flex; align-items: flex-start; justify-content: center; margin:5px">
      <img style="margin:5px" alt="reserveDetail" src="./assets/reserveDetail.png" width="600px">
      <img style="margin:5px" alt="reserveDetail2" src="./assets/reserveDetail2.png" width="600px">
  </p>
</details>

<details>
  <summary>Cadastrar Reserva Normal</summary>
  <p align="center" style="display: flex; align-items: flex-start; justify-content: center; margin:5px">
      <img style="margin:5px" alt="registerReservationNormal" src="./assets/registerReservationNormal.png" width="600px">
      <img style="margin:5px" alt="registerReservationNormal2" src="./assets/registerReservationNormal1.png" width="600px">
  </p>
</details>

<details>
  <summary>Cadastrar Reserva Recorrente</summary>
  <p align="center" style="display: flex; align-items: flex-start; justify-content: center; margin:5px">
      <img style="margin:5px" alt="registerReservation" src="./assets/registerReservatio.png" width="600px">
      <img style="margin:5px" alt="registerReservation1" src="./assets/registerReservation1.png" width="600px">
  </p>
</details>

---

## 🚀 Como executar o projeto

Este projeto é divido em duas partes:
1. Backend ([backend folder](https://github.com/BiaChacon/spaces-scheduling/tree/master/backend))
2. Frontend ([frontend folder](https://github.com/BiaChacon/spaces-scheduling/tree/master/frontend))

💡Frontend precisa que o Backend esteja sendo executado para funcionar.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Docker](https://www.docker.com/). Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

#### 🏁 Começar
```bash

# Clone este repositório
$ git clone git@github.com:biachacon/spaces-scheduling.git

# Acesse a pasta do projeto no terminal/cmd
$ cd spaces-scheduling

```
#### 🐳 Se você não tem o docker
```bash

# baixe o instalador genérico do site oficial do docker
$ curl -fsSL https://get.docker.com -o get-docker.sh

# usando instalador genérico
$ sh get-docker.sh

```

#### 🎲 Rodando o Backend (servidor)

```bash

# Vá para a pasta da aplicação Backend
$ cd backend

# Instale as dependências
$ npm install

# Execute a aplicação 
$ docker-compose up --build

# O servidor inciará na porta:3333 - acesse http://localhost:3333

# Execute os testes
$ docker exec api-server npm test

```

#### 🧭 Rodando a aplicação web (Frontend)

```bash

# Vá para a pasta da aplicação Frontend
$ cd frontend

# Instale as dependências
$ npm install

# Execute a aplicação
$ npm run start

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000

# Compila e minimiza para produção
npm run build

```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

### 🌐 **Backend** ([Node.js](https://nodejs.org/en/))
- **[Express](https://expressjs.com/)**
- **[Celebrate](https://github.com/arb/celebrate)**
- **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
- **[KnexJS](http://knexjs.org/)**
- **[Dotenv-safe](https://www.npmjs.com/package/dotenv-safe)**
- **[Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)**
- **[Morgan](https://github.com/expressjs/morgan)**
- **[Pg](https://github.com/brianc/node-postgres)**

> Veja o arquivo [package.json](https://github.com/BiaChacon/spaces-scheduling/blob/master/backend/package.json)

### 💻 **Frontend** ([Vue.js](https://vuejs.org/))
- **[Axios](https://github.com/axios/axios)**
- **[Vuetify](https://vuetifyjs.com/en/)**
- **[Vue Router](https://router.vuejs.org/)**
- **[Vuex](https://vuex.vuejs.org/)**
- **[Vue Simple Alert](https://github.com/constkhi/vue-simple-alert)**
- **[Rrule](https://github.com/jakubroztocil/rrule)**
- **[Vue input mask](https://github.com/probil/v-mask)**
- **[Decode JWT](https://github.com/auth0/jwt-decode)**

> Veja o arquivo [package.json](https://github.com/BiaChacon/spaces-scheduling/blob/master/frontend/package.json)

---

## 👩🏽‍💻 Autores
<table>
  <tr>
    <td align="center"><a href="https://github.com/biachacon"><img src="https://avatars1.githubusercontent.com/u/42190754?s=460&u=a5cbe42a4868b2bac9615226044b9cec15cee418&v=4" width="100px;" alt=""/><br /><sub><b>Bia Chacon</b></sub></a><br /><a href="https://github.com/BiaChacon/spaces-scheduling" title="Code">💻 🎨</a></td>
    <td align="center"><a href="https://github.com/brunojamelli"><img src="https://avatars0.githubusercontent.com/u/21262825?s=400&u=8d99e00b964f6e0eb0684b34b9094a6c6163b65e&v=4" width="100px;" alt=""/><br /><sub><b>Bruno Jamelli</b></sub></a><br /><a href="https://github.com/BiaChacon/spaces-scheduling" title="Code">💻 🎨</a></td>
  <tr>
</table>

---

## 📝 Licença
This project is under MIT. See at here [LICENSE](https://github.com/BiaChacon/spaces-scheduling/blob/master/LICENSE) for more informations.

---

## Versões do README
[Português 🇧🇷](./README.md) | [Inglês 🇺🇸](./README.en.md)
