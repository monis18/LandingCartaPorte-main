// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Auth
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/pages/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '404',
    redirectTo: '',
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
