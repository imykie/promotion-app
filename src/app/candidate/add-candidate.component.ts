import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormArray} from '@angular/forms'
import { Router } from '@angular/router';
import { PortalService } from '../portal.service';

@Component({
    templateUrl: './add-candidate.component.html',
    styles: [`
  
// *{background-color: transparent; color: royalblue; } 
    // select.custom-select{color: white; background-color:royalblue}
    // button{background-color: royalblue; border: none; color: white}
    // #but{width: 240px}
    // #but2{width: 240px; background-color: red}
    // h2{text-align: center; margin-top: 24px; color: royalblue}
    // h5{text-align: center}
    // hr{background-color: darkred}
    // input.form-control{border-color: blue;}
    .w-90{
        width: 90%;
    }
    .cont-w{
        max-width: 60%;
    }
    .ctrl-bg{
        background-color: transparent;
        width: 500px;
    }
    .selectCenter {
        text-align: center;
     }
     .form-control {
        display: block;
        height: 40px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        border: 1px solid #bbb;
        border-radius: 0;
    }
    .form-control:focus{
        background-color: #fff;
        color: #000;
    }
     input{
         boarder-radius: 0;
         boarder: solid 1px #ccc;
         outline: 0;
     }
     .save-btn{
         background-color: #5A14E6;
         border: 0;
         outline: 0;
         color: #fff;
         font-size: 14px;
         transition: 0.3s;
     }
     .save-btn:hover{
        background-color: #3b0a9e
     }
     .cancel-btn{
        background-color: #bb0e0e;
        border: 0;
        outline: 0;
        color: #fff;
        font-size: 14px;
        transition: 0.3s;
    }
    .cancel-btn:hover{
       background-color: #990a0a;
    }
    .add-accessor{
        background-color: transparent;
        border: solid 1px #fff;
        outline: 0;
        color: #fff;
        font-size: 14px;
        transition: 0.3s;
    }
    .add-accessor:hover{
        background-color: #5A14E6;
     }
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
            console.log(data.message, data.date);
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
            // date: [],
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