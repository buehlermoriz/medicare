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

  add(medicine: string, description: string, consumption_date: string, consumption_day: Date | null, consumption_times: number) {
    return this.todos.add({ medicine: medicine, id: v4(), done: false, description: description, consumption_date: consumption_date, consumption_day: consumption_day, consumption_times: consumption_times  });
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
