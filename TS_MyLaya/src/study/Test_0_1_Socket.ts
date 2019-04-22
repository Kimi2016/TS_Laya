import Test_0_1_Channel from "./Test_0_1_Channel";

export default class Test_0_1_Socket
{
    constructor(){
        new Test_0_1_Channel(" 第一个Socket ").connectByUrl("ws://192.168.2.126:9999");
        new Test_0_1_Channel(" 第二个Socket ").connectByUrl("ws://192.168.2.126:9999");
        new Test_0_1_Channel(" 第三个Socket ").connectByUrl("ws://192.168.2.126:9999");
    }
}