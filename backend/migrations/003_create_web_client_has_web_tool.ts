import knex from 'knex';

export async function up(knex: knex) {
    return knex.schema.createTable('web_client_has_web_tool', table => {
        table.integer('web_client_id').unsigned();
        table.integer('web_tool_id').unsigned();

        table.foreign('web_client_id')
            .references('web_client.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.foreign('web_tool_id')
            .references('web_tool.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.primary(['web_client_id', 'web_tool_id']);
    }).then(function () {
        return knex('web_client_has_web_tool').insert([
            { web_client_id: 1, web_tool_id: 1 },
        ])
    })
};

export async function down(knex: knex) {
    return knex.schema.dropTable('web_client_has_web_tool');
};
