import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task/components/task/task.component';


const routes: Routes = [

  {path:"",redirectTo:"/tasks", pathMatch:'full'},
  {path:"tasks",loadChildren:()=>import("./task/task.module").then(m => m.TaskModule)}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
