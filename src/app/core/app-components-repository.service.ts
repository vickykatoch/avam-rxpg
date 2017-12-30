import { Injectable } from '@angular/core';
import { WinInfo } from '../models';

export interface ComponentDefinition {
  name : string;
  type : any;
  height: number;
  width: number;
}


@Injectable()
export class AppComponentsRepository {
  private componentsRepository = new Map<string,ComponentDefinition>();
  private logger = console;

  constructor() { }

  register(name: string, componentType: any, defaultHeight: number = 600, defaultWidth: number = 400) {
    if(!this.componentsRepository.has(name)) {
      this.componentsRepository.set(name,{ name, type : componentType, height: defaultHeight, width: defaultWidth});
    } else {
      this.logger.warn(`Component : [${name}] ignored as it already exists`);
    }
  }

  getComponentDefinition(name: string) : ComponentDefinition {
    if(this.componentsRepository.has(name)) {
      return this.componentsRepository.get(name);
    }
    throw new Error('Component does not exists');
  }
}
