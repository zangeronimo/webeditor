
import knex from 'knex';

export async function up(knex: knex) {
    return knex.schema.createTable('web_client', table => {
        table.increments('id').primary();
        table.string('name', 45).notNullable();
        table.string('password', 60).notNullable();
        table.boolean('active').notNullable().defaultTo(true);
        table.timestamp('add_at').defaultTo(knex.fn.now());
    }).then(function () {
        return knex('web_client').insert([
            {
                id: 1,
                name: 'Tudo Linux',
                password: '$2y$10$50tr8dyAkODWQmzjJsSmy.vAPFmqYCKZ3QrKs0UA8qBs/zobI1PUC'
            },
        ])
    })
};

export async function down(knex: knex) {
    return knex.schema.dropTable('web_client');
};
