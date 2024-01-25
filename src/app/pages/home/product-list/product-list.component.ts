import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormService } from '../../../services/form.service';
import { debounceTime, pipe } from 'rxjs';
import { USER_ID } from '../../../constants/constant';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  manageProductPopup: boolean = false;
  productID: any;
  filterAndShortOptionFormGroup: FormGroup | undefined;
  defaultProductList: Array<any> = [];
  updatedProductList: Array<any> = [];
  avlMaxprice: number = 1000;
  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private router: Router,
    private toastr: ToastrService,
    private productService: ProductService
  ) {
    this.createFormGroup()
  }

  ngOnInit(): void {
    this.getProductList()
  }

  getProductList() {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.defaultProductList = res.products
          const avlPriceArr: any = [];
          res.products.forEach((val: any) => {
            avlPriceArr.push(val.price)
          })
          this.avlMaxprice = Math.max(...avlPriceArr)
          this.filterAndShortOptionFormGroup?.get('maxFilterPrice')?.setValue(this.avlMaxprice)
          this.filterProducts()
          this.shortProducts()
        }
      }, error: (error: any) => {
        if (error.status === 400) {
          this.toastr.error(error.error.message)
        } else {
          this.toastr.error('Products could not fetch deu to some error')
        }
        this.defaultProductList = []
        this.updatedProductList = []
      }
    })
  }

  filterProducts() {
    const minPrice = (this.filterAndShortOptionFormGroup?.value.minFilterPrice) ? (this.filterAndShortOptionFormGroup?.value.minFilterPrice) : 0;
    const maxPrice = (this.filterAndShortOptionFormGroup?.value.maxFilterPrice) ? (this.filterAndShortOptionFormGroup?.value.maxFilterPrice) : this.avlMaxprice;
    this.updatedProductList = this.defaultProductList.filter((res: any) => minPrice <= res.price && maxPrice >= res.price)
    console.log(this.updatedProductList)
  }

  shortProducts(data?: any) {
    const shortOption = this.filterAndShortOptionFormGroup?.value.shortOption
    switch (shortOption) {
      case 'LTH':
        this.updatedProductList = this.updatedProductList.sort((a: any, b: any) => a.price - b.price)
        break;
      case 'HTL':
        this.updatedProductList = this.updatedProductList.sort((a: any, b: any) => a.price - b.price).reverse()
        break;
      default:
        break;
    }
  }


  openManageProductPopup(data?: any) {
    this.manageProductPopup = true;
    if (data) {
      this.productID = data;
    }
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId)
      .subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.toastr.success(res.message)
            const deletedProductIndex = this.defaultProductList.findIndex((res: any) => res.product_id === productId);
            if (deletedProductIndex > -1) {
              this.defaultProductList.splice(deletedProductIndex, 1)
              this.filterProducts();
              this.shortProducts()
            }
          }
        }, error: (error: any) => {
          if (error.status === 400) {
            this.toastr.error(error.error.message)
          } else {
            this.toastr.error('Products could not delete deu to some error')
          }
        }
      })
  }

  closeManageProductPopup(data: any) {
    if (data) {
      this.getProductList()
    }
    this.manageProductPopup = false;
    this.productID = null;
  }

  createFormGroup() {
    this.filterAndShortOptionFormGroup = this.fb.group({
      minFilterPrice: [0],
      maxFilterPrice: [1000],
      shortOption: ['']
    })
  }

  signOut() {
    this.router.navigate(['../'])
  }
}
