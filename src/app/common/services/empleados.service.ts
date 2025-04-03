import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, DocumentReference, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Timestamp } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';

// Exporta la interfaz Empleado
export interface Empleado {
  id: string;
  nombre: string;
  apellido: string;
  noempleado: number;
  fechanacimiento: Timestamp;
  telefono: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private empleadosCollection = collection(this.firestore, 'Empleados');

  constructor(private firestore: Firestore) {}

  // Método para obtener los empleados
  obtenerEmpleadoPorId(id: string): Observable<Empleado> {
    const empleadoDocRef = doc(this.firestore, `Empleados/${id}`);
    return docData(empleadoDocRef, { idField: 'id' }) as Observable<Empleado>;
  }

  // Método para obtener todos los empleados
  obtenerEmpleados(): Observable<Empleado[]> {
    return collectionData(this.empleadosCollection, { idField: 'id' }) as Observable<Empleado[]>;
  }

  // Método para actualizar un empleado
  actualizarEmpleado(id: string, empleado: Empleado): Promise<void> {
    const empleadoDocRef = doc(this.firestore, `Empleados/${id}`);
    return setDoc(empleadoDocRef, empleado);
  }

  // Método para agregar un nuevo empleado
  // Método para agregar un nuevo empleado
  agregarEmpleado(empleado: Empleado): Promise<Empleado> {
    return addDoc(this.empleadosCollection, {
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      telefono: empleado.telefono,
      noempleado: empleado.noempleado,
      fechanacimiento: Timestamp.fromDate(new Date())
    }).then((docRef) => {
      return { ...empleado, id: docRef.id }; // Retornar el empleado con el ID asignado
    });
  }

  eliminarEmpleado(id: string): Promise<void> {
    const empleadoDocRef = doc(this.firestore, 'Empleados', id);
    return deleteDoc(empleadoDocRef);
  }
  
}

