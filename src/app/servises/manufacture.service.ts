import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Manufacture} from "../models/manufacture";

@Injectable({
  providedIn: 'root'
})
export class ManufactureService {

  constructor(private http: HttpClient) { }
  getManufacturers() {
    return this.http.get<Manufacture[]>("http://localhost:8080/api/manufactures").toPromise();
  }
    deleteManufacture(id:number) {
        return this.http.delete("http://localhost:8080/api/manufacture/"+id).toPromise();
    }
    updateManufacture(manuf:Manufacture) {
        return this.http.put("http://localhost:8080/api/manufacture/"+manuf.idManufacturer,manuf).toPromise();
    }
}
