declare module PathFinding {
    module core {
        class Grid {
            constructor(width_or_matrix, height, matrix);
        }
    }
    module finders {
        class AStarFinder {
            constructor(opt);
            findPath(startX:number,startY:number,endX:number,endY:number,grid:PathFinding.core.Grid);
        }
    }

}