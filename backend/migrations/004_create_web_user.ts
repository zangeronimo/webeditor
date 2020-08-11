import knex from 'knex';

export async function up(knex: knex) {
    return knex.schema.createTable('web_user', table => {
        table.increments('id').primary();
        table.string('name', 45).notNullable(),
            table.string('email', 45).notNullable().unique();
        table.string('password', 60).notNullable();
        table.string('avatar', 60).notNullable();
        table.boolean('active').notNullable().defaultTo(true);
        table.timestamp('add_at').defaultTo(knex.fn.now());
        table.integer('web_client_id').unsigned();

        table.foreign('web_client_id')
            .references('web_client.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

    }).then(function () {
        return knex('web_user').insert([
            {
                id: 1,
                name: 'Luciano Zangeronimo',
                email: 'zangeronimo@gmail.com',
                password: '$2y$10$50tr8dyAkODWQmzjJsSmy.vAPFmqYCKZ3QrKs0UA8qBs/zobI1PUC',
                avatar: 'https://avatars3.githubusercontent.com/u/25505669?v=4',
                web_client_id: 1,
            },
        ])
    })
};

export async function down(knex: knex) {
    return knex.schema.dropTable('web_user');
};
