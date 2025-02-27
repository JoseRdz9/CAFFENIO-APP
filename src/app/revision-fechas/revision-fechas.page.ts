import { Component, inject } from '@angular/core';
import { NgFor, NgIf, DatePipe, AsyncPipe } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar } from "@ionic/angular/standalone";
import { FirebaseService, Product } from '../common/services/firestore.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-revision-fechas',
  standalone: true,
  imports: [IonToolbar, IonHeader, NgFor, NgIf, DatePipe, FormsModule, AsyncPipe],
  templateUrl: './revision-fechas.page.html',
  styleUrls: ['./revision-fechas.page.scss']
})
export class RevisionFechasPage {
  groupedProducts$: Observable<{ [key: string]: Product[] }> = new Observable<{ [key: string]: Product[] }>();
  todayDate: string;
  showPending: boolean = false;

  private firebaseService = inject(FirebaseService);

  constructor() {
    this.todayDate = this.getTodayDate();
    this.loadAllProducts();
  }

  toggleFilter() {
    if (this.showPending) {
      this.filterUpcomingProducts();
    } else {
      this.loadAllProducts();
    }
  }

  private loadAllProducts() {
    this.groupedProducts$ = this.firebaseService.getProducts().pipe(
      map(products => {
        const formattedProducts = products.map(product => ({
          ...product,
          startDate: product.startDate instanceof Timestamp 
            ? this.formatDate(product.startDate.toDate()) 
            : product.startDate ? this.formatDate(product.startDate) : '',
          endDate: product.endDate instanceof Timestamp 
            ? this.formatDate(product.endDate.toDate()) 
            : product.endDate ? this.formatDate(product.endDate) : ''
        }));
        return this.groupProductsBySection(formattedProducts);
      })
    );
  }

  private filterUpcomingProducts() {
    this.groupedProducts$ = this.firebaseService.getProducts().pipe(
      map(products => {
        const today = new Date();
        const filteredProducts = products
          .map(product => ({
            ...product,
            startDate: product.startDate instanceof Timestamp 
              ? this.formatDate(product.startDate.toDate()) 
              : product.startDate ? this.formatDate(product.startDate) : '',
            endDate: product.endDate instanceof Timestamp 
              ? this.formatDate(product.endDate.toDate()) 
              : product.endDate ? this.formatDate(product.endDate) : ''
          }))
          .filter(product => {
            const endDate = new Date(product.endDate);
            return endDate.getTime() - today.getTime() <= 2 * 24 * 60 * 60 * 1000;
          });

        return this.groupProductsBySection(filteredProducts);
      })
    );
  }

  private groupProductsBySection(products: Product[]): { [key: string]: Product[] } {
    return products.reduce((acc, product) => {
      (acc[product.section] = acc[product.section] || []).push(product);
      return acc;
    }, {} as { [key: string]: Product[] });
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

  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  private formatDate(date: Date | string): string {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  }
}
