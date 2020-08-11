import knex from 'knex';

export async function up(knex: knex) {
    return knex.schema.createTable('web_tool', table => {
        table.increments('id').primary();
        table.string('name', 45).notNullable().unique();
        table.boolean('active').notNullable().defaultTo(true);
        table.timestamp('add_at').defaultTo(knex.fn.now());
    }).then(function () {
        return knex('web_tool').insert([
            { id: 1, name: 'WEBEditor' },
        ])
    })
};

export async function down(knex: knex) {
    return knex.schema.dropTable('web_tool');
};
