// Modules
import { SharedModule } from './../module-shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Components
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class CoreModule { }
