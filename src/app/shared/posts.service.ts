import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { environment } from './../../environments/environment.prod';
import { Post } from './interfaces';



@Injectable({ providedIn: 'root' })

export class PostsService {
  constructor( private http: HttpClient){}

  create(post: Post): Observable <Post> {
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
    .pipe(map((response: any) => {  /* There should be a POST type, but it returns error */
      return {
        ...post,
        id: response.name,
        date: new Date(post.date)
      }
      }))
  }

  getAll(): Observable<Post[]> {
    return this.http.get (`${environment.fbDbUrl}/posts.json`)
      .pipe(map((response:{[key:string]:any}) =>{
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id:key,
            date: new Date(response[key].date)
          }))
    }))
   }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(map((post: Post) => {
        return {
          ...post, id,
          date: new Date(post.date)
        }
      }))
  }


   delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post);
  }

}