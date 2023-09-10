import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/data.service';
import { Todo } from './shared/todo.model';
import { NgForm } from '@angular/forms';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.scss']
})
export class ToDosComponent implements OnInit{
  public toDos: Todo[];
  public isInvalidTodo: boolean;

  constructor(private _dataService: DataService, private dialog: MatDialog){
    this.toDos = [];
    this.isInvalidTodo = false;
  }

  ngOnInit(): void {
    this.toDos = this._dataService.getAllTodos();
  }

  public onFormSubmit(form: NgForm){
    if(form.invalid){
      this.isInvalidTodo = true;
      return;
    } 
    this._dataService.addTodo(new Todo(form.value.text))
    this.toDos = this._dataService.getAllTodos();
    this.isInvalidTodo = false;
    form.reset()
  }

  public toggleCompleted(todo: Todo): void{
    todo.completed = !todo.completed;
  }

  public onClickingEdit(todo: Todo): void{
    const index = this.toDos.indexOf(todo);

    let dialogRef = this.dialog.open(EditTodoDialogComponent, { width: '700px', data: todo });
    dialogRef.afterClosed().subscribe((result)=>{
      console.log(result);
      
      if(result){
        this._dataService.updateTodo(index,result);
      }
    })
  }

  public onClickingDelete(todo: Todo): void{
    const index = this.toDos.indexOf(todo);
    this._dataService.deleteTodo(index);
  }
}
