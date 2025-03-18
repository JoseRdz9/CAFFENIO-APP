import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, arrayUnion, arrayRemove, getDoc, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timestamp } from 'firebase/firestore'; // Para trabajar con fechas en Firestore
import { DocumentData } from 'firebase/firestore';

// ** Interfaces **
export interface Product {
  id: string;
  name: string;
  tm: boolean;
  tv: boolean;
  startDate: Date | Timestamp | string | null;
  endDate: Date | Timestamp | string | null;
}

export interface Subtask {
  id?: string;
  name: string;
  status: boolean;
}

export interface Task {
  id?: string;
  name: string;
  status: boolean;
  category?: string;
  subtasks?: Subtask[];
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  // ** FUNCIONES PARA PRODUCTOS **

  getProducts(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'ProductosRevision');
    return collectionData(productsRef, { idField: 'id' }).pipe(
      map(products =>
        products.map(product => ({
          ...product,
          startDate: product['startDate']
            ? product['startDate'] instanceof Timestamp
              ? product['startDate'].toDate()
              : new Date(product['startDate'])
            : null,
          endDate: product['endDate']
            ? product['endDate'] instanceof Timestamp
              ? product['endDate'].toDate()
              : new Date(product['endDate'])
            : null
        }))
      )
    ) as Observable<Product[]>;
  }

  updateProductInFirebase(product: Product): Promise<void> {
    const productDocRef = doc(this.firestore, 'ProductosRevision', product.id);
    return updateDoc(productDocRef, {
      tm: product.tm,
      tv: product.tv,
      startDate: product.startDate instanceof Date
        ? Timestamp.fromDate(product.startDate)
        : product.startDate,
      endDate: product.endDate instanceof Date
        ? Timestamp.fromDate(product.endDate)
        : product.endDate
    });
  }

  // ** FUNCIONES PARA TAREAS PENDIENTES **

  getTasks(): Observable<Task[]> {
    const tasksRef = collection(this.firestore, 'Tareas_pendientes');
    return collectionData(tasksRef, { idField: 'id' }).pipe(
      map((tasks: DocumentData[]) =>  // Ahora usamos DocumentData para los datos de Firestore
        tasks.map((task: DocumentData) => {
          // Convertimos explícitamente a 'Task' con type assertion
          const mappedTask = task as Task;  
          return {
            ...mappedTask,
            subtasks: mappedTask.subtasks || []  // Aseguramos que 'subtasks' siempre sea un array
          };
        })
      )
    ) as Observable<Task[]>;  // El retorno sigue siendo un observable de Task[]
  }

  addTask(task: Task): Promise<DocumentReference> {
    return addDoc(collection(this.firestore, 'Tareas_pendientes'), {
      ...task,
      subtasks: task.subtasks || []  // Insertamos un array de subtareas directamente en el documento
    });
  }
  

  deleteTask(taskId: string): Promise<void> {
    const taskDocRef = doc(this.firestore, 'Tareas_pendientes', taskId);
    return deleteDoc(taskDocRef);
  }

  updateTaskStatus(task: Task): Promise<void> {
    if (!task.id) {
      return Promise.reject("❌ Error: ID de tarea no válido");
    }
  
    const taskDocRef = doc(this.firestore, 'Tareas_pendientes', task.id);
  
    return updateDoc(taskDocRef, { status: !task.status })  // 🔹 Se invierte el estado correctamente en Firebase
      .then(() => console.log(`✅ Estado de la tarea "${task.name}" actualizado en Firestore`))
      .catch(error => console.error("⚠️ Error al actualizar tarea en Firestore:", error));
  }
  

  // ** FUNCIONES PARA SUBTAREAS **

  addSubtaskToTask(taskId: string, subtask: Subtask): Promise<void> {
    const taskDocRef = doc(this.firestore, 'Tareas_pendientes', taskId);
    return updateDoc(taskDocRef, {
      subtasks: arrayUnion(subtask)  // Agregar la subtarea al array de subtareas
    });
  }

  async deleteSubtaskFromTask(taskId: string, subtaskId: string): Promise<void> {
    const taskDocRef = doc(this.firestore, 'Tareas_pendientes', taskId);
    const taskSnap = await getDoc(taskDocRef);

    if (!taskSnap.exists()) return;

    const taskData = taskSnap.data() as Task;
    const updatedSubtasks = taskData.subtasks?.filter(subtask => subtask.id !== subtaskId) || [];

    return updateDoc(taskDocRef, { subtasks: updatedSubtasks });
  }

  async updateSubtaskInTask(taskId: string, updatedSubtasks: Subtask[]): Promise<void> {
    const taskDocRef = doc(this.firestore, 'Tareas_pendientes', taskId);
    return updateDoc(taskDocRef, { subtasks: updatedSubtasks });
  }
}
