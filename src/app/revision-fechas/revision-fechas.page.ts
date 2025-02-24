import { Component, inject } from '@angular/core';
import { NgFor, NgIf, DatePipe, AsyncPipe } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar } from "@ionic/angular/standalone";
import { FirebaseService, Product } from '../common/services/firestore.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-revision-fechas',
  standalone: true,
  imports: [IonToolbar, IonHeader, NgFor, NgIf, DatePipe, FormsModule, AsyncPipe],
  templateUrl: './revision-fechas.page.html',
  styleUrls: ['./revision-fechas.page.scss']
})
export class RevisionFechasPage {
  products$: Observable<Product[]>;
  todayDate: string;

  private firebaseService = inject(FirebaseService);

  constructor() {
    this.todayDate = this.getTodayDate();  // Asigna el valor de la fecha mínima
    this.products$ = this.firebaseService.getProducts().pipe(
      map(products => products.map(product => ({
        ...product,
        startDate: product.startDate instanceof Timestamp 
          ? this.formatDate(product.startDate.toDate()) 
          : product.startDate ? this.formatDate(product.startDate) : '',
        endDate: product.endDate instanceof Timestamp 
          ? this.formatDate(product.endDate.toDate()) 
          : product.endDate ? this.formatDate(product.endDate) : ''
      })))
    );    
  }

  // Método para obtener la fecha de hoy en formato YYYY-MM-DD
  public getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Retorna la fecha en formato YYYY-MM-DD
  }

  updateProduct(product: Product) {
    console.log('Actualizando producto:', product);
    
    const updatedProduct = {
      ...product,
      startDate: product.startDate instanceof Timestamp 
        ? product.startDate.toDate() 
        : product.startDate ? new Date(product.startDate) : null,
      endDate: product.endDate instanceof Timestamp 
        ? product.endDate.toDate() 
        : product.endDate ? new Date(product.endDate) : null
    };

    this.firebaseService.updateProductInFirebase(updatedProduct)
      .then(() => console.log('Producto actualizado correctamente'))
      .catch(error => console.error('Error al actualizar:', error));
  }

  // Función para convertir fecha a formato YYYY-MM-DD
  private formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
  }
}
