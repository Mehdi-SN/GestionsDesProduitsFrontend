import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product-server.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Product} from "../models/product.models";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product: Product =  new Product();
  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
  this.product.name = form.value['name'];
  this.product.description = form.value['description'];
  this.product.price = form.value['price'];
  this.product.inStock = true;
  this.productService.createProduct(this.product).then(
    () => {
        console.log(this.product)
        this.router.navigate(['/products']);
        this.productService.getAllProducts();

    },(error) => {
        console.log(error);
    }
  )



  }

}
