import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ComponentService } from './component.service';

import { ComponentEntity } from './entities/component.entity';

@ApiTags('Components')
@Controller('components')
@ApiBearerAuth()
export class ComponentsController {
    constructor(private readonly componentsService: ComponentService) {}

    @Get()
    @ApiQuery({ name: 'filter', required: false })
    @ApiQuery({ name: 'blocked', required: false })
    async find(@Query('filter') filter: string, @Query('blocked') blocked: boolean): Promise<ComponentEntity[]> {
        return this.componentsService.find(filter, blocked);
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<ComponentEntity> {
        return this.componentsService.findById(id);
    }
}