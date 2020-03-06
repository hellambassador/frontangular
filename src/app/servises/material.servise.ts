import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Manufacture} from "../models/manufacture";
import {Material} from "../models/material";

@Injectable({
    providedIn: 'root'
})
export class MaterialServise {

    constructor(private http: HttpClient) { }
    getMaterials() {
        return this.http.get<Material[]>("http://localhost:8080/api/materials").toPromise();
    }
    deleteManufacture(id:number) {
        return this.http.delete("http://localhost:8080/api/manufacture/"+id).toPromise();
    }
    updateManufacture(manuf:Manufacture) {
        return this.http.put("http://localhost:8080/api/manufacture/"+manuf.idManufacturer,manuf).toPromise();
    }
    addManufacture(manuf:Manufacture){
        return this.http.put("http://localhost:8080/api/manufacture",manuf).toPromise();
    }
}
