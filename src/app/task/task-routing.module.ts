import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './components/task/task.component';
import { listaTask } from 'src/app.resolver';

const routes: Routes = [
  {path:"",title:"Task ToDo List",component:TaskComponent,resolve: { tasks: listaTask }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
