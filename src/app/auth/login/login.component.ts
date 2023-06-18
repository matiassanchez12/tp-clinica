import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public formLogin: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  public userExist: boolean | undefined;

  @Output() openRegisterModal = new EventEmitter();
  @Output() closeLoginModal = new EventEmitter();

  public constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private bdService: DbService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, this.spacesValidator],
      ],
      password: ['', Validators.required],
    });

    this.formLogin.setValue({
      email: 'matias.sanche1z.0097@gmail.com',
      password: '123123',
    });
  }

  onClick() {
    this.closeLoginModal.emit();
    this.openRegisterModal.emit();
  }

  onSubmit() {
    if (!this.formLogin.invalid) {
      this.authService
        .signIn(this.formLogin.value['email'], this.formLogin.value['password'])
        .then((r) => {
          if (!r.user) {
            throw new Error('User not found');
          }

          const userId = r.user.uid;

          this.bdService.createLoginLog(userId);

          this.toastr.success('Sesión iniciada con exito!');

          this.closeLoginModal.emit();

          this.router.navigate(['/home']);
        })
        .catch((e) => this.toastr.error('Error:', e.message));
    }
  }

  private spacesValidator(control: AbstractControl): null | object {
    const nombre = <string>control.value;
    const spaces = nombre.includes(' ');

    return spaces ? { containsSpaces: true } : null;
  }
}
