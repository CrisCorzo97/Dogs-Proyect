# Dogs

Se trata de un desafío del Bootcamp de [Henry](https://www.soyhenry.com/). Es una Single Page Application (SPA) basada en [TheDogApi](https://thedogapi.com/), con API y cliente personalizados. 

El mismo debía ser preparado en un lapso de 3 semanas utilizando sólo las tecnologías aprendidas en dicho Bootcamp.

Este proyecto es solo una versión inicial, por lo que se puede actualizar en un futuro con nuevas funciones.

El cliente es una aplicación [React](https://reactjs.org/), con [React Router](https://reacttraining.com/react-router/web/guides/quick-start) y [Redux](https://redux.js.org/). API utiliza [Express](https://expressjs.com/), [Sequelize](https://sequelize.org/) y [PostgreSQL](https://www.postgresql.org/) como base de datos.

### Screenshots

Homepage
![Homepage](./img/img1.png)

Breeds list
![Breeds list](./img/img2.png)

Filtering
![Filtering](./img/img3.png)

Sort and filter at same time
![Sort and filter at same time](./img/img4.png)

Searching
![Searching](./img/img5.png)

Breed details
![Breed details](./img/img6.png)

Creating a new breed
![Creating](./img/img7.png)

## Getting started

### Database and .env files setup

Firstly, you must create a postgresql database. Then go `api` folder and `client` folder, rename `.example.env` file to `.env`, and then fill in the database credentials.

### Running locally in development mode

To get started, just clone the repository and run `npm install` and `npm start`.:

```sh
git clone https://github.com/facuparedes/woof.git

cd ./api
npm install
npm start

cd ../client
npm install
npm start
```

Note: If you are running on Windows and you have issues with `fsevents`, run install --noptional flag (i.e. npm install --no-optional) which will skip installing fsevents.

### Building and deploying in production

If you wanted to run this site in production, you should install modules then build the site with npm run build and run it with `serve`:

#### Linux & MacOS

```sh
cd ./client
npm install
npm run build

npm install -g serve
serve -s build
```

#### Windows

```sh
cd ./client
npm install
npm run build

npm install -g serve
serve -s build
```

Note: You should run npm run build again any time you make changes to the site.

## Todo

- [x] Homepage
- [x] List breeds
  - [x] Filter breeds
  - [x] Sort breeds
  - [x] Search breeds
  - [x] Show breed's temperaments
- [x] Show breed's details
- [x] Create breeds
  - [ ] Custom images
- [ ] Edit breeds
- [ ] Delete breeds
