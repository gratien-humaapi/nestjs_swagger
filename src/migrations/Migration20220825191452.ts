import { Migration } from "@mikro-orm/migrations";

export class Migration20220825191452 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "currency" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "is_active" boolean not null, "code" varchar(255) not null, "name" varchar(255) not null, "symbol" varchar(255) not null, "fraction_unit" int not null, "fraction" varchar(255) not null, "format" varchar(255) not null, constraint "currency_pkey" primary key ("id"));'
    );

    this.addSql(
      'create table "session" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "device" varchar(255) not null, "token" varchar(255) not null, constraint "session_pkey" primary key ("id"));'
    );

    this.addSql(
      'create table "tenant" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "is_active" boolean not null, "status" text check ("status" in (\'active\', \'banned\', \'archived\')) not null, "name" varchar(255) not null, "description" varchar(255) not null, constraint "tenant_pkey" primary key ("id"));'
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "currency" cascade;');

    this.addSql('drop table if exists "session" cascade;');

    this.addSql('drop table if exists "tenant" cascade;');
  }
}
