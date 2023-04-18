import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  user:any
  constructor(private route:ActivatedRoute,public auth:UsersService) { }
  id:any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(c => {
      this.id = +c.get('id')!;  
      
    })
    this.getUser(this.id);
    
  }
  getUser(id:number){
    this.auth.getuserByid(id).subscribe( (res:any) => {
      this.user = res 
      console.log(this.user);
    })
    
  }

}
