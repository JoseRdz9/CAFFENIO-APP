import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';  // Importar la base de datos
import { environment } from './environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



// Inicia la aplicación
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()), // Configuración de Realtime Database
    provideAuth(() => getAuth()),         // Configuración de Firebase Authentication
  ],
  
});
// addIcons({
//   'checkmark-circle': checkmarkCircle,
//   'checkmark-circle-outline': checkmarkCircleOutline,
//   'checkmark-done-circle': checkmarkDoneCircle,
//   'checkmark-done-circle-outline': checkmarkDoneCircleOutline
// });
