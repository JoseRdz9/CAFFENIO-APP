import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private collectionName = 'Checklist';

  constructor(private firestore: AngularFirestore) {}

  getTasks(): Observable<any[]> {
    return this.firestore.collection(this.collectionName).valueChanges();
  }
}
