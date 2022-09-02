import { Migration } from "@mikro-orm/migrations";

export class Migration20220829122518 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "tenant" drop constraint if exists "tenant_status_check";'
    );

    this.addSql('alter table "currency" alter column "id" drop default;');
    this.addSql(
      'alter table "currency" alter column "id" type uuid using ("id"::text::uuid);'
    );

    this.addSql(
      'alter table "tenant" alter column "status" type text using ("status"::text);'
    );
    this.addSql(
      "alter table \"tenant\" add constraint \"tenant_status_check\" check (\"status\" in ('active', 'pending', 'archived', 'banned'));"
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "currency" alter column "id" type text using ("id"::text);'
    );

    this.addSql(
      'alter table "tenant" drop constraint if exists "tenant_status_check";'
    );

    this.addSql(
      'alter table "currency" alter column "id" type varchar(255) using ("id"::varchar(255));'
    );

    this.addSql(
      'alter table "tenant" alter column "status" type text using ("status"::text);'
    );
    this.addSql(
      "alter table \"tenant\" add constraint \"tenant_status_check\" check (\"status\" in ('active', 'banned', 'archived'));"
    );
  }
}
