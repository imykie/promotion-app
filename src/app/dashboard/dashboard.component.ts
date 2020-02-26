import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortable, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PortalService } from '../portal.service';


export interface Candidates {
  _id: String,
  surname: String,
  other: String,
  email: String,
  fac: String
  dep: String,
  lev: String,
  date: Date,
  accessor: []  
}

export default interface Notifications{
  ownerId:String,
  message: String, 
  read: Boolean,
  date: Date
}

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  public candidates: any = [];
  public notifications: any = [];
  public isLoading: Boolean = true;
  public notifyLoading: Boolean = true;
  displayedColumns: string[] = ['no', 'name', 'email', 'date', 'faculty', 'department','update','delete'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  public dataSource = new MatTableDataSource<Candidates>();

  @ViewChild(MatTableDataSource, {static: true}) table: MatTableDataSource<Candidates>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router, private portalService : PortalService, private cdr: ChangeDetectorRef){
  }
  
  ngOnInit(){
      
      this.portalService.channel.bind('deleted', data => {
          console.log(data.message, data.date)
      })
    
      this.portalService.notificationsDash().subscribe(data => {
        console.log(data);
        this.notifyLoading = false;
        this.notifications = data as Notifications[];
      });

      this.portalService.dashCandidates().subscribe((data)=> {
        this.candidates = data;
        this.isLoading = false;
        this.dataSource.data = data as Candidates[];
        console.log(this.candidates);
        return data
    });

      // this.dataSource.sort = this.sort;

      // const sortState: Sort = {active: 'date', direction: 'desc'};
      // this.sort.active = sortState.active;
      // this.sort.direction = sortState.direction;
      // this.sort.sortChange.emit(sortState);

  }

  
ngAfterViewInit() {

}

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

  public deleteCandidate = (element, i: number) => {
      // this.confirmationService.confirm
      if(window.confirm(`Are you sure you want to delete this Candidate? \n ${element.surname} ${element.other}`)){
          this.portalService.deleteCandidate(element._id).subscribe((data) => {

              this.candidates.splice(i, 1);      
              // this.dataSource.data.splice(i, 1);
              // console.log({data: "new data"},this.dataSource.data.splice(i, 1))
              this.dataSource._updateChangeSubscription();
              this.dataSource = new MatTableDataSource<Candidates>(this.candidates);
          })
      } 
  }
}
