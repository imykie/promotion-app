import { Component, OnInit } from '@angular/core';
import { PortalService } from '../portal.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedCandidate: any[] = [];
  showCanidate: any[] = []

  constructor(private portalService : PortalService) {

  }

  ngOnInit() {
    this.portalService.getCandidates().subscribe((data)=> {
      this.selectedCandidate = data;
      this.showCanidate = data.slice(Math.max(data.length - 9, 0))
      console.log(this.selectedCandidate)
      console.log(this.showCanidate);
    })
  }
}
