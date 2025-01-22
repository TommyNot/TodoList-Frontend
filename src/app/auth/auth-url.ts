import { mainUrl } from "main-url";

export class AuthUrl{

    static vediListaTask(){
        return mainUrl + "/findAll"
    }

    static aggiungiTask(){

        return mainUrl + "/aggiungi"
    }

    static aggiornaTask(){

        return mainUrl + "/aggiorna/{id}"
    }

    static eliminaTask(id:number){

        return  `${mainUrl}/elimina/${id}`;
    }
}