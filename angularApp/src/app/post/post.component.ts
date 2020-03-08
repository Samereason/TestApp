import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostsService} from '../posts.service';
import {PostInterface} from "../models/PostInterface";
import {CommentsInterface} from "../models/CommentsInterface";
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  private post: PostInterface;
  private relatedPosts: PostInterface[];
  private postComments: CommentsInterface[];
  commentControl: FormControl;
  private postId: number;
  private postCommentsLoading: boolean = true;
  private relatedPostsLoading: boolean = true;

  constructor(private route: ActivatedRoute, private _postsService: PostsService) {}

  addComment() {
    if (this.commentControl.status === "VALID"){
      this.postComments.push({
          'postId': this.postId,
          'id': this.postId,
          'name': 'bob',
          'email': 'someEmail',
          'body': this.commentControl.value
        });
      this.commentControl.setValue('');
    } else console.log('comment min length is 1 symbol');
  };

  ngOnInit(): void {
    this.commentControl = new FormControl('', [Validators.required]);

    this.route.data.subscribe(data => {
      this.post = data.post;
      this.postId = this.post.id;

      this._postsService.getRelatedPosts(this.post.userId).subscribe((relatedPosts: PostInterface[]) => {
        this.relatedPosts = relatedPosts.slice(0, 3);
        this.relatedPostsLoading = false;
      }, error => {
        this.relatedPostsLoading = false;
        console.error(error);
      });

      this._postsService.getPostComments(this.post.id).subscribe((comments: CommentsInterface[]) => {
        this.postComments = comments;
        this.postCommentsLoading = false;
      }, error => {
        this.postCommentsLoading = false;
        console.error(error);
      });
    });
  }
}
