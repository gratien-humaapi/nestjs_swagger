import { EventArgs, EventSubscriber, wrap } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { CognitoService } from "src/cognito";

@Injectable()
export class CurrentUserORMSuscriber<T> implements EventSubscriber<T> {
  constructor(em: EntityManager, private _cognitoService: CognitoService) {
    em.getEventManager().registerSubscriber(this);
  }

  async beforeCreate(args: EventArgs<any>) {
    console.log("beforeCreate called");
    this._injectOwner(args);
    // managedEntity.assign
  }

  private _injectOwner(args: EventArgs<any>) {
    const { em, entity } = args;
    const baseClass = wrap(entity, true).__meta.extends;
    if (baseClass.includes("BaseEntityWithTU")) {
      const { role, owner } = this._cognitoService.currentUser;
      const ownerId = role === "admin" ? (entity.id as string) : owner;
      console.log("in subscriber");

      wrap(entity).assign(
        {
          ownerId
        },
        { em }
      );
    }
  }
}
