import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product.models"
import {Observable} from "rxjs";

const baseUrl= "http://localhost:3000/api"

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private httpClient: HttpClient) {
    console.log("Product service has been initiated!")
  }


  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${baseUrl}/products`);
  }

  deleteProduct(id: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(`${baseUrl}/products/` +id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      )
    });
  }

  createProduct(product: Product) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(`${baseUrl}/products`, product).subscribe(
        (response) => {
            resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getProductById(id : string) {
    return new Promise((resolve, reject) => {
      this.httpClient.get<Product>(`${baseUrl}/products/` +id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      )

    });
  }


}
