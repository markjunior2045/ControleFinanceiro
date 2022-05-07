import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class SharedService {
    obs: Observable<any>;
    private obsSubject = new Subject<any>();

    constructor(){
        this.obs = this.obsSubject.asObservable();
    }

    send(data: any){
        this.obsSubject.next(data);
    }
}