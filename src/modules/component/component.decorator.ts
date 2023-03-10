import { SetMetadata } from '@nestjs/common';
import { ComponentEntity } from './entities/component.entity';

export const components: ComponentEntity[] = new Array<ComponentEntity>();

export const COMPONENT_KEY = 'component_key';
export const COMPONENT_DESC = 'component_desc';

export const ApiComponent = (component: string, describe: string, deprecated = false) => {
  if (components.filter((x) => x.id == component).length > 0) {
    console.log(`${component} has already been declared for another component`);
    throw new Error('duplicate component');
  }

  components.push({ id: component, name: describe, deprecated: deprecated });

  SetMetadata(COMPONENT_DESC, describe);
  return SetMetadata(COMPONENT_KEY, component);
};
