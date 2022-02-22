// Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core-module/core.module';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
