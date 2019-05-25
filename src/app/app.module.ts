import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';

import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatCardModule, MatButtonModule, MatRadioModule, MatSidenavModule, MatSnackBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { HomeComponent } from './home/home.component';
import { Routes, CanActivate } from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';

const MaterialModules = [
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule,
  MatCardModule,
  MatButtonModule,
  MatRadioModule,
  MatSidenavModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MaterialModules,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    OverlayModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'home',canActivate: [AuthGuardService], component: HomeComponent }
    ]),
  ],

  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
