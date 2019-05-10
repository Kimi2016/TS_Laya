var $protobuf = window.protobuf;
$protobuf.roots.default=window;
// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.PBMessage = (function() {

    /**
     * Namespace PBMessage.
     * @exports PBMessage
     * @namespace
     */
    var PBMessage = {};

    PBMessage.AwesomeMessage = (function() {

        /**
         * Properties of an AwesomeMessage.
         * @memberof PBMessage
         * @interface IAwesomeMessage
         * @property {string} awesome_field AwesomeMessage awesome_field
         */

        /**
         * Constructs a new AwesomeMessage.
         * @memberof PBMessage
         * @classdesc Represents an AwesomeMessage.
         * @implements IAwesomeMessage
         * @constructor
         * @param {PBMessage.IAwesomeMessage=} [properties] Properties to set
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
         * @memberof PBMessage.AwesomeMessage
         * @instance
         */
        AwesomeMessage.prototype.awesome_field = "";

        /**
         * Creates a new AwesomeMessage instance using the specified properties.
         * @function create
         * @memberof PBMessage.AwesomeMessage
         * @static
         * @param {PBMessage.IAwesomeMessage=} [properties] Properties to set
         * @returns {PBMessage.AwesomeMessage} AwesomeMessage instance
         */
        AwesomeMessage.create = function create(properties) {
            return new AwesomeMessage(properties);
        };

        /**
         * Encodes the specified AwesomeMessage message. Does not implicitly {@link PBMessage.AwesomeMessage.verify|verify} messages.
         * @function encode
         * @memberof PBMessage.AwesomeMessage
         * @static
         * @param {PBMessage.IAwesomeMessage} message AwesomeMessage message or plain object to encode
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
         * Encodes the specified AwesomeMessage message, length delimited. Does not implicitly {@link PBMessage.AwesomeMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof PBMessage.AwesomeMessage
         * @static
         * @param {PBMessage.IAwesomeMessage} message AwesomeMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AwesomeMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AwesomeMessage message from the specified reader or buffer.
         * @function decode
         * @memberof PBMessage.AwesomeMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PBMessage.AwesomeMessage} AwesomeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AwesomeMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PBMessage.AwesomeMessage();
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
         * @memberof PBMessage.AwesomeMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {PBMessage.AwesomeMessage} AwesomeMessage
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
         * @memberof PBMessage.AwesomeMessage
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

    PBMessage.GM_VerifyVersion = (function() {

        /**
         * Properties of a GM_VerifyVersion.
         * @memberof PBMessage
         * @interface IGM_VerifyVersion
         * @property {string} version GM_VerifyVersion version
         * @property {number|Long} platform 平台
         * @property {number|null} [istest] 0、正常，1、测试，不需要验证版本
         */

        /**
         * Constructs a new GM_VerifyVersion.
         * @memberof PBMessage
         * @classdesc Represents a GM_VerifyVersion.
         * @implements IGM_VerifyVersion
         * @constructor
         * @param {PBMessage.IGM_VerifyVersion=} [properties] Properties to set
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
         * @memberof PBMessage.GM_VerifyVersion
         * @instance
         */
        GM_VerifyVersion.prototype.version = "";

        /**
         * 平台
         * @member {number|Long} platform
         * @memberof PBMessage.GM_VerifyVersion
         * @instance
         */
        GM_VerifyVersion.prototype.platform = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * 0、正常，1、测试，不需要验证版本
         * @member {number} istest
         * @memberof PBMessage.GM_VerifyVersion
         * @instance
         */
        GM_VerifyVersion.prototype.istest = 0;

        /**
         * Creates a new GM_VerifyVersion instance using the specified properties.
         * @function create
         * @memberof PBMessage.GM_VerifyVersion
         * @static
         * @param {PBMessage.IGM_VerifyVersion=} [properties] Properties to set
         * @returns {PBMessage.GM_VerifyVersion} GM_VerifyVersion instance
         */
        GM_VerifyVersion.create = function create(properties) {
            return new GM_VerifyVersion(properties);
        };

        /**
         * Encodes the specified GM_VerifyVersion message. Does not implicitly {@link PBMessage.GM_VerifyVersion.verify|verify} messages.
         * @function encode
         * @memberof PBMessage.GM_VerifyVersion
         * @static
         * @param {PBMessage.IGM_VerifyVersion} message GM_VerifyVersion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GM_VerifyVersion.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.version);
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.platform);
            if (message.istest != null && message.hasOwnProperty("istest"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.istest);
            return writer;
        };

        /**
         * Encodes the specified GM_VerifyVersion message, length delimited. Does not implicitly {@link PBMessage.GM_VerifyVersion.verify|verify} messages.
         * @function encodeDelimited
         * @memberof PBMessage.GM_VerifyVersion
         * @static
         * @param {PBMessage.IGM_VerifyVersion} message GM_VerifyVersion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GM_VerifyVersion.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GM_VerifyVersion message from the specified reader or buffer.
         * @function decode
         * @memberof PBMessage.GM_VerifyVersion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PBMessage.GM_VerifyVersion} GM_VerifyVersion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GM_VerifyVersion.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PBMessage.GM_VerifyVersion();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.version = reader.string();
                    break;
                case 2:
                    message.platform = reader.int64();
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
         * @memberof PBMessage.GM_VerifyVersion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {PBMessage.GM_VerifyVersion} GM_VerifyVersion
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
         * @memberof PBMessage.GM_VerifyVersion
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GM_VerifyVersion.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.version))
                return "version: string expected";
            if (!$util.isInteger(message.platform) && !(message.platform && $util.isInteger(message.platform.low) && $util.isInteger(message.platform.high)))
                return "platform: integer|Long expected";
            if (message.istest != null && message.hasOwnProperty("istest"))
                if (!$util.isInteger(message.istest))
                    return "istest: integer expected";
            return null;
        };

        return GM_VerifyVersion;
    })();

    PBMessage.GM_VerifyVersionReturn = (function() {

        /**
         * Properties of a GM_VerifyVersionReturn.
         * @memberof PBMessage
         * @interface IGM_VerifyVersionReturn
         * @property {number|Long} result GM_VerifyVersionReturn result
         * @property {string} serverversion GM_VerifyVersionReturn serverversion
         * @property {number|null} [serverFlag] GM_VerifyVersionReturn serverFlag
         * @property {string|null} [url] GM_VerifyVersionReturn url
         */

        /**
         * Constructs a new GM_VerifyVersionReturn.
         * @memberof PBMessage
         * @classdesc Represents a GM_VerifyVersionReturn.
         * @implements IGM_VerifyVersionReturn
         * @constructor
         * @param {PBMessage.IGM_VerifyVersionReturn=} [properties] Properties to set
         */
        function GM_VerifyVersionReturn(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GM_VerifyVersionReturn result.
         * @member {number|Long} result
         * @memberof PBMessage.GM_VerifyVersionReturn
         * @instance
         */
        GM_VerifyVersionReturn.prototype.result = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * GM_VerifyVersionReturn serverversion.
         * @member {string} serverversion
         * @memberof PBMessage.GM_VerifyVersionReturn
         * @instance
         */
        GM_VerifyVersionReturn.prototype.serverversion = "";

        /**
         * GM_VerifyVersionReturn serverFlag.
         * @member {number} serverFlag
         * @memberof PBMessage.GM_VerifyVersionReturn
         * @instance
         */
        GM_VerifyVersionReturn.prototype.serverFlag = 0;

        /**
         * GM_VerifyVersionReturn url.
         * @member {string} url
         * @memberof PBMessage.GM_VerifyVersionReturn
         * @instance
         */
        GM_VerifyVersionReturn.prototype.url = "";

        /**
         * Creates a new GM_VerifyVersionReturn instance using the specified properties.
         * @function create
         * @memberof PBMessage.GM_VerifyVersionReturn
         * @static
         * @param {PBMessage.IGM_VerifyVersionReturn=} [properties] Properties to set
         * @returns {PBMessage.GM_VerifyVersionReturn} GM_VerifyVersionReturn instance
         */
        GM_VerifyVersionReturn.create = function create(properties) {
            return new GM_VerifyVersionReturn(properties);
        };

        /**
         * Encodes the specified GM_VerifyVersionReturn message. Does not implicitly {@link PBMessage.GM_VerifyVersionReturn.verify|verify} messages.
         * @function encode
         * @memberof PBMessage.GM_VerifyVersionReturn
         * @static
         * @param {PBMessage.IGM_VerifyVersionReturn} message GM_VerifyVersionReturn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GM_VerifyVersionReturn.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.result);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.serverversion);
            if (message.serverFlag != null && message.hasOwnProperty("serverFlag"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.serverFlag);
            if (message.url != null && message.hasOwnProperty("url"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.url);
            return writer;
        };

        /**
         * Encodes the specified GM_VerifyVersionReturn message, length delimited. Does not implicitly {@link PBMessage.GM_VerifyVersionReturn.verify|verify} messages.
         * @function encodeDelimited
         * @memberof PBMessage.GM_VerifyVersionReturn
         * @static
         * @param {PBMessage.IGM_VerifyVersionReturn} message GM_VerifyVersionReturn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GM_VerifyVersionReturn.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GM_VerifyVersionReturn message from the specified reader or buffer.
         * @function decode
         * @memberof PBMessage.GM_VerifyVersionReturn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PBMessage.GM_VerifyVersionReturn} GM_VerifyVersionReturn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GM_VerifyVersionReturn.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PBMessage.GM_VerifyVersionReturn();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.result = reader.int64();
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
         * @memberof PBMessage.GM_VerifyVersionReturn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {PBMessage.GM_VerifyVersionReturn} GM_VerifyVersionReturn
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
         * @memberof PBMessage.GM_VerifyVersionReturn
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GM_VerifyVersionReturn.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.result) && !(message.result && $util.isInteger(message.result.low) && $util.isInteger(message.result.high)))
                return "result: integer|Long expected";
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

    return PBMessage;
})();