import { CommonService } from "../services/common.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Observable } from "rxjs";
 
export interface Invoice {
    id?:any;
    invoiceId?:any;
    cusname?:any;
    discount?:any;
    total?:any;
}
    @Injectable({
        providedIn: "root"
      })
          
export class InvoiceService {
        data: any;
        constructor(
          private http: HttpClient,
          private common: CommonService,
          private msg: MessageService,
        ) { }

        getInvoices(type: any = null): Observable<any[]> {
            return this.http.get<Invoice[]>(this.common.InvoiceUrl);
        }
        addInvoice(Invoice: any): Promise<any> {
            return this.http.post<any>(this.common.InvoiceUrl,Invoice).toPromise();
          }
          deleteInvoice(id: any): Promise<any> {
            return this.http.delete<any>(this.common.InvoiceUrl+"/"+id).toPromise();
          }
       
        deleteInvoices(type: any = null): Observable<Invoice[]> {
            return this.http.get<Invoice[]>(this.common.InvoiceUrl);
        }
        editInvoice(Invoice: any): Promise<any> {
            return this.http.put<any>(this.common.InvoiceUrl+"/"+Invoice.id,Invoice).toPromise();
          }

}
