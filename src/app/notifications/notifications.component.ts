import { Component, OnInit, ViewChild } from '@angular/core';
import { PortalService } from '../portal.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

export default interface Notifications{
  ownerId:String,
  message: String, 
  read: Boolean,
  date: Date
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
public notifications: Notifications[];
displayedColumns: string[] = ['position', 'message', 'date'];
  dataSource = new MatTableDataSource<Notifications>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private portalService: PortalService) { }

  ngOnInit() {
    this.portalService.notifications().subscribe(data => {
      console.log(data);
      this.notifications = data as Notifications[];
      this.dataSource.data = data as Notifications[];
    });
    this.dataSource.paginator = this.paginator;

  }
  ngAfterViewInit(){
    this.sort.sort(<MatSortable>{
            id: 'date',
            start: 'desc'
          }
      );

      this.dataSource.sort = this.sort;
  }
}
