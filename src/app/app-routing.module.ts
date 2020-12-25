import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from "./product/product.component";
import {SingleProductComponent} from "./single-product/single-product.component";
import {CreateProductComponent} from "./create-product/create-product.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {AuthGuardService} from "./services/auth-guard.service";

const routes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'products', canActivate:[AuthGuardService], component: ProductComponent},
  {path: 'products/:id', canActivate:[AuthGuardService], component: SingleProductComponent},
  {path: 'create-product', canActivate:[AuthGuardService], component: CreateProductComponent},
  {path: '', pathMatch: 'full', redirectTo: 'products'},
  {path: '**', redirectTo: 'products'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
