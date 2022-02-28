import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';




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
    
     const startDate = this.range.get("start")?.value;
    //  var startDateFormated = (moment(startDate)).format('DD-MMM-YYYY')

     var endDate = this.range.get("end")?.value;

     for(var day = startDate; day <= endDate; day.setDate(day.getDate() +1)){
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
      await this.loadTodos();
  }

    //Hinzufügen von Einträgen ---------------------------------------------------------------------------------------------------------------------
  async add( 
    medicine: string,description: string, consumption_monday: boolean,consumption_tuesday: boolean,consumption_wednesday: boolean,consumption_thirsday: boolean,
   consumption_friday: boolean,consumption_satturday: boolean,consumption_sunday: boolean,consumption: Date | null,consumption_morning : boolean,
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
