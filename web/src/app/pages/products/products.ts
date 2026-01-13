import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products';
import { take } from 'rxjs';
import { IProduct } from '../../interfaces/product';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products: IProduct[] = [];

  private readonly _productsService = inject(ProductsService);

  ngOnInit() {
    this._productsService.getProducts().pipe(take(1)).subscribe({
      next: (response) => {
        this.products = response.data;
      }
    });
  }
}
