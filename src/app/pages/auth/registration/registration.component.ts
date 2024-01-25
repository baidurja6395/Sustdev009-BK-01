import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  signupForm: FormGroup | undefined;
  showPassWord: boolean = false;
  showConfPassWord: boolean = false;
  errorMsg: any = {};
  confPassErrmsg: string = ''
  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.createFormGroup()
    this.createMsg()
  }
  ngOnInit(): void {
    this.signupForm?.get('password')?.valueChanges.subscribe(res => {
      if (res && res.length) {
        this.confPassErrmsg = ''
      }
    })
    this.signupForm?.get('confPassword')?.valueChanges.subscribe(res => {
      if (res && res.length) {
        this.confPassErrmsg = ''
      }
    })
  }

  createFormGroup() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      user_name: ['', Validators.required],
      password: ['', Validators.required],
      confPassword: ['', Validators.required]
    })
  }

  togelPass() {
    this.showPassWord = !this.showPassWord;
  }
  togelConfPass() {
    this.showConfPassWord = !this.showConfPassWord;
  }
  signup() {
    if (this.signupForm) {
      this.formService.markFormGroupTouched(this.signupForm)
      if (this.signupForm.valid) {
        if (this.signupForm.value.password === this.signupForm.value.confPassword) {
          const data = {
            email: this.signupForm.value.email,
            user_name: this.signupForm.value.user_name,
            password: this.signupForm.value.password,
          }
          this.authService.registration(data).subscribe({
            next:(response:any) => {
              if (response.status === 'success') {
                this.toastr.success(response.message)
                this.router.navigate([''])
              }
            }, error: (error:any) => {
              if (error.status === 400) {
                this.toastr.error(error.error.message)
              } else {
                this.toastr.error('Registration faild deu to some error')
              }
            }
        })
        } else {
          this.confPassErrmsg = 'Password not matched'
        }
      }
    }
  }

  createMsg() {
    this.errorMsg = {
      email: {
        required: 'Email is required',
        email: 'Email in not Valid'
      },
      user_name: {
        required: ' User name is required'
      },
      password: {
        required: 'Password is required'
      },
      confPassword: {
        required: 'Confirm password is required'
      }
    }
  }

}
