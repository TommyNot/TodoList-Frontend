import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ServiceService } from 'src/app/auth/service.service';
import { Task } from 'src/models/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{

  nuovaTask: string = "";
  taskLista: any[] = [];
  modificaMode:boolean = false;
  taskDaModificare:Task | null = null;


 

  constructor(private service:ServiceService , private route:ActivatedRoute){}

  

  ngOnInit(): void {
    this.service.taskList$.subscribe(tasks => {
      this.taskLista = tasks;
    });
    this.taskLista = this.route.snapshot.data["tasks"]
  }

  aggiungi(input:any):void{
    const taskData = {
      titolo:input
    }
    this.service.aggiungi(taskData).subscribe({
      next:(res)=>{
        this.taskLista.push(res)
        
        this.nuovaTask = "";
      },
      error :(errore)=>{
        console.error("Errore nell'aggiunta della task " , errore)
      }
    })
  
  }

  modificaTask(task:Task):void{
    if(this.taskDaModificare && this.taskDaModificare.id === task.id){
      this.annullaModifica()
      return
    }
    this.nuovaTask = task.titolo
    this.taskDaModificare = task;
    this.modificaMode = true;
  }

 annullaModifica():void{
    this.nuovaTask =""
    this.taskDaModificare = null;
    this.modificaMode = false
 }



 pulisciInput(){
    this.nuovaTask = ""
    this.modificaMode = false;
 }

 salvaModifiche(){
  const taskAggionata = {
    ...this.taskDaModificare , 
    titolo:this.nuovaTask
  }
  this.aggiornaTask(taskAggionata,taskAggionata.id)
  this.pulisciInput()
 }



  aggiornaTask(task:any,id:any):void{
    this.nuovaTask = task.titolo
    
    this.service.aggiornaTask(task,id).subscribe({
      next: (res)=>{
        this.taskLista=this.taskLista.filter(task=>task.id!==id)
      },
      error:(errore)=>{
        console.error("Errore nell'aggiornamento della task",errore)
      }
    })
  }


 

  aggiornaStatus(tas:any,id:number):void{
    this.service.aggiornaStatus(tas,id).subscribe({
      next: (res)=>{
        this.taskLista=this.taskLista.filter(task=> task.id !== id)
      },
      error:(errore)=>{
        console.error("Errore nell'aggiornamento dello status",errore)
      }
    })
  }



  elimina(id: number): void {
    this.service.delete(id).subscribe({
      next: (res) => {     
        this.taskLista = this.taskLista.filter(task => task.id !== id);
      },
      error: (errore) => {
        console.error("Errore durante l'eliminazione", errore);
      }
    });
  }
  
  


}
