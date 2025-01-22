import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Task } from 'src/models/Task';
import { AuthUrl } from './auth-url';
import { Esito } from 'src/models/Esito';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

   
   private taskListSubject = new BehaviorSubject<Task[]>([]); 
   taskList$ = this.taskListSubject.asObservable();

  findAll():Observable<Task[]>{
    
    return this.http.get<Task[]>(AuthUrl.vediListaTask()).pipe(
      map(tasks=>{
        this.taskListSubject.next(tasks)
        return tasks;
      })
    )
  }

  aggiungi(taskData:any):Observable<Esito>{
    const headers = new HttpHeaders({
      'Content-type':'application/json'
    })
    return this.http.post(AuthUrl.aggiungiTask(),taskData,{observe:"response",headers}).pipe(
      map(response => {
        if(!this.http) return {code:400,message:"Non aggiunto"}
        this.findAll().subscribe()
        return {code:200,message:"Aggiunto con successo"}
      }),
      catchError(errore => {
        return of({code:errore,message:"Errore"})
      })
    )
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(AuthUrl.eliminaTask(id)).pipe(
      map(()=> {
        this.findAll().subscribe()
      })
    );
  }
  
}
