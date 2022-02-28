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
    
     var startDate = this.range.get("start")?.value;
    //  var startDateFormated = (moment(startDate)).format('DD-MMM-YYYY')

     var endDate = this.range.get("end")?.value;
    //  var endDateFormated = (moment(endDate)).format('DD-MMM-YYYY')
    

     for(var day = startDate; day <= endDate; day.setDate(day.getDate() +1)){
      var consumption_start = day;
      console.log(day.getDay());
      console.log(day.getDate() + " Schleifendurchlauf");
      if(consumption_monday===true && day.getDay()===1){
        await this.todoService.add(medicine, description, consumption_start, consumption_monday, consumption_tuesday, consumption_wednesday, consumption_thirsday, consumption_friday, consumption_satturday, consumption_sunday, consumption_morning, consumption_midday, consumption_evening );
        console.log("Montag Success")
      }
      if(consumption_tuesday===true && day.getDay()===2){
        await this.todoService.add(medicine, description, consumption_start,  consumption_monday, consumption_tuesday, consumption_wednesday, consumption_thirsday, consumption_friday, consumption_satturday, consumption_sunday, consumption_morning, consumption_midday, consumption_evening );
        console.log("Dienstag Success")
      }
      if(consumption_wednesday===true && day.getDay()===3){
        await this.todoService.add(medicine, description, consumption_start,  consumption_monday, consumption_tuesday, consumption_wednesday, consumption_thirsday, consumption_friday, consumption_satturday, consumption_sunday, consumption_morning, consumption_midday, consumption_evening );
        console.log("Mittwoch Success")
      }
      if(consumption_thirsday===true && day.getDay()===4){
        await this.todoService.add(medicine, description, consumption_start,  consumption_monday, consumption_tuesday, consumption_wednesday, consumption_thirsday, consumption_friday, consumption_satturday, consumption_sunday, consumption_morning, consumption_midday, consumption_evening );
        console.log("Donnerstag Success")
      }
      if(consumption_friday===true && day.getDay()===5){
        await this.todoService.add(medicine, description, consumption_start,  consumption_monday, consumption_tuesday, consumption_wednesday, consumption_thirsday, consumption_friday, consumption_satturday, consumption_sunday, consumption_morning, consumption_midday, consumption_evening );
        console.log("Freitag Success")
      }
      if(consumption_satturday===true && day.getDay()===6){
        await this.todoService.add(medicine, description, consumption_start, consumption_monday, consumption_tuesday, consumption_wednesday, consumption_thirsday, consumption_friday, consumption_satturday, consumption_sunday, consumption_morning, consumption_midday, consumption_evening );
        console.log("Samstag Success")
      }
      if(consumption_sunday===true && day.getDay()===0){
        await this.todoService.add(medicine, description, consumption_start, consumption_monday, consumption_tuesday, consumption_wednesday, consumption_thirsday, consumption_friday, consumption_satturday, consumption_sunday, consumption_morning, consumption_midday, consumption_evening );
        console.log("Sonntag Success")
      }
      // else{
      //   alert("Bitte wählen Sie einen Wochentag aus!")
      //   break
      // }
      console.log("Tag "+ day);
      }
      await this.loadTodos();
  console.log("test");
  console.log(day.getDay());
  console.log(day.getDate() + " Schleifendurchlauf")
  var helper = 0;
  day.getDate() === helper;
  startDate = undefined;
  console.log(startDate);
  

      



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
    

   var id =   await this.todoService.add(medicine, description, consumption_start, consumption_monday, consumption_tuesday, consumption_wednesday, consumption_thirsday, consumption_friday, consumption_satturday, consumption_sunday, consumption_morning, consumption_midday, consumption_evening );
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
