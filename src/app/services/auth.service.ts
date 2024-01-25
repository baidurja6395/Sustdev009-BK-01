import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService:ApiService
  ) { }

  login(data:any){
    data = {...data,login:true}
    return this.apiService.post('user',data)
  }
   registration(data:any){
    data = {...data,register:true}
    return  this.apiService.post('user',data)
  }
}
