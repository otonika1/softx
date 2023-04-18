import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AuthComponent } from './auth/auth.component';
import { DetailsComponent } from './users/details/details.component';

const routes: Routes = [
  {path: '',pathMatch: 'full',redirectTo: 'auth'},
  {path:'users',component:UsersComponent},
  {path:'auth',component:AuthComponent},
  {path:'users/details', component:DetailsComponent},
  {path:'users/details/:id', component:DetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
