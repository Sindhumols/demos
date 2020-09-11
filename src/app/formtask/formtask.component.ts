
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MatTable } from '@angular/material/table';



@Component({
  selector: 'app-formtask',
  templateUrl: './formtask.component.html',
  styleUrls: ['./formtask.component.scss']
})
export class FormtaskComponent {
  name = 'FormArray';
  myForm: FormGroup;
  arr: FormArray;



  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      arr: this.fb.array(
        [this.createItem()]
      )
    });
  }
  get formData() { return <FormArray>this.myForm.get('arr'); }
  createItem() {
    return this.fb.group({
      Price: [""],
      Quantity: [""],
      Discount: [""]
    });
  }
  addItem() {
    this.arr = this.myForm.get("arr") as FormArray;
    this.arr.push(this.createItem());
  }
  onSubmit() {
    console.log(this.myForm.value);
  }

}
