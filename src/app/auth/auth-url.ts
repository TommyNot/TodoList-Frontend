import { mainUrl } from "main-url";

export class AuthUrl{

    static vediListaTask(){
        return mainUrl + "/findAll"
    }

    static aggiungiTask(){

        return mainUrl + "/aggiungi"
    }

    static aggiornaTask(id:number){

        return `${mainUrl}/aggiorna/${id}`;
    }

    static aggiornaStatusTask(id:number){

        return `${mainUrl}/aggiorna/check/${id}`;
    }

    static eliminaTask(id:number){

        return  `${mainUrl}/elimina/${id}`;
    }
}