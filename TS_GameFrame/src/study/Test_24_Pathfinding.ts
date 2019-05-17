export default class Test_24_Pathfinding {

    constructor() {
        var matrix: Array<Array<number>> = [
            [0, 1, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0]
        ];

        for (let index = 0; index < matrix.length; index++) {
            const element = matrix[index];
            console.log("matrix {" + index + "}"  + element);
        }

        var Grid:any = Laya.ClassUtils.getClass("PathFinding.core.Grid");
        
        var grid: any = new Grid(5, 5, matrix);
        console.log(grid);
        
        var obj:Object = {
            allowDiagonal:false
        };
        var AStarFinder:any = Laya.ClassUtils.getClass("PathFinding.finders.AStarFinder");
        var finder:any = new AStarFinder(obj);

        console.log("startX 0,startY 0,endX 4,endY 4 ");
        

        var path:any = finder.findPath(0,0,4,4,grid);
        console.log("Path:" + path);
    }

}