
exports.up = function (knex) {
    return knex.schema.createTable('web_user', table => {
        table.increments('id').primary()
        table.string('name', 45).notNull()
        table.string('email', 45).notNull().unique()
        table.string('password', 60)
        table.string('avatar', 60)
        table.boolean('active')
            .notNull().defaultTo(true)
        table.timestamp('add_at')
            .defaultTo(knex.fn.now())
        table.integer('web_client_id').unsigned()
        table.foreign('web_client_id').references('web_client.id')
    }).then(function () {
        return knex('web_user').insert([
            {
                id: 1,
                name: 'Luciano Zangeronimo',
                email: 'zangeronimo@gmail.com',
                password: '$2y$10$50tr8dyAkODWQmzjJsSmy.vAPFmqYCKZ3QrKs0UA8qBs/zobI1PUC',
                web_client_id: 1,
            },
        ])
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('web_user')
};
