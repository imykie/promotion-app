import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortable, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PortalService } from '../portal.service';
// import { ConfirmationDialogService } from ; 


export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
    {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
    {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
    {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
    {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
    {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
    {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
    {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
    {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
    {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  ];

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

@Component({
    templateUrl: './candidate-list.component.html',
    styles: [`
        h4{text-align: center; margin-top: 20px;}
        // td{font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;}
        table {
            width: 100%;
          }
          
          .mat-form-field {
            font-size: 14px;
            width: 100%;
          }

          .mat-row:nth-child(even){
            background-color: #020530;
            }
  
        .mat-row:nth-child(odd){
            background-color: #00042c;  
        }
        .mat-cell {
            color: white;
        }
        th{
            background-color: #020530;
            color: #fff;
            font-size: 16px;
        }
        mat-paginator{
            background-color: #020530;
            color: #fff;
            width:100%;
        }
        ::ng-deep .mat-select-arrow {
            color: #fff;
        }
        ::ng-deep .mat-select-value {
            color: #fff;
            //   font-weight: bold;
              font-size: 15px;
          }
          
          /* Change label color on focused */
          ::ng-deep .mat-form-field.mat-focused .mat-form-field-label {
            color: #000 !important;
          }
          
          /* underline border color on focused */
          ::ng-deep .mat-focused .mat-form-field-underline .mat-form-field-ripple{
            background-color: #000 !important;
            margin-right: 50px;
            color: #000;
          }
        ::ng-deep .mat-input-element::placeholder{
            color: #000;
        }
        ::ng-deep. mat-form-field-underline{
            background-color: green !important;
        }
        .ctrl-w{
            width: 300px;
        }
    `]
})

export class CandidateListComponent implements OnInit{

    public candidates: any = [];
    public isLoading: Boolean = true;
    displayedColumns: string[] = ['no', 'name', 'email', 'date', 'faculty', 'department','update','delete'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    public dataSource = new MatTableDataSource<Candidates>();

    @ViewChild(MatTableDataSource, {static: true}) table: MatTableDataSource<Candidates>;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private router: Router, private portalService : PortalService, private cdr: ChangeDetectorRef){
    }
    
    ngOnInit(){
        
        this.portalService.channel.bind('deleted', data => {
            console.log(data.message, data.date)
        })
        this.portalService.getCandidates().subscribe((data)=> {
            this.candidates = data;
            this.isLoading = false;
            this.dataSource.data = data as Candidates[];
            console.log(this.candidates);
            return data
        })  

        this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
    }

    
  ngAfterViewInit() {

    this.dataSource.sort = this.sort;
    const sortState: Sort = {active: 'date', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);

    // setInterval(() => {
    //     this.dataSource.sort = this.sort;
    //   }, 2000);
  }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
    editCandidate(){   
    }
    sortDate(event: Event){      
    }

    removeCandidate(candidate, i){
        if(window.confirm('Are you sure you want to delete this Candidate?')){
            this.portalService.deleteCandidate(candidate._id).subscribe((data) => {
                this.candidates.splice(i, 1); 
            })
        } 
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