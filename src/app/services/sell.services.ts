export interface InvoiceProducts {
    id?:any;
    invoiceid?:any;
    productname?:any;
    description?:any;
    type?:any;
    price?:any;
    quantity?:any;
}

import { CommonService } from "../services/common.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Observable } from "rxjs";
 
    @Injectable({
        providedIn: "root"
      })
          
export class SellService {
        data: any;
        constructor(
          private http: HttpClient,
          private common: CommonService,
          private msg: MessageService,
        ) { }

        getSells(type: any = null): Observable<any[]> {
            return this.http.get<InvoiceProducts[]>(this.common.SellUrl);
        }
        addSell(Sell: any): Promise<any> {
            return this.http.post<any>(this.common.SellUrl,Sell).toPromise();
          }
          deleteSell(id: any): Promise<any> {
            return this.http.delete<any>(this.common.SellUrl+"/"+id).toPromise();
          }
       
        deleteSells(type: any = null): Observable<InvoiceProducts[]> {
            return this.http.get<InvoiceProducts[]>(this.common.SellUrl);
        }
        editSell(Sell: any): Promise<any> {
            return this.http.put<any>(this.common.SellUrl+"/"+Sell.id,Sell).toPromise();
          }

}
