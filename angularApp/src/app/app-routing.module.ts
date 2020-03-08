import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostComponent} from "./post/post.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {PostResolveService} from './post-resolve.service';


const routes: Routes = [
  {path: '', component: MainPageComponent},
  {
    path: 'post/:id',
    resolve: {
      post: PostResolveService
    },
    component: PostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
