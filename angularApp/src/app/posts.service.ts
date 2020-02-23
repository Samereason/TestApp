import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private _http: HttpClient) { }

  public getPosts() {
    return this._http.get('https://jsonplaceholder.typicode.com/posts');
  }

  public getRelatedPosts(userId: number) {
    return this._http.get('https://jsonplaceholder.typicode.com/posts?userId=' + userId)
  }

  public getPost(id: string) {
    return this._http.get('https://jsonplaceholder.typicode.com/posts/' + id);
  }

  public getPostComments(id: string) {
    return this._http.get('https://jsonplaceholder.typicode.com/posts/' + id + '/comments');
  }
}
