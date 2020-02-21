import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostsService} from '../posts.service';
import {PostInterface} from "../models/PostInterface";
import {CommentsInterface} from "../models/CommentsInterface";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  private post: PostInterface;
  private postComments: CommentsInterface[];

  constructor(private route: ActivatedRoute, private _postsService: PostsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._postsService.getPost(params.id).subscribe((post: PostInterface) => {
        this.post = post;
      }, error => console.error(error));

      this._postsService.getPostComments(params.id).subscribe((comments: CommentsInterface[]) => {
        this.postComments = comments;
      }, error => console.error(error));
    });
  }

}
