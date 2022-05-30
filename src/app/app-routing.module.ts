/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { PostPageComponent } from './post-page/post-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { AdminModule } from './admin/admin.module';

const routes: Routes = [{
  path: '',
  component: MainLayoutComponent,
  children: [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: HomePageComponent },
    { path: 'post/:id', component: PostPageComponent },
  ],
},
{
  // eslint-disable-next-line arrow-parens
  path: 'admin', loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule),
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
