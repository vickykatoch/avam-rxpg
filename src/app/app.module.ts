import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FinAppHostProviderModule } from './fin-app-host-provider/fin-app-host-provider.module';
import { CoreModule } from './core/core.module';
import { MainHostComponent } from './main-host/main-host.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHostComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FinAppHostProviderModule
  ],
  providers: [],
  entryComponents : [
    MainHostComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
