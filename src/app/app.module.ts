import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';

import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatCardModule, MatButtonModule, MatRadioModule, MatSidenavModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModules,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
