import { Component, OnInit } from '@angular/core';
import {Product} from "../models/product.models";
import {ProductService} from "../services/product-server.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {



  products: Product[]= [];

  constructor(private productService: ProductService,
              private router:Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
      }
    );
  }

  public deleteProduct(id: string) {
    this.productService.deleteProduct(id).then((response) => {
        console.log(response);
        this.getProducts();
      })
      .catch(error => console.log(error));

  }

  public viewProduct(id: String) {
    this.router.navigate(['products/' +id]);
  }

}
