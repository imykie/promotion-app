import { Component, OnInit } from "@angular/core";
import { PortalService } from '../portal.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { PusherService } from '../pusher.service';


@Component({
    templateUrl: './edit-candidate.component.html',
    styles: [`
    form{color: royalblue}
    input{color: red}
    `]
})

export class EditComponent implements OnInit{
    
    public candidate
    public accessors = [];


    constructor(private portalService: PortalService,
        private route : ActivatedRoute, private fb: FormBuilder
        ){

    }

    

    ngOnInit(){
       this.getCandidate(this.route.snapshot.params['id']) 
    }

    getCandidate(id){
        this.portalService.getCandidate(id)
        .subscribe((data) => {
            this.candidate = data;
            data.accessor.forEach(element => {
                this.accessors.push(element);
            });
            console.log(this.accessors[0].name, this.accessors[1].name);
            console.log(this.accessors)


            // console.log(data)
            // console.log(data.accessor[0].name)
        })
    }

    saveUpdate(){
        let id = this.route.snapshot.paramMap.get('id')
    this.portalService.updateCandidate(id, this.accessors).subscribe((data)=> {
        console.log(data)
    })        
    }
    
}

