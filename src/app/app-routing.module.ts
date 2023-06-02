import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import { CistellaComponent } from './cistella/cistella.component'
import { RegistreComponent } from './registre/registre.component'
import { LoginComponent } from './login/login.component'
import { CatalegComponent } from './cataleg/cataleg.component'
import { CondicionsComponent } from "./condicions/condicions.component";
import { IniciComponent } from "./inici/inici.component";
import { ContacteComponent} from "./contacte/contacte.component";
import { GraficsComponent} from "./grafics/grafics.component";
import { SurpriseComponent} from "./surprise/surprise.component";
import { PerfilComponent} from "./perfil/perfil.component";
import { CanviarpasswordComponent} from "./canviarpassword/canviarpassword.component";
import { AdminregistreComponent } from "./adminregistre/adminregistre.component";

const routes: Routes = [
  {path: '', component: IniciComponent},
  {path: 'cistella', component: CistellaComponent},
  {path: 'registre', component: RegistreComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cataleg', component: CatalegComponent},
  {path: 'condicions', component: CondicionsComponent},
  {path: 'contacte', component: ContacteComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'grafics',component: GraficsComponent},
  {path: 'surprise', component: SurpriseComponent},
  {path: 'canviarpasswd', component: CanviarpasswordComponent},
  {path: 'adminregistre', component: AdminregistreComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
