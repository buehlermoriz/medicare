import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Medicine } from "../medicine";
import { TodoService } from "../todo.service";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"],
})
export class UpdateComponent implements OnInit {
  todo?: Medicine;

  constructor(
    private todoService: TodoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadStart();
    this.todoService.getAll();
  }

  async loadStart() {
    this.todo = (await this.todoService.getAll()).find(
      (t) => t.id === this.activatedRoute.snapshot.params["id"]
    );
  }

  async PutMethodNewDescription(todo: Medicine, NewDescription: string) {
    await this.todoService.PutMethodDescription(
      todo,
      NewDescription,
      todo.description
    );
  }
  async PutMethodNewMedicineName(todo: Medicine, NewMedicineName: string) {
    await this.todoService.PutMethodNewMedicineName(
      todo,
      NewMedicineName,
      todo.medicine
    );
  }

  async PutMethodCheckTime(
    todo: Medicine,
    check_consumption_evening: boolean,
    check_consumption_midday: boolean,
    check_consumption_morning: boolean
  ) {
    await this.todoService.PutMethodCheckTime(
      todo,
      check_consumption_evening,
      check_consumption_midday,
      check_consumption_morning
    );
  }

  async PutMethodNewConsumptionDate(todo: Medicine, new_consumption_day: Date) {
    await this.DateValidator(new_consumption_day);
    await this.todoService.PutMethodNewConsumptionDate(
      todo,
      new_consumption_day,
      todo.consumption
    );
  }

  async PutMethod(
    todo: Medicine,
    NewDescription: string,
    NewMedicineName: string,
    check_consumption_evening: boolean,
    check_consumption_midday: boolean,
    check_consumption_morning: boolean,
    new_consumption_day: Date
  ) {
    await this.PutMethodNewDescription(todo, NewDescription);
    await this.PutMethodNewMedicineName(todo, NewMedicineName);
    await this.PutMethodCheckTime(
      todo,
      check_consumption_evening,
      check_consumption_midday,
      check_consumption_morning
    );
    await this.PutMethodNewConsumptionDate(todo, new_consumption_day);
    await this.todoService.syncCalendar();
    
      }
  DateValidator(new_consumption_day: Date) {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    if (new_consumption_day < now) {
      document.getElementById("date")!.style.color = "red";
      document.getElementById("DateInThePast")!.style.display = "block";
    } else {
    window.location.reload();
    this.todoService.syncCalendar();
    this.reload();
      return;
    }
  }
  reload(){
    document.getElementById("DateInThePast")!.innerHTML = "Gespeichert";
    document.getElementById("DateInThePast")!.style.color = "black";
    document.getElementById("date")!.style.color = "black";
    document.getElementById("DateInThePast")!.style.textAlign = "center";
    document.getElementById("DateInThePast")!.style.display = "block";
  }
}
