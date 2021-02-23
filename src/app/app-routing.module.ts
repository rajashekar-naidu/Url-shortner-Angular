import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

// *******************************************************************************
// Layouts

import { Layout2Component } from './layout/layout-2/layout-2.component';
import { LayoutWithoutSidenavComponent } from './layout/layout-without-sidenav/layout-without-sidenav.component';

// *******************************************************************************
// Pages

import { HomeComponent } from './home/home.component';
import { UrlListComponent } from './url-list/url-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ConfirmPageComponent } from './confirm-page/confirm-page.component';
import { UserAccountsComponent } from './user-accounts/user-accounts.component';
import { UrlAccessListComponent } from './url-access-list/url-access-list.component';
import { ProfileComponent } from './profile/profile.component';
import { UserActivityComponent } from './user-activity/user-activity.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from './_helpers/auth-guard.service';
import { TokenExpiredComponent } from './token-expired/token-expired.component';



// *******************************************************************************
// Routes

const routes: Routes = [
  {path:'login', canActivate:[AuthGuard], component:LoginComponent},
  {path:'confirm-page', component:ConfirmPageComponent},
  {path:'token-expired-page', component:TokenExpiredComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path: 'dashboard', component: Layout2Component, children: [
    { path: '', component: DashboardComponent },
  ]},

  { path: 'shorturl', component: Layout2Component, children: [
    { path: '', component: HomeComponent },
  ]},

  { path: 'shorturl/short-url-list', component: Layout2Component, children: [
    { path: '', component: UrlListComponent },
  ]},

  { path: 'user-accounts', component: Layout2Component, children: [
    { path: '', component: UserAccountsComponent },
  ]},
  { path: 'user-accounts/add-user', component: Layout2Component, children: [
    { path: '', component: SignupComponent },
  ]},

  { path: 'shorturl/short-url-list/url-access-list/:urlId', component: Layout2Component, children: [
    { path: '', component: UrlAccessListComponent },
  ]},

  { path: 'user-accounts/edit-profile/:id', component: Layout2Component, children: [
    { path: '', component: ProfileComponent },
  ]},

  { path: 'user-accounts/user-activity/:id', component: Layout2Component, children: [
    { path: '', component: UserActivityComponent },
  ]},

  { path: 'user-accounts/edit-profile/change-password/:id', component: Layout2Component, children: [
    { path: '', component: ChangePasswordComponent },
  ]},


  // 404 Not Found page
  { path: '**', component: NotFoundComponent }

];

// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
