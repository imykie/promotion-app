import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormArray} from '@angular/forms'
import { Router } from '@angular/router';
import { PortalService } from '../portal.service';

@Component({
    templateUrl: './add-candidate.component.html',
    styles: [`
  
*{background-color: transparent; color: royalblue; } 
 select.custom-select{color: white; background-color:royalblue}
    button{background-color: royalblue; border: none; color: white}
    #but{width: 240px}
    #but2{width: 240px; background-color: red}
    h2{text-align: center; margin-top: 24px; color: royalblue}
    h5{text-align: center}
    hr{background-color: darkred}
    input.form-control{border-color: blue;}
    `]
})

export class AddCandidateComponent implements OnInit{
    Submitted = false
    AddCandidate: FormGroup
    Department: any = ['Computer Science & Engineering', 'Microbiology', 'Law', 'Geography'];
    Level: any = ['Lecuturer I', 'Lecturer II', ' Senior Lecturer I', 'Senior Lecturer II', 'Reader'];
    Faculty: any = ['Faculty of Technology', 'Faculty of Agriculture', 'Faculty of Social Sciences', 'Faculty of Environmental Design Management', 'Faculty of Pharmacy'];
    

    get accessor(): FormArray{
        return <FormArray>this.AddCandidate.get('accessor')
    }

    constructor(private fb: FormBuilder, private router: Router, private portalService: PortalService){
        this.mainForm();
    }

    ngOnInit(){
        this.portalService.channel.bind('new-notification', data => {
            console.log(data.message);
        })
    }
    mainForm(){
        this.AddCandidate = this.fb.group({
            surname: [],
            other: [],
            email: [],
            number: [],
            fac: [],
            dep: [],
            lev: [],
            date: [],
            accessor: this.fb.array([ this.buildAccessors() ])
        })  
    }
    

    onSubmit(){
        this.Submitted = true;
        if(!this.AddCandidate.valid){
            return false
        }else{
           this.portalService.addCandidate(this.AddCandidate.value).subscribe(data => {
            if(data){
                console.log(data); 
            }
            else{
                console.log('Invalid')
            }
        },(error) => {
               console.log(error)
           }) 
        }
        console.log(this.AddCandidate.value)
        this.router.navigate(['candidate-list'])
    }

    buildAccessors(): FormGroup{
        return this.fb.group({
            accessorname: '',
            accessoremail: '',
            university: '',
            status: 'invitation sent'
        })
    }

    changeFaculty(e) {
        this.AddCandidate.get('fac').setValue(e.target.value, {
         onlySelf: true
        })
       }
    changeDepartment(e) {
        this.AddCandidate.get('dep').setValue(e.target.value, {
         onlySelf: true
        })
       }
     changeLevel(e) {
        this.AddCandidate.get('lev').setValue(e.target.value, {
         onlySelf: true
        })
     }

     addAccessors(): void{
        this.accessor.push(this.buildAccessors());
     }

      back(){
          window.alert('are you sure you want to cancel')
          this.router.navigate(['/dashboard'])
      }

}