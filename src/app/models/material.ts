import {Manufacture} from "./manufacture";
import {Tool} from "./tools";

export interface Material{
    idMaterial:number
    name:string
    cost:GLfloat
    // cost:number
    manufacturerByIdManufacturer:Manufacture;
    manufactureName:string
    tool: Tool[]
}