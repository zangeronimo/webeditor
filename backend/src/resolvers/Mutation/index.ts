import * as webUser from './System/webUser';
import * as webClient from './System/webClient';
import * as webTool from './System/webTool';
import * as webRule from './System/webRule';

export default {
    ...webUser,
    ...webClient,
    ...webTool,
    ...webRule,
}