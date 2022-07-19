import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Invoice, InvoiceService } from 'src/app/services/invoices.services';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
    styles: [`
        :host ::ng-deep .p-dialog .Invoice-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
    styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent { 
    
    @ViewChild('dt') dt: Table | undefined;
    
    invoiceDialog!: boolean;

    invoices!: Invoice[];

    invoice!: Invoice;

    selectedInvoices!: Invoice[];

    submitted!: boolean;

    Delete!:string;
    constructor(private invoiceService: InvoiceService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
    applyFilterGlobal($event: any, stringVal: any) {
        this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
      }

    ngOnInit() {
        this.Delete="حذف";
        this.invoiceService.getInvoices().subscribe(
          (res: any)=> {
            this.invoices=res
          },
          (error)=> console.log(error));
      }
  
      openNew() {
         
          this.invoice={};
          this.submitted = false;
          this.invoiceDialog = true;
      }
  
      deleteSelectedInvoices() {
          this.confirmationService.confirm({
              message: 'هل انت متأكد من أنك تريد حذف كل الفواتير الذي تم تحديدها؟',
              header: 'تأكيد ',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                  this.invoices = this.invoices.filter(val => !this.selectedInvoices.includes(val));
                  // this.selectedinvoices = null;
                  this.messageService.add({severity:'نجاح', summary: 'تم بنجاح', detail: 'تم حذف الفواتير بنجاح', life: 3000});
              }
          });
      }
  
      editInvoice(invoice: Invoice) {
          this.invoice = {...invoice};
          this.invoiceDialog = true;
      }
  
      deleteInvoice(invoice: Invoice) {
          this.confirmationService.confirm({
              message: ' هل انت متأكد من أنك تريد حذف الفاتورة باسم ' + invoice.cusname + '؟',
              header: 'تأكيد  ',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                  this.invoices = this.invoices.filter(val => val.id !== invoice.id);
                  this.invoiceService.deleteInvoice(invoice.id);
                  this.invoice = {};
                  this.messageService.add({severity:'نجاح', summary: 'تم بنجاح', detail: 'تم حذف الفاتورة', life: 3000});
              }
          });
      }
  
      hideDialog() {
          this.invoiceDialog = false;
          this.submitted = false;
      }
      
      saveInvoice(invoice:Invoice) {
          if(this.invoice.cusname!=invoice.cusname || this.invoice.total!=invoice.total)
          {
          this.invoiceService.editInvoice(invoice);
          this.messageService.add({severity:'نجاح', summary: 'تم بنجاح', detail: 'تمت تعديل الفاتورة بنجاح', life: 3000});
          this.invoices = [...this.invoices];
          this.invoiceDialog = false;
          this.invoice = {};
          }
          else
          {
          this.submitted = true;
          this.invoiceService.addInvoice(invoice);
              this.messageService.add({severity:'نجاح', summary: 'تم بنجاح', detail: 'تمت اضافة الفاتورة بنجاح', life: 3000});
              this.invoices = [...this.invoices];
              this.invoiceDialog = false;
              this.invoice = {};
              this.invoiceService.getInvoices().subscribe(
                  (res: any)=> {
                    this.invoices=res
                  },
                  (error)=> console.log(error));
          }
      }
      
      printInvoice(invoice:Invoice)
      {
        window.print();
      }
  
          findIndexById(id: string): number {
          let index = -1;
          for (let i = 0; i < this.invoices.length; i++) {
              if (this.invoices[i].invoiceId === id) {
                  index = i;
                  break;
              }
          }
  
          return index;
      }
  
      createId(): string {
          let id = '';
          var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          for ( var i = 0; i < 5; i++ ) {
              id += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          return id;
      }
  }
  