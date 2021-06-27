import { Component, OnInit, Input, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  firstNumber: any;
  result: any;
  subTotal:boolean = true;
  final:boolean = false;
  addTip = true;
  cartNumber: any;

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any, public router: Router) { }

  ngOnInit(): void {
  }

  addNumber(){
    this.result = parseInt(this.data.total) / parseInt(this.firstNumber) + parseInt(this.data.total) ;
    this.final = true;
    this.subTotal = false;
  }

  input(){
    if(this.firstNumber === null){
      this.addTip = true;
    }else{
      this.addTip = false;
    }
  }

  payment(){
    this.dialogRef.close();
    alert("Payment successfull");
    localStorage.clear();
    this.router.navigate(['home']);
  }

}
