
class myShaderValue extends Laya.Value2D {
    public position: any;
    public texcoord: any;
    constructor() {
        super(0, 0);
        var _vlen: number = 8 * Laya.CONST3D2D.BYTES_PE;
        //设置在shader程序文件里定义的属性相关描述：【属性长度，属性类型，false，属性起始位置索引*CONST3D2D.BYTES_PE】
        this.position = [2, Laya.WebGLContext.FLOAT, false, _vlen, 0];
        this.texcoord = [2, Laya.WebGLContext.FLOAT, false, _vlen, 2 * Laya.CONST3D2D.BYTES_PE];
        this.color = [4, Laya.WebGLContext.FLOAT, false, _vlen, 4 * Laya.CONST3D2D.BYTES_PE];
    }
}

/*
自定义着色器
*/
class myShader extends Laya.Shader {
    /**
     *当前着色器的一个实例对象 
     */
    public static shader: myShader = new myShader();
    constructor() {
        //顶点着色器程序和片元着色器程序。
        var vs: string = "attribute vec2 position;attribute vec2 texcoord;attribute vec4 color;uniform vec2 size;uniform mat4 mmat;varying vec2 v_texcoord;varying vec4 v_color;void main(){vec4 pos =mmat*vec4(position.x,position.y,0,1);gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);v_color = color;v_texcoord = texcoord;}"
        var ps: string = "precision mediump float;varying vec2 v_texcoord;varying vec4 v_color;uniform sampler2D texture;void main(){vec4 t_color = texture2D(texture, v_texcoord);gl_FragColor = t_color.rgba * v_color.rgba;}";
        super(vs, ps, "myShader");
    }
}

class myShaderSprite extends Laya.Script {
    /** 顶点缓冲区。      */
    private vBuffer: Laya.VertexBuffer2D;//Laya.Buffer;
    /** 片元缓冲区。      */
    private iBuffer: Laya.IndexBuffer2D;//Laya.Buffer;
    private vbData: Float32Array;
    private ibData: Uint16Array;
    private iNum: number = 0;
    /** 着色器变量。      */
    private shaderValue: myShaderValue;
    constructor() {
        super();
    }
    /*
    初始化此类
    texture 纹理对象
    vb 顶点数组
    ib 顶点索引数组
    */
    public init(texture: Laya.Texture, vb: Array<any> = null, ib: Array<any> = null): void {
        this.vBuffer = Laya.VertexBuffer2D.create();
        this.iBuffer = Laya.IndexBuffer2D.create();
        this.ibData = new Uint16Array([]);
        var vbArray: Array<any>;
        var ibArray: Array<any>;
        if (vb) {
            vbArray = vb;
        }
        else {
            vbArray = [];
            var texWidth: number = texture.width;
            var texHeight: number = texture.height;
            //定义颜色值，取值范围0~1浮点
            var red: number = 1;
            var greed: number = 1;
            var blue: number = 1;
            var alpha: number = 1;
            //在顶点数组中放入4个顶点
            //每个顶点的数据：（坐标x，坐标y，u，v，R,G,B,A）
            vbArray.push(0, 0, 0, 0, red, greed, blue, alpha);
            vbArray.push(texWidth, 0, 1, 0, red, greed, blue, alpha);
            vbArray.push(texWidth, texHeight, 1, 1, red, greed, blue, alpha);
            vbArray.push(0, texHeight, 0, 1, red, greed, blue, alpha);
        }
        if (ib) {
            ibArray = ib;
        }
        else {
            ibArray = [];
            //在顶点索引数组中放入组成三角形的顶点索引
            //三角形的顶点索引对应顶点数组vbArray里的点索引，索引从0开始
            ibArray.push(0, 1, 3);//从第一个三角形的顶点索引
            //ibArray.push(3,1,2);第二个三角形的顶点索引
        }
        this.iNum = ibArray.length;
        this.vbData = new Float32Array(vbArray);
        this.ibData = new Uint16Array(ibArray);
        this.vBuffer.append(this.vbData);
        this.iBuffer.append(this.ibData);
        this.shaderValue = new myShaderValue();
        this.shaderValue.textureHost = texture;
        //this._renderType |= Laya.RenderSprite.CUSTOM;//设置当前显示对象的渲染模式为自定义渲染模式
    }
    //重写渲染函数
    public customRender(context: any, x: number, y: number): void {
        //context:Laya.RenderContext
        console.log(context);

        //(context.ctx as Laya.WebGLContext2D).drawMesh(x, y, this.iBuffer, this.vBuffer, this.iNum, null, myShader.shader, this.shaderValue, 0);
    }
}

export default class Test_14_Shader {
    constructor() {
        //加载一张图片
        Laya.loader.load("res/texture.png", Laya.Handler.create(this, this.loadComplete));
    }
    private loadComplete(): void {
        var texture: Laya.Texture = Laya.Loader.getRes("res/atlas/comp.png");
        var spe: any = new myShaderSprite();
        spe.init(texture);
        (spe as Laya.Sprite).pos(50, 50);
        Laya.stage.addChild(spe);
    }
}