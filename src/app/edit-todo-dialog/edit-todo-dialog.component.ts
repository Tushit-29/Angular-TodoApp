import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../to-dos/shared/todo.model';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.scss']
})
export class EditTodoDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditTodoDialogComponent>, @Inject(MAT_DIALOG_DATA) public todo: Todo){}

  public onFormSubmit(form: NgForm){

    if(form.invalid){
      return;
    }
    const updatedTodo = {
      ...this.todo,
      ...form.value
    }
    this.dialogRef.close(updatedTodo);
  }

  public closeDialog(): void{
    this.dialogRef.close();
  }
}
