import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { Table } from 'primeng/table';
import { Product, ProductService } from 'src/app/services/products.services';
import jsPDF from 'jspdf';
import ShortUniqueId from 'short-unique-id';
import { Invoice, InvoiceService } from 'src/app/services/invoices.services';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { empty } from 'rxjs';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
})
export class SellComponent implements OnInit {
  productDialog!: boolean;
  nameDialog!: boolean;
  @ViewChild('dt') dt: Table | undefined;
  @ViewChild('pdfTable') pdfTable: ElementRef | undefined;

  products!: Product[];

  product!: Product;
  GENERATOR!: boolean;
  selectedProducts!: Product[];
  invoice!: any;
  submitted!: boolean;
  customer!: string;
  Delete!: string;
  quan!: number;
  discount!: number;
  comission!: number;
  total!: number;
  value!: any;
  subTotal!: number;
  i!: 0;
  constructor(
    private productService: ProductService,
    private invoiceService:InvoiceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  ngOnInit() {
    this.GENERATOR = false;
    this.Delete = 'متابعه';
    this.productService.getProducts().subscribe(
      (res: any) => {
        this.products = res;
      },
      (error) => console.log(error)
    );
  }

  openNew() {
    this.product = {};
    this.nameDialog = true;
    // this.productDialog = true;
  }
  customerName(customer: string) {
    this.customer = customer;
    this.nameDialog = false;
    this.productDialog = true;
    this.submitted = false;
  }
  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'هل انت متأكد من أنك تريد اختيار هذة المنتجات؟',
      header: 'تأكيد ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.openNew();
      },
    });
  }
  hideDialog() {
    this.productDialog = false;
    this.nameDialog = false;
    this.submitted = false;
  }
  hideDialog2() {
    this.nameDialog = false;
    this.productDialog = false;
    this.submitted = false;
  }
  createInvoice(selectedProducts: Product[], quan: any) {
    // console.log(selectedProducts,this.customer);
    this.subTotal = 0;
    for (this.i = 0; this.i < selectedProducts.length; this.i++) {
      this.subTotal =
        this.subTotal +
        selectedProducts[this.i].price * selectedProducts[this.i].quantity;
    }
    this.total = this.subTotal;
    this.GENERATOR = true;
  }
  Discount(discount: any) {
    this.discount = discount;
    var dis = this.subTotal - (this.subTotal * discount) / 100;
    this.total = dis;
  }
  saveInvoice(customer: any) {
    for(this.i=0;this.i<this.selectedProducts.length;this.i++)
    {
      this.selectedProducts[this.i].id= empty;
    }
    const uid = new ShortUniqueId({ length: 10 });
    this.invoice={
      cusname:customer,
      discount:this.discount,
      total:this.total,
      invoiceId:uid(),
      products:this.selectedProducts
    };
    this.invoiceService.addInvoice(this.invoice);
    console.log(this.invoice);
    this.productDialog=false;
    this.nameDialog=false;
    this.GENERATOR=false;

  }
}
