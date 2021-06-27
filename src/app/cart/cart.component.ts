import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  removebtn: boolean= false;
  paybtn: boolean = false;
  dialogRef: any;

  constructor(private auth : AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.CartDetails();
    this.loadCart();
  }
  
  getCartDetails:any=[];
  CartDetails(){
  if(localStorage.getItem('localCart')){
    this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!);
  }
}

incQnt(itemId: any, qnt: any){
  for(let i=0; i<this.getCartDetails.length;i++){
  if(this.getCartDetails[i].itemId === itemId){
  if(qnt != 5)
  this.getCartDetails[i].qnt= parseInt(qnt) + 1;
  }
}
localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
this.loadCart();
}

decQnt(itemId: any, qnt: any){
  for(let i=0; i<this.getCartDetails.length;i++){
  if(this.getCartDetails[i].itemId === itemId){
  if(qnt != 1)
  this.getCartDetails[i].qnt = parseInt(qnt) - 1;
  }
}
localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
this.loadCart();
}

total:number = 0;
loadCart(){
  if(localStorage.getItem('localCart')){
  this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!);
  this.total = this.getCartDetails.reduce(function(acc: number, val: { amt: number; qnt: number; }){
  return acc + (val.amt * val.qnt);
    }, 0);
    this.paybtn = true;
    this.removebtn = true;
  }
}

removeall(){
  localStorage.removeItem('localCart');
  this.getCartDetails = [];
  this.total = 0;
  this.cartNumber = 0;
  this.removebtn = false;
  this.paybtn = false;
  this.auth.cartSubject.next(this.cartNumber);
}

singleDelete(getCartDetail: any){
  if(localStorage.getItem('localCart')){
  this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!);
  for(let i=0; i<this.getCartDetails.length; i++){
  if(this.getCartDetails[i].itemId=== getCartDetail){
  this.getCartDetails.splice(i, 1);
  localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
  this.loadCart();
  this.cartNumberFunc();
  
      }
      this.paybtn = false;
      this.removebtn = false;
    }
  }
}

cartNumber:number = 0;
cartNumberFunc(){
  var cartValue = JSON.parse(localStorage.getItem('localCart')!);
  this.cartNumber = cartValue.length;
  this.auth.cartSubject.next(this.cartNumber);
  }

  openDialog(){
    let dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        total: this.total,
      }
    });
  }
}
