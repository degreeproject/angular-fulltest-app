import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {

  constructor() {  }

  /**
   * Passed variable from recipe-page component
   */
  @Input() recipe: any;

  ngOnInit() {
  }
}
