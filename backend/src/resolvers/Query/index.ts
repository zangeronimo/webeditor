import * as webUser from './System/webUser';
import * as webClient from './System/webClient';
import * as webTool from './System/webTool';
import * as webRule from './System/webRule';
import * as auth from './Authentication/auth';

export default {
    ...webUser,
    ...webClient,
    ...webTool,
    ...webRule,
    ...auth,
}