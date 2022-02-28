import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
    todos: Todo[] = [];
    selected = "1"
    range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }
//Datepicker----------------------------------------------------------------------------------------------------------------------------------------


  //erzeugt mehrere Events, da ein Mediakament mehrere Tage eingenommen werden muss -------------------------------------------------------
  async splitTimeslot(medicine: string,
    description: string, 
     consumption_monday: boolean,
   consumption_tuesday: boolean,
   consumption_wednesday: boolean,
   consumption_thirsday: boolean,
   consumption_friday: boolean,
   consumption_satturday: boolean,
   consumption_sunday: boolean,
   consumption_morning : boolean,
   consumption_midday : boolean,
   consumption_evening : boolean){
    
     var startDate = this.range.get("start")?.value
     var endDate = this.range.get("end")?.value
    
    console.log(this.range.get("start")?.value);


  }

    //Hinzufügen von Einträgen ---------------------------------------------------------------------------------------------------------------------
  async add( 
    medicine: string,
    description: string, 
     consumption_monday: boolean,
   consumption_tuesday: boolean,
   consumption_wednesday: boolean,
   consumption_thirsday: boolean,
   consumption_friday: boolean,
   consumption_satturday: boolean,
   consumption_sunday: boolean,
   consumption_morning : boolean,
   consumption_midday : boolean,
   consumption_evening : boolean) {
     var consumption_start = this.range.get("start")?.value;
     var consumption_end = this.range.get("end")?.value;

   var id =   await this.todoService.add(medicine, description, consumption_start, consumption_end, consumption_monday, consumption_tuesday, consumption_wednesday, consumption_thirsday, consumption_friday, consumption_satturday, consumption_sunday, consumption_morning, consumption_midday, consumption_evening );
    await this.loadTodos();
  }

  async sync() {
    await this.todoService.sync();
    await this.loadTodos();
  }
  
   async delete(todo: Todo)  {
     console.log("delete");
    await this.todoService.deleteToDo(todo);
     
  }
  async loadTheOne(todo: Todo){
    await this.todoService.getToDo(todo);
  }

  async test()  {
    console.log("test");
   
    
 }
  

  async toggleDone(todo: Todo) {
    await this.todoService.toggleDone(todo);
    await this.loadTodos();
  }

  async loadTodos() {
    this.todos = await this.todoService.getAll();
    
  }
 
  
}
