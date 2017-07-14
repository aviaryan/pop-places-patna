# Popular places in Patna

This website shows a list of popular places in Patna.

http://aviaryan.in/pop-places-patna/


## Screenshot

![screenshot](https://i.imgur.com/r3mQ7Mc.png)


## Running

To run this project now, you can just open `index.html` and it will work as the build has been already done.
Foursquare keys have been setup in this build.

PS - See [this SO thread](https://stackoverflow.com/questions/32434686/) if you see a `ERR_BLOCKED_BY_CLIENT` error.


## Development setup

The project was built on `node v8.1.4` and `yarn v0.27.5`. The steps are -

* Setup [Foursquare](https://foursquare.com/) credentials in `js/secret.js`.

* Then run the following to start development server.

```sh
yarn install
yarn start
```

* Visit at http://localhost:8080

* To make production builds, run:

```sh
yarn build
```


## Attributions

* This application uses Google Maps API for showing maps and map-related data.
* This application uses Foursquare API for showing relevant data a/c location.
