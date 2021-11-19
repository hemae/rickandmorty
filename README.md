# [Rick&Morty characters browser](http://workcard.fun) <- go to the site with this app

Client of this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

Server is written with [Node.js](https://github.com/nodejs), using [express](https://github.com/expressjs/express) library. Simple server is needed for browsing built client.

## What is it?

The project is a simple application for browsing characters of Rick&Morty cartoon.
Data using in the project is provided by [Rick&Morty API](https://rickandmortyapi.com/).

Reviewing the app you can:

* switch color theme. Dark and Light are available;
* sort characters by name, status (alive, dead, unknown), species, type and gender (male, female, unknown);
* see more information about character by clicking on the character card.

Also dynamic pagination is realized in the app. This feature and other will make your reviewing comfortable and interesting :)

## Installation and running

If you want to run the app on localhost there are two modes of running:

* development (only development server of React App);
* production (only simple server running build app).

Anyway following these ways is almost the same...

Clone this repository by command:

```
git clone https://github.com/hemae/rickandmorty.git
```
in your terminal. Then go to the directory. If you need to run project in the production mode run:

```
npm install
```

to install server dependences. In any case run:

```
npm run client:install
```

to install client dependences (create-react-app and other).

So, after this it is already available for you to run script `npm run client` to run React Application in the development mode.
Then you can open the development server [http://localhost:3000](http://localhost:3000)

For running the project in the production mode it is necessary to build client. For this purpose run:

```
npm run client:build
```

After process implementation the folder `build` will appear in `client` folder.

Now you can run:

### `npm start`

and enjoy :)



