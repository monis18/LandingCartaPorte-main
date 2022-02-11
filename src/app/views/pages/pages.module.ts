// Angular
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Pages
import { CoreModule } from '../../core/core.module';
import { PartialsModule } from '../partials/partials.module';

@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    FormsModule,
    CommonModule,
    PartialsModule,
    HttpClientModule,
  ],
  providers: []
})
export class PagesModule {
}
