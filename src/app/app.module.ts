import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomMaterialModule } from './material.module';


import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { RecipeViewComponent } from './recipe-page/recipe-view/recipe-view.component';
import { CommentComponent } from './recipe-page/comment/comment.component';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/reducers/auth.reducers';
import { recipeReducer } from './store/reducers/recipe.reducer';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { RecipeCollectionPageComponent } from './recipe-collection-page/recipe-collection-page.component';
import { RecipeItemComponent } from './recipe-collection-page/recipe-item/recipe-item.component';
import { AddRecipePageComponent } from './add-recipe-page/add-recipe-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    RecipePageComponent,
    RecipeViewComponent,
    CommentComponent,
    CalendarPageComponent,
    HomePageComponent,
    RecipeCollectionPageComponent,
    RecipeItemComponent,
    AddRecipePageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    StoreModule.forRoot({
      userState: authReducer,
      recipeState: recipeReducer
    })
  ],
providers: [AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
