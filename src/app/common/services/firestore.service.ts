import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timestamp } from 'firebase/firestore';  // Importar Timestamp

export interface Product {
  id: string;
  name: string;
  tm: boolean;
  tv: boolean;
  startDate: Date | Timestamp | string | null;
  endDate: Date | Timestamp | string | null;
  section: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  // Obtener productos
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

  // Actualizar un producto en Firebase
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
}
