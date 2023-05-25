import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  constructor(private fb: FormBuilder, private accountService: AccountService) {}
  
  ngOnInit(): void {
    this.getAddresFormValues();
  }

  checkoutForm = this.fb.group({
    
    // Address Form
    addressForm: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required]
    }),

    // Delivery Form
    deliveryForm: this.fb.group({
      deliveryMethod: ['', Validators.required]
    }),

    // Payment Form
    paymentForm: this.fb.group({
      nameOnCard: ['', Validators.required]
    })
  })


  getAddresFormValues() {
    this.accountService.getUserAddress().subscribe({
      next: address => {
        address && this.checkoutForm.get('addressForm')?.patchValue(address)
      }
    })
  }
}
