import {Component, OnInit} from '@angular/core';
import {ManufactureService} from "../servises/manufacture.service";
import {Manufacture} from "../models/manufacture";
import {NgForm, FormsModule} from '@angular/forms';


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

            <ng-container matColumnDef="address">
                <th mat-header-cell *matHeaderCellDef> address</th>
                <td mat-cell *matCellDef="let element"> {{element.address}}</td>
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
            <div class="form-group">
                <label>Имя</label>
                <input class="form-control" name="name1" [(ngModel)]="name1" required/>
            </div>
            <div class="form-group">
                <label>address</label>
                <input class="form-control" name="address" ngModel
                       required email/>
            </div>
           <div class="form-group">
                <button [disabled]="myForm.invalid"
                        class="btn btn-default" (click)="addManuf(myForm)">Добавить
                </button>
            </div>
        </form>
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

    manufacturers: Manufacture[]
    displayedColumns = ["name", "address", "deleteButton", "updateButton"]

    constructor(private  manufactureServise: ManufactureService) {
    }

    ngOnInit(): void {
        this.manufactureServise.getManufacturers().then(items => {
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

    name1: string;
    address: string;

    addManuf(form: NgForm) {
        console.log(form);

    }
}