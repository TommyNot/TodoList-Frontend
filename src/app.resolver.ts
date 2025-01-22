import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { ServiceService } from "./app/auth/service.service";
import { Task } from "./models/Task";


export const listaTask:ResolveFn<Task[]> = (route,state) =>{

    const TaskService = inject(ServiceService)
    return TaskService.findAll()
}