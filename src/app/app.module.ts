// Angular
import { OverlayModule } from '@angular/cdk/overlay';
import { registerLocaleData, TitleCasePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeMx from '@angular/common/locales/es-MX';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { DefaultRouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
// NGRX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule } from '@ngx-translate/core';
// CRUD
import { HttpUtilsService, LayoutUtilsService, TypesUtilsService } from '@utils';
// SVG inline
import { InlineSVGModule } from 'ng-inline-svg';
// Perfect Scroll bar
import { PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// NGX Permissions
import { NgxPermissionsModule } from 'ngx-permissions';
import { TourMatMenuModule } from 'ngx-tour-md-menu';
// Modules
import { AppRoutingModule } from './app-routing.module';
// Copmponents
import { AppComponent } from './app.component';
import { extModules } from './build-specifics';
import { AuthService } from './core/auth';
import { StorageService } from './core/auth/services/storage.service';
import { CoreModule } from './core/core.module';
// import { InMemoryDataService } from './views/pages/auth/in-memory-data.service';
// auth interceptor
import { AuthenticationInterceptor } from './core/interceptors/authentication.interceptor';
// State
import { metaReducers, reducers } from './core/reducers';
// Layout Services
// tslint:disable-next-line: max-line-length
import { DataTableService, KtDialogService, LayoutConfigService, LayoutRefService, MenuAsideService, MenuConfigService, MenuHorizontalService, PageConfigService, SplashScreenService, SubheaderService } from './core/_base/layout';
// Config
import { LayoutConfig } from './core/_config/layout.config';
// Partials
import { PartialsModule } from './views/partials/partials.module';
import { ThemeModule } from './views/theme/theme.module';

// tslint:disable-next-line:class-name
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelSpeed: 0.5,
  swipeEasing: true,
  minScrollbarLength: 40,
  maxScrollbarLength: 300,
};

export function initializeLayoutConfig(appConfig: LayoutConfigService) {
  // initialize app by loading default demo layout config
  return () => {
    if (appConfig.getConfig() === null) {
      appConfig.loadConfigs(new LayoutConfig().configs);
    }
  };
}

registerLocaleData(localeMx);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    PartialsModule,
    CoreModule,
    OverlayModule,
    StoreModule.forRoot(reducers, metaReducers),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer, stateKey: 'router' }),
    StoreDevtoolsModule.instrument(),
    TranslateModule.forRoot(),
    MatProgressSpinnerModule,
    InlineSVGModule.forRoot(),
    ThemeModule,

    extModules,
    TourMatMenuModule.forRoot(),
  ],
  exports: [],
  providers: [
    StorageService,
    AuthService,
    LayoutConfigService,
    LayoutRefService,
    MenuConfigService,
    PageConfigService,
    KtDialogService,
    DataTableService,
    SplashScreenService,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        panelClass: 'kt-mat-dialog-container__wrapper',
        height: 'auto',
        width: '900px'
      }
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      // layout config initializer
      provide: APP_INITIALIZER,
      useFactory: initializeLayoutConfig,
      deps: [LayoutConfigService], multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-MX'
    },
    // template services
    TitleCasePipe,
    SubheaderService,
    MenuHorizontalService,
    MenuAsideService,
    HttpUtilsService,
    TypesUtilsService,
    LayoutUtilsService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
