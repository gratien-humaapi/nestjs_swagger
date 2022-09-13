import { EventArgs, EventSubscriber, wrap } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CurrentUserORMSuscriber<T> implements EventSubscriber<T> {
  constructor(em: EntityManager) {
    em.getEventManager().registerSubscriber(this);
  }

  async beforeCreate(args: EventArgs<any>) {
    console.log("beforeCreate called");
    const { em, entity } = args;
    const baseClass = wrap(entity, true).__meta.extends;
    console.log(baseClass);
    console.log(entity);

    // wrap(entity).assign(
    //   {
    //     tt: 466
    //   },
    //   { em }
    // );
    // managedEntity.assign
  }
}
