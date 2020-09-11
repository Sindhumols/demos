import { Countryreport } from './../../countryreport';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RepotersService } from './../services/repoters.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-dailog-box',
  templateUrl: './dailog-box.component.html',
  styleUrls: ['./dailog-box.component.scss']
})
export class DailogBoxComponent implements OnInit {
  action:string;
  local_data:any;
  profileForm = this.fb.group({
    day: ['',Validators.required],
  totalSamplesTested:  ['',Validators.required],
  totalIndividualsTested:  [''],
  totalPositiveCases: ['']
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  constructor( private service:RepotersService ,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DailogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Countryreport )
    {
      console.log(data);
      this.local_data = {...data};
      this.action = this.local_data.action;
    }
  
    doAction(){
      this.dialogRef.close({event:this.action,data:this.local_data});
    }
  performaction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }
    closeDialog(){
      this.dialogRef.close({event:'Cancel'});
    }
   

  ngOnInit(): void {
  }

}
