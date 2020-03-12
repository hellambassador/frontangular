import {Component, OnInit} from '@angular/core';
import {Manufacture} from "../models/manufacture";
import {NgForm, FormsModule, FormControl, ReactiveFormsModule} from '@angular/forms';
import {Material} from "../models/material";
import {MaterialServise} from "../servises/material.servise";
import {MatSelectModule} from '@angular/material/select';
import {Tool} from "../models/tools";


@Component({
    selector: 'app-home',
    template: `
        <table mat-table [dataSource]="manufacturers" class="mat-elevation-z8">

            <!--- Note that these columns can be defined in any order.
                  The actual rendered columns are set as a property on the row definition" -->

            <!-- Position Column -->
            <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef> name</th>
                <td mat-cell *matCellDef="let element"> {{element.name}}</td>
            </ng-container>

            <ng-container matColumnDef="cost">
                <th mat-header-cell *matHeaderCellDef> cost</th>
                <td mat-cell *matCellDef="let element"> {{element.cost}}</td>
            </ng-container>

            <ng-container matColumnDef="manufName">
                <th mat-header-cell *matHeaderCellDef>manufName</th>
                <td mat-cell *matCellDef="let element"> {{element.manufacturerByIdManufacturer.name}}</td>
            </ng-container>

            <ng-container matColumnDef="tools">
                <th mat-header-cell *matHeaderCellDef>Tools</th>
                <td mat-cell *matCellDef="let element"><span *ngFor='let phone of element.tool'> {{phone.name}} </span>
                </td>
                <!--<span *ngFor *ngler='let phone of element.tools'>{{phone.name}}</td>-->
                <!--<td *ngFor='let phone of element.tools'>{{phone.name}}</td>-->
                <!--{element.tool}-->
            </ng-container>

            <ng-container matColumnDef="deleteButton">
                <th mat-header-cell *matHeaderCellDef></th>
                <td mat-cell *matCellDef="let element">
                    <button mat-button color="warn" (click)="deleteManufacture(element)">delete</button>
                </td>
            </ng-container>

            <ng-container matColumnDef="updateButton">
                <th mat-header-cell *matHeaderCellDef></th>
                <td mat-cell *matCellDef="let element">
                    <button mat-button color="warn" (click)="prepareToUpdate(element)">ChoseToUpdate</button>
                </td>
            </ng-container>


            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>


        <form #myForm="ngForm" name="add" novalidate>
            <div>
                <mat-form-field>
                    <mat-label>Имя</mat-label>
                    <input matNativeControl placeholder="Roma" name="name" ngModel required>
                </mat-form-field>
            </div>
            <div>
                <mat-form-field>
                    <mat-label>Цена</mat-label>
                    <input matNativeControl placeholder="111" name="cost" ngModel required>
                </mat-form-field>
            </div>
            <div>
                <select [(ngModel)]="Manufacture" class="annka-center" name="manufactureName">
                    <option *ngFor="let manufacture of manufactureList; let i = index"
                            (ngValue)="manufacture"> {{manufacture.name}}
                    </option>
                </select>
            </div>
            <!--(selectionChange)="filter($event)"-->
            <mat-select multiple (selectionChange)="filter(selected)" [(value)]="selected" >
                <mat-option *ngFor="let topping of tools"  [value]="topping">{{topping.name}}</mat-option>
            </mat-select>
            <div class="form-group">
                <button mat-button color="primary"
                        class="btn btn-default" (click)="addManuf(myForm)">Добавить
                </button>
            </div>
            <button mat-button color="primary"
                    class="btn btn-default" (click)="updateManufacture(myForm)">Заменить
            </button>
            <div>
                <input type="hidden"  name="id" ngModel required>
            </div>
        </form>
        
        <form #myForm1="ngForm" name="filter" novalidate>
            <div>
                <mat-form-field>
                    <mat-label>Имя</mat-label>
                    <input matNativeControl placeholder="Roma" name="Name" ngModel required>
                </mat-form-field>
            </div>
            <div>
                <mat-form-field>
                    <mat-label>мин.Цена</mat-label>
                    <input matNativeControl placeholder="1" name="minCost" ngModel required>
                </mat-form-field>
            </div>
            <div>
                <mat-form-field>
                    <mat-label>мах.Цена</mat-label>
                    <input matNativeControl placeholder="1000" name="maxCost" ngModel required>
                </mat-form-field>
            </div>
            <div>
                <mat-form-field>
                    <mat-label>название ващей</mat-label>
                    <input matNativeControl placeholder="ball" name="toolSort" ngModel required>
                </mat-form-field>
            </div>
            <div class="form-group">
                <button mat-button color="primary"
                        class="btn btn-default" (click)="myFilter(myForm1)">Отфильтровать
                </button>
            </div>
            <div>
                <input type="hidden"  name="id" ngModel required>
            </div>
        </form>
        
    
    `,

    styles: [`
        td {
            padding: 10px;
        }

        mat-select{
            border: 1px solid black;
            width: 180px;
            border-radius: 20px;
            margin-top: 10px;
        }
        table {
            width: 100%
        }

    `]
})
export class HomeComponent implements OnInit {
    manufactureList: Manufacture[];
    manufacturers: Material[];
    materialChange:Material;
    tools:Tool[];
    toolsToAdd:Tool[];
    displayedColumns = ["name", "cost", "manufName", "tools", "deleteButton", "updateButton"];

    constructor(private  manufactureServise: MaterialServise) {
    }

    ngOnInit(): void {
        this.manufactureServise.getMaterials().then(items => {
            this.manufacturers = items;
            console.log(this.manufacturers);
        })
        this.manufactureServise.getManufacturers().then(items => {
            this.manufactureList = items;
            console.log(items);
        })
        this.manufactureServise.getTools().then(items => {
            this.tools = items;
            console.log(items);
        })
    }

    myFilter(form: NgForm)
    {
        console.log(form);
        this.manufactureServise.filterMaterial(form.value).then(items => {
            this.manufacturers = items;
        });
    }

    deleteManufacture(manufacture: Material) {
        console.log(manufacture);
        this.manufactureServise.deleteMaterial(manufacture.idMaterial).then(() => {
                this.manufacturers = this.manufacturers.filter(element => element.idMaterial != manufacture.idMaterial);
            }
        )
    }

    prepareToUpdate(manufacture: Material){
        this.materialChange=manufacture;
        console.log(this.materialChange);
    }
    updateManufacture(form:NgForm) {
        // console.log(manufacture);

        console.log(this.materialChange);
        this.manufactureServise.updateMaterial(this.materialChange,form.value,this.toolsToAdd);
        // this.manufactureServise.updateManufacture(manufacture).then(() => {
        //     this.manufacturers = this.manufacturers.filter(element => element.idManufacturer != manufacture.idManufacturer);
        // })
    }


    addManuf(form: NgForm) {
        console.log(form);
        this.manufactureServise.addMaterial(form.value,this.toolsToAdd).then((manufacture) => {
            this.manufacturers=this.manufacturers.concat(manufacture)
        });
    }
}