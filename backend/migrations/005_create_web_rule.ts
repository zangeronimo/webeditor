import knex from 'knex';

export async function up(knex: knex) {
    return knex.schema.createTable('web_rule', table => {
        table.increments('id').primary();
        table.string('name', 45).notNullable();
        table.string('label', 45).notNullable();
        table.boolean('active').notNullable().defaultTo(true);
        table.timestamp('add_at').defaultTo(knex.fn.now());
        table.integer('web_tool_id').unsigned()

        table.foreign('web_tool_id')
            .references('web_tool.id')
            .onUpdate('CASCADE')
            .onUpdate('CASCADE');

    }).then(function () {
        return knex('web_rule').insert([
            {
                id: 1,
                name: 'RULE_VIEW_WEBUSER',
                label: 'Visualizar Usuários',
                web_tool_id: 1,
            },
            {
                id: 2,
                name: 'RULE_ALTER_WEBUSER',
                label: 'Alterar Usuários',
                web_tool_id: 1,
            },
            {
                id: 3,
                name: 'RULE_DELETE_WEBUSER',
                label: 'Remover Usuários',
                web_tool_id: 1,
            },
        ])
    })
};

export async function down(knex: knex) {
    return knex.schema.dropTable('web_rule');
};
