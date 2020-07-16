
exports.up = function (knex) {
    return knex.schema.createTable('web_user_has_web_rule', table => {
        table.integer('web_user_id').unsigned()
        table.integer('web_rule_id').unsigned()
        table.foreign('web_user_id').references('web_user.id')
        table.foreign('web_rule_id').references('web_rule.id')
        table.primary(['web_user_id', 'web_rule_id'])
    }).then(function () {
        return knex('web_user_has_web_rule').insert([
            { web_user_id: 1, web_rule_id: 1 },
            { web_user_id: 1, web_rule_id: 2 },
            { web_user_id: 1, web_rule_id: 3 },
        ])
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('web_user_has_web_rule')
};
