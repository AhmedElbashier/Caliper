import { Component, OnInit,ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product, ProductService } from 'src/app/services/products.services';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent { 
    productDialog!: boolean;

    @ViewChild('dt') dt: Table | undefined;
    
    products!: Product[];

    product!: Product;

    selectedProducts!: Product[];

    submitted!: boolean;

    Delete!:string;
    constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    applyFilterGlobal($event: any, stringVal: any) {
        this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
      }

    ngOnInit() {
        this.Delete="حذف";
        this.productService.getProducts().subscribe(
          (res: any)=> {
            this.products=res
          },
          (error)=> console.log(error));
      }
  
    openNew() {
         
          this.product={};
          this.submitted = false;
          this.productDialog = true;
      }
  
    deleteSelectedProducts() {
          this.confirmationService.confirm({
                message: 'هل انت متأكد من أنك تريد حذف كل المنتجات التي تم تحديدها؟',
              header: 'تأكيد ',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                  this.products = this.products.filter(val => !this.selectedProducts.includes(val));
                  // this.selectedproducts = null;
                  this.messageService.add({severity:'نجاح', summary: 'تم بنجاح', detail: 'تم حذف المنتجات بنجاح', life: 3000});
              }
          });
      }
  
    editProduct(product: Product) {
          this.product = {...product};
          this.productDialog = true;
      }
  
    deleteProduct(product: Product) {
          this.confirmationService.confirm({
              message: ' هل انت متأكد من أنك تريد حذف الفاتورة باسم ' + product.productname + '؟',
              header: 'تأكيد  ',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                  this.products = this.products.filter(val => val.id !== product.id);
                  this.productService.deleteProduct(product.id);
                  this.product = {};
                  this.messageService.add({severity:'نجاح', summary: 'تم بنجاح', detail: 'تم حذف المنتج', life: 3000});
              }
          });
      }
  
    hideDialog()
    {
          this.productDialog = false;
          this.submitted = false;
    }
      
    saveProduct(product:Product) {
          if(this.product.productname!=product.productname||this.product.description!= product.description || this.product.type!=product.type||this.product.price!=product.price||this.product.quantity!=product.quantity)
          {
          this.productService.editProduct(product);
          this.messageService.add({severity:'نجاح', summary: 'تم بنجاح', detail: 'تمت تعديل المنتج بنجاح', life: 3000});
          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
          }
          else
          {
          this.submitted = true;
          this.productService.addProduct(product);
              this.messageService.add({severity:'نجاح', summary: 'تم بنجاح', detail: 'تمت اضافة المنتج بنجاح', life: 3000});
              this.products = [...this.products];
              this.productDialog = false;
              this.product = {};
              this.productService.getProducts().subscribe(
                  (res: any)=> {
                    this.products=res
                  },
                  (error)=> console.log(error));
          }
      }
      
    printproduct(product:Product)
      {
        window.print();
      }
    findIndexById(id: string): number {
          let index = -1;
          for (let i = 0; i < this.products.length; i++) {
              if (this.products[i].id === id) {
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
  