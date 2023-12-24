import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetService } from 'src/app/services/get.service';
import { ModelComponent } from './model/model.component';
import { SetService } from 'src/app/services/set.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  displayedColumnsP: string[] = ['orderID', 'productID', 'orderDate', 'quantityOrdered', 'purchaseAmount'];
  dataSourceP = new MatTableDataSource<PeriodicElementP>(ELEMENT_DATAP);

  displayedColumnsS: string[] = ['transactionID', 'productID', 'transactionDate', 'quantitySold', 'saleAmount'];
  dataSourceS = new MatTableDataSource<PeriodicElementS>(ELEMENT_DATAS);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _getService: GetService, public _dialog: MatDialog, private _setService: SetService) {
    this.ref();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ref(){
    this._getService.getRequest('/product').subscribe(
      res => {
        this.dataSource.data = res
        this.dataSource.paginator = this.paginator;
      },
      err => {
        console.log(err)
      })

      this._getService.getRequest('/purchase').subscribe(
        res => {
          this.dataSourceP.data = res
        },
        err => {
          console.log(err)
        })

        this._getService.getRequest('/sale').subscribe(
          res => {
            this.dataSourceS.data = res
          },
          err => {
            console.log(err)
          })
  }
  actionClicked(record: any, event: any, btn: any) {
    event.stopPropagation();
    if (btn == 'delete') {
      this._setService.deleteRequest('/product/' + record.id).subscribe(
        res => {
          const indexToRemove = this.dataSource.data.findIndex(item => item.id === record.id);
          this.dataSource.data.splice(indexToRemove, 1);
          this.dataSource.paginator = this.paginator;
        },
        err => {
          console.log(err);
        })
    }
    else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.height = '99vh'
      dialogConfig.width = '50%'
      var dr

      if (btn == 'update') {
        dialogConfig.data = ['update', record]
        const dialogRef = this._dialog.open(ModelComponent, dialogConfig);
        dr = dialogRef
      }

      else if (btn == 'sale') {
        dialogConfig.data = ['sale', record]
        const dialogRef = this._dialog.open(ModelComponent, dialogConfig);
        dr = dialogRef
      }

      else if (btn == 'purchase') {
        dialogConfig.data = ['purchase', record]
        const dialogRef = this._dialog.open(ModelComponent, dialogConfig);
        dr = dialogRef
      }

      if (dr != undefined)
        dr.afterClosed().subscribe(result => {
          this.ref();
        });
    }
  }

  addProduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = ['add']
    dialogConfig.height = '100vh'
    dialogConfig.width = '50%'
    const dialogRef = this._dialog.open(ModelComponent, dialogConfig);
    // Subscribe to the afterClosed event
    dialogRef.afterClosed().subscribe(result => {
      this.ref();
    });
  }

  view(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = ['view', row]
    dialogConfig.height = '99vh'
    dialogConfig.width = '50%'
    this._dialog.open(ModelComponent, dialogConfig);
  }

}

export interface PeriodicElement {
  id: number;
  name: string;
  description: string;
  quantity: number;
}

export interface PeriodicElementS {
  transactionID: number;
  productID: number;
  transactionDate: string;
  quantitySold: number;
  saleAmount: number
}
export interface PeriodicElementP {
  orderID: number;
  productID: number;
  orderDate: string;
  quantityOrdered: number;
  purchaseAmount: number;
}
const ELEMENT_DATA: PeriodicElement[] = [];
const ELEMENT_DATAS: PeriodicElementS[] = [];
const ELEMENT_DATAP: PeriodicElementP[] = [];
