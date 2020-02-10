import { Component, OnInit } from '@angular/core';
import {PostsService} from '../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  private posts;
  constructor(private _postsService: PostsService) {
  }

  ngOnInit() {
    this._postsService.getPosts().subscribe(posts => {
      this.posts = posts;
      console.log(this.posts);
    });
  }

}
