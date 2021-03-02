import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* Angular Material */
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// *******************************************************************************
// NgBootstrap

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

  /* Angular Flex Layout */
  import { FlexLayoutModule } from '@angular/flex-layout';

// *******************************************************************************
// App

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppService } from './app.service';
import { LayoutModule } from './layout/layout.module';
import { ClipboardModule } from 'ngx-clipboard'; 


// *******************************************************************************
// Pages

import { HomeComponent } from './home/home.component';
import { UrlListComponent } from './url-list/url-list.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './_services/auth.service';
import { SignupComponent } from './signup/signup.component';
import { ConfirmPageComponent } from './confirm-page/confirm-page.component';
import { UserAccountsComponent } from './user-accounts/user-accounts.component';
import { UrlAccessListComponent } from './url-access-list/url-access-list.component';
import { ProfileComponent } from './profile/profile.component';
import { UserActivityComponent } from './user-activity/user-activity.component';
import { AuthInterceptorService } from './_helpers/auth-interceptor.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from './_helpers/auth-guard.service';
import { TokenExpiredComponent } from './token-expired/token-expired.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

// *******************************************************************************
//

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,

    // Pages
    HomeComponent,
    UrlListComponent,
    LoginComponent,
    SignupComponent,
    ConfirmPageComponent,
    UserAccountsComponent,
    UrlAccessListComponent,
    ProfileComponent,
    UserActivityComponent,
    DashboardComponent,
    ChangePasswordComponent,
    TokenExpiredComponent,
    UserProfileComponent,
    
  ],

  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ClipboardModule,
    

    // App
    AppRoutingModule,
    LayoutModule
  ],

  providers: [Title,AppService,AuthService, AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
