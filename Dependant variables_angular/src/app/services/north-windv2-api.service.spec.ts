import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NorthWindv2APIService } from './north-windv2-api.service';

describe('NorthWindv2APIService', () => {
  let service: NorthWindv2APIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(NorthWindv2APIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
