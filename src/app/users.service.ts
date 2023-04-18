import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(    private http: HttpClient,
    private router: Router,) { }
    //getuser
    getuser():Observable<any[]>{
      return this.http.get<any[]>(`${environment.BaseUrl}users`)
    }
    //getuserbyid
    getuserByid(id:number):any{
      return this.http.get(`${environment.BaseUrl}users/${id}`)
    }
    edituserByid(id:number,obj:any):any{
      return this.http.put(`${environment.BaseUrl}users/${id}`,obj)
    }
    //post user
    create(form:any){
      
      return this.http.post(`${environment.BaseUrl}users`,form)
    }
    //edituser
    edituser(id:number,obj:any):any{
      return this.http.put(`${environment.BaseUrl}users/${id}`,obj)
    }
    //deleteuser
    deleteuser(id:number):any{
      return this.http.delete(`${environment.BaseUrl}users/${id}`)
    }
}
