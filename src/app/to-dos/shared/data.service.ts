import { Injectable, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private todos: Todo[];

  constructor(private localStorage: LocalStorageService) {
    this.todos = [];
    this.todos = this.localStorage.loadTodosFromLocalStorage();
  }

  getAllTodos(){
    return this.todos;
  }

  addTodo(todo: Todo){
    this.todos.push(todo);
    this.localStorage.saveTodosToLocalStorage(this.todos);
  }

  updateTodo(index: number, updatedTodo: Todo){
    this.todos[index] = updatedTodo;
    this.localStorage.saveTodosToLocalStorage(this.todos);
  }

  deleteTodo(index: number){
    this.todos.splice(index,1);
    this.localStorage.saveTodosToLocalStorage(this.todos);
  }
}
