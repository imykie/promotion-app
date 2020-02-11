import { Component, OnInit } from '@angular/core';
import { PortalService } from '../portal.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-verify-invite',
  templateUrl: './verify-invite.component.html',
  styleUrls: ['./verify-invite.component.css']
})
export class VerifyInviteComponent implements OnInit {
  public message: String;
  public isLoading: Boolean = true;

  constructor(private portalService: PortalService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    let accessorId = this.route.snapshot.queryParams['accessorId'];
    // let info = {};
    console.log(id, accessorId);

    this.portalService.verifyInvite(id, accessorId).subscribe(data => {
      if(data){
        console.log(data);
        this.isLoading = false;
        this.message = data.message;
        // if(!data.status){
        //   setTimeout(() => {this.router.navigate(['candidate-list'])} , 3500);  
        // }
      }else{
        this.message = "Something went wrong";
      }
    });

    this.portalService.channel.bind('invitation', data => {
      if(data){
        this.message = data.message;
        console.log(data.message, data.date);
        setTimeout(() => {this.router.navigate(['candidate-list'])} , 10000);
      }else{
        this.message = "Something went wrong"
      }
    });
  }

}
