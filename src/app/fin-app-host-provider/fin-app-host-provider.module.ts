import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinAppHostProviderService } from './fin-app-host-provider.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers : [
    FinAppHostProviderService
  ]
})
export class FinAppHostProviderModule { }
