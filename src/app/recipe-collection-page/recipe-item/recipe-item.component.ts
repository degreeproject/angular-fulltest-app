import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  constructor() { }

  /**
   * the recipe that should be represented by the recipe-item
   */
  @Input() recipe: any;
  ngOnInit() {
  }

}
