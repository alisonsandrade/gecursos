import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CursoFormularioPage } from './curso-formulario';

@NgModule({
  declarations: [
    CursoFormularioPage,
  ],
  imports: [
    IonicPageModule.forChild(CursoFormularioPage),
  ],
})
export class CursoFormularioPageModule {}
