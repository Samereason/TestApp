import { Injectable } from '@angular/core';
import {Router, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PostInterface} from './models/PostInterface';
import {Observable, EMPTY} from 'rxjs';
import {PostsService} from './posts.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostResolveService implements Resolve<PostInterface>{
  constructor(private _postsService: PostsService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PostInterface> {
    return this._postsService.getPost(route.paramMap.get('id')).pipe(
      map((post: PostInterface) => post),
      catchError(error => {
        this.router.navigate(['/']);
        return EMPTY;
      })
    );
  }
}
