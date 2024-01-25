import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { Router } from '@angular/router';
import { USER_ID, EMAIL, PASSWORD } from '../../../constants/constant';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup | undefined;
  showPassWord: boolean = false;
  rememberMe: boolean = false;
  errorMsg: any = {};
  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.createFormGroup()
    this.createMsg()
  }
  ngOnInit(): void {
    localStorage.removeItem(USER_ID)
    this.getlocalData()
  }

  async getlocalData() {
    const email = localStorage.getItem(EMAIL)
    const password = localStorage.getItem(PASSWORD)
    if (email && password) {
      this.loginForm?.get('email')?.setValue(email)
      this.loginForm?.get('password')?.setValue(password)
    }
  }

  rememberMeClick() {
    this.rememberMe = !this.rememberMe;
  }

  togelPass() {
    this.showPassWord = !this.showPassWord;
  }

  Login() {
    if (this.loginForm) {
      this.formService.markFormGroupTouched(this.loginForm)
      if (this.loginForm.valid) {
        this.authService.login(this.loginForm.getRawValue()).subscribe({
          next: (res: any) => {
            if (res.status === 'success') {
              this.toastr.success(res.message)
              if (this.rememberMe) {
                localStorage.setItem(EMAIL, this.loginForm?.getRawValue().email)
                localStorage.setItem(PASSWORD, this.loginForm?.getRawValue().password)
              } else {
                localStorage.removeItem(EMAIL)
                localStorage.removeItem(PASSWORD)
              }
              localStorage.setItem(USER_ID, res.data.password)
              this.router.navigate(['home'])
            }
          }, error: (error: any) => {
            if (error.status === 400) {
              this.toastr.error(error.error.message)
            } else {
              this.toastr.error('Login faild deu to some error')
            }
          }
        })
      }
    }
  }

  createFormGroup() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  createMsg() {
    this.errorMsg = {
      email: {
        required: 'Email is required',
        email: 'Email in not Valid'
      },
      password: {
        required: 'Password is required'
      }
    }
  }

}
