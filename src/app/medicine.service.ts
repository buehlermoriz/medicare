import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Dexie } from "dexie";
import { v4 } from "uuid";
import { Medicine } from "./medicine";
import { EventInput } from "@fullcalendar/angular";
import * as moment from "moment";

export const INITIAL_EVENTS: EventInput[] = [];

@Injectable({
  providedIn: "root",
})
export class MedicineService extends Dexie {
  medicine!: Dexie.Table<Medicine, string>;

  constructor(private httpClient: HttpClient) {
    super("TodoDB");

    this.version(1).stores({
      medicine: "id",
    });
  }

  getAll() {
    return this.medicine.toArray();
  }

  getAllCalendar() {
    return this.medicine;
  }

  getMedicine(todo: Medicine) {
    console.log(this.medicine.get(todo.id));
    return this.medicine.get(todo.id);
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
    return this.medicine.add({
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
    this.medicine.bulkPut(syncedTodos!);
  }
  deleteMedicine(todo: Medicine) {
    window.location.reload();
    return this.medicine.delete(todo.id);

  }

  async syncCalendar() {
    let medicine = this.getAll();
    let i: number = INITIAL_EVENTS.length;
    let y: number = (await medicine).length;

    if (i !== y) {
      for (let todo of await medicine) {
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
    console.log(description + "neue beschreibuung");
    return this.medicine.update(todo, { description });
  }
  async PutMethodNewMedicineName(
    todo: Medicine,
    NewMedicineName: string,
    medicine: string
  ) {
    medicine = NewMedicineName;
    console.log(medicine + "neue Medizinname");
    return this.medicine.update(todo, { medicine });
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
    this.medicine.put(todo);
  }

  async PutMethodNewConsumptionDate(
    todo: Medicine,
    new_consumption_day: Date,
    consumption: Date | null
  ) {
    consumption = new_consumption_day;
    console.log(consumption + "neuer Tag zum Einnehmen");
    return this.medicine.update(todo, { consumption });
  }
}
