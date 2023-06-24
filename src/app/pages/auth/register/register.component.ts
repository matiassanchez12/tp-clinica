import { Component, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProfession, IUser } from 'src/app/interfaces';
import {
  FileService,
  DbService,
  AuthService,
  ValidationsService,
} from '../../../services';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ReCaptcha2Component } from 'ngx-captcha';
import { take } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @ViewChild('captchaElem') captchaElem!: ReCaptcha2Component;

  public formRegister: FormGroup = new FormGroup({
    name: new FormControl(),
    lastName: new FormControl(),
    age: new FormControl(),
    dni: new FormControl(),
    profession: new FormControl(),
    socialWorks: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    file: new FormControl(),
    images: new FormControl(),
    type: new FormControl(),
    recaptcha: new FormControl(),
  });

  public userExist: boolean | undefined;
  public users: IUser[] = [];
  public professions: IProfession[] = [];
  public isPatientUser: boolean = false;
  public showAddInput: boolean = false;

  public constructor(
    private fb: FormBuilder,
    private bdService: DbService,
    private fileService: FileService,
    private validationsService: ValidationsService,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    bdService.getAllUsers().subscribe((users) => {
      this.users = users;
    });

    bdService.getAllProfessions().subscribe((professions) => {
      this.professions = professions;
    });
  }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', [Validators.required]],
      age: [0, Validators.required],
      dni: [0, Validators.required],
      socialWorks: ['', Validators.required],
      file: ['', [this.validationsService.validateImages]],
      images: [
        [
          'http://res.cloudinary.com/matiaskaufman/image/upload/v1687385959/matias/xknxrs3phc02ztndemij.jpg',
          'http://res.cloudinary.com/matiaskaufman/image/upload/v1687385965/matias/i9hhg7tt24wbxawlkzpv.jpg',
        ],
        Validators.minLength(2),
      ],
      profession: ['', Validators.required],
      type: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          this.validationsService.spacesValidator,
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      recaptcha: ['', Validators.required],
    });

    this.formRegister.controls['type'].valueChanges.subscribe((value) => {
      this.isPatientUser = value === 'patient';
      this.updateFormValidations();
    });
  }

  onShowAddInput() {
    this.showAddInput = true;
  }

  onHiddeAddInput() {
    this.showAddInput = false;
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const input = event.target as HTMLInputElement;
      const inputValue = input.value;

      if (this.professions.some((prof) => prof.profession === inputValue)) {
        this.toastr.error('Ya existe una especialidad con ese nombre');
        return;
      }

      if (inputValue.length > 0) {
        this.ngxService.start();

        this.bdService.createProfession(inputValue).finally(() => {
          this.ngxService.stop();
          input.value = '';
        });
      }
    }
  }

  async onSubmit() {
    if (this.formRegister.valid) {
      const values = this.formRegister.value as IUser;

      this.ngxService.start();

      this.authService
        .signUp(values)
        .then(() => {
          let message = 'Revise su correo electronico para activar su cuenta.';

          if (values.type === 'patient') {
            message = 'Ahora puede iniciar sesion';
          }

          this.toastr.success(message, 'Usuario registrado con exito!');

          this.router.navigate(['/login']);
        })
        .catch((error: any) => {
          let messageError = error;
          if (error.code === 'auth/email-already-in-use') {
            messageError = 'El email ya esta en uso';
          }
          this.toastr.error(messageError, 'Error');
        })
        .finally(() => {
          this.ngxService.stop();
        });
    }
  }

  private updateFormValidations(): void {
    const socialWorksControl = this.formRegister.get('socialWorks')!;
    const imagesControl = this.formRegister.get('images')!;
    const professionControl = this.formRegister.get('profession')!;

    if (this.isPatientUser) {
      socialWorksControl.setValidators(Validators.required);
      imagesControl.setValidators(Validators.minLength(1));
      professionControl.clearValidators();
    } else {
      socialWorksControl.clearValidators();
      imagesControl.setValidators(Validators.minLength(2));
      professionControl.setValidators(Validators.required);
    }

    socialWorksControl.updateValueAndValidity();
    imagesControl.updateValueAndValidity();
    professionControl.updateValueAndValidity();
  }

  async onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    this.formRegister.controls['file'].markAsTouched({
      onlySelf: true,
    });

    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];

      if (!this.validationsService.validateImages(file.name)) {
        this.ngxService.start();

        const currentFiles =
          (this.formRegister.get('images')?.value as any) || [];

        this.fileService
          .uploadFileToCloud(file)
          .pipe(take(1))
          .subscribe((res: any) => {
            this.formRegister.patchValue({
              images: [...currentFiles, res.url],
            });

            this.ngxService.stop();
          });
      }

      this.formRegister.patchValue({
        file: file.name,
      });
    }
  }
}
