import { Component, OnInit } from '@angular/core';
import {CalendarOptions } from '@fullcalendar/angular';
import { MedicineService, INITIAL_EVENTS } from '../medicine.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  constructor(private medicineService: MedicineService) {
  }
  
  ngOnInit(): void {
    this.medicineService.syncCalendar(); 
    this.toggleVisible();

  }

  calendarOptions: CalendarOptions = {
    initialView: (window.innerWidth <= 600) ?'dayGridWeek' : 'dayGridMonth' ,
    handleWindowResize: true,
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    initialEvents: INITIAL_EVENTS,   
  };
  toggleVisible(){
if(window.innerWidth <= 600){
  document.getElementById('tipp')!.style.display="block";
}
else{
  document.getElementById('tipp')!.style.display="none";
}
  }
}



