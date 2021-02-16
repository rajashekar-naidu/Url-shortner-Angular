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


// *******************************************************************************
// Routes

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  //{path:'home', component:HomeComponent},
  {path:'confirm-page', component:ConfirmPageComponent},
  //{path:'urls', component:UrlListComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  

  { path: 'shorturl', component: Layout2Component, children: [
    { path: '', component: HomeComponent },
  ]},

  { path: 'url-list', component: Layout2Component, children: [
    { path: '', component: UrlListComponent },
  ]},

  { path: 'user-accounts', component: Layout2Component, children: [
    { path: '', component: UserAccountsComponent },
  ]},

  { path: 'url-access-list', component: LayoutWithoutSidenavComponent, children: [
    { path: '', component: UrlAccessListComponent },
  ]},

  { path: 'profile', component: LayoutWithoutSidenavComponent, children: [
    { path: '', component: ProfileComponent },
  ]},

  { path: 'user-activity', component: Layout2Component, children: [
    { path: '', component: UserActivityComponent },
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
