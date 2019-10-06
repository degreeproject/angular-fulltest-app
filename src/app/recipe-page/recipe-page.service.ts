import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipePageService {

  constructor(private http: HttpClient) { }

  reqHeader = new HttpHeaders({'No-Auth': 'true'});

  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>('api/recipe' , {headers: this.reqHeader});
  }

  getRecipe(id: any): Observable<any[]> {
    return this.http.get<any[]>('api/recipe/' + id  , {headers: this.reqHeader});
  }

  postRecipe(recipe: any): Observable<any> {
    console.log(recipe);
    return this.http.post<any>('api/recipe', recipe);
  }
  postRecipeComment(comment: any): Observable<any> {
    console.log(comment);
    return this.http.post<any>('api/recipe/comment', comment);
  }
}
