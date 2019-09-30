import { TestBed } from '@angular/core/testing';

import { RecipePageService } from './recipe-page.service';

describe('RecipePageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipePageService = TestBed.get(RecipePageService);
    expect(service).toBeTruthy();
  });
});
