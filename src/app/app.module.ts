import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import {ProductService} from "./services/product-server.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { SingleProductComponent } from './single-product/single-product.component';
import { NavComponent } from './nav/nav.component';
import { CreateProductComponent } from './create-product/create-product.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {AuthInterceptor} from "./interceptors/auth-interceptor";



@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    SingleProductComponent,
    NavComponent,
    CreateProductComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService,
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
