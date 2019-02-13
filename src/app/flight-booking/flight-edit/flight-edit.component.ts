import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { cityValidator } from '../../shared/validators/city-validator';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss']
})
export class FlightEditComponent implements OnInit {

  editForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      id: [1],
      from: [
        'Hamburg',
        [
          Validators.required,
          cityValidator
        ]
      ],
      to: ['Graz'],
      date: [''],
      delayed: [false]
    });

    console.log('valid', this.editForm.valid);
    console.log('dirty', this.editForm.dirty);
    console.log('touched', this.editForm.touched);
    console.log('value', this.editForm.value);

    this.editForm.valueChanges
      .subscribe(editFormValue => console.log(editFormValue));
  }

}
