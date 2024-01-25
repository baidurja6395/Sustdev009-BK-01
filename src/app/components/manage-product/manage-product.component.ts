import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormService } from '../../services/form.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css'
})
export class ManageProductComponent implements OnInit {

  @Output()
  Close: EventEmitter<boolean> = new EventEmitter();
  @Input()
  productID: any;
  ProductForm: FormGroup | undefined;
  errMsg: any;
  isEdit: boolean = false;
  imgErrMsg: string = '';
  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private router: Router,
    private toastr: ToastrService,
    private productService: ProductService
  ) {
    this.createFromGroup();
    this.createErrMsg()
  }
  ngOnInit(): void {
    if (this.productID) {
      this.isEdit = true;
      this.getProductDetails(this.productID)
    }
  }

  getProductDetails(productID: number) {
    this.productService.getProduct(productID).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.ProductForm?.patchValue(res.products)
        }
      }, error: (error: any) => {
        if (error.status === 400) {
          this.toastr.error(error.error.message)
        } else {
          this.toastr.error('Product details could not fetch deu to some error')
        }
      }
    })
  }

  saveProduct(data: any, isValid: boolean) {
    if (this.ProductForm) {
      this.formService.markFormGroupTouched(this.ProductForm)
      if (isValid) {
        if (this.isEdit) {
          const requestData = {
            update_product: true,
            product_id: data.product_id,
            product_name: data.product_name,
            image: data.image,
            description: data.description,
            price: data.price,
          }
          this.productService.updateProduct(requestData)
            .subscribe({
              next: (res: any) => {
                if (res.status === 'success') {
                  this.toastr.success(res.message)
                  this.closePopup(true)
                }
              }, error: (error: any) => {
                if (error.status === 400) {
                  this.toastr.error(error.error.message)
                } else {
                  this.toastr.error('Product could not update deu to some error')
                }
              }
            })
        } else {
          const requestData = {
            add_product: true,
            product_name: data.product_name,
            image: data.image,
            description: data.description,
            price: data.price,
          }
          this.productService.createProduct(requestData)
            .subscribe({
              next: (res: any) => {
                if (res.status === 'success') {
                  this.toastr.success(res.message)
                  this.closePopup(true)
                }
              }, error: (error: any) => {
                if (error.status === 400) {
                  this.toastr.error(error.error.message)
                } else {
                  this.toastr.error('Product could not add deu to some error')
                }
              }
            })
        }
      }
    }
  }

  onFileChange(imageInput: any) {
    this.imgErrMsg = ''
    const file: File = imageInput.target.files[0]
    if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
      this.productService.fileUpload(file)
        .subscribe({
          next: (res: any) => {
            if (res.status === 'success') {
              this.ProductForm?.get('image')?.setValue(res.url)
            }
          }, error: (error: any) => {
            if (error.status === 400) {
              this.toastr.error(error.error.message)
            } else {
              this.toastr.error('Product  image could not upload deu to some error')
            }
          }
        })
    } else {
      this.imgErrMsg = 'The file type should be jpg,jpeg or png'
    }
  }

  removeFile() {
    this.ProductForm?.get('image')?.setValue('')
  }

  closePopup(status: boolean) {
    this.Close.emit(status)
  }

  createFromGroup() {
    this.ProductForm = this.fb.group({
      product_id: [''],
      product_name: ['', [Validators.required]],
      image: ['',],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
    })
  }

  createErrMsg() {
    this.errMsg = {
      product_name: {
        required: 'Product name is required'
      },
      image: {
        required: 'Please upload an image'
      },
      description: {
        required: 'Product description is required'
      },
      price: {
        required: 'Product price is required'
      },
    }
  }
}
