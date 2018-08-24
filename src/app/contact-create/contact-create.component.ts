import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {

  contactForm: FormGroup;
  name: string = '';
  email: string = '';
  phone: string = '';
  subject: string = '';
  message: string = '';

  constructor(private router: Router, private api: APIService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'email': [null, Validators.required],
      'phone': [null, Validators.required],
      'subject': [null, Validators.required],
      'message': [null, Validators.required]
    })
  }

  onFormSubmit(form: NgForm) {
    this.api.createContact(form).subscribe(res => {
      let name = res['name'];
      console.log(name);
    }, err => {
      console.log(err);
    })
  }

}
