import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../shared/services/alert.service';


@Component({
  selector: 'app-createposts-page',
  templateUrl: './createposts-page.component.html',
  styleUrls: ['./createposts-page.component.scss'],
})
export class CreatepostsPageComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private postsService: PostsService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid){
      return
    }
    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date()
    }
    this.postsService.create(post).subscribe(() => {
      this.form.reset();
      this.alertService.success('Post has been added');
    })
  }

}
