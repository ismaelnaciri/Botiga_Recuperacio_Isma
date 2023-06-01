import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RecaptchaComponent, RecaptchaModule} from "ng-recaptcha";
import { AppComponent } from './app.component';
import { TitolLogoComponent } from './titol-logo/titol-logo.component';
import { FooterComponent } from './footer/footer.component';
import { CistellaComponent } from './cistella/cistella.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistreComponent } from './registre/registre.component';
import { CatalegComponent } from './cataleg/cataleg.component';
import { CondicionsComponent } from './condicions/condicions.component';
import { IniciComponent } from './inici/inici.component';
import { ContacteComponent } from './contacte/contacte.component';
import { HttpClientModule } from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { GrafiquesComponent } from './grafiques/grafiques.component';
import { SurpriseComponent } from './surprise/surprise.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CanviarpasswordComponent } from './canviarpassword/canviarpassword.component';
import {NgHcaptchaModule} from "ng-hcaptcha";

@NgModule({
  declarations: [
    AppComponent,
    TitolLogoComponent,
    FooterComponent,
    CistellaComponent,
    RegistreComponent,
    CistellaComponent,
    CatalegComponent,
    CondicionsComponent,
    IniciComponent,
    ContacteComponent,
    GrafiquesComponent,
    SurpriseComponent,
    LoginComponent,
    PerfilComponent,
    CanviarpasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RecaptchaModule,
    FormsModule,
    NgHcaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
