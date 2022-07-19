import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  APIUrl = "http://127.0.0.1:5001/api/v1";
  UserUrl = this.APIUrl + "/User";
  InvoiceUrl = this.APIUrl + "/Invoice";
  ProductUrl = this.APIUrl + "/Product";
  SellUrl = this.APIUrl + "/Sell";
}