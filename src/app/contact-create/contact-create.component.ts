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
  showLoader;
  isSent;
  disabledValue;
  senderName;

  constructor(private router: Router, private api: APIService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'email': [null, [Validators.required, Validators.email]],
      'phone': [null, Validators.required],
      'subject': [null, Validators.required],
      'message': [null, Validators.required]
    })
    //to disable the form while the API call is being sent
    this.disabledValue = false; 
    //to show loader in the button
    this.showLoader = false; 
    //to check if sent, to display success message
    this.isSent = false; 
    //name returned after submit
    this.senderName = '';
  }

  //things to do on submit - show the loader on the button and disable to form to prevent 
  onSubmit() {
    this.showLoader = true;
    this.disabledValue = true;
  }
  //things to do after message has been sent, show success message, hide the loader and then reset the form.
  afterSubmit() {
    this.isSent = true;
    this.showLoader = false;
    this.disabledValue = false;
    this.contactForm.reset();
  }

  onFormSubmit(form: NgForm) {
    this.onSubmit();
    this.api.createContact(form).subscribe(res => {
      this.afterSubmit();
      this.senderName = res[0]['name'];
    }, err => {
      console.log(err);
    })
  }

}
