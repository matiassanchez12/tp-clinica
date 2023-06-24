import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  WhoiamComponent,
  AdminModule,
  AuthModule,
  WelcomeComponent,
} from './pages';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { UserTableComponent } from './components/tables/user-table/user-table.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { LoggedGuard } from './guards';

@NgModule({
  declarations: [
    AppComponent,
    WhoiamComponent,
    ModalComponent,
    NavbarComponent,
    WelcomeComponent,
    UserTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AdminModule,
    AuthModule,
    NgxUiLoaderModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    LoggedGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
