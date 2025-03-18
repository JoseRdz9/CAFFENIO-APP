import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
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
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonIcon,
  IonList
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tareas-pendientes',
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
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonIcon,
    IonList
  ]
})
export class TareasPendientesPage implements OnInit {

  // Controla el segmento activo ("pendientes" o "terminadas")
  segmentValue = 'pendientes';

  // Estados de las tareas (true = completada, false = pendiente)
  jarabesTasks: { [key: string]: boolean } = {
    limon: false,
    arandano: false,
    uva: false,
  };

  polvosTasks: { [key: string]: boolean } = {
    azucares: false,
    tapas: false,
    vasos: false,
    contenedores: false,
  };

  variosTasks: { [key: string]: boolean } = {
    azucares: false,
    tapas: false,
    vasos: false,
    contenedores: false,
  };

  constructor() { }

  ngOnInit() { }

  // Alterna el estado de la tarea según su categoría
  toggleTask(task: string, category: string) {
    if (category === 'jarabes') {
      this.jarabesTasks[task] = !this.jarabesTasks[task];
    } else if (category === 'polvos') {
      this.polvosTasks[task] = !this.polvosTasks[task];
    } else if (category === 'varios') {
      this.variosTasks[task] = !this.variosTasks[task];
    }
  }
}
