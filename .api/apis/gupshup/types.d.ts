import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';
export type PostWaApiV1MsgFormDataParam = FromSchema<typeof schemas.PostWaApiV1Msg.formData>;
export type PostWaApiV1MsgMetadataParam = FromSchema<typeof schemas.PostWaApiV1Msg.metadata>;
export type PostWaApiV1MsgResponse200 = FromSchema<typeof schemas.PostWaApiV1Msg.response['200']>;
export type PostWaApiV1MsgResponse400 = FromSchema<typeof schemas.PostWaApiV1Msg.response['400']>;
export type PostWaApiV1MsgResponse401 = FromSchema<typeof schemas.PostWaApiV1Msg.response['401']>;
export type PostWaApiV1MsgResponse429 = FromSchema<typeof schemas.PostWaApiV1Msg.response['429']>;
