import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../to-dos/shared/todo.model';
import { DataService } from '../to-dos/shared/data.service';
import { LocalStorageService } from '../to-dos/shared/local-storage.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  @Input()
  todo: Todo;

  @Input()
  todos: Todo[];

  @Output()
  todoClicked: EventEmitter<void> = new EventEmitter()

  @Output()
  editClicked: EventEmitter<void> = new EventEmitter()

  @Output()
  deleteClicked: EventEmitter<void> = new EventEmitter()

  constructor(private _dateService: DataService, private _localStorage: LocalStorageService) {
    this.todo = new Todo("");
    this.todos = [];
  }

  public onTodoClick(){
    this.todoClicked.emit();
    this._localStorage.saveTodosToLocalStorage(this.todos);
  }

  public onEditClicked(){
    this.editClicked.emit();
  }

  public onDeleteClicked(){
    this.deleteClicked.emit();
  }
}
