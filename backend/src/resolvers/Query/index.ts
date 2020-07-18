import * as user from './user';
import * as webClient from './System/webClient';
import * as webTool from './System/webTool';

export = {
    ...user,
    ...webClient,
    ...webTool,
}