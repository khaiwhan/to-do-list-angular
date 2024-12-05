import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSun, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Tasks } from './todo-list.model';

@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  sun = faSun
  trash = faTrash;
  date: string = new Date().toDateString();
  tasks: Tasks[] = [];
  form !: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      id: null,
      text: null,
      complete: false
    })
  }

  addTask() {
    this.form.get('id')?.setValue(Math.max(this.createIndex()) + 1);
    this.tasks.unshift(this.form.getRawValue());
    this.form.reset();
  }

  createIndex() {
    let idx: number[] = [];
    if (this.tasks.length > 0) {
      for (let i = 0; i < this.tasks.length; i++) {
        idx.push(this.tasks[i]['id']);
      }
      return Math.max(...idx);
    }
    else {
      return 0;
    }
  }

  complete(index: number) {
    this.tasks.filter(f => f.id == index).map(m => m.complete = !m.complete);
  }

  removeTasks(index: number) {
    this.tasks.splice(index, 1);
    console.log(this.tasks, index);
  }

}
