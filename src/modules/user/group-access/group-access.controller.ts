import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserGroupAccessService } from './group-access.service';
import { CreateGroupAccessDto } from './dto/create-group-access.dto';
import { UserGroupAccessEntity } from './entities/group-access.entity';

@ApiTags('User Group Accesses')
@Controller('users/:id/group-accesses')
@ApiBearerAuth()
export class GroupAccessController {
    constructor(private readonly groupAccessService: UserGroupAccessService) {}

    @Post()
    @ApiResponse({ type: UserGroupAccessEntity, status: 201 })
    async create(@Body() createGroupAccessDto: CreateGroupAccessDto): Promise<UserGroupAccessEntity> {
        return this.groupAccessService.create(createGroupAccessDto);
    }

    @Get()
    async find(@Param('id', ParseIntPipe) id: number): Promise<UserGroupAccessEntity[]> {
        return this.groupAccessService.find(id);
    }

    @Get(':branchId')
    async findByBranchId(
        @Param('id', ParseIntPipe) id: number,
        @Param('branchId', ParseIntPipe) branchId: number
    ): Promise<UserGroupAccessEntity[]> {
        return this.groupAccessService.findByBranchId(id, branchId);
    }

    @Get(':branchId/:groupId')
    async findByBranchIdAndGroupId(
        @Param('id', ParseIntPipe) id: number,
        @Param('branchId', ParseIntPipe) branchId: number,
        @Param('groupId', ParseIntPipe) groupId: number
    ): Promise<UserGroupAccessEntity> {
        return this.groupAccessService.findByBranchIdAndGroupId(id, branchId, groupId);
    }

    @Delete(':branchId/:groupId')
    async remove(
        @Param('id', ParseIntPipe) id: number,
        @Param('branchId', ParseIntPipe) branchId: number,
        @Param('groupId', ParseIntPipe) groupId: number
    ): Promise<void> {
        this.groupAccessService.remove(id, branchId, groupId);
    }
}
