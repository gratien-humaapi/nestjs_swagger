import { EventArgs, EventSubscriber, wrap } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import { Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { CognitoService } from "src/cognito";

@Injectable()
export class CurrentUserORMSuscriber<T> implements EventSubscriber<T> {
  constructor(em: EntityManager, private _cognitoService: CognitoService) {
    em.getEventManager().registerSubscriber(this);
  }

  async beforeCreate(args: EventArgs<any>) {
    console.log("beforeCreate called");
    const { em, entity } = args;
    const baseClass = wrap(entity, true).__meta.extends;
    // console.log("ici", this._request);

    // console.log(baseClass);
    console.log(this._cognitoService.currentUser);

    // wrap(entity).assign(
    //   {
    //     tt: 466
    //   },
    //   { em }
    // );
    // managedEntity.assign
  }
}
