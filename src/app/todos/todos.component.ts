import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatTooltip } from '@angular/material/tooltip/tooltip';




@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class TodosComponent implements OnInit {
  hidden = true
  todos: Todo[] = [];
  selected = "1"
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
    var clicked = false;

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
    
    //overlay wird ausgeblendet -------------------------------------------------------------------------------------------------------------------
    this.deleteVisibilty();
    
    
     const startDate = this.range.get("start")?.value;
     var endDate = this.range.get("end")?.value;

     for(var day = new Date(startDate) ; day <= endDate; day.setDate(day.getDate() +1)){
      var consumption = day;
      if(consumption_monday===true && day.getDay()===1){
        this.add(
          medicine, description, consumption_monday, consumption_tuesday,consumption_wednesday,consumption_thirsday,consumption_friday,
          consumption_satturday, consumption_sunday, consumption,consumption_morning,consumption_midday,consumption_evening
          )
      }
      if(consumption_tuesday===true && day.getDay()===2){
        this.add(
          medicine, description, consumption_monday, consumption_tuesday,consumption_wednesday,consumption_thirsday,consumption_friday,
          consumption_satturday, consumption_sunday, consumption,consumption_morning,consumption_midday,consumption_evening
          )
      }
      if(consumption_wednesday===true && day.getDay()===3){
        this.add(
          medicine, description, consumption_monday, consumption_tuesday,consumption_wednesday,consumption_thirsday,consumption_friday,
          consumption_satturday, consumption_sunday, consumption,consumption_morning,consumption_midday,consumption_evening
          )
      }
      if(consumption_thirsday===true && day.getDay()===4){
        this.add(
          medicine, description, consumption_monday, consumption_tuesday,consumption_wednesday,consumption_thirsday,consumption_friday,
          consumption_satturday, consumption_sunday, consumption,consumption_morning,consumption_midday,consumption_evening
          )
      }
      if(consumption_friday===true && day.getDay()===5){
        this.add(
          medicine, description, consumption_monday, consumption_tuesday,consumption_wednesday,consumption_thirsday,consumption_friday,
          consumption_satturday, consumption_sunday, consumption,consumption_morning,consumption_midday,consumption_evening
          )
      }
      if(consumption_satturday===true && day.getDay()===6){
        this.add(
          medicine, description, consumption_monday, consumption_tuesday,consumption_wednesday,consumption_thirsday,consumption_friday,
          consumption_satturday, consumption_sunday, consumption,consumption_morning,consumption_midday,consumption_evening
          )
      }
      if(consumption_sunday===true && day.getDay()===0){
        this.add(
          medicine, description, consumption_monday, consumption_tuesday,consumption_wednesday,consumption_thirsday,consumption_friday,
          consumption_satturday, consumption_sunday, consumption,consumption_morning,consumption_midday,consumption_evening
          )
      }
      }
    //weitere Todos werden geladen -------------------------------------------------------------------------------------------------------------------
      await this.loadTodos(); 
      this.remove();
  }

    //Hinzufügen von Einträgen ---------------------------------------------------------------------------------------------------------------------
  async add( 
    medicine: string,description: string, consumption_monday: boolean,consumption_tuesday: boolean,consumption_wednesday: boolean,consumption_thirsday: boolean,
   consumption_friday: boolean,consumption_satturday: boolean,consumption_sunday: boolean,consumption: Date,consumption_morning : boolean,
   consumption_midday : boolean,consumption_evening : boolean) {
   var id =   await this.todoService.add(medicine, description, consumption, consumption_monday, consumption_tuesday, consumption_wednesday, consumption_thirsday, consumption_friday, consumption_satturday, consumption_sunday, consumption_morning, consumption_midday, consumption_evening );
    await this.loadTodos();

  }

  async sync() {
    await this.todoService.sync();
    await this.loadTodos();
  }
  
   async delete(todo: Todo)  {
     console.log("delete");
    await this.todoService.deleteToDo(todo);
    await this.loadTodos();
     
  }
  async loadTheOne(todo: Todo){
    await this.todoService.getToDo(todo);
  }

  
  

  async loadTodos() {
    this.todos = await this.todoService.getAll();
    this.sortByDueDate();
    // Elemente werden in den Kalender geladen 
    this.todoService.syncCalendar();
   
  }
 
  async sortByDueDate() {
    this.todos.sort((a: Todo, b: Todo) => {
       return a.consumption!.getTime() - b.consumption!.getTime();
 
     });
 }

 async addVisibilty(): Promise<void> {
  document.getElementById('add')!.style.display="block";
}

async deleteVisibilty(): Promise<void> {
  document.getElementById('add')!.style.display="none";
      }

      remove(): void {
        
        document.getElementsByClassName("visible")[0].classList.remove("visible");
        document.getElementById("AddButton")?.classList.remove("notVisible");
        document.getElementById("AddButton")?.classList.add("visible");
        document.getElementById("add")?.classList.add("notVisible");
       
        
            }
 checkOverdue (todo : Todo) {
 
 var today = new Date();
 
 if(todo.consumption < today){ 
    var element = document.getElementById(todo.id)
    element?.classList.add("overdue")
    
    
    this.showBadge();


  }
 }

 showBadge(){
  this.hidden=false;
 }
 resetBadge(){
  this.hidden=true;
 }
}
