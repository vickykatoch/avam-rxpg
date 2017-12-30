import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinAppHostProviderService } from './fin-app-host-provider.service';
import { AppHostProvider } from '../core';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers : [
    { provide : AppHostProvider , useClass :  FinAppHostProviderService }
  ]
})
export class FinAppHostProviderModule { }
