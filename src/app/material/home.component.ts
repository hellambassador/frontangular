import {Component, OnInit} from '@angular/core';
import {Manufacture} from "../models/manufacture";
import {NgForm, FormsModule, FormControl, ReactiveFormsModule} from '@angular/forms';
import {Material} from "../models/material";
import {MaterialServise} from "../servises/material.servise";
import {MatSelectModule} from '@angular/material/select';
import {Tool} from "../models/tools";


interface Food {
    value: string;
    viewValue: string;
}

interface Car {
    value: string;
    viewValue: string;
}

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
                    <button mat-button color="warn" (click)="updateManufacture(element)">update</button>
                </td>
            </ng-container>


            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>


        <form #myForm="ngForm" novalidate>
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
                <select [(ngModel)]="tools" class="annka-center" name="manufactureName">
                    <option *ngFor="let manufacture of manufactureList; let i = index"
                            (ngValue)="manufacture"> {{manufacture.name}}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <button mat-button color="primary"
                        class="btn btn-default" (click)="addManuf(myForm)">Добавить
                </button>
            </div>
            <!--<div>-->
                <!--<input type="hidden"  name="manufacturerByIdManufacturer" ngModel required>-->
            <!--</div>-->
        </form>

        <mat-select (selectionChange)="filter($event)" multiple [(value)]="selected">
            <mat-option *ngFor="let topping of toppingList" [value]="topping">{{topping}}</mat-option>
        </mat-select>

    `,

    styles: [`
        td {
            padding: 10px;
        }

        table {
            width: 100%
        }

    `]
})
export class HomeComponent implements OnInit {
    // example
    toppings = new FormControl();
    toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
    // example

    manufactureList: Manufacture[];
    manufacturers: Material[];
    tools:Tool[];
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
        this.manufactureServise.getManufacturers().then(items => {
            this.tools = items;
            console.log(items);
        })
    }

    deleteManufacture(manufacture: Material) {
        console.log(manufacture);
        this.manufactureServise.deleteMaterial(manufacture.idMaterial).then(() => {
                this.manufacturers = this.manufacturers.filter(element => element.idMaterial != manufacture.idMaterial);
            }
        )
    }

    updateManufacture(manufacture: Material) {
        console.log(manufacture);
        manufacture.name = manufacture.name + "1";
        this.manufactureServise.updateMaterial(manufacture);
        // this.manufactureServise.updateManufacture(manufacture).then(() => {
        //     this.manufacturers = this.manufacturers.filter(element => element.idManufacturer != manufacture.idManufacturer);
        // })
    }

    addManuf(form: NgForm) {
        console.log(form);
        this.manufactureServise.addMaterial(form.value).then(() => {
            this.manufacturers.push(form.value)
        });
    }
}