import db from '../../../config/db';
import { hashPassword } from '../../security';
import { webUser as getWebUser } from '../../Query/System/webUser';

const createWebUser = async (_, { data }, ctx) => {
    const webClient = ctx.getWebClient();
    if (!webClient || !ctx.hasPermission('RULE_ALTER_WEBUSER')) {
        return new Error('access denied');
    }

    try {

        // Password is required for a new User
        if (!data.password) {
            return new Error('password is required');
        }

        // Check if has webRules, save and remove then, only after create a user is possible add Rules.
        let webRules: [any]
        if (data.webRules) {
            webRules = data.webRules;

            // Remove webRules
            delete data.webRules
        }

        // Cript the password
        data.password = hashPassword(data.password);

        // add web_client_id from data structure.
        data.web_client_id = data.webClient;

        return db('web_user').insert(data)
            .then(async id => {
                // Check if has webRules to update
                if (webRules) {
                    await setRules(id, webRules);
                }
                return getWebUser(_, { filter: { id } }, ctx)
            })
            .catch(e => new Error(e.sqlMessage));
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

const updateWebUser = async (_, { filter, data }, ctx) => {
    const webClient = ctx.getWebClient();
    if (!webClient || !ctx.hasPermission('RULE_ALTER_WEBUSER')) {
        return new Error('access denied');
    }

    try {
        const webUser = await getWebUser(_, { filter }, ctx);
        if (webUser) {
            // Check if has webRules to update
            if (data.webRules) {
                try {
                    await setRules(webUser.id, data.webRules)
                } catch (e) {
                    throw new Error(e.sqlMessage);
                }

                // Remove webRules
                delete data.webRules
            }

            // Check if has a password and cript then
            if (data.password) {
                data.password = hashPassword(data.password);
            }

            // add web_client_id from data structure.
            data.web_client_id = data.webClient;

            const { id } = webUser;
            await db('web_user').where({ id, web_client_id: webClient }).update(data)
        }
        return !webUser ? null : { ...webUser, ...data };
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

const setRules = async (user: any, rules: [any]) => {
    //First empty all user rules
    await db('web_user_has_web_rule').where({ web_user_id: user }).delete();

    //Next iterate all rules and add to user
    try {
        rules.forEach(async rule => await db('web_user_has_web_rule').insert({ web_user_id: user, web_rule_id: rule.id }))
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

const deleteWebUser = async (_, { filter }, ctx) => {
    const webClient = ctx.getWebClient();
    if (!webClient || !ctx.hasPermission('RULE_DELETE_WEBUSER')) {
        return new Error('access denied');
    }

    try {
        const webUser = await getWebUser(_, { filter }, ctx);
        if (webUser) {
            const { id } = webUser;
            await db('web_user').where({ id, web_client_id: webClient }).delete();
        }

        return webUser;
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}


export {
    createWebUser,
    updateWebUser,
    deleteWebUser,
}