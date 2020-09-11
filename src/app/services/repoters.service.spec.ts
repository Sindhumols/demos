import { TestBed } from '@angular/core/testing';

import { RepotersService } from './repoters.service';

describe('RepotersService', () => {
  let service: RepotersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepotersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
