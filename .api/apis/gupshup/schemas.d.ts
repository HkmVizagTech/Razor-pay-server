declare const PostWaApiV1Msg: {
    readonly formData: {
        readonly type: "object";
        readonly required: readonly ["source", "destination", "src.name", "message"];
        readonly properties: {
            readonly source: {
                readonly type: "integer";
                readonly description: "Source Phone Number";
                readonly examples: readonly ["918929874278"];
            };
            readonly destination: {
                readonly type: "integer";
                readonly description: "Destination Phone Number";
                readonly examples: readonly ["918805162043"];
            };
            readonly "src.name": {
                readonly type: "string";
                readonly description: "App Name";
                readonly examples: readonly ["august18"];
            };
            readonly message: {
                readonly title: "Text message";
                readonly type: "object";
                readonly properties: {
                    readonly context: {
                        readonly type: "object";
                        readonly properties: {
                            readonly msgId: {
                                readonly type: "string";
                            };
                        };
                    };
                    readonly text: {
                        readonly type: "string";
                        readonly default: "Welcome to Gupshup";
                        readonly description: "Message text";
                    };
                    readonly type: {
                        readonly default: "text";
                        readonly type: "string";
                        readonly description: "Type of session message";
                    };
                    readonly previewUrl: {
                        readonly default: false;
                        readonly type: "boolean";
                        readonly description: "Enable preview if the text contains URL";
                    };
                };
                readonly required: readonly ["text"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly apikey: {
                    readonly type: "string";
                    readonly examples: readonly ["61b3021c97214370b341f8baaae0xxxx"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "APIKEY of your Gupshup Account";
                };
            };
            readonly required: readonly ["apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly examples: readonly ["submitted"];
                };
                readonly messageId: {
                    readonly type: "string";
                    readonly examples: readonly ["183dc8f1-7ecc-4419-895f-04fd0b1bfe07"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly anyOf: readonly [{
                readonly title: "Invalid Destination";
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly examples: readonly ["Invalid Destination"];
                    };
                    readonly status: {
                        readonly type: "string";
                        readonly examples: readonly ["error"];
                    };
                };
            }, {
                readonly title: "Invalid App details";
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly examples: readonly ["Invalid App Details"];
                    };
                    readonly status: {
                        readonly type: "string";
                        readonly examples: readonly ["error"];
                    };
                };
            }];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["Authentication Failed"];
                };
                readonly status: {
                    readonly type: "string";
                    readonly examples: readonly ["error"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["Too Many Requests"];
                };
                readonly status: {
                    readonly type: "string";
                    readonly examples: readonly ["error"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { PostWaApiV1Msg };
