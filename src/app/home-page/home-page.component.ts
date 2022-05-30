import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Post } from '../shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(private postService: PostsService
  ) {}

  ngOnInit(): void {
    this.posts$ = this.postService.getAll()
  }

}
