import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FooterComponent } from './footer/footer.component';
import { ClientComponent } from './client/client.component';
import { ClientNavigationComponent } from './client/client-navigation/client-navigation.component';
import { AdminComponent } from './admin/admin.component';
import { AdminItemsListComponent } from './admin/admin-items-list/admin-items-list.component';
import { AdminItemsIngredientsListComponent } from './admin/admin-items-ingredients-list/admin-items-ingredients-list.component';
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import { ClientAboutComponent } from './client/client-about/client-about.component';
import { ClientContactComponent } from './client/client-contact/client-contact.component';
import { ClientProfileComponent } from './client/client-profile/client-profile.component';
import { MenuComponent } from './menu/menu.component';
import { CustomListComponent } from './custom-list/custom-list.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { ProductComponent } from './admin/product/product.component';
import { NavigationComponent } from './admin/navigation/navigation.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { ChunkPipe } from "./menu/chunk.pipe";

const config: SocketIoConfig = { url: 'http://localhost:5000' };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    FooterComponent,
    ClientComponent,
    ClientNavigationComponent,
    AdminComponent,
    AdminItemsListComponent,
    AdminItemsIngredientsListComponent,
    ClientAboutComponent,
    ClientContactComponent,
    ClientProfileComponent,
    MenuComponent,
    CustomListComponent,
    SidebarComponent,
    ProductComponent,
    NavigationComponent,
    AdminUsersComponent,
    ChunkPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
