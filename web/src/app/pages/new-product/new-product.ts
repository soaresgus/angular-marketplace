import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products';
import { INewProductRequest } from '../../interfaces/new-product-request';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  imports: [ReactiveFormsModule],
  templateUrl: './new-product.html',
  styleUrl: './new-product.css'
})
export class NewProduct {
  successMessage = '';
  productImageBase64 = '';
  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  })

  private readonly _productsService = new ProductsService();
  private readonly _router = inject(Router);

  saveProduct() {
    if(this.productForm.invalid || !this.productImageBase64) {
      return;
    }

    const newProduct: INewProductRequest = {
      title: this.productForm.value.title!,
      price: this.productForm.value.price!,
      description: this.productForm.value.description!,
      category: this.productForm.value.category!,
      imageBase64: this.productImageBase64
    }

    this._productsService.saveProduct(newProduct).pipe(take(1)).subscribe({
      next: (response) => {
        this.successMessage = response.message;
      }
    })
  }

  cancel() {
    this._router.navigate(['/products']);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement

    if (input.files && input.files[0]) {
      const file = input.files[0];

      this.convertFileToBase64(file);
    }
  }

  convertFileToBase64(file: File) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      this.productImageBase64 = base64String;
    }

    reader.onerror = (e) => {
      this.productImageBase64 = '';
      console.error('Error reading file', e);
    }

    reader.readAsDataURL(file);
  }
}
