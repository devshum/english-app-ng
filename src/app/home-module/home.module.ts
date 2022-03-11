// Modules
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModuleModule } from './../shared-module/shared-module.module';

// Components
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    SharedModuleModule
  ]
})
export class HomeModule { }
