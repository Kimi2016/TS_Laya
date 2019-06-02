declare module PathFinding {
    module core {
        class Grid {
            constructor(width_or_matrix: number | Array<Array<number>>, height?: number, matrix?: Array<Array<number>>);
            getNodeAt(x, y): Node;
            isWalkableAt(x, y): boolean;
            isInside(x,y): boolean;
            setWalkableAt(x,y,walkable);
        }
        class Node {
            constructor(x: number, y: number, walkable: boolean)
        }
    }
    module finders {
        class AStarFinder {
            /**
             * 
             * @param opt {
             *  allowDiagonal:boolean 允许对角,
             *  dontCrossCorners:boolean 不能交叉角,
             *  diagonalMovement:boolean 对角运动,
             *  heuristic:boolean 启发式算法(搜索),
             *  weight:number 权重
             *  }
             */
            constructor(opt);
            findPath(startX: number, startY: number, endX: number, endY: number, grid: PathFinding.core.Grid): any;
        }
    }

}