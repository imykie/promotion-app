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





const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'addCandidate', component: AddCandidateComponent},
  {path: 'candidate-list', component: CandidateListComponent},
  {path: 'edit-candidate/:id', component: EditComponent},
  {path: 'notifications', component: NotificationsComponent},
  {path: 'verify-invite/:id', component: VerifyInviteComponent},
  {path: 'verify-papers/:id', component: VerifyPapersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
