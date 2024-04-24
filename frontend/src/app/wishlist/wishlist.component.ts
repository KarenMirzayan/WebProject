import {Component, OnChanges, OnInit} from '@angular/core';
import {WishlistItem} from "../models";
import {WishlistService} from "../wishlist.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];
  totalPrice: number = 0;

  constructor(private service: WishlistService) {
  }

  ngOnInit() {
    this.getItems()
  }


  getItems(){
    this.service.get_items().subscribe((items: WishlistItem[]) => {
      this.wishlistItems = items;
    })
  }

  removeItem(id: number) {
    this.service.delete_item(id).subscribe()
    this.recountPrice()
  }

  recountPrice() {
    this.totalPrice = 0
    for (let item of this.wishlistItems){
      this.totalPrice += item.product.price;
    }
  }
}
