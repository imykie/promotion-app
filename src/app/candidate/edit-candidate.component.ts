import { Component, OnInit } from "@angular/core";
import { PortalService } from '../portal.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
// import { PusherService } from '../pusher.service';


@Component({
    templateUrl: './edit-candidate.component.html',
    styles: [`
    // form{color: royalblue}
    // input{color: red}
    .space-text{
        letter-spacing: 4px;
    }
    .ctrl-font{
        font-size: 14px;
    }
    .form-control {
        display: block;
        height: 40px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        background-color: transparent;
        color: #ccc;
        border: 1px solid #bbb;
        border-radius: 0;
    }
    .form-control:hover{
        background-color: #fff;
        color: #000;
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
    .approved-btn{
        background-color: #17A05D;
        border: 0;
        outline: 0;
        color: #fff;
        font-size: 14px;
        transition: 0.3s;
    }
    .approved-btn:hover{
       background-color: #0a8348;
    }
    .disproved-btn{
        background-color: transparent;
        border: solid 1px #DD1124;
        outline: 0;
        color: #fff;
        font-size: 14px;
        transition: 0.3s;
    }
    .disproved-btn:hover{
       background-color: #DD1124;
    }
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
        this.portalService.channel.bind('updated', data => {
            console.log(data.message, data.date)
        })
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

    sendPapers(accessorId){
        let id = this.route.snapshot.params['id'];
        this.portalService.sendPapers(id, accessorId).subscribe(data => {
            if(!data){
                console.log("Something went wrong");
            }else{
                console.log(data);
                
            }
        })
    }

    approveCandidate(accessorId){
        let id = this.route.snapshot.params['id'];
        this.portalService.finalStatus(id, accessorId, true).subscribe(data => {
            if(!data){
                console.log("Something went wrong");
            }else{
                console.log(data);
                alert(data.message);
            }
        })
    }

    disproveCandidate(accessorId){
        let id = this.route.snapshot.params['id'];
        this.portalService.finalStatus(id, accessorId, false).subscribe(data => {
            if(!data){
                console.log("Something went wrong");
            }else{
                console.log(data);
                alert(data.message);
            }
        })
    }

    saveUpdate(){
        let id = this.route.snapshot.paramMap.get('id')
    this.portalService.updateCandidate(id, this.accessors).subscribe((data)=> {
        console.log(data)
    })        
    }
    
}

