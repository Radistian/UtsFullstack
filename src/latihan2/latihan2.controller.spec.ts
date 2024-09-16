import { Test, TestingModule } from '@nestjs/testing';
import { Latihan2Controller } from './latihan2.controller';

describe('Latihan2Controller', () => {
  let controller: Latihan2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Latihan2Controller],
    }).compile();

    controller = module.get<Latihan2Controller>(Latihan2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
