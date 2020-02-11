import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PortalService } from '../portal.service';

@Component({
  selector: 'app-verify-papers',
  templateUrl: './verify-papers.component.html',
  styleUrls: ['./verify-papers.component.css']
})
export class VerifyPapersComponent implements OnInit {
  public message: String;

  constructor(private portalService: PortalService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    let id = this.route.snapshot.params['id'];
    let accessorId = this.route.snapshot.queryParams['accessorId'];
    // let info = {};
    console.log(id, accessorId);

    this.portalService.verifyPapers(id, accessorId).subscribe(data => {
      if(data){
        console.log(data);
        this.message = data.message;
        // if(!data.status){
        //   setTimeout(() => {this.router.navigate(['candidate-list'])} , 3500);  
        // }
      }else{
        this.message = "Something went wrong with paper verification";
      }
    });

    this.portalService.channel.bind('invitation', data => {
      if(data){
        this.message = data.message;
        console.log(data.message, data.date);
        setTimeout(() => {this.router.navigate(['candidate-list'])} , 3500);
      }else{
        this.message = "Something went wrong paper verification"
      }
    });


  }

}
