
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginPageComponent } from './login-page/login-page.component';
import { AdminLayoutComponent } from './shared/compoentnts/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatepostsPageComponent } from './createposts-page/createposts-page.component';
import { EditpostPageComponent } from './editpost-page/editpost-page.component';
import { AuthService } from './shared/services/auth.service';
import { SharedModule } from '../shared/shared.module';
import { SearchPipe } from './shared/search.pipe';
import { AlertComponent } from './shared/compoentnts/alert/alert.component';
import { AlertService } from './shared/services/alert.service';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardPageComponent,
    CreatepostsPageComponent,
    EditpostPageComponent,
    LoginPageComponent,
    SearchPipe,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          { path: 'dashboard', component: DashboardPageComponent },
          { path: 'createpost', component: CreatepostsPageComponent },
          { path: 'post/:id/edit', component: EditpostPageComponent },
        ],
      },
    ])],
  exports: [RouterModule],
  providers: [AuthService, AlertService],
})

export class AdminModule {}
