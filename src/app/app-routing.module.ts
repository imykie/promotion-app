import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AddCandidateComponent } from './candidate/add-candidate.component';
import { CandidateListComponent } from './candidate/candidate-list.component';
import { EditComponent } from './candidate/edit-candidate.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { VerifyInviteComponent }from './verify-invite/verify-invite.component';
import { VerifyPapersComponent }from './verify-papers/verify-papers.component';
import { AuthGuard } from './auth.guard';





const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent,canActivate : [AuthGuard] },
  {path: 'addCandidate', component: AddCandidateComponent, canActivate : [AuthGuard]},
  {path: 'candidate-list', component: CandidateListComponent, canActivate : [AuthGuard]},
  {path: 'edit-candidate/:id', component: EditComponent, canActivate : [AuthGuard]},
  {path: 'notifications', component: NotificationsComponent, canActivate : [AuthGuard]},
  {path: 'verify-invite/:id', component: VerifyInviteComponent, canActivate : [AuthGuard]},
  {path: 'verify-papers/:id', component: VerifyPapersComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
