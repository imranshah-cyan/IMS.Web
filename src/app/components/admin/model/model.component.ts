import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SetService } from 'src/app/services/set.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent {

  id:number
  name: string
  description: string
  quantity: number

  squantity: number
  samount: number

  pquantity: number
  pamount: number

  constructor(
    public dialogRef: MatDialogRef<ModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _setService:SetService) {
      if(data[0]!='add'){
      this.id = data[1].id
      this.name = data[1].name
      this.description = data[1].description
      this.quantity = data[1].quantity
      }
  }

  add(){
    var pro = {
      ID: this.id,
      Name: this.name,
      Description: this.description,
      Quantity: this.quantity
    }

    this._setService.postRequest(pro, '/product').subscribe(
      res => {
        this.dialogRef.close()
      },
      err => {
        console.log(err)
      })
  }

  update(){
    var pro = {
      ID: this.id,
      Name: this.name,
      Description: this.description,
      Quantity: this.quantity
    }
    this._setService.putRequest(pro, '/product').subscribe(
      res => {
        this.dialogRef.close()
      },
      err => {
        console.log(err)
      })
    this.dialogRef.close()
  }

  sale(){
    var pro = {
      ID: this.id,
      Name: this.name,
      Description: this.description,
      Quantity: Number(this.quantity)
    }

    var sal = {
      ProductID: this.id,
      QuantitySold: Number(this.squantity),
      SaleAmount: Number(this.samount),
    }

    if(this.squantity < pro.Quantity)
    this._setService.postRequest(sal, '/sale').subscribe(
      res => {
        pro.Quantity =  Number(pro.Quantity) - Number(sal.QuantitySold);
        this._setService.putRequest(pro, '/product').subscribe(
          res => {
            this.dialogRef.close()
          },
          err => {
            console.log(err)
          })
      },
      err => {
        console.log(err)
      })
  }

  purchase(){
    var pro = {
      ID: this.id,
      Name: this.name,
      Description: this.description,
      Quantity: Number(this.quantity)
    }

    var pur = {
      ProductID: this.id,
      QuantityOrdered: Number(this.pquantity),
      PurchaseAmount: Number(this.pamount),
    }

    if(this.pquantity> 0)
    this._setService.postRequest(pur, '/purchase').subscribe(
      res => {
        pro.Quantity =  Number(pro.Quantity) + Number(pur.QuantityOrdered);
        this._setService.putRequest(pro, '/product').subscribe(
          res => {
            this.dialogRef.close()
          },
          err => {
            console.log(err)
          })
      },
      err => {
        console.log(err)
      })
  }

}

