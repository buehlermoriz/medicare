import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ImprintComponent } from './imprint/imprint.component';
import { TodosComponent } from './todos/todos.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'mediCare', component: AboutComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'imprint', component: ImprintComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
