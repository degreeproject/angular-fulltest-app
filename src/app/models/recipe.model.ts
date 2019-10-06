export interface RecipeModel {
  description: string;
  image: string;
  ingredient: [{
    amount: number;
    unit: string;
    name: string;
  }];
  name: string;
  notes: string;
  step: [{
    description: string;
  }];
}
