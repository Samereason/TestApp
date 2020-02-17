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

  public getPost(id: string) {
    return this._http.get('https://jsonplaceholder.typicode.com/posts/' + id)
  }
}
