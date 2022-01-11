// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL:"http://localhost:3000/",
  //Conexion a firebase para subir las imagenes
  firebaseConfig: {
    apiKey: "AIzaSyCiimMErcjQQ2QBNX-G4hxuHTXKt-WbgoA",
    authDomain: "api-productos-85e37.firebaseapp.com",
    projectId: "api-productos-85e37",
    storageBucket: "api-productos-85e37.appspot.com",
    messagingSenderId: "607757155828",
    appId: "1:607757155828:web:ff3a5b2342c70a01c60da1",
    measurementId: "G-8VRZ4T2T0G"
  },
  URLProductos: "http://localhost:4200/productos"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
