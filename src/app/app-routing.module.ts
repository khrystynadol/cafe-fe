import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin/admin.component';
// import {AppComponent} from "./app.component";
import {ClientProfileComponent} from "./client/client-profile/client-profile.component";
import {MenuComponent} from "./menu/menu.component";
import {CustomListComponent} from "./custom-list/custom-list.component";
import {ProductComponent} from "./admin/product/product.component";
import {AdminUsersComponent} from "./admin/admin-users/admin-users.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AdminMenuItemComponent} from "./admin/admin-menu-item/admin-menu-item.component";

const routes: Routes = [
  { path: '', redirectTo: 'client', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'client', component: ClientComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'profile', component: ClientProfileComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'custom', component: CustomListComponent },
  { path: 'product', component: ProductComponent },
  { path: 'users', component: AdminUsersComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'item', component: AdminMenuItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
