declare const PostMsg: {
    readonly formData: {
        readonly required: readonly ["channel", "source", "destination", "message", "src.name"];
        readonly type: "object";
        readonly properties: {
            readonly channel: {
                readonly type: "string";
                readonly description: "The channel for sending messages.";
                readonly examples: readonly ["whatsapp"];
            };
            readonly source: {
                readonly type: "integer";
                readonly format: "int64";
                readonly description: "Registered WhatsApp Business API phone number";
                readonly examples: readonly [917472850482];
                readonly minimum: -9223372036854776000;
                readonly maximum: 9223372036854776000;
            };
            readonly destination: {
                readonly type: "integer";
                readonly format: "int64";
                readonly description: "User's phone number";
                readonly examples: readonly [918748133759];
                readonly minimum: -9223372036854776000;
                readonly maximum: 9223372036854776000;
            };
            readonly message: {
                readonly type: "object";
                readonly oneOf: readonly [{
                    readonly title: "Text";
                    readonly required: readonly ["type", "text"];
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly examples: readonly ["text"];
                        };
                        readonly text: {
                            readonly type: "string";
                            readonly examples: readonly ["Hello user, how are you?"];
                        };
                    };
                }, {
                    readonly title: "Image";
                    readonly required: readonly ["type", "originalUrl", "previewUrl", "caption"];
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly examples: readonly ["image"];
                        };
                        readonly originalUrl: {
                            readonly type: "string";
                            readonly examples: readonly ["https://www.buildquickbots.com/whatsapp/media/sample/jpg/sample01.jpg"];
                        };
                        readonly previewUrl: {
                            readonly type: "string";
                            readonly examples: readonly ["https://www.buildquickbots.com/whatsapp/media/sample/jpg/sample01.jpg"];
                        };
                        readonly caption: {
                            readonly type: "string";
                            readonly examples: readonly ["Sample image"];
                        };
                    };
                }, {
                    readonly title: "Document";
                    readonly required: readonly ["type", "url", "filename"];
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly examples: readonly ["file"];
                        };
                        readonly url: {
                            readonly type: "string";
                            readonly examples: readonly ["https://www.buildquickbots.com/whatsapp/media/sample/pdf/sample01.pdf"];
                        };
                        readonly filename: {
                            readonly type: "string";
                            readonly examples: readonly ["Sample file"];
                        };
                    };
                }, {
                    readonly title: "Video";
                    readonly required: readonly ["type", "url", "caption"];
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly examples: readonly ["video"];
                        };
                        readonly url: {
                            readonly type: "string";
                            readonly examples: readonly ["https://www.buildquickbots.com/whatsapp/media/sample/video/sample01.mp4"];
                        };
                        readonly caption: {
                            readonly type: "string";
                            readonly examples: readonly ["Sample video"];
                        };
                    };
                }, {
                    readonly title: "Sticker";
                    readonly required: readonly ["type", "url"];
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly examples: readonly ["sticker"];
                        };
                        readonly url: {
                            readonly type: "string";
                            readonly examples: readonly ["http://www.buildquickbots.com/whatsapp/stickers/SampleSticker01.webp"];
                        };
                    };
                }, {
                    readonly title: "Interactive - List message";
                    readonly required: readonly ["type", "title", "body", "msgid", "globalButtons", "items"];
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly examples: readonly ["list"];
                        };
                        readonly title: {
                            readonly type: "string";
                            readonly examples: readonly ["title text"];
                        };
                        readonly body: {
                            readonly type: "string";
                            readonly examples: readonly ["body text"];
                        };
                        readonly msgid: {
                            readonly type: "string";
                            readonly examples: readonly ["list1"];
                        };
                        readonly globalButtons: {
                            readonly type: "array";
                            readonly items: {
                                readonly title: "List message - GlobalButton object";
                                readonly required: readonly ["type", "title"];
                                readonly type: "object";
                                readonly properties: {
                                    readonly type: {
                                        readonly type: "string";
                                        readonly examples: readonly ["text"];
                                    };
                                    readonly title: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Global button"];
                                    };
                                };
                            };
                            readonly description: "Global buttons array description";
                        };
                        readonly items: {
                            readonly type: "array";
                            readonly items: {
                                readonly title: "List message - Items object";
                                readonly required: readonly ["title", "subtitle", "options"];
                                readonly type: "object";
                                readonly properties: {
                                    readonly title: {
                                        readonly type: "string";
                                        readonly examples: readonly ["first Section"];
                                    };
                                    readonly subtitle: {
                                        readonly type: "string";
                                        readonly examples: readonly ["first Subtitle"];
                                    };
                                    readonly options: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly title: "List message - Options object";
                                            readonly required: readonly ["type", "title", "description", "postbackText"];
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly type: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["text"];
                                                };
                                                readonly title: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["section 1 row 1"];
                                                };
                                                readonly description: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["first row of first section description"];
                                                };
                                                readonly postbackText: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["section 1 row 1 postback payload"];
                                                };
                                            };
                                        };
                                        readonly description: "";
                                    };
                                };
                            };
                            readonly description: "Items array description";
                        };
                    };
                }, {
                    readonly title: "Quick reply - text";
                    readonly required: readonly ["type", "msgid", "content", "options"];
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly examples: readonly ["quick_reply"];
                        };
                        readonly msgid: {
                            readonly type: "string";
                            readonly examples: readonly ["qr1"];
                        };
                        readonly content: {
                            readonly title: "Quick reply - Text Content object";
                            readonly required: readonly ["type", "header", "text", "caption"];
                            readonly type: "object";
                            readonly properties: {
                                readonly type: {
                                    readonly type: "string";
                                    readonly examples: readonly ["text"];
                                };
                                readonly header: {
                                    readonly type: "string";
                                    readonly examples: readonly ["this is the header"];
                                };
                                readonly text: {
                                    readonly type: "string";
                                    readonly examples: readonly ["this is the body"];
                                };
                                readonly caption: {
                                    readonly type: "string";
                                    readonly examples: readonly ["this is the footer"];
                                };
                            };
                        };
                        readonly options: {
                            readonly type: "array";
                            readonly items: {
                                readonly title: "Quick reply - Options object";
                                readonly required: readonly ["type", "title"];
                                readonly type: "object";
                                readonly properties: {
                                    readonly type: {
                                        readonly type: "string";
                                        readonly examples: readonly ["text"];
                                    };
                                    readonly title: {
                                        readonly type: "string";
                                        readonly examples: readonly ["First"];
                                    };
                                };
                            };
                            readonly description: "";
                        };
                    };
                }, {
                    readonly title: "Quick reply - Image/Video";
                    readonly required: readonly ["type", "msgid", "content", "options"];
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly examples: readonly ["quick_reply"];
                        };
                        readonly msgid: {
                            readonly type: "string";
                            readonly examples: readonly ["qr1"];
                        };
                        readonly content: {
                            readonly title: "Quick reply - Image/Video Content object";
                            readonly required: readonly ["type", "url", "text", "caption"];
                            readonly type: "object";
                            readonly properties: {
                                readonly type: {
                                    readonly type: "string";
                                    readonly examples: readonly ["image/video"];
                                };
                                readonly url: {
                                    readonly type: "string";
                                    readonly examples: readonly ["https://www.buildquickbots.com/whatsapp/media/sample/jpg/sample01.jpg"];
                                };
                                readonly text: {
                                    readonly type: "string";
                                    readonly examples: readonly ["this is the body"];
                                };
                                readonly caption: {
                                    readonly type: "string";
                                    readonly examples: readonly ["this is the footer"];
                                };
                            };
                        };
                        readonly options: {
                            readonly type: "array";
                            readonly items: {
                                readonly title: "Quick reply - Options object";
                                readonly required: readonly ["type", "title"];
                                readonly type: "object";
                                readonly properties: {
                                    readonly type: {
                                        readonly type: "string";
                                        readonly examples: readonly ["text"];
                                    };
                                    readonly title: {
                                        readonly type: "string";
                                        readonly examples: readonly ["First"];
                                    };
                                };
                            };
                            readonly description: "";
                        };
                    };
                }, {
                    readonly title: "Quick reply - File";
                    readonly required: readonly ["type", "msgid", "content", "options"];
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly examples: readonly ["quick_reply"];
                        };
                        readonly msgid: {
                            readonly type: "string";
                            readonly examples: readonly ["qr1"];
                        };
                        readonly content: {
                            readonly title: "Quick reply - File Content object";
                            readonly required: readonly ["type", "url", "text", "filename", "caption"];
                            readonly type: "object";
                            readonly properties: {
                                readonly type: {
                                    readonly type: "string";
                                    readonly examples: readonly ["file"];
                                };
                                readonly url: {
                                    readonly type: "string";
                                    readonly examples: readonly ["https://www.buildquickbots.com/whatsapp/media/sample/pdf/sample01.pdf"];
                                };
                                readonly text: {
                                    readonly type: "string";
                                    readonly examples: readonly ["this is the body"];
                                };
                                readonly filename: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Sample file"];
                                };
                                readonly caption: {
                                    readonly type: "string";
                                    readonly examples: readonly ["this is the footer"];
                                };
                            };
                        };
                        readonly options: {
                            readonly type: "array";
                            readonly items: {
                                readonly title: "Quick reply - Options object";
                                readonly required: readonly ["type", "title"];
                                readonly type: "object";
                                readonly properties: {
                                    readonly type: {
                                        readonly type: "string";
                                        readonly examples: readonly ["text"];
                                    };
                                    readonly title: {
                                        readonly type: "string";
                                        readonly examples: readonly ["First"];
                                    };
                                };
                            };
                            readonly description: "";
                        };
                    };
                }, {
                    readonly title: "Location message";
                    readonly required: readonly ["type", "longitude", "latitude", "name", "address"];
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly examples: readonly ["location"];
                        };
                        readonly longitude: {
                            readonly type: "number";
                            readonly examples: readonly [72.877655];
                        };
                        readonly latitude: {
                            readonly type: "number";
                            readonly examples: readonly [19.075983];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly examples: readonly ["Mumbai"];
                        };
                        readonly address: {
                            readonly type: "string";
                            readonly examples: readonly ["Mumbai, Maharashtra"];
                        };
                    };
                }, {
                    readonly title: "Contact message";
                    readonly required: readonly ["type", "contact"];
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly examples: readonly ["contact"];
                        };
                        readonly contact: {
                            readonly title: "Contact Object";
                            readonly required: readonly ["addresses", "birthday", "emails", "name", "org", "phones", "urls"];
                            readonly type: "object";
                            readonly properties: {
                                readonly addresses: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly title: "Contact - Address object";
                                        readonly required: readonly ["city", "country", "countryCode", "state", "street", "type", "zip"];
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly city: {
                                                readonly type: "string";
                                                readonly examples: readonly ["Menlo Park"];
                                            };
                                            readonly country: {
                                                readonly type: "string";
                                                readonly examples: readonly ["United States"];
                                            };
                                            readonly countryCode: {
                                                readonly type: "string";
                                                readonly examples: readonly ["us"];
                                            };
                                            readonly state: {
                                                readonly type: "string";
                                                readonly examples: readonly ["CA"];
                                            };
                                            readonly street: {
                                                readonly type: "string";
                                                readonly examples: readonly ["1 Hacker Way"];
                                            };
                                            readonly type: {
                                                readonly type: "string";
                                                readonly examples: readonly ["HOME"];
                                            };
                                            readonly zip: {
                                                readonly type: "string";
                                                readonly examples: readonly ["94025"];
                                            };
                                        };
                                    };
                                    readonly description: "";
                                };
                                readonly birthday: {
                                    readonly type: "string";
                                    readonly examples: readonly ["1995-08-18"];
                                };
                                readonly emails: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly title: "Contact - Email object";
                                        readonly required: readonly ["email", "type"];
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly email: {
                                                readonly type: "string";
                                                readonly examples: readonly ["personal.mail@gupshup.io"];
                                            };
                                            readonly type: {
                                                readonly type: "string";
                                                readonly examples: readonly ["Personal"];
                                            };
                                        };
                                    };
                                    readonly description: "";
                                };
                                readonly name: {
                                    readonly title: "Contact - Name object";
                                    readonly required: readonly ["firstName", "formattedName", "lastName"];
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly firstName: {
                                            readonly type: "string";
                                            readonly examples: readonly ["John"];
                                        };
                                        readonly formattedName: {
                                            readonly type: "string";
                                            readonly examples: readonly ["John Wick"];
                                        };
                                        readonly lastName: {
                                            readonly type: "string";
                                            readonly examples: readonly ["Wick"];
                                        };
                                    };
                                };
                                readonly org: {
                                    readonly title: "Contact - Org object";
                                    readonly required: readonly ["company", "department", "title"];
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly company: {
                                            readonly type: "string";
                                            readonly examples: readonly ["Guspshup"];
                                        };
                                        readonly department: {
                                            readonly type: "string";
                                            readonly examples: readonly ["Product"];
                                        };
                                        readonly title: {
                                            readonly type: "string";
                                            readonly examples: readonly ["Manager"];
                                        };
                                    };
                                };
                                readonly phones: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly title: "Contact - Phone object";
                                        readonly required: readonly ["phone", "type"];
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly phone: {
                                                readonly type: "string";
                                                readonly examples: readonly ["+1 (940) 555-1234"];
                                            };
                                            readonly type: {
                                                readonly type: "string";
                                                readonly examples: readonly ["HOME"];
                                            };
                                            readonly wa_id: {
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                    readonly description: "";
                                };
                                readonly urls: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly title: "Contact - Url object";
                                        readonly required: readonly ["url", "type"];
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly url: {
                                                readonly type: "string";
                                                readonly examples: readonly ["https://www.gupshup.io"];
                                            };
                                            readonly type: {
                                                readonly type: "string";
                                                readonly examples: readonly ["WORK"];
                                            };
                                        };
                                    };
                                    readonly description: "";
                                };
                            };
                        };
                    };
                }];
            };
            readonly "src.name": {
                readonly type: "string";
                readonly description: "The Gupshup app name registered against the phone number provided in the API.";
                readonly examples: readonly ["myapp"];
            };
            readonly disablePreview: {
                readonly type: "boolean";
                readonly description: "This is only applicable for text messages. By default, the mobile WhatsApp application recognizes URLs and makes them clickable. To include a URL preview, include \"preview_url\": true in the message body and make sure the URL begins with http:// or https://. A hostname is required, IP addresses are not matched.";
                readonly examples: readonly [false];
            };
            readonly encode: {
                readonly type: "boolean";
                readonly description: "This flag is used for sending an emoji in an Interactive List message. If the list message consists of emojis, set the encode flag to 'true'. This flag will not affect any other type of message.";
                readonly examples: readonly [false];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Content-Type": {
                    readonly enum: readonly ["application/x-www-form-urlencoded"];
                    readonly type: "string";
                    readonly examples: readonly ["application/x-www-form-urlencoded"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly apikey: {
                    readonly type: "string";
                    readonly examples: readonly ["092707e8296649XXXX94c0fXXX818ad"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["Content-Type", "apikey"];
        }];
    };
    readonly response: {
        readonly "2XX": {
            readonly type: "object";
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly description: "The API call was successfully made and the request is submitted.";
                    readonly examples: readonly ["submitted"];
                };
                readonly messageId: {
                    readonly type: "string";
                    readonly description: "It is the unique identifier for a message. You can track message status via the DLR message events obtained on the webhook.";
                    readonly examples: readonly ["ee4a68a0-1203-4c85-8dc3-49d0b3226a35"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { PostMsg };
