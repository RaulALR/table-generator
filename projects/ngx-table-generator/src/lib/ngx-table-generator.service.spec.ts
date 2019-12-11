import { TestBed } from '@angular/core/testing';

import { TableGeneratorService } from './ngx-table-generator.service';

describe('TableGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableGeneratorService = TestBed.get(TableGeneratorService);
    expect(service).toBeTruthy();
  });
});
