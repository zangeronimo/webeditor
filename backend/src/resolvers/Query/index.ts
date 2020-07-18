import * as user from './user';
import * as webClient from './System/webClient';
import * as webTool from './System/webTool';
import * as webRule from './System/webRule';

export = {
    ...user,
    ...webClient,
    ...webTool,
    ...webRule,
}