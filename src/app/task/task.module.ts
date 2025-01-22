import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './components/task/task.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
