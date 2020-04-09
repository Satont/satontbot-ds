import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('guilds', table => {
    table.increments('id').primary(),
    table.text('name'),
    table.bigInteger('guildId').unique().notNullable(),
    table.string('prefix')
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('guilds')
}

