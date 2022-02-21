// Modules
import { VerbsModuleModule } from './core/verbs-module/verbs-module.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VerbsModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
