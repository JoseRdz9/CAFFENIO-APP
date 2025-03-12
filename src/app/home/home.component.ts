import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule]
})
export class HomeComponent implements OnInit, OnDestroy {
  activities$: Observable<any[]>;
  private activitiesSubscription!: Subscription; // Para manejar la suscripción

  constructor(private firestore: Firestore, private router: Router) {
    const activitiesCollection = collection(this.firestore, 'Checklist');
    this.activities$ = collectionData(activitiesCollection, { idField: 'id' });
  }

  ngOnInit() {
    try {
      // Suscribirse a la colección y loguear datos
      this.activitiesSubscription = this.activities$.subscribe(
        data => console.log('Actividades cargadas:', data),
        error => console.error('Error al cargar actividades:', error)
      );
    } catch (error) {
      console.error("Error cargando datos de Firestore:", error);
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnDestroy() {
    if (this.activitiesSubscription) {
      this.activitiesSubscription.unsubscribe(); // Evitar fugas de memoria
    }
  }
}
