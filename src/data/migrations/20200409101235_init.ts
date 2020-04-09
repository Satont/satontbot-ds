import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return await Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id').primary(),
      table.bigInteger('userId').unique().notNullable(),
      table.bigInteger('guildId').notNullable(),
      table.text('username').nullable(),
      table.integer('time').defaultTo(0),
      table.integer('messages').defaultTo(0),
      table.integer('expirience').defaultTo(0),
      table.timestamp('expirienceTimestamp')
    }),
    knex.schema.createTable('spam_warnings', table => {
      table.increments('id').primary(),
      table.bigInteger('userId').unique().notNullable(),
      table.bigInteger('guildId').notNullable()
    }),
    knex.schema.createTable('links_warnings', table => {
      table.increments('id').primary(),
      table.bigInteger('userId').unique().notNullable(),
      table.bigInteger('guildId').notNullable()
    })
  ])
}


export async function down(knex: Knex): Promise<any> {
  return await Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('spam_warnings'),
    knex.schema.dropTable('links_warnings')
  ])
}

