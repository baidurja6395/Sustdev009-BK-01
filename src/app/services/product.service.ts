import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private apiService:ApiService
  ) { }

  createProduct(data:any){
    return  this.apiService.post('product',data)
  }
   updateProduct(data:any){
    return this.apiService.put('product',data)
  }
   deleteProduct(productId:number){
    const reqData = {
      delete_product:true,
      product_id:productId
    }
    return  this.apiService.delete(`product`,reqData)
  }
   getProduct(productId:number){
    const reqData = {
      single_product:true,
      product_id:productId
    }
    return  this.apiService.post('product',reqData)
  }
   getProducts(){
    const data ={
      list_products:true
    }
    return  this.apiService.post('product',data)
  }

  fileUpload(file:File){
    const formData = new FormData();
    formData.append('productImage', file)
    return  this.apiService.uploadDoc(formData)
  }
}
