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

  add(
    medicine: string,
     description: string, 
      consumption_day: Date | null,
      consumption_monday: boolean,
   consumption_tuesday: boolean,
    consumption_wednesday: boolean,
    consumption_thirsday: boolean,
    consumption_friday: boolean,
    consumption_satturday: boolean,
    consumption_sunday: boolean ,
    consumption_morning : boolean,
    consumption_midday : boolean,
    consumption_evening : boolean

    
    ) {
    return this.todos.add({ 
      medicine: medicine, 
      id: v4(), 
      done: false, 
      description: description ,
       consumption_day: consumption_day,
        consumption_monday: consumption_monday,
     consumption_tuesday: consumption_tuesday,  
    consumption_wednesday: consumption_wednesday,
  consumption_thirsday: consumption_thirsday,
consumption_friday: consumption_friday,
consumption_satturday: consumption_satturday,
consumption_sunday: consumption_sunday,

consumption_morning: consumption_morning,
consumption_midday: consumption_midday,
    consumption_evening:consumption_evening});
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
  deleteToDo(todo :Todo) {
    todo.done = !todo.done;
    this.todos.put(todo);
    return this.todos.delete(todo.id); 
    
  }
}
