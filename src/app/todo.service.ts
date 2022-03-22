import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Dexie } from "dexie";
import { v4 } from "uuid";
import { Medicine } from "./medicine";
import { EventInput, CalendarOptions } from "@fullcalendar/angular";
import * as moment from "moment";

export const INITIAL_EVENTS: EventInput[] = [];

@Injectable({
  providedIn: "root",
})
export class TodoService extends Dexie {
  todos!: Dexie.Table<Medicine, string>;

  constructor(private httpClient: HttpClient) {
    super("TodoDB");

    this.version(1).stores({
      todos: "id",
    });
  }

  getAll() {
    return this.todos.toArray();
  }

  getAllCalendar() {
    return this.todos;
  }

  getToDo(todo: Medicine) {
    return this.todos.get(todo.id);
  }

  add(
    medicine: string,
    description: string,
    consumption: Date,
    consumption_monday: boolean,
    consumption_tuesday: boolean,
    consumption_wednesday: boolean,
    consumption_thursday: boolean,
    consumption_friday: boolean,
    consumption_satturday: boolean,
    consumption_sunday: boolean,
    consumption_morning: boolean,
    consumption_midday: boolean,
    consumption_evening: boolean
  ) {
    return this.todos.add({
      medicine: medicine,
      id: v4(),
      done: false,
      description: description,
      consumption: consumption,
      consumption_monday: consumption_monday,
      consumption_tuesday: consumption_tuesday,
      consumption_wednesday: consumption_wednesday,
      consumption_thursday: consumption_thursday,
      consumption_friday: consumption_friday,
      consumption_satturday: consumption_satturday,
      consumption_sunday: consumption_sunday,

      consumption_morning: consumption_morning,
      consumption_midday: consumption_midday,
      consumption_evening: consumption_evening,
    });
  }

  async sync() {
    const allTodos = await this.getAll();
    const syncedTodos = await this.httpClient
      .post<Medicine[]>("http://localhost:3030/sync", allTodos)
      .toPromise();
    this.todos.bulkPut(syncedTodos!);
  }
  deleteToDo(todo: Medicine) {
    window.location.reload();
    return this.todos.delete(todo.id);

  }

  async syncCalendar() {
    let todos = this.getAll();
    let i: number = INITIAL_EVENTS.length;
    let y: number = (await todos).length;

    if (i !== y) {
      for (let todo of await todos) {
        var DateFormated = moment(todo.consumption).format("YYYY-MM-DD");
        INITIAL_EVENTS.push({
          id: todo.id,
          title: todo.medicine,
          start: DateFormated,
          end: DateFormated,
        });
      }
    } else {
      return;
    }
  }

  async PutMethodDescription(
    todo: Medicine,
    NewDescription: string,
    description: string
  ) {
    description = NewDescription;
    return this.todos.update(todo, { description });
  }
  async PutMethodNewMedicineName(
    todo: Medicine,
    NewMedicineName: string,
    medicine: string
  ) {
    medicine = NewMedicineName;
    return this.todos.update(todo, { medicine });
  }
  async PutMethodCheckTime(
    todo: Medicine,
    check_consumption_evening: boolean,
    check_consumption_midday: boolean,
    check_consumption_morning: boolean
  ) {
    todo.consumption_evening = check_consumption_evening;
    todo.consumption_midday = check_consumption_midday;
    todo.consumption_morning = check_consumption_morning;
    this.todos.put(todo);
  }

  async PutMethodNewConsumptionDate(
    todo: Medicine,
    new_consumption_day: Date,
    consumption: Date | null
  ) {
    consumption = new_consumption_day;
    return this.todos.update(todo, { consumption });
  }
}
