import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/commons/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ComponentGroupItemEntity } from '../item/entities/component-group-item.entity';

@Entity({ name: 'components_groups' })
export class ComponentGroupEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ type: () => ComponentGroupItemEntity, isArray: true })
  @OneToMany(() => ComponentGroupItemEntity, (value) => value.group)
  items: ComponentGroupItemEntity[];

  constructor(partial?: Partial<ComponentGroupEntity>) {
    super();
    Object.assign(this, partial);
  }
}
