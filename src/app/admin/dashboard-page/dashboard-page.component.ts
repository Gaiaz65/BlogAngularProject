import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/posts.service';
import { Post } from 'src/app/shared/interfaces';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];

  pSub: Subscription;

  dSub: Subscription;

  searchStr = '';

  constructor(private postsService: PostsService) { }
  

  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe( posts => {
      this.posts = posts
    })
  }
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }

  delete(id: string) {
    this.postsService.delete(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
    })
  }
  
}
