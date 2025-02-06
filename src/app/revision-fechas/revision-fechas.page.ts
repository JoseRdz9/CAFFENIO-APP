import { Component } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar } from "@ionic/angular/standalone";

interface Product {
  id: number;
  name: string;
  tm: boolean;
  tv: boolean;
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-revision-fechas',
  standalone: true,
  imports: [IonToolbar, IonHeader, NgFor, NgIf, DatePipe, FormsModule], // Agrega DatePipe aquí
  templateUrl: './revision-fechas.page.html',
  styleUrls: ['./revision-fechas.page.scss']
})
export class RevisionFechasPage {
  products: Product[] = [
    { id: 1, name: 'Producto 1', tm: false, tv: false, startDate: new Date('2025-01-24'), endDate: new Date('2025-01-30') },
    { id: 2, name: 'Producto 2', tm: false, tv: false, startDate: new Date('2025-02-10'), endDate: new Date('2025-02-15') },
    { id: 3, name: 'Producto 3', tm: false, tv: false, startDate: new Date('2025-03-05'), endDate: new Date('2025-03-10') },
    { id: 4, name: 'Producto 4', tm: false, tv: false, startDate: new Date('2025-04-01'), endDate: new Date('2025-04-07') },
    { id: 5, name: 'Producto 5', tm: false, tv: false, startDate: new Date('2025-01-24'), endDate: new Date('2025-01-30') },
    { id: 6, name: 'Producto 6', tm: false, tv: false, startDate: new Date('2025-02-10'), endDate: new Date('2025-02-15') },
    { id: 7, name: 'Producto 7', tm: false, tv: false, startDate: new Date('2025-03-05'), endDate: new Date('2025-03-10') },
    { id: 8, name: 'Producto 8', tm: false, tv: false, startDate: new Date('2025-04-01'), endDate: new Date('2025-04-07') }
  ];

  updateProduct(product: Product) {
    console.log('Actualizando producto:', product);
  }
}
