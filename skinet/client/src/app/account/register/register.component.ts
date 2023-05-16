import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errors: string[] | null = null;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) 
  {   }

  complexPassword = ".{8,}"; // Minimum eight length

  registerForm = this.fb.group({
    displayName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email],[this.validateEmailNotTaken()]],
    password: ['', [Validators.required, Validators.pattern(this.complexPassword)]]
  })

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/shop'),
      error: error => this.errors= error.errors
    })
  }

  // Very Imp. must to learn - without debouncing
  // validateEmailNotTaken(): AsyncValidatorFn {
  //   return (control: AbstractControl) => {
  //     return this.accountService.checkEmailExists(control.value).pipe(
  //       map(result=> result ? {emailExists:true} : null),

  //       finalize( () => control.markAsTouched())
  //     )
  //   }
  // }


  // Very Imp. must to learn - with debouncing
  validateEmailNotTaken(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        take(1), // interested in only last chnged value not all
        switchMap(() => {
          return this.accountService.checkEmailExists(control.value).pipe(
            map(result=> result ? {emailExists:true} : null),
            finalize( () => control.markAsTouched())
          )
        })
      )
    }
  }

}
