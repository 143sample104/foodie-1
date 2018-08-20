import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { AppComponent } from './app.component';
import { IndexpageComponent } from './indexpage/indexpage.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { FilterPipe }from './filter.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { MapPipe } from './map.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { AuthGuard } from './auth.guard';
import { AdminProductComponent } from './admin-product/admin-product.component';


const appRoutes: Routes=[
  {
    path: '',
    component: IndexpageComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
 
  {
    path: 'userdashboard',
    component: UserdashboardComponent
  },
  {
    path:'cartpage',
    component: CartpageComponent
  },
  {
    path:'checkout',
    component: CheckoutComponent
  },
  {
    path:'forgotpassword',
    component: ForgotpasswordComponent
  },
  {
    path:'updatepassword',
    component: UpdatepasswordComponent
  }
  ,
  {
    path:'nav',
    component: NavbarComponent
  }
  ,
  {
    path:'adminpage',
    component: AdminProductComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    MapPipe,
    IndexpageComponent,
    MapComponent,
    LoginComponent,
    SignupComponent,
    UserdashboardComponent,
    CartpageComponent,
    NavbarComponent,
    CheckoutComponent,
    ForgotpasswordComponent,
    UpdatepasswordComponent,
    AdminProductComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    StorageServiceModule,
    BrowserModule,FormsModule,HttpClientModule,AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDvjfpnQ2uJ7Wsfrdy8TAXz_uFO6q9In_A'
    })
    
  ],
  providers: [ApiService,AuthGuard,NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
