import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortalService } from '../portal.service';

@Component({
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})

export class DepartmentsComponent implements OnInit {
  
  public faculties: any = []
  public departments: any = []
  public dep
  public facultyId
  public depId
  public depName
  public facultyName
  public departmentName
  public message: String = ""
  public rmvMessage: String = ""
  public showMessage: Boolean = false

  constructor(private router : Router,private portalService: PortalService) { }

  ngOnInit(){
    this.getFaculties();
  }

getFaculties(){
    this.portalService.getFaculties().subscribe(data => {
        if(data){
            this.faculties = data;
            console.log(this.faculties);
        }else{
            console.log("Faculties fetched error");
        }
    })
}

onSelectFaculties(faculty){
  this.facultyName = faculty
  this.dep = this.faculties.filter((data) => {
      return data.name == faculty
  })
  this.departments = this.dep[0].departments
  this.facultyId = this.dep[0]._id
  console.log(this.dep, this.facultyId, this.departments)
}

changeDepartment(dep){
  this.departmentName = dep;
  this.depId = this.departments.filter((item) => {
    return item.name == dep
  })[0]._id
  console.log(this.depId)
}

deleteDepartment(){
  let fac_Id = this.facultyId;
  let dep_id = this.depId
  this.portalService.removeDepartment(fac_Id, dep_id).subscribe((data) => {
    if (data.success) {
      this.showMessage = true;
      this.rmvMessage = `${this.departmentName} has been removed from faculty of ${this.facultyName} successfully`;
      console.log(data);
      setTimeout(() => {
        this.showMessage = false
        this.ngOnInit();
      }, 5000)
    } else {
      console.log("Something went wrong")
      this.showMessage = true;
      this.rmvMessage = "Operation failed, something went wrong"
      setTimeout(() => {
        this.showMessage = false
        this.ngOnInit();
      }, 5000)
    }
  })
}

addDepartment(){
  let fac_Id = this.facultyId;
  let data = { department: this.depName }
  this.portalService.addDepartment(fac_Id, data).subscribe((data) => {
    if (data.success) {
      this.showMessage = true;
      this.message = `${this.depName} has been added to faculty of ${this.facultyName} successfully`;
      console.log(data);
      setTimeout(() => {
        this.showMessage = false
        this.ngOnInit();
      }, 5000)
    } else {
      console.log("Something went wrong")
      this.showMessage = true;
      this.message = "Operation failed, something went wrong"
      setTimeout(() => {
        this.showMessage = false
        this.ngOnInit();
      }, 5000)
    }
  })
}
}
