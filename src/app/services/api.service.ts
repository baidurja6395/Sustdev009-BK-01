import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Subject, catchError, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASE_URL = "http://164.52.212.73:3001/api/v1";
  constructor(
    private http: HttpClient,
  ) { }

   post(path:string, data:any,noLoder?:boolean){
    path = `${this.BASE_URL}/${path}`
    return this.http.post<any>(`${path}`, data)
  }
   put(path:string, data:any,noLoder?:boolean){
    path = `${this.BASE_URL}/${path}`
    return this.http.put<any>(`${path}`, data)
  }

   get(path:any,noLoder?:boolean){
    return this.http.get<any>(path)
  }

   delete(path:string,data:any,noLoder?:boolean){
    path = `${this.BASE_URL}/${path}`
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.http.delete<any>(`${path}`,options)
  }

   uploadDoc(formData:FormData,noLoder?:boolean){
    const path = `${this.BASE_URL}/product/upload`;
    return this.http.post<any>(`${path}`, formData)
  }
}
