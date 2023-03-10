import { Test, TestingModule } from '@nestjs/testing';
import { branchFakeRepository } from 'src/base-fake/branch';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';

describe('BranchController', () => {
  let controller: BranchController;
  let service: BranchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BranchController],
      providers: [
        {
          provide: BranchService,
          useValue: {
            create: jest.fn().mockResolvedValue(branchFakeRepository.findOne()),
            find: jest.fn().mockResolvedValue(branchFakeRepository.find()),
            findById: jest.fn().mockResolvedValue(branchFakeRepository.findOne()),
            update: jest.fn().mockResolvedValue(branchFakeRepository.findOne()),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BranchController>(BranchController);
    service = module.get<BranchService>(BranchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('/ (POST)', () => {
    it('should create a branch', async () => {
      // Arrange
      const branch: CreateBranchDto = { id: 1, cnpj: '01.248.473/0001-75', name: 'branch1', fantasyName: 'fantasyName' };

      // Act
      const result = await controller.create(branch);

      // Assert
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(branch);

      expect(result).toEqual(branchFakeRepository.findOne());
    });
  });

  describe('/ (GET)', () => {
    it('should get branches no filter', async () => {
      // Arrange
      const filter = '';

      // Act
      const result = await controller.find(filter);

      // Assert
      expect(service.find).toHaveBeenCalledTimes(1);
      expect(service.find).toHaveBeenCalledWith(filter);

      expect(result).toEqual(branchFakeRepository.find());
    });

    it('should get branches with filter', async () => {
      // Arrange
      const filter = 'filter';

      // Act
      const result = await controller.find(filter);

      // Assert
      expect(service.find).toHaveBeenCalledTimes(1);
      expect(service.find).toHaveBeenCalledWith(filter);

      expect(result).toEqual(branchFakeRepository.find());
    });
  });

  describe('/:id (GET)', () => {
    it('should get a branch by id', async () => {
      // Arrange
      const id = 1;

      // Act
      const result = await controller.findById(id);

      // Assert
      expect(service.findById).toHaveBeenCalledTimes(1);
      expect(service.findById).toHaveBeenCalledWith(id);

      expect(result).toEqual(branchFakeRepository.findOne());
    });
  });

  describe('/:id (PUT)', () => {
    it('should update a branch', async () => {
      // Arrange
      const id = 1;
      const branch: CreateBranchDto = { id: 1, cnpj: '01.248.473/0001-75', name: 'branch1', fantasyName: 'fantasyName' };

      // Act
      const result = await controller.update(id, branch);

      // Assert
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith(id, branch);

      expect(result).toEqual(branchFakeRepository.findOne());
    });
  });

  describe('/:id (DELETE)', () => {
    it('should delete a branch', async () => {
      // Arrange
      const id = 1;

      // Act
      await controller.remove(id);

      // Assert
      expect(service.remove).toHaveBeenCalledTimes(1);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
