import { TestBed } from '@angular/core/testing';

import { CurrencyNewsService } from './currency-news.service';

describe('CurrencyNewsService', () => {
  let service: CurrencyNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
