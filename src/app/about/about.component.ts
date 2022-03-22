import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../medicine.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {
  breakpoint: number | undefined;

  constructor(private medicineService: MedicineService) { }

  ngOnInit(): void {
    this.medicineService.syncCalendar();
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;    
  }
  
  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
  }
  }

  