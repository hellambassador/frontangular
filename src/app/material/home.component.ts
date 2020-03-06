import {Component, OnInit} from '@angular/core';
import {ManufactureService} from "../servises/manufacture.service";
import {Manufacture} from "../models/manufacture";
import {NgForm, FormsModule} from '@angular/forms';
import {Material} from "../models/material";
import {MaterialServise} from "../servises/material.servise";

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

            <!--<form [formGroup]="element" >-->
                <!--<table class="table table-responsive">-->
                    <!--<thead>-->
                    <!--<tr>-->
                        <!--<th>Col 1</th>-->
                        <!--<th>Col 2</th>-->
                        <!--<th>Col 3</th>-->
                        <!--<th>Col 4</th>-->
                        <!--<th>Col 5</th>-->
                        <!--<th></th>-->
                    <!--</tr>-->
                    <!--</thead>-->
                    <!--<tbody formArrayName="itemRows">-->
                    <!--<tr *ngFor="let row of [1, 2, 3, 4, 5]" app-data-table-row [row]="row"></tr>-->
                    <!--</tbody>-->
                <!--</table>-->
            <!--</form>-->

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


        <!--<form #myForm="ngForm" novalidate>-->
        <!--<div class="form-group">-->
        <!--<label>Имя</label>-->
        <!--<input class="form-control" name="name" ngModel required/>-->
        <!--</div>-->
        <!--<div class="form-group">-->
        <!--<label>address</label>-->
        <!--<input class="form-control" name="address" ngModel required/>-->
        <!--</div>-->
        <!--<div class="form-group">-->
        <!--<button-->
        <!--class="btn btn-default" (click)="addManuf(myForm)">Добавить-->
        <!--</button>-->
        <!--</div>-->
        <!--</form>-->
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

    manufacturers: Material[];
    displayedColumns = ["name", "cost", "manufName", "deleteButton", "updateButton"];

    constructor(private  manufactureServise: MaterialServise) {
    }

    ngOnInit(): void {
        this.manufactureServise.getMaterials().then(items => {
            this.manufacturers = items;
            console.log(items);
        })
    }

    deleteManufacture(manufacture: Manufacture) {
        console.log(manufacture);
        this.manufactureServise.deleteManufacture(manufacture.idManufacturer).then(() => {
            this.manufacturers = this.manufacturers.filter(element => element.idManufacturer != manufacture.idManufacturer);
        })
    }

    updateManufacture(manufacture: Manufacture) {
        console.log(manufacture);
        manufacture.name = manufacture.name + "1";
        this.manufactureServise.updateManufacture(manufacture);
        // this.manufactureServise.updateManufacture(manufacture).then(() => {
        //     this.manufacturers = this.manufacturers.filter(element => element.idManufacturer != manufacture.idManufacturer);
        // })
    }

    addManuf(form: NgForm) {
        console.log(form);
        console.log(form.controls["name"].value);
        console.log(form.value)
        this.manufactureServise.addManufacture(form.value).then(() => {
            this.manufacturers.push(form.value)
        });
    }
}