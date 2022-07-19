import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { Table } from 'primeng/table';
import { User, UserService } from 'src/app/services/users.services';
import { FileSaverOptions } from 'file-saver';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [`
        :host ::ng-deep .p-dialog .user-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
    styleUrls: ['./users.component.scss']
})
export class UsersComponent { 

    // dt: any;
    @ViewChild('dt') dt: Table | undefined;

    userDialog!: boolean;

    users!: User[];

    user!: User;

    selectedUsers!: User[];

    submitted!: boolean;

    Delete!:string;
    constructor(private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
    applyFilterGlobal($event: any, stringVal: any) {
        this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
      }
    
            
    ngOnInit() {
      this.Delete="حذف";
      this.userService.getUsers().subscribe(
        (res: any)=> {
          this.users=res
        },
        (error)=> console.log(error));
    }

    openNew() {
       
        this.user={};
        this.submitted = false;
        this.userDialog = true;
    }

    deleteSelectedUsers() {
        this.confirmationService.confirm({
            message: 'هل انت متأكد من أنك تريد حذف كل المستخدمين الذي تم تحديدهم؟',
            header: 'تأكيد ',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.users = this.users.filter(val => !this.selectedUsers.includes(val));
                // this.selectedUsers = null;
                this.messageService.add({severity:'نجاح', summary: 'تم بنجاح', detail: 'تم حذف المستخدمين بنجاح', life: 3000});
            }
        });
    }

    editUser(user: User) {
        this.user = {...user};
        this.userDialog = true;
    }

    deleteUser(user: User) {
        this.confirmationService.confirm({
            message: 'هل انت متأكد من أنك تريد حذف المتسخدم  ' + user.name + '؟',
            header: 'تأكيد  ',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.users = this.users.filter(val => val.id !== user.id);
                this.userService.deleteUser(user.id);
                this.user = {};
                this.messageService.add({severity:'نجاح', summary: 'تم بنجاح', detail: 'تم حذف المستخدم', life: 3000});
            }
        });
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }
    
    saveUser(user:User) {
        if(this.users.length==0)
        {
            this.submitted = true;
            this.userService.addUser(user);
                this.messageService.add({severity:'نجاح', summary: 'تم بنجاح', detail: 'تمت اضافة المستخدم بنجاح', life: 3000});
                this.users = [...this.users];
                this.userDialog = false;
                this.user = {};
                this.userService.getUsers().subscribe(
                    (res: any)=> {
                      this.users=res
                    },
                    (error)=> console.log(error));
        }
        else if(this.user.username!=user.name||this.user.password!=user.password||this.user.username!= user.username || this.user.role!=user.role)
        {
        this.userService.editUser(user);
        this.messageService.add({severity:'نجاح', summary: 'تم بنجاح', detail: 'تمت تعديل المستخدم بنجاح', life: 3000});
        this.users = [...this.users];
        this.userDialog = false;
        this.user = {};
        }
        else
        {
        this.submitted = true;
        this.userService.addUser(user);
            this.messageService.add({severity:'نجاح', summary: 'تم بنجاح', detail: 'تمت اضافة المستخدم بنجاح', life: 3000});
            this.users = [...this.users];
            this.userDialog = false;
            this.user = {};
            this.userService.getUsers().subscribe(
                (res: any)=> {
                  this.users=res
                },
                (error)=> console.log(error));
        }
    }


        findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === id) {
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
