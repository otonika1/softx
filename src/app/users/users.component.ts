import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  Clients:any[] = [];
  clone:any
  sortField:string = 'none'
  sortOrder = 0
  Id:number = 0;
  obj:any;
  success:boolean = false
  form = new FormGroup(
    { 
      name:new FormControl(''),
      userName:new FormControl(''),
      lastName:new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      
    }
  )
  constructor(public auth:UsersService,) { }

  ngOnInit(): void {
    this.getClients();
    
  }
  getClients(){
    this.auth.getuser().subscribe((res:any[]) => {
      console.log(res);
      this.Clients = res
      this.clone = res
    })
  }
  getClientsByid(id:number){
    this.auth.getuserByid(id).subscribe((res:any) => {
      
      console.log(res);
      this.Id = id
      if(!this.form.get('isAllowed')?.value){
        this.form = new FormGroup(
          { 
            name:new FormControl(res.name),
            userName:new FormControl(res.userName),
            lastName:new FormControl(res.lastName),
            email: new FormControl(res.email),
            password: new FormControl(res.password),
            
          })
      }else{
        this.form = new FormGroup(
          { 
            name:new FormControl(res.name),
            userName:new FormControl(res.userName),
            lastName:new FormControl(res.lastName),
            email: new FormControl(res.email),
            password: new FormControl(res.password),
           
          })
      }
    })
    
  }
  edit(id:number,form:any){  
    this.auth.edituser(id,form).subscribe((res:any) => {
      this.getClients();
      this.success = true
    
    })
  }
  deleteSuccess:boolean = false
  delete(id:number){
    this.auth.deleteuser(id).subscribe((res:any) => {console.log(res);
      this.getClients();
      this.deleteSuccess = true;
      setTimeout(() => {this.deleteSuccess = false;},2000)
    });
  }
  sortList(column:string){
    console.log('sort');
    if(this.sortField == column && this.sortOrder !=0){
      this.sortOrder = this.sortOrder * (-1);
    }else{
      this.sortOrder = 1;
    }
    this.sortField = column
    this.Clients.sort((a,b) => 
      this.sortOrder * ((<any>a)[this.sortField] > (<any>b)[this.sortField] ?
      1: (<any>a)[this.sortField] < (<any>b)[this.sortField]?-1:0)
    )
  }

}
