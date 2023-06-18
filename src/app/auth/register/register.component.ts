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
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formRegister: FormGroup = new FormGroup({
    name: new FormControl(),
    lastName: new FormControl(),
    age: new FormControl(),
    dni: new FormControl(),
    socialWorks: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    images: new FormControl(),
    specialty: new FormControl(),
  });
  public isLoading: boolean = false;
  public userExist: boolean | undefined;
  public usersObservable!: Observable<IUser[]>;
  public users: IUser[] = [];

  public constructor(
    private fb: FormBuilder,
    private bdService: DbService,
    private toastr: ToastrService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.usersObservable = bdService.getAllUsers();

    this.usersObservable.subscribe((users) => {
      this.users = users;
    });
  }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      name: ['a', Validators.required],
      lastName: ['a', [Validators.required]],
      age: ['a', Validators.required],
      dni: ['a', Validators.required],
      socialWorks: ['a', Validators.required],
      images: ['a', Validators.required],
      specialty: ['a', Validators.required],
      email: [
        'a',
        [Validators.required, Validators.email, this.spacesValidator],
      ],
      password: ['a', Validators.required],
    });
  }

  async onSubmit() {
    if (!this.formRegister.invalid) {
      this.isLoading = true;

      const {
        email,
        password,
        name,
        lastName,
        age,
        dni,
        socialWorks,
        images,
        specialty,
      } = this.formRegister.value;

      this.authService
        .signUp(
          email,
          password,
          name,
          lastName,
          age,
          dni,
          socialWorks,
          images,
          specialty
        )
        .then(() => {
          this.toastr.success('Usuario creado con exito!');
        })
        .catch((error: any) => {
          let messageError = error;
          if (error.code === 'auth/email-already-in-use') {
            messageError = 'El email ya esta en uso';
          }
          this.toastr.error(messageError);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }

  private spacesValidator(control: AbstractControl): null | object {
    const nombre = <string>control.value;
    const spaces = nombre.includes(' ');

    return spaces ? { containsSpaces: true } : null;
  }

  private ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
