var $protobuf = window.protobuf;
$protobuf.roots.default=window;
// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.PBMassage = (function() {

    /**
     * Namespace PBMassage.
     * @exports PBMassage
     * @namespace
     */
    var PBMassage = {};

    PBMassage.AwesomeMessage = (function() {

        /**
         * Properties of an AwesomeMessage.
         * @memberof PBMassage
         * @interface IAwesomeMessage
         * @property {string} awesome_field AwesomeMessage awesome_field
         */

        /**
         * Constructs a new AwesomeMessage.
         * @memberof PBMassage
         * @classdesc Represents an AwesomeMessage.
         * @implements IAwesomeMessage
         * @constructor
         * @param {PBMassage.IAwesomeMessage=} [properties] Properties to set
         */
        function AwesomeMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AwesomeMessage awesome_field.
         * @member {string} awesome_field
         * @memberof PBMassage.AwesomeMessage
         * @instance
         */
        AwesomeMessage.prototype.awesome_field = "";

        /**
         * Creates a new AwesomeMessage instance using the specified properties.
         * @function create
         * @memberof PBMassage.AwesomeMessage
         * @static
         * @param {PBMassage.IAwesomeMessage=} [properties] Properties to set
         * @returns {PBMassage.AwesomeMessage} AwesomeMessage instance
         */
        AwesomeMessage.create = function create(properties) {
            return new AwesomeMessage(properties);
        };

        /**
         * Encodes the specified AwesomeMessage message. Does not implicitly {@link PBMassage.AwesomeMessage.verify|verify} messages.
         * @function encode
         * @memberof PBMassage.AwesomeMessage
         * @static
         * @param {PBMassage.IAwesomeMessage} message AwesomeMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AwesomeMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.awesome_field);
            return writer;
        };

        /**
         * Encodes the specified AwesomeMessage message, length delimited. Does not implicitly {@link PBMassage.AwesomeMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof PBMassage.AwesomeMessage
         * @static
         * @param {PBMassage.IAwesomeMessage} message AwesomeMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AwesomeMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AwesomeMessage message from the specified reader or buffer.
         * @function decode
         * @memberof PBMassage.AwesomeMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PBMassage.AwesomeMessage} AwesomeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AwesomeMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PBMassage.AwesomeMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.awesome_field = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("awesome_field"))
                throw $util.ProtocolError("missing required 'awesome_field'", { instance: message });
            return message;
        };

        /**
         * Decodes an AwesomeMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof PBMassage.AwesomeMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {PBMassage.AwesomeMessage} AwesomeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AwesomeMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AwesomeMessage message.
         * @function verify
         * @memberof PBMassage.AwesomeMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AwesomeMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.awesome_field))
                return "awesome_field: string expected";
            return null;
        };

        return AwesomeMessage;
    })();

    PBMassage.GM_VerifyVersion = (function() {

        /**
         * Properties of a GM_VerifyVersion.
         * @memberof PBMassage
         * @interface IGM_VerifyVersion
         * @property {string} version GM_VerifyVersion version
         * @property {number} platform 平台
         * @property {number|null} [istest] 0、正常，1、测试，不需要验证版本
         */

        /**
         * Constructs a new GM_VerifyVersion.
         * @memberof PBMassage
         * @classdesc Represents a GM_VerifyVersion.
         * @implements IGM_VerifyVersion
         * @constructor
         * @param {PBMassage.IGM_VerifyVersion=} [properties] Properties to set
         */
        function GM_VerifyVersion(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GM_VerifyVersion version.
         * @member {string} version
         * @memberof PBMassage.GM_VerifyVersion
         * @instance
         */
        GM_VerifyVersion.prototype.version = "";

        /**
         * 平台
         * @member {number} platform
         * @memberof PBMassage.GM_VerifyVersion
         * @instance
         */
        GM_VerifyVersion.prototype.platform = 0;

        /**
         * 0、正常，1、测试，不需要验证版本
         * @member {number} istest
         * @memberof PBMassage.GM_VerifyVersion
         * @instance
         */
        GM_VerifyVersion.prototype.istest = 0;

        /**
         * Creates a new GM_VerifyVersion instance using the specified properties.
         * @function create
         * @memberof PBMassage.GM_VerifyVersion
         * @static
         * @param {PBMassage.IGM_VerifyVersion=} [properties] Properties to set
         * @returns {PBMassage.GM_VerifyVersion} GM_VerifyVersion instance
         */
        GM_VerifyVersion.create = function create(properties) {
            return new GM_VerifyVersion(properties);
        };

        /**
         * Encodes the specified GM_VerifyVersion message. Does not implicitly {@link PBMassage.GM_VerifyVersion.verify|verify} messages.
         * @function encode
         * @memberof PBMassage.GM_VerifyVersion
         * @static
         * @param {PBMassage.IGM_VerifyVersion} message GM_VerifyVersion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GM_VerifyVersion.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.version);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.platform);
            if (message.istest != null && message.hasOwnProperty("istest"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.istest);
            return writer;
        };

        /**
         * Encodes the specified GM_VerifyVersion message, length delimited. Does not implicitly {@link PBMassage.GM_VerifyVersion.verify|verify} messages.
         * @function encodeDelimited
         * @memberof PBMassage.GM_VerifyVersion
         * @static
         * @param {PBMassage.IGM_VerifyVersion} message GM_VerifyVersion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GM_VerifyVersion.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GM_VerifyVersion message from the specified reader or buffer.
         * @function decode
         * @memberof PBMassage.GM_VerifyVersion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PBMassage.GM_VerifyVersion} GM_VerifyVersion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GM_VerifyVersion.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PBMassage.GM_VerifyVersion();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.version = reader.string();
                    break;
                case 2:
                    message.platform = reader.int32();
                    break;
                case 3:
                    message.istest = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("version"))
                throw $util.ProtocolError("missing required 'version'", { instance: message });
            if (!message.hasOwnProperty("platform"))
                throw $util.ProtocolError("missing required 'platform'", { instance: message });
            return message;
        };

        /**
         * Decodes a GM_VerifyVersion message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof PBMassage.GM_VerifyVersion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {PBMassage.GM_VerifyVersion} GM_VerifyVersion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GM_VerifyVersion.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GM_VerifyVersion message.
         * @function verify
         * @memberof PBMassage.GM_VerifyVersion
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GM_VerifyVersion.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.version))
                return "version: string expected";
            if (!$util.isInteger(message.platform))
                return "platform: integer expected";
            if (message.istest != null && message.hasOwnProperty("istest"))
                if (!$util.isInteger(message.istest))
                    return "istest: integer expected";
            return null;
        };

        return GM_VerifyVersion;
    })();

    PBMassage.GM_VerifyVersionReturn = (function() {

        /**
         * Properties of a GM_VerifyVersionReturn.
         * @memberof PBMassage
         * @interface IGM_VerifyVersionReturn
         * @property {number} result GM_VerifyVersionReturn result
         * @property {string} serverversion GM_VerifyVersionReturn serverversion
         * @property {number|null} [serverFlag] GM_VerifyVersionReturn serverFlag
         * @property {string|null} [url] GM_VerifyVersionReturn url
         */

        /**
         * Constructs a new GM_VerifyVersionReturn.
         * @memberof PBMassage
         * @classdesc Represents a GM_VerifyVersionReturn.
         * @implements IGM_VerifyVersionReturn
         * @constructor
         * @param {PBMassage.IGM_VerifyVersionReturn=} [properties] Properties to set
         */
        function GM_VerifyVersionReturn(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GM_VerifyVersionReturn result.
         * @member {number} result
         * @memberof PBMassage.GM_VerifyVersionReturn
         * @instance
         */
        GM_VerifyVersionReturn.prototype.result = 0;

        /**
         * GM_VerifyVersionReturn serverversion.
         * @member {string} serverversion
         * @memberof PBMassage.GM_VerifyVersionReturn
         * @instance
         */
        GM_VerifyVersionReturn.prototype.serverversion = "";

        /**
         * GM_VerifyVersionReturn serverFlag.
         * @member {number} serverFlag
         * @memberof PBMassage.GM_VerifyVersionReturn
         * @instance
         */
        GM_VerifyVersionReturn.prototype.serverFlag = 0;

        /**
         * GM_VerifyVersionReturn url.
         * @member {string} url
         * @memberof PBMassage.GM_VerifyVersionReturn
         * @instance
         */
        GM_VerifyVersionReturn.prototype.url = "";

        /**
         * Creates a new GM_VerifyVersionReturn instance using the specified properties.
         * @function create
         * @memberof PBMassage.GM_VerifyVersionReturn
         * @static
         * @param {PBMassage.IGM_VerifyVersionReturn=} [properties] Properties to set
         * @returns {PBMassage.GM_VerifyVersionReturn} GM_VerifyVersionReturn instance
         */
        GM_VerifyVersionReturn.create = function create(properties) {
            return new GM_VerifyVersionReturn(properties);
        };

        /**
         * Encodes the specified GM_VerifyVersionReturn message. Does not implicitly {@link PBMassage.GM_VerifyVersionReturn.verify|verify} messages.
         * @function encode
         * @memberof PBMassage.GM_VerifyVersionReturn
         * @static
         * @param {PBMassage.IGM_VerifyVersionReturn} message GM_VerifyVersionReturn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GM_VerifyVersionReturn.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.serverversion);
            if (message.serverFlag != null && message.hasOwnProperty("serverFlag"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.serverFlag);
            if (message.url != null && message.hasOwnProperty("url"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.url);
            return writer;
        };

        /**
         * Encodes the specified GM_VerifyVersionReturn message, length delimited. Does not implicitly {@link PBMassage.GM_VerifyVersionReturn.verify|verify} messages.
         * @function encodeDelimited
         * @memberof PBMassage.GM_VerifyVersionReturn
         * @static
         * @param {PBMassage.IGM_VerifyVersionReturn} message GM_VerifyVersionReturn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GM_VerifyVersionReturn.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GM_VerifyVersionReturn message from the specified reader or buffer.
         * @function decode
         * @memberof PBMassage.GM_VerifyVersionReturn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PBMassage.GM_VerifyVersionReturn} GM_VerifyVersionReturn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GM_VerifyVersionReturn.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PBMassage.GM_VerifyVersionReturn();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.result = reader.int32();
                    break;
                case 2:
                    message.serverversion = reader.string();
                    break;
                case 3:
                    message.serverFlag = reader.int32();
                    break;
                case 4:
                    message.url = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("result"))
                throw $util.ProtocolError("missing required 'result'", { instance: message });
            if (!message.hasOwnProperty("serverversion"))
                throw $util.ProtocolError("missing required 'serverversion'", { instance: message });
            return message;
        };

        /**
         * Decodes a GM_VerifyVersionReturn message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof PBMassage.GM_VerifyVersionReturn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {PBMassage.GM_VerifyVersionReturn} GM_VerifyVersionReturn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GM_VerifyVersionReturn.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GM_VerifyVersionReturn message.
         * @function verify
         * @memberof PBMassage.GM_VerifyVersionReturn
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GM_VerifyVersionReturn.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.result))
                return "result: integer expected";
            if (!$util.isString(message.serverversion))
                return "serverversion: string expected";
            if (message.serverFlag != null && message.hasOwnProperty("serverFlag"))
                if (!$util.isInteger(message.serverFlag))
                    return "serverFlag: integer expected";
            if (message.url != null && message.hasOwnProperty("url"))
                if (!$util.isString(message.url))
                    return "url: string expected";
            return null;
        };

        return GM_VerifyVersionReturn;
    })();

    return PBMassage;
})();