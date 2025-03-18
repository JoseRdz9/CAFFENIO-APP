import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FirebaseService, Task, Subtask } from '../common/services/firestore.service';  
import { 
  IonContent, IonHeader, IonToolbar, IonTitle, IonSegment, IonSegmentButton, 
  IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, 
  IonIcon, IonButton, IonCheckbox, 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tasks',
  templateUrl: './tareas-pendientes.page.html',
  styleUrls: ['./tareas-pendientes.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonIcon,
    IonButton,
    IonCheckbox
  ]
})
export class TareasPendientesPage implements OnInit {
  pendingTasks: Task[] = [];
  completedTasks: Task[] = [];
  segmentValue: string = 'pendientes';

  // 🔹 Inyección de servicio FirebaseService
  private firestore: FirebaseService = inject(FirebaseService);

  ngOnInit() {
    this.loadTasks();
  }

  //  Cargar tareas desde Firebase
  loadTasks() {
    this.firestore.getTasks().subscribe((tasks: Task[]) => {
      console.log("📥 Datos de Firebase antes de procesar:", tasks);
  
      this.pendingTasks = tasks.map(task => ({
        ...task,
        id: task.id ?? '',  
        name: (task as any)["name "]?.trim() ?? task.name ?? "Sin Nombre", 
        subtasks: Array.isArray(task.subtasks)
          ? task.subtasks.map(subtask => ({
              id: typeof subtask === 'object' ? subtask.id ?? '' : '',
              name: typeof subtask === 'object' ? subtask.name ?? "Sin Nombre" : String(subtask),
              status: typeof subtask === 'object' && "status" in subtask ? subtask.status : false  // ✅ Agrega status con valor predeterminado
            }))
          : [],
        status: task.status ?? false,  // Asegura que el estado de la tarea siempre esté definido
      })).filter(t => !t.status);
  
      this.completedTasks = tasks.map(task => ({
        ...task,
        id: task.id ?? '',
        name: (task as any)["name "]?.trim() ?? task.name ?? "Sin Nombre", 
        subtasks: Array.isArray(task.subtasks)
          ? task.subtasks.map(subtask => ({
              id: typeof subtask === 'object' ? subtask.id ?? '' : '',
              name: typeof subtask === 'object' ? subtask.name ?? "Sin Nombre" : String(subtask),
              status: typeof subtask === 'object' && "status" in subtask ? subtask.status : false  // ✅ Agrega status con valor predeterminado
            }))
          : [],
        status: task.status ?? false,
      })).filter(t => t.status);
  
      console.log("✅ Datos procesados correctamente:", this.pendingTasks, this.completedTasks);
    });
  }
  
  
  

  //  Eliminar una tarea
  deleteTask(taskId: string | undefined) {
    if (!taskId) {
      console.error(" Error: ID de tarea no válido");
      return;
    }

    this.firestore.deleteTask(taskId)
      .then(() => this.loadTasks())
      .catch(error => console.error(" Error al eliminar tarea:", error));
  }

  // Cambiar el estado de una subtarea
  toggleSubtaskStatus(task: Task, subtask: Subtask) {
    if (!task.id || !subtask.id) {
      console.error("Error: ID de tarea o subtarea no válido");
      return;
    }

    const updatedSubtasks = task.subtasks?.map(st =>
      st.id === subtask.id ? { ...st, status: !st.status } : st
    ) || [];

    this.firestore.updateSubtaskInTask(task.id, updatedSubtasks)
      .then(() => this.loadTasks())
      .catch(error => console.error("Error al actualizar subtarea:", error));
  }

  //  Eliminar una subtarea
  deleteSubtask(taskId?: string, subtaskId?: string | null) {
    if (!taskId || !subtaskId) {
      console.error("❌ Error: ID de tarea o subtarea no válido", { taskId, subtaskId });
      return;
    }
  
    this.firestore.deleteSubtaskFromTask(taskId, subtaskId)
      .then(() => this.loadTasks())
      .catch(error => console.error("⚠️ Error al eliminar la subtarea:", error));
  }
  toggleTaskStatus(task: Task) {
    if (!task.id) {
      console.error("❌ Error: ID de tarea no válido", task);
      return;
    }
  
    // 🔹 Invertimos el estado de la tarea
    const newStatus = !task.status;
  
    this.firestore.updateTaskStatus(task)
      .then(() => {
        console.log(`✅ Tarea "${task.name}" marcada como ${newStatus ? 'completada' : 'pendiente'}`);
  
        // 🔹 Mueve la tarea a la lista correspondiente sin recargar de Firestore
        if (newStatus) {
          this.completedTasks.push({ ...task, status: newStatus });
          this.pendingTasks = this.pendingTasks.filter(t => t.id !== task.id);
        } else {
          this.pendingTasks.push({ ...task, status: newStatus });
          this.completedTasks = this.completedTasks.filter(t => t.id !== task.id);
        }
      })
      .catch(error => console.error("⚠️ Error al cambiar el estado de la tarea:", error));
  }
  
}
