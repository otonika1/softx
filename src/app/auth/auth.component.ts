import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  nonExistent: boolean = false;
  login:boolean = true
  register:boolean = false
  constructor(public auth:UsersService,private router:Router,private http:HttpClient) { }
  data:any
  userName = new FormControl('')
  password1 = new FormControl('')
  Observable = new Observable((observer) => {
    console.log("Observer Success");
    observer.next(this.getAuth())
  })
  ngOnInit(): void {
    
    //get users
    this.Observable.subscribe();
  }
  getAuth(){
    this.auth.getuser().subscribe((res:any) => {
      console.log(res);
      this.data = res})
  }
  //reg switcher
  reg(){
    this.register = true
    this.login = false
  }
  //login switcher
  log(){
    this.login = true
    this.register = false
  }
  inv:boolean = false;
  //login
  save(){
    console.log(this.password1.value + ' ' + this.userName.value)
    for(let i of this.data){
      if(i.userName == this.userName.value && i.password == this.password1.value){        
        this.router.navigate(['users'])
        .then(() => {
          window.location.reload();
        });
      }
      else{
        this.inv = true;
        setTimeout(() => {this.inv = false;},2000)
      }
    }
  }
  form = new FormGroup(
    { 
      name:new FormControl(''),
      lastName:new FormControl(''),
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      userName:new FormControl('',Validators.required),
      
    }
  )
  noEqualPass:boolean = false;
  succesMsg:boolean =false
  alreadyExists:boolean = false;
  em:boolean = false;
  userN:boolean = false;
  
  pass:boolean = false;
  //post user
  add(){
     //if passwords are equal have to be added
    if(this.form.get('email')?.invalid){
      this.em = true;
    }
    if(this.form.get('userName')?.invalid){
      this.userN = true;
    }
    if(this.form.get('password')?.invalid){
      this.pass = true;
    }
      if(!this.data.find((el: any) => el.userName == this.form.get('userName')?.value)){
        
        if(this.form?.valid){
          
          this.auth.create(this.form.value).subscribe(res => {console.log(res);
            this.succesMsg = true;
            this.alreadyExists = false;
            this.em = false;
            this.userN = false;
            this.pass = false;
            setTimeout(() => {this.succesMsg = false;},2000)
          })
          this.form.reset() 
          window.location.reload()
        }
      }else{
        this.alreadyExists = true;
        
        
      }
      
     
      
     
     
  }
}
