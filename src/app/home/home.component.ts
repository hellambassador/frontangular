import {Component, OnInit} from '@angular/core';
import {ManufactureService} from "../servises/manufacture.service";
import {Manufacture} from "../models/manufacture";

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
                    <button mat-button color="warn" (click)="deleteManufacture(element)" >delete</button>
                </td>
            </ng-container>


            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
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
    displayedColumns = ["name", "address", "deleteButton"]

    constructor(private  manufactureServise: ManufactureService) {
    }

    ngOnInit(): void {
        this.manufactureServise.getManufacturers().then(items => {
            this.manufacturers = items;
            console.log(items);
        })
    }

    deleteManufacture(manufacture:Manufacture){
        console.log(manufacture);
        this.manufactureServise.deleteManufacture(manufacture.idManufacturer).then(()=>{
            this.manufacturers=this.manufacturers.filter(element=>element.idManufacturer!=manufacture.idManufacturer);
        })
    }
}
