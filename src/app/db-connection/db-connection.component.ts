import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { inject } from '@angular/core';



@Component({
  selector: 'app-db-connection',
  templateUrl: './db-connection.component.html',
  styleUrls: ['./db-connection.component.css'],
  
})
export class DbConnectionComponent implements OnInit {
  productos: any[] = []; // Array para almacenar los productos de la colección ProductoRevision
  connectionStatus: string = 'Conectando...'; // Estado de la conexión

  firestore = inject(Firestore);  // Inyecta Firestore

  constructor() {}

  ngOnInit(): void {
    this.checkConnection();
  }

  async checkConnection(): Promise<void> {
    try {
      // Intenta conectarse a la colección "ProductoRevision" en Firestore
      const querySnapshot = await getDocs(collection(this.firestore, 'ProductoRevision'));
      if (querySnapshot.empty) {
        this.connectionStatus = 'Sin productos en la colección';
      } else {
        this.connectionStatus = 'Conectado';
        this.productos = querySnapshot.docs.map(doc => doc.data());
      }
    } catch (error) {
      this.connectionStatus = 'Error en la conexión';
      console.error('Error al conectarse a Firestore:', error);
    }
  }
}
