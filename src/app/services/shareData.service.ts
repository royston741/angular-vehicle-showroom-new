import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ShareDataService {

    private data: any;


    constructor() { }

    getData(): any {
        return this.data;
    }

    setData(data: any) {
        this.data = data;
    }

}