import { Test, TestingModule } from '@nestjs/testing';
import { userFakeRepository } from 'src/base-fake/user';
import { UserService } from '../user.service';
import { IsUserNameUniqueConstraint } from './is-username-unique.validation';

describe('Validation username', () => {
    let isUserNameUniqueConstraint: IsUserNameUniqueConstraint;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IsUserNameUniqueConstraint,
                {
                    provide: UserService,
                    useValue: {
                        findByUserName: jest.fn().mockResolvedValue(userFakeRepository.findOne()),
                    },
                },
            ],
        }).compile();
        isUserNameUniqueConstraint = module.get<IsUserNameUniqueConstraint>(IsUserNameUniqueConstraint);
        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(isUserNameUniqueConstraint).toBeDefined();
        expect(userService).toBeDefined();
    });

    describe('validate', () => {
        it('should validate username is unique return *true*', async () => {
            // Arrange
            jest.spyOn(userService, 'findByUserName').mockResolvedValueOnce(undefined);

            // Act
            const response = await isUserNameUniqueConstraint.validate('username');

            // Assert
            expect(response).toEqual(true);
        });

        it('should validate username return *false*', async () => {
            // Arrange

            // Act
            const response = await isUserNameUniqueConstraint.validate('app error');

            // Assert
            expect(response).toEqual(false);
        });
    });

    describe('defaultMessage', () => {
        it('should validate username return *username is already in use*', async () => {
            // Arrange

            // Act
            const response = isUserNameUniqueConstraint.defaultMessage();

            // Assert
            expect(response).toEqual('username is already in use');
        });
    });
});
