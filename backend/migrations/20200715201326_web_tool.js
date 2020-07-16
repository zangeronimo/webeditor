
exports.up = function (knex) {
    return knex.schema.createTable('web_tool', table => {
        table.increments('id').primary()
        table.string('name', 45).notNull().unique()
        table.boolean('active')
            .notNull().defaultTo(true)
        table.timestamp('add_at')
            .defaultTo(knex.fn.now())
    }).then(function () {
        return knex('web_tool').insert([
            { id: 1, name: 'WEBEditor' },
        ])
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('web_tool')
};
