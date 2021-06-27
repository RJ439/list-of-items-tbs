import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {

  }

  itemArray = [
    {
      itemId: 1,
      img: "assets/bn.jpg",
      nme: "Butternaan",
      amt: 30,
      qnt: 1
    },
    {
      itemId: 2,
      img: "assets/cb.jpg",
      nme: "Chicken Biriyani",
      amt: 120,
      qnt: 1
    },
    {
      itemId: 3,
      img: "assets/shawarmaa.jpg",
      nme: "Shawarma",
      amt: 50,
      qnt: 1
    },
    {
      itemId: 4,
      img: "assets/puttu.jpg",
      nme: "Puttu",
      amt: 20,
      qnt: 1
    }
  ];

  inc(items: any) {
    if (items.qnt != 5)
      items.qnt = items.qnt + 1;
  }

  dec(items: any) {
    if (items.qnt != 1) {
      items.qnt = items.qnt - 1;
    }
  }

  itemsCart: any = [];
  addCart(items: any) {
    let cartDataNull = localStorage.getItem('localCart');
    if (cartDataNull == null) {
      let storeDataGet: any = [];
      storeDataGet.push(items);
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    }
    else {
      var id = items.itemId;
      let index: number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localCart')!);
      for (let i = 0; i < this.itemsCart.length; i++) {
        if (parseInt(id) === parseInt(this.itemsCart[i].itemId)) {
          this.itemsCart[i].qnt = items.qnt;
          index = i;
          break;
        }
      }
      if (index == -1) {
        this.itemsCart.push(items);
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
      else {
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
    }
    this.cartNumberFunc();

  }
  cartNumber: number = 0;
  cartNumberFunc() {
    var cartValue = JSON.parse(localStorage.getItem('localCart')!);
    this.cartNumber = cartValue.length;
    this.auth.cartSubject.next(this.cartNumber);
  }

}
