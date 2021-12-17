// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseUrl: "http://localhost:8080",
  baseUrl: "https://conglestore.herokuapp.com",
  firebaseConfig:{
    apiKey: "AIzaSyDGFUzjdEupKQizUZluVqF5NZxMftGQn0A",
    authDomain: "doan-shopping.firebaseapp.com",
    projectId: "doan-shopping",
    storageBucket: "doan-shopping.appspot.com",
    messagingSenderId: "873365734741",
    appId: "1:873365734741:web:a4de3789dd9fd3b954dbdc",
    measurementId: "G-3X60EDMLGM"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
