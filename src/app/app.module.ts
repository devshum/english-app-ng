// Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './module-core/core.module';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
