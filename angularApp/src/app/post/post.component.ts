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
  private postLoading: boolean = true;

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

    this.route.params.subscribe(params => {
      this.postId = params.id;

      this._postsService.getPost(params.id).subscribe((post: PostInterface) => {
        this.post = post;
        this.postLoading = false;

        this._postsService.getRelatedPosts(post.userId).subscribe((relatedPosts: PostInterface[]) => {
          this.relatedPosts = relatedPosts.slice(0, 3);
        }, error => console.error(error));
      }, error => {
        this.postLoading = false;
        console.error(error);
      });

      this._postsService.getPostComments(params.id).subscribe((comments: CommentsInterface[]) => {
        this.postComments = comments;
      }, error => console.error(error));
    });
  }
}
