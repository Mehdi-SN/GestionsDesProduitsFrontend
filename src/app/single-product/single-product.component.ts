import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product-server.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../models/product.models";

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  product = new Product();

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.editProduct();
  }

  editProduct(){
    const id = this.route.snapshot.params['id'];
    this.productService.getProductById(id).then(
      (product) => {
        this.product = <Product> product;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onReturnBack() {
    this.router.navigate(['/products']);
  }

}
