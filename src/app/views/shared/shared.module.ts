import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TruncatePipe } from '../../core/_base/layout/pipes/truncate.pipe';


@NgModule({
  declarations: [TruncatePipe],
  imports: [
    CommonModule
  ],
  exports: [TruncatePipe]
})
export class SharedModule { }
