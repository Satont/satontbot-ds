import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('aliases', table => {
    table.increments('id').primary(),
    table.text('command').notNullable(),
    table.text('name').notNullable().unique()
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('guilds')
}

