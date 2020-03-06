import {Manufacture} from "./manufacture";

export interface Material{
    idMaterial:number
    name:string
    cost:GLfloat
    // cost:number
    manufacturerByIdManufacturer:Manufacture;

    // Set<ToolEntity> tools = new HashSet<>();

}