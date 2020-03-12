import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Manufacture} from "../models/manufacture";
import {Material} from "../models/material";
import {Tool} from "../models/tools";
import {Filter} from "../models/filter.java";

@Injectable({
    providedIn: 'root'
})
export class MaterialServise {


    constructor(private http: HttpClient) {
    }

    getMaterials(): Promise<Material[]> {
        return this.http.get<Material[]>("http://localhost:8080/api/materials").toPromise();
    }

    getTools(): Promise<Tool[]> {
        return this.http.get<Tool[]>("http://localhost:8080/api/tools").toPromise();
    }

    deleteMaterial(id: number) {
        return this.http.delete("http://localhost:8080/api/material/" + id).toPromise();
    }

    async updateMaterial(manuf: Material, manuf1: Material, tools: Tool[]) {
        manuf.manufacturerByIdManufacturer = await this.byName(manuf1.manufactureName);
        manuf.tool = tools;
        manuf.name = manuf1.name;
        manuf.cost = manuf1.cost;
        console.log(manuf);
        return this.http.put("http://localhost:8080/api/material/" + manuf.idMaterial, manuf).toPromise();
    }

    // myMaterial:{idMaterial:number , name:String,cost:number,ManufacturerByUdManufacturer:null,tool:null};
    async addMaterial(manuf: Material, tools: Tool[]): Promise<Material> {
        manuf.manufacturerByIdManufacturer = await this.byName(manuf.manufactureName);
        manuf.tool = tools;
        console.log(manuf);

        return this.http.post("http://localhost:8080/api/material", manuf).toPromise();
    }

    byName(name: string) {
        return this.http.post("http://localhost:8080/api/manufacture/name", name).toPromise()
    }

    getManufacturers(): Promise<Manufacture[]> {
        return this.http.get<Manufacture[]>("http://localhost:8080/api/manufactures").toPromise();
    }
//
    filterMaterial(filter: Filter): Promise<Material[]> {
        console.log(filter)
        return this.http.post<Material[]>("http://localhost:8080/api/materials/sort",filter).toPromise();
    }
}
