import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Timestamp } from 'firebase/firestore';

interface Empleado {
  id: string;
  nombre: string;
  apellido: string;
  fechanacimiento: Timestamp;
  telefono: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private empleadosCollection = collection(this.firestore, 'Empleados');

  constructor(private firestore: Firestore) {}

  obtenerEmpleadoPorId(id: string): Observable<Empleado> {
    const empleadoDocRef = doc(this.firestore, `Empleados/${id}`);
    return docData(empleadoDocRef, { idField: 'id' }) as Observable<Empleado>;
  }

  obtenerEmpleados(): Observable<Empleado[]> {
    return collectionData(this.empleadosCollection, { idField: 'id' }) as Observable<Empleado[]>;
  }
}
