import { Component, OnInit } from '@angular/core';
import {PostsService} from '../posts.service';
import {PostInterface} from "../models/PostInterface";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {
  private posts: PostInterface[];
  private activePosts = [];
  private currentPost = 0;
  private postsInterval = 6;
  private postsLoading: boolean = true;

  constructor(private _postsService: PostsService) {
  }

  loadNextPosts(): void {
    let lastElem: number = this.currentPost + this.postsInterval;
    const firstElem: number = this.currentPost;

    if (this.currentPost === this.posts.length) { return }
    if (lastElem > this.posts.length) {
      lastElem = this.posts.length;
    }

    this.currentPost = lastElem;
    this.activePosts = this.activePosts.concat(this.posts.slice(firstElem, lastElem));
  }

  ngOnInit() {
    this._postsService.getPosts().subscribe((posts: PostInterface[]) => {
      this.posts = posts;
      this.loadNextPosts();
      this.postsLoading = false;
    }, error => {
      this.postsLoading = false;
      console.error(error);
    });
  }

}
