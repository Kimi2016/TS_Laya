type Long = protobuf.Long;
// DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run types'.

/** Namespace PBMessage. */
declare namespace PBMessage {

    /** Properties of an AwesomeMessage. */
    interface IAwesomeMessage {

        /** AwesomeMessage awesome_field */
        awesome_field: string;
    }

    /** Represents an AwesomeMessage. */
    class AwesomeMessage implements IAwesomeMessage {

        /**
         * Constructs a new AwesomeMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: PBMessage.IAwesomeMessage);

        /** AwesomeMessage awesome_field. */
        public awesome_field: string;

        /**
         * Creates a new AwesomeMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AwesomeMessage instance
         */
        public static create(properties?: PBMessage.IAwesomeMessage): PBMessage.AwesomeMessage;

        /**
         * Encodes the specified AwesomeMessage message. Does not implicitly {@link PBMessage.AwesomeMessage.verify|verify} messages.
         * @param message AwesomeMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: PBMessage.IAwesomeMessage, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified AwesomeMessage message, length delimited. Does not implicitly {@link PBMessage.AwesomeMessage.verify|verify} messages.
         * @param message AwesomeMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: PBMessage.IAwesomeMessage, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an AwesomeMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AwesomeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): PBMessage.AwesomeMessage;

        /**
         * Decodes an AwesomeMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AwesomeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): PBMessage.AwesomeMessage;

        /**
         * Verifies an AwesomeMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a GM_VerifyVersion. */
    interface IGM_VerifyVersion {

        /** GM_VerifyVersion version */
        version: string;

        /** 平台 */
        platform: (number|Long);

        /** 0、正常，1、测试，不需要验证版本 */
        istest?: (number|null);
    }

    /** Represents a GM_VerifyVersion. */
    class GM_VerifyVersion implements IGM_VerifyVersion {

        /**
         * Constructs a new GM_VerifyVersion.
         * @param [properties] Properties to set
         */
        constructor(properties?: PBMessage.IGM_VerifyVersion);

        /** GM_VerifyVersion version. */
        public version: string;

        /** 平台 */
        public platform: (number|Long);

        /** 0、正常，1、测试，不需要验证版本 */
        public istest: number;

        /**
         * Creates a new GM_VerifyVersion instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GM_VerifyVersion instance
         */
        public static create(properties?: PBMessage.IGM_VerifyVersion): PBMessage.GM_VerifyVersion;

        /**
         * Encodes the specified GM_VerifyVersion message. Does not implicitly {@link PBMessage.GM_VerifyVersion.verify|verify} messages.
         * @param message GM_VerifyVersion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: PBMessage.IGM_VerifyVersion, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GM_VerifyVersion message, length delimited. Does not implicitly {@link PBMessage.GM_VerifyVersion.verify|verify} messages.
         * @param message GM_VerifyVersion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: PBMessage.IGM_VerifyVersion, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GM_VerifyVersion message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GM_VerifyVersion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): PBMessage.GM_VerifyVersion;

        /**
         * Decodes a GM_VerifyVersion message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GM_VerifyVersion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): PBMessage.GM_VerifyVersion;

        /**
         * Verifies a GM_VerifyVersion message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a GM_VerifyVersionReturn. */
    interface IGM_VerifyVersionReturn {

        /** GM_VerifyVersionReturn result */
        result: (number|Long);

        /** GM_VerifyVersionReturn serverversion */
        serverversion: string;

        /** GM_VerifyVersionReturn serverFlag */
        serverFlag?: (number|null);

        /** GM_VerifyVersionReturn url */
        url?: (string|null);
    }

    /** Represents a GM_VerifyVersionReturn. */
    class GM_VerifyVersionReturn implements IGM_VerifyVersionReturn {

        /**
         * Constructs a new GM_VerifyVersionReturn.
         * @param [properties] Properties to set
         */
        constructor(properties?: PBMessage.IGM_VerifyVersionReturn);

        /** GM_VerifyVersionReturn result. */
        public result: (number|Long);

        /** GM_VerifyVersionReturn serverversion. */
        public serverversion: string;

        /** GM_VerifyVersionReturn serverFlag. */
        public serverFlag: number;

        /** GM_VerifyVersionReturn url. */
        public url: string;

        /**
         * Creates a new GM_VerifyVersionReturn instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GM_VerifyVersionReturn instance
         */
        public static create(properties?: PBMessage.IGM_VerifyVersionReturn): PBMessage.GM_VerifyVersionReturn;

        /**
         * Encodes the specified GM_VerifyVersionReturn message. Does not implicitly {@link PBMessage.GM_VerifyVersionReturn.verify|verify} messages.
         * @param message GM_VerifyVersionReturn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: PBMessage.IGM_VerifyVersionReturn, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GM_VerifyVersionReturn message, length delimited. Does not implicitly {@link PBMessage.GM_VerifyVersionReturn.verify|verify} messages.
         * @param message GM_VerifyVersionReturn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: PBMessage.IGM_VerifyVersionReturn, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GM_VerifyVersionReturn message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GM_VerifyVersionReturn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): PBMessage.GM_VerifyVersionReturn;

        /**
         * Decodes a GM_VerifyVersionReturn message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GM_VerifyVersionReturn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): PBMessage.GM_VerifyVersionReturn;

        /**
         * Verifies a GM_VerifyVersionReturn message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }
}
