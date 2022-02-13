import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { v4 } from 'uuid';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService extends Dexie {
  todos!: Dexie.Table<Todo, string>;

  constructor(private httpClient: HttpClient) {
    super('TodoDB');

    this.version(1).stores({
      todos: 'id'
    });
  }

  getAll() {
    return this.todos.toArray();
  }

  add(title: string) {
    return this.todos.add({ title, id: v4(), done: false });
  }

  toggleDone(todo: Todo) {
    todo.done = !todo.done;
    return this.todos.put(todo);
  }

  async sync() {
    const allTodos = await this.getAll();
    const syncedTodos = await this.httpClient.post<Todo[]>('http://localhost:3030/sync', allTodos).toPromise();
    this.todos.bulkPut(syncedTodos!);
  }
}
