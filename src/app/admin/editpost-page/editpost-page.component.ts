import { Subscription } from 'rxjs';
/* eslint-disable no-useless-constructor */
/* eslint-disable arrow-body-style */
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from 'src/app/shared/posts.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-editpost-page',
  templateUrl: './editpost-page.component.html',
  styleUrls: ['./editpost-page.component.scss']
})
export class EditpostPageComponent implements OnInit, OnDestroy {
  form: FormGroup;

  post: Post;

  submitted = false;

  ubSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
      })
    })
  }

  ngOnDestroy() {
    if (this.ubSub) {
      this.ubSub.unsubscribe()
    }
    
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true

    this.ubSub = this.postService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
    })
      .subscribe(() => {
        this.submitted = false
      })
    
  }
}