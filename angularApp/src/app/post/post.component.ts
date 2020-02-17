import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostsService} from '../posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  private post;

  constructor(private route: ActivatedRoute, private _postsService: PostsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._postsService.getPost(params.id).subscribe(post => {
        this.post = post;
      });
    });
  }

}
