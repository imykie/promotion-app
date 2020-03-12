import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from './material.module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './auth.service';
import { NavBarComponent } from './navbar.component';
import { LoginComponent } from './login/login.component';
import { AddCandidateComponent } from './candidate/add-candidate.component';
import { CandidateListComponent } from './candidate/candidate-list.component';
import { EditComponent } from './candidate/edit-candidate.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { VerifyInviteComponent } from './verify-invite/verify-invite.component';
import { VerifyPapersComponent } from './verify-papers/verify-papers.component';
import { DepartmentsComponent } from './departments/departments.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './auth.guard';
import { Firstletter } from './firstletter.pipe';
import { SortingPipe } from './pipes/sorting.pipe';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavBarComponent,
    LoginComponent,
    AddCandidateComponent, 
    CandidateListComponent,
    EditComponent,
    NotificationsComponent,
    VerifyInviteComponent,
    VerifyPapersComponent,
    DepartmentsComponent,
    Firstletter,
    SortingPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
    
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    AuthService,
    AuthGuard,
    Firstletter
    
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
