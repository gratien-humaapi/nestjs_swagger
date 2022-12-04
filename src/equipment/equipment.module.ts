import { Module } from "@nestjs/common";
import { EquipmentService } from "./equipment.service";
import { EquipmentResolver } from "./equipment.resolver";

@Module({
  providers: [EquipmentService, EquipmentResolver]
})
export class EquipmentModule {}
