import { Component, OnInit } from '@angular/core';
import { PortalService } from '../portal.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 

  constructor(private portalService : PortalService) {

  }

  ngOnInit() {
    
  }
}
