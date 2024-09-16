import { Test, TestingModule } from '@nestjs/testing';
import { Latihan2Service } from './latihan2.service';

describe('Latihan2Service', () => {
  let service: Latihan2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Latihan2Service],
    }).compile();

    service = module.get<Latihan2Service>(Latihan2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
