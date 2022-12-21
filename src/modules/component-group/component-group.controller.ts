import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Component } from '../component/component.decorator';
import { ComponentGroupService } from './component-group.service';
import { CreateComponentGroupDto } from './dto/create-component-group.dto';
import { UpdateComponentGroupDto } from './dto/update-component-group.dto';
import { ComponentGroupEntity } from './entities/component-group.entity';

@ApiTags('Component Groups')
@Controller('component/groups')
@ApiBearerAuth()
@Component('ADMFM002', 'Manutenção do grupo de acesso')
export class ComponentGroupController {
    constructor(private readonly service: ComponentGroupService) {}

    @Post()
    async create(@Body() createComponentGroupDto: CreateComponentGroupDto): Promise<ComponentGroupEntity> {
        return this.service.create(createComponentGroupDto);
    }

    @Get()
    @ApiQuery({ name: 'name', type: 'string', required: false })
    async find(@Query('name') name: string): Promise<ComponentGroupEntity[]> {
        return this.service.find(name);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ComponentGroupEntity> {
        return this.service.findById(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateComponentGroupDto: UpdateComponentGroupDto): Promise<ComponentGroupEntity> {
        return this.service.update(id, updateComponentGroupDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.service.remove(id);
    }
}