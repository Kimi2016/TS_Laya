export default class PathManager {

    private static instance: PathManager;
    public static getInstance(): PathManager {
        return this.instance || (this.instance = new this())
    }

    private mWidth: number;
    private mHeight: number;
    private mGridSize: number = 96;
    private mGrid: PathFinding.core.Grid;
    private mAStarFinder: PathFinding.finders.AStarFinder;
    private mMatrix:Array<Array<number>>;

    public initPathData(pathData: any): void {
        //this.mGridSize = pathData.gridSize;
        var width = this.mWidth = pathData.width;
        var height = this.mHeight = pathData.height;
        var paths = pathData.paths;
        var matrix = this.mMatrix = new Array<Array<number>>();

        for (let index = 0; index < height; index++) {
            const element = paths.splice(0, width);
            //console.log(element);
            matrix.push(element);
        }

        for (let index = 0; index < matrix.length; index++) {
            const element = matrix[index];
            console.log("matrix {" + index + "}" + element);
        }

        var opt = { allowDiagonal: true };
        var grid = this.mGrid = new PathFinding.core.Grid(width, height, matrix);
        var aStarFinder = this.mAStarFinder = new PathFinding.finders.AStarFinder(opt);
    }

    public findPath(sPX: number, sPY: number, ePX: number, ePY: number): Array<number> {
        //sPX = Math.floor(sPX / this.mGridSize);
        //sPY = Math.floor(sPY / this.mGridSize);
        //ePX = Math.floor(ePX / this.mGridSize);
        //ePY = Math.floor(ePY / this.mGridSize);
        var paths = this.mAStarFinder.findPath(sPX, sPY, ePX, ePY, this.mGrid);
        console.log("paths:" + paths);
        return paths;
    }

    public findPathByPixel(sPX: number, sPY: number, ePX: number, ePY: number): Array<number> {
        sPX -= 0.1;
        sPY -= 0.1;
        ePX -= 0.1;
        ePY -= 0.1;
        sPX = Math.floor(sPX / this.mGridSize);
        sPY = Math.floor(sPY / this.mGridSize);
        ePX = Math.floor(ePX / this.mGridSize);
        ePY = Math.floor(ePY / this.mGridSize);
        var paths = this.mAStarFinder.findPath(sPX, sPY, ePX, ePY, this.mGrid);
        console.log(paths);
        return paths;
    }

    public canWalk(gx, gy): boolean {
        //console.log("gx, gy, iswalk:", gx, gy, this.mGrid.isWalkableAt(gx, gy));
        return this.mGrid.isWalkableAt(gx, gy);
    }

    public canWalkByPixel(px, py): boolean {
        px -= 0.1;
        py -= 0.1;
        var gx = Math.floor(px / this.mGridSize);
        var gy = Math.floor(py / this.mGridSize);
        return this.canWalk(gx, gy);
        //console.log("px, py, gx, gy, iswalk:", px, py, gx, gy, this.mGrid.isWalkableAt(gx, gy), this.mMatrix[gy][gx]);
        //return true;
    }

    public isAlpha(x, y): any {
        return false;
    }

    public getDirection(): any {

    }

    public getLenPointByRadian(e, i, n): any {

    }

    public getRangWalkPoint(): any {

    }

    public hasBarrier(): any {

    }

    public pixelPoint(x, y): any {

    }

    public tiledPoint(x, y): any {

    }

    public randomPoint(t, e, i, n): any {

    }
}