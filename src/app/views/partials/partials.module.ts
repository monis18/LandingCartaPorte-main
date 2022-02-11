// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
// Layout partials
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
// NgBootstrap
import { NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService, VisoorSatService } from '@services';
// SVG inline
import { InlineSVGModule } from 'ng-inline-svg';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TourMatMenuModule } from 'ngx-tour-md-menu';
import { CoreModule } from '../../core/core.module';
import { ActionNotificationComponent, AlertComponent, ConfirmDialogComponent, FetchEntityDialogComponent } from './content/crud';
import { ErrorComponent } from './content/general/error/error.component';
import { NoticeComponent } from './content/general/notice/notice.component';
import { PortletModule } from './content/general/portlet/portlet.module';
import { ScrollTopComponent, SplashScreenComponent } from './layout';
@NgModule({
  declarations: [
    AlertComponent,
    ErrorComponent,
    NoticeComponent,
    ScrollTopComponent,
    ConfirmDialogComponent,
    FetchEntityDialogComponent,
    ActionNotificationComponent,

    ScrollTopComponent,
    SplashScreenComponent,
  ],
  exports: [
    PortletModule,
    ErrorComponent,

    AlertComponent,
    NoticeComponent,
    ScrollTopComponent,
    ConfirmDialogComponent,
    FetchEntityDialogComponent,
    ActionNotificationComponent,

    ScrollTopComponent,
    SplashScreenComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    InlineSVGModule,
    CoreModule,
    PortletModule,

    // angular material modules
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatIconModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
    MatDialogModule,
    MatListModule,

    // ng-bootstrap modules
    NgbDropdownModule,
    NgbTabsetModule,
    NgbTooltipModule,
    TourMatMenuModule,
  ],
  providers: [
    NotificationsService,
    VisoorSatService
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ActionNotificationComponent,
  ]
})
export class PartialsModule { }
