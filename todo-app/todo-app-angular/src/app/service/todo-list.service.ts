import { Injectable } from '@angular/core';
import { TodoListStorageService } from './todo-list-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  constructor(private storage: TodoListStorageService) {}

  getTodoList() {
    return this.storage.get();
  }

  addItem(item: any) {
    return this.storage.post(item);
  }
  updateItem(item: any, changes: any) {
    return this.storage.put(item, changes);
  }
  deleteItem(item: any) {
    return this.storage.destroy(item);
  }
}
