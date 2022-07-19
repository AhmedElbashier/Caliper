import { CommonService } from "../services/common.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Observable } from "rxjs";
 
export interface Product {
    id?:any;
    productname?:any;
    description?:any;
    type?:any;
    price?:any;
    quantity?:any;
}
    @Injectable({
        providedIn: "root"
      })
          
export class ProductService {
        data: any;
        constructor(
          private http: HttpClient,
          private common: CommonService,
          private msg: MessageService,
        ) { }

        getProducts(type: any = null): Observable<any[]> {
            return this.http.get<Product[]>(this.common.ProductUrl);
        }
        getAllProducts(): Promise<any> {
          return this.http.get<any>(this.common.ProductUrl).toPromise();
        }
        addProduct(Product: any): Promise<any> {
            return this.http.post<any>(this.common.ProductUrl,Product).toPromise();
          }
          deleteProduct(id: any): Promise<any> {
            return this.http.delete<any>(this.common.ProductUrl+"/"+id).toPromise();
          }
       
        deleteProducts(type: any = null): Observable<Product[]> {
            return this.http.get<Product[]>(this.common.ProductUrl);
        }
        editProduct(Product: any): Promise<any> {
            return this.http.put<any>(this.common.ProductUrl+"/"+Product.id,Product).toPromise();
          }
       
}
