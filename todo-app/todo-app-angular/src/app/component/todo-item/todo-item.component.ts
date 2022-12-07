import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/item';
import { TodoListService } from 'src/app/service/todo-list.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  todoList: any;
  constructor(private todoListService: TodoListService) {}

  ngOnInit(): void {
    this.todoList = this.todoListService.getTodoList();
  }
  item = { title: '', description: '', date: '', status: '' };
  changeIndex(index: any): void {
    this.item = this.todoList[index];
  }
  addItem(item: any): void {
    const d = new Date();
    const date =
      (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) +
      '/' +
      d.getMonth() +
      '/' +
      d.getFullYear();
    this.todoList = this.todoListService.addItem({
      title: item.title,
      description: item.description,
      date: date,
      status: 'Active',
    });
  }
  updateItem(item: any) {
    console.log(item);
    if (item.title == '' || item.title == null) item.title = this.item.title;
    if (item.description == '' || item.description == null)
      item.description = this.item.description;
    let changes: Item = {
      title: item.title,
      description: item.description,
      date: this.item.date,
      status: this.item.status,
    };
    this.todoList = this.todoListService.updateItem(this.item, changes);
  }

  completeTodoItem(index: any) {
    let change = this.todoList[index];
    if (this.todoList[index].status === 'Active') {
      change.status = 'Completed';
    } else {
      change.status = 'Active';
    }
    this.todoList = this.todoListService.updateItem(
      this.todoList[index],
      change
    );
  }

  deleteTodoItem(index: any) {
    this.todoList = this.todoListService.deleteItem(this.todoList[index]);
  }
}
