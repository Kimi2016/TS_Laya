window.PathFinding = (function (exports) {
	'use strict';
	/**
	 * class PathFinding.core.DiagonalMovement
	 * @author Kimi
	 */
	class DiagonalMovement { }
	DiagonalMovement.Always = 1;
	DiagonalMovement.Never = 2;
	DiagonalMovement.IfAtMostOneObstacle = 3;
	DiagonalMovement.OnlyWhenNoObstacles = 4;

	/**
	 * class PathFinding.core.Grid
	 * @author Kimi
	 */
	class Grid {
		constructor(width_or_matrix, height, matrix) {
			this.width = 0;
			this.height = 0;
			this.nodes = null;
			var width = 0;
			if ((typeof width_or_matrix == 'number')) {
				width = width_or_matrix;
			}
			else {
				height = width_or_matrix.length;
				width = width_or_matrix[0].length;
				matrix = width_or_matrix;
			}
			this.width = width;
			this.height = height;
			this.nodes = this._buildNodes(width, height, matrix);
		}

		/**
		 * Build and return the nodes.
		 * @private
		 * @param {number}width
		 * @param {number}height
		 * @param {Array<Array<number|boolean>>}[matrix]-A 0-1 matrix representing
		 * the walkable status of the nodes.
		 * @see Grid
		 */
		_buildNodes(width, height, matrix) {
			var i = 0, j = 0, nodes = [];
			for (i = 0; i < height; ++i) {
				nodes[i] = [];
				for (j = 0; j < width; ++j) {
					nodes[i][j] = new Node(j, i);
				}
			}
			if (matrix == null) {
				return nodes;
			}
			if (matrix.length != height || matrix[0].length != width) {
				throw new Error('Matrix size does not fit');
			}
			for (i = 0; i < height; ++i) {
				for (j = 0; j < width; ++j) {
					if (matrix[i][j]) {
						nodes[i][j].walkable = false;
					}
				}
			}
			return nodes;
		}

		getNodeAt(x, y) {
			return this.nodes[y][x];
		}

		/**
		 *Determine whether the node at the given position is walkable.
		 *(Also returns false if the position is outside the grid.)
		 *@param {number}x-The x coordinate of the node.
		 *@param {number}y-The y coordinate of the node.
		 *@return {boolean}-The walkability of the node.
		 */
		isWalkableAt(x, y) {
			return this.isInside(x, y) && this.nodes[y][x].walkable;
		}

		/**
		 *Determine whether the position is inside the grid.
		 *XXX:`grid.isInside(x,y)` is wierd to read.
		 *It should be `(x,y)is inside grid`,but I failed to find a better
		 *name for this method.
		 *@param {number}x
		 *@param {number}y
		 *@return {boolean}
		 */
		isInside(x, y) {
			return (x >= 0 && x < this.width) && (y >= 0 && y < this.height);
		}

		/**
		 *Set whether the node on the given position is walkable.
		 *NOTE:throws exception if the coordinate is not inside the grid.
		 *@param {number}x-The x coordinate of the node.
		 *@param {number}y-The y coordinate of the node.
		 *@param {boolean}walkable-Whether the position is walkable.
		 */
		setWalkableAt(x, y, walkable) {
			this.nodes[y][x].walkable = walkable;
		}

		/**
		 *Get the neighbors of the given node.
		 *
		 *offsets diagonalOffsets:
		 *+---+---+---++---+---+---+
		 *| | 0 | | | 0 | | 1 |
		 *+---+---+---++---+---+---+
		 *| 3 | | 1 | | | | |
		 *+---+---+---++---+---+---+
		 *| | 2 | | | 3 | | 2 |
		 *+---+---+---++---+---+---+
		 *
		 *When allowDiagonal is true,if offsets[i] is valid,then
		 *diagonalOffsets[i] and
		 *diagonalOffsets[(i+1)% 4] is valid.
		 *@param {Node}node
		 *@param {diagonalMovement}diagonalMovement
		 */
		getNeighbors(node, diagonalMovement) {
			var x = node.x, y = node.y, neighbors = [], s0 = false, d0 = false, s1 = false, d1 = false, s2 = false, d2 = false, s3 = false, d3 = false, nodes = this.nodes;
			if (this.isWalkableAt(x, y - 1)) {
				neighbors.push(nodes[y - 1][x]);
				s0 = true;
			}
			if (this.isWalkableAt(x + 1, y)) {
				neighbors.push(nodes[y][x + 1]);
				s1 = true;
			}
			if (this.isWalkableAt(x, y + 1)) {
				neighbors.push(nodes[y + 1][x]);
				s2 = true;
			}
			if (this.isWalkableAt(x - 1, y)) {
				neighbors.push(nodes[y][x - 1]);
				s3 = true;
			}
			if (diagonalMovement == DiagonalMovement.Never) {
				return neighbors;
			}
			if (diagonalMovement == DiagonalMovement.OnlyWhenNoObstacles) {
				d0 = s3 && s0;
				d1 = s0 && s1;
				d2 = s1 && s2;
				d3 = s2 && s3;
			}
			else if (diagonalMovement == DiagonalMovement.IfAtMostOneObstacle) {
				d0 = s3 || s0;
				d1 = s0 || s1;
				d2 = s1 || s2;
				d3 = s2 || s3;
			}
			else if (diagonalMovement == DiagonalMovement.Always) {
				d0 = true;
				d1 = true;
				d2 = true;
				d3 = true;
			}
			else {
				throw new Error('Incorrect value of diagonalMovement');
			}
			if (d0 && this.isWalkableAt(x - 1, y - 1)) {
				neighbors.push(nodes[y - 1][x - 1]);
			}
			if (d1 && this.isWalkableAt(x + 1, y - 1)) {
				neighbors.push(nodes[y - 1][x + 1]);
			}
			if (d2 && this.isWalkableAt(x + 1, y + 1)) {
				neighbors.push(nodes[y + 1][x + 1]);
			}
			if (d3 && this.isWalkableAt(x - 1, y + 1)) {
				neighbors.push(nodes[y + 1][x - 1]);
			}
			return neighbors;
		}

		/**
		*Get a clone of this grid.
		*@return {Grid}Cloned grid.
		*/
		clone() {
			var i = 0, j = 0,
				width = this.width, height = this.height, thisNodes = this.nodes,
				newGrid = new Grid(width, height), newNodes = [];
			for (i = 0; i < height; ++i) {
				newNodes[i] = [];
				for (j = 0; j < width; ++j) {
					newNodes[i][j] = new Node(j, i, thisNodes[i][j].walkable);
				}
			}
			newGrid.nodes = newNodes;
			return newGrid;
		}

		reset() {
			var _node;
			for (var i = 0; i < this.height; ++i) {
				for (var j = 0; j < this.width; ++j) {
					_node = this.nodes[i][j];
					_node.g = 0;
					_node.f = 0;
					_node.h = 0;
					_node.by = 0;
					_node.parent = null;
					_node.opened = null;
					_node.closed = null;
					_node.tested = null;
				}
			}
		}

		static createGridFromAStarMap(texture) {
			var textureWidth = texture.width;
			var textureHeight = texture.height;
			var pixelsInfo = texture.getPixels();
			var aStarArr = [];
			var index = 0;
			for (var w = 0; w < textureWidth; w++) {
				var colaStarArr = aStarArr[w] = [];
				for (var h = 0; h < textureHeight; h++) {
					var r = pixelsInfo[index++];
					var g = pixelsInfo[index++];
					var b = pixelsInfo[index++];
					var a = pixelsInfo[index++];
					if (r == 255 && g == 255 && b == 255 && a == 255)
						colaStarArr[h] = 1;
					else {
						colaStarArr[h] = 0;
					}
				}
			};
			var gird = new Grid(textureWidth, textureHeight, aStarArr);
			return gird;
		}
	}

	/**
	 * PathFinding.core.Heuristic
	 * @author Kimi
	 */
	class Heuristic {
		constructor() { }
		static manhattan(dx, dy) {
			return dx + dy;
		}
		static euclidean(dx, dy) {
			return Math.sqrt(dx * dx + dy * dy);
		}
		static octile(dx, dy) {
			var F = Math.SQRT2 - 1;
			return (dx < dy) ? F * dx + dy : F * dy + dx;
		}
		static chebyshev(dx, dy) {
			return Math.max(dx, dy);
		}
	}

	/**
	 * PathFinding.core.Node
	 * @author Kimi
	 */
	class Node {
		constructor(x, y, walkable) {
			this.x = 0;
			this.y = 0;
			this.g = 0;
			this.f = 0;
			this.h = 0;
			this.by = 0;
			this.parent = null;
			this.opened = null;
			this.closed = null;
			this.tested = null;
			this.retainCount = null;
			this.walkable = false;
			(walkable === void 0) && (walkable = true);
			this.x = x;
			this.y = y;
			this.walkable = walkable;
		}
	}

	/**
	 * PathFinding.core.Util
	 * @author Kimi
	 */
	class Util {
		static backtrace(node) {
			var path = [[node.x, node.y]];
			while (node.parent) {
				node = node.parent;
				path.push([node.x, node.y]);
			}
			return path.reverse();
		}
		static biBacktrace(nodeA, nodeB) {
			var pathA = this.backtrace(nodeA), pathB = this.backtrace(nodeB);
			return pathA.concat(pathB.reverse());
		}
		static pathLength(path) {
			var i = 0, sum = 0, a = 0, b = 0, dx = 0, dy = 0;
			for (i = 1; i < path.length; ++i) {
				a = path[i - 1];
				b = path[i];
				dx = a[0] - b[0];
				dy = a[1] - b[1];
				sum += Math.sqrt(dx * dx + dy * dy);
			}
			return sum;
		}
		static interpolate(x0, y0, x1, y1) {
			var abs = Math.abs, line = [], sx = 0, sy = 0, dx = 0, dy = 0, err = 0, e2 = 0;
			dx = abs(x1 - x0);
			dy = abs(y1 - y0);
			sx = (x0 < x1) ? 1 : -1;
			sy = (y0 < y1) ? 1 : -1;
			err = dx - dy;
			while (true) {
				line.push([x0, y0]);
				if (x0 == x1 && y0 == y1) {
					break;
				}
				e2 = 2 * err;
				if (e2 > -dy) {
					err = err - dy;
					x0 = x0 + sx;
				}
				if (e2 < dx) {
					err = err + dx;
					y0 = y0 + sy;
				}
			}
			return line;
		}
		static expandPath(path) {
			var expanded = [], len = path.length, coord0, coord1, interpolated, interpolatedLen = 0, i = 0, j = 0;
			if (len < 2) {
				return expanded;
			}
			for (i = 0; i < len - 1; ++i) {
				coord0 = path[i];
				coord1 = path[i + 1];
				interpolated = this.interpolate(coord0[0], coord0[1], coord1[0], coord1[1]);
				interpolatedLen = interpolated.length;
				for (j = 0; j < interpolatedLen - 1; ++j) {
					expanded.push(interpolated[j]);
				}
			}
			expanded.push(path[len - 1]);
			return expanded;
		}
		static smoothenPath(grid, path) {
			var len = path.length, x0 = path[0][0],
				y0 = path[0][1],
				x1 = path[len - 1][0],
				y1 = path[len - 1][1],
				sx = 0, sy = 0,
				ex = 0, ey = 0,
				newPath, i = 0, j = 0, coord, line, testCoord, blocked = false, lastValidCoord;
			sx = x0;
			sy = y0;
			newPath = [[sx, sy]];
			for (i = 2; i < len; ++i) {
				coord = path[i];
				ex = coord[0];
				ey = coord[1];
				line = this.interpolate(sx, sy, ex, ey);
				blocked = false;
				for (j = 1; j < line.length; ++j) {
					testCoord = line[j];
					if (!grid.isWalkableAt(testCoord[0], testCoord[1])) {
						blocked = true;
						break;
					}
				}
				if (blocked) {
					lastValidCoord = path[i - 1];
					newPath.push(lastValidCoord);
					sx = lastValidCoord[0];
					sy = lastValidCoord[1];
				}
			}
			newPath.push([x1, y1]);
			return newPath;
		}
		static compressPath(path) {
			if (path.length < 3) {
				return path;
			};
			var compressed = [], sx = path[0][0],
				sy = path[0][1],
				px = path[1][0],
				py = path[1][1],
				dx = px - sx,
				dy = py - sy,
				lx = 0, ly = 0, ldx = 0, ldy = 0, sq = NaN, i = 0;
			sq = Math.sqrt(dx * dx + dy * dy);
			dx /= sq;
			dy /= sq;
			compressed.push([sx, sy]);
			for (i = 2; i < path.length; i++) {
				lx = px;
				ly = py;
				ldx = dx;
				ldy = dy;
				px = path[i][0];
				py = path[i][1];
				dx = px - lx;
				dy = py - ly;
				sq = Math.sqrt(dx * dx + dy * dy);
				dx /= sq;
				dy /= sq;
				if (dx !== ldx || dy !== ldy) {
					compressed.push([lx, ly]);
				}
			}
			compressed.push([px, py]);
			return compressed;
		}
	}

	/**
	 * PathFinding.finders.AStarFinder
	 * @author Kimi
	 */
	class AStarFinder {
		constructor(opt) {
			this.allowDiagonal = false;
			this.dontCrossCorners = false;
			this.heuristic = null;
			this.weight = 0;
			this.diagonalMovement = 0;
			opt = opt || {};
			this.allowDiagonal = opt.allowDiagonal;
			this.dontCrossCorners = opt.dontCrossCorners;
			this.heuristic = opt.heuristic || Heuristic.manhattan;
			this.weight = opt.weight || 1;
			this.diagonalMovement = opt.diagonalMovement;
			if (!this.diagonalMovement) {
				if (!this.allowDiagonal) {
					this.diagonalMovement = DiagonalMovement.Never;
				}
				else {
					if (this.dontCrossCorners) {
						this.diagonalMovement = DiagonalMovement.OnlyWhenNoObstacles;
					}
					else {
						this.diagonalMovement = DiagonalMovement.IfAtMostOneObstacle;
					}
				}
			}
			if (this.diagonalMovement === DiagonalMovement.Never) {
				this.heuristic = opt.heuristic || Heuristic.manhattan;
			}
			else {
				this.heuristic = opt.heuristic || Heuristic.octile;
			}
		}

		/**
		* Find and return the the path.
		* @return {Array<Array<number>>}The path,including both start and
		* end positions.
		*/
		findPath(startX, startY, endX, endY, grid) {
			var openList = new Heap(function (nodeA, nodeB) {
				return nodeA.f - nodeB.f;
			}), startNode = grid.getNodeAt(startX, startY), endNode = grid.getNodeAt(endX, endY), heuristic = this.heuristic, diagonalMovement = this.diagonalMovement, weight = this.weight, abs = Math.abs, SQRT2 = Math.SQRT2, node, neighbors, neighbor, i = 0, l = 0, x = 0, y = 0, ng = 0;
			startNode.g = 0;
			startNode.f = 0;
			openList.push(startNode);
			startNode.opened = true;
			while (!openList.empty()) {
				node = openList.pop();
				node.closed = true;
				if (node === endNode) {
					return Util.backtrace(endNode);
				}
				neighbors = grid.getNeighbors(node, diagonalMovement);
				for (i = 0, l = neighbors.length; i < l; ++i) {
					neighbor = neighbors[i];
					if (neighbor.closed) {
						continue;
					}
					x = neighbor.x;
					y = neighbor.y;
					ng = node.g + ((x - node.x === 0 || y - node.y === 0) ? 1 : SQRT2);
					if (!neighbor.opened || ng < neighbor.g) {
						neighbor.g = ng;
						neighbor.h = neighbor.h || weight * heuristic(abs(x - endX), abs(y - endY));
						neighbor.f = neighbor.g + neighbor.h;
						neighbor.parent = node;
						if (!neighbor.opened) {
							openList.push(neighbor);
							neighbor.opened = true;
						}
						else {
							openList.updateItem(neighbor);
						}
					}
				}
			}
			return [];
		}
	}

	/**
	 * PathFinding.finders.BestFirstFinder extends PathFinding.finders.AStarFinder
	 * @author Kimi
	 */
	class BestFirstFinder extends AStarFinder {
		constructor(opt) {
			super(opt);
			var orig = this.heuristic;
			this.heuristic = function (dx, dy) {
				return orig(dx, dy) * 1000000;
			};
		}
	}

	/**
	 * PathFinding.libs.Heap
	 * @author Kimi
	 */
	class Heap {
		constructor(cmp) {
			this.cmp = null;
			this.nodes = null;
			this.heapFunction = new HeapFunction();
			this.cmp = cmp != null ? cmp : this.heapFunction.defaultCmp;
			this.nodes = [];
		}
		push(x) {
			return this.heapFunction.heappush(this.nodes, x, this.cmp);
		}
		pop() {
			return this.heapFunction.heappop(this.nodes, this.cmp);
		}
		peek() {
			return this.nodes[0];
		}
		contains(x) {
			return this.nodes.indexOf(x) !== -1;
		}
		replace(x) {
			return this.heapFunction.heapreplace(this.nodes, x, this.cmp);
		}
		pushpop(x) {
			return this.heapFunction.heappushpop(this.nodes, x, this.cmp);
		}
		heapify() {
			return this.heapFunction.heapify(this.nodes, this.cmp);
		}
		updateItem(x) {
			return this.heapFunction.updateItem(this.nodes, x, this.cmp);
		}
		clear() {
			return this.nodes = [];
		}
		empty() {
			return this.nodes.length === 0;
		}
		size() {
			return this.nodes.length;
		}
		clone() {
			var heap = new Heap();
			heap.nodes = this.nodes.slice(0);
			return heap;
		}
		toArray() {
			return this.nodes.slice(0);
		}
	}

	/**
	 * PathFinding.libs.HeapFunction
	 * @author Kimi
	 */
	class HeapFunction {
		constructor() {
			this.defaultCmp = function (x, y) {
				if (x < y) {
					return -1;
				}
				if (x > y) {
					return 1;
				}
				return 0;
			}
		}
		insort(a, x, lo, hi, cmp) {
			var mid = NaN;
			if (lo == null) {
				lo = 0;
			}
			if (cmp == null) {
				cmp = this.defaultCmp;
			}
			if (lo < 0) {
				throw new Error('lo must be non-negative');
			}
			if (hi == null) {
				hi = a.length;
			}
			while (lo < hi) {
				mid = Math.floor((lo + hi) / 2);
				if (cmp(x, a[mid]) < 0) {
					hi = mid;
				}
				else {
					lo = mid + 1;
				}
			}
			return ([].splice.apply(a, [lo, lo - lo].concat(x)), x);
		}
		heappush(array, item, cmp) {
			if (cmp == null) {
				cmp = this.defaultCmp;
			}
			array.push(item);
			return this._siftdown(array, 0, array.length - 1, cmp);
		}
		heappop(array, cmp) {
			var lastelt, returnitem;
			if (cmp == null) {
				cmp = this.defaultCmp;
			}
			lastelt = array.pop();
			if (array.length) {
				returnitem = array[0];
				array[0] = lastelt;
				this._siftup(array, 0, cmp);
			}
			else {
				returnitem = lastelt;
			}
			return returnitem;
		}
		heapreplace(array, item, cmp) {
			var returnitem;
			if (cmp == null) {
				cmp = this.defaultCmp;
			}
			returnitem = array[0];
			array[0] = item;
			this._siftup(array, 0, cmp);
			return returnitem;
		}
		heappushpop(array, item, cmp) {
			var _ref;
			if (cmp == null) {
				cmp = this.defaultCmp;
			}
			if (array.length && cmp(array[0], item) < 0) {
				_ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
				this._siftup(array, 0, cmp);
			}
			return item;
		}
		heapify(array, cmp) {
			var i = 0, _i = 0, _j = 0, _len = 0, _ref, _ref1, _results, _results1;
			if (cmp == null) {
				cmp = this.defaultCmp;
			}
			_ref1 = (function () {
				_results1 = [];
				for (_j = 0, _ref = Math.floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--) {
					_results1.push(_j);
				}
				return _results1;
			}).apply(this).reverse();
			_results = [];
			for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
				i = _ref1[_i];
				_results.push(this._siftup(array, i, cmp));
			}
			return _results;
		}
		updateItem(array, item, cmp) {
			var pos = 0;
			if (cmp == null) {
				cmp = this.defaultCmp;
			}
			pos = array.indexOf(item);
			if (pos === -1) {
				return null;
			}
			this._siftdown(array, 0, pos, cmp);
			return this._siftup(array, pos, cmp);
		}
		nlargest(array, n, cmp) {
			var elem, result, _i = 0, _len = 0, _ref;
			if (cmp == null) {
				cmp = this.defaultCmp;
			}
			result = array.slice(0, n);
			if (!result.length) {
				return result;
			}
			this.heapify(result, cmp);
			_ref = array.slice(n);
			for (_i = 0, _len = _ref.length; _i < _len; _i++) {
				elem = _ref[_i];
				this.heappushpop(result, elem, cmp);
			}
			return result.sort(cmp).reverse();
		}
		nsmallest(array, n, cmp) {
			var elem, i, los, result, _i = 0, _j = 0, _len, _ref, _ref1, _results;
			if (cmp == null) {
				cmp = this.defaultCmp;
			}
			if (n * 10 <= array.length) {
				result = array.slice(0, n).sort(cmp);
				if (!result.length) {
					return result;
				}
				los = result[result.length - 1];
				_ref = array.slice(n);
				for (_i = 0, _len = _ref.length; _i < _len; _i++) {
					elem = _ref[_i];
					if (cmp(elem, los) < 0) {
						this.insort(result, elem, 0, null, cmp);
						result.pop();
						los = result[result.length - 1];
					}
				}
				return result;
			}
			this.heapify(array, cmp);
			_results = [];
			for (i = _j = 0, _ref1 = Math.min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
				_results.push(this.heappop(array, cmp));
			}
			return _results;
		}
		_siftdown(array, startpos, pos, cmp) {
			var newitem, parent, parentpos = 0;
			if (cmp == null) {
				cmp = this.defaultCmp;
			}
			newitem = array[pos];
			while (pos > startpos) {
				parentpos = (pos - 1) >> 1;
				parent = array[parentpos];
				if (cmp(newitem, parent) < 0) {
					array[pos] = parent;
					pos = parentpos;
					continue;
				}
				break;
			}
			return array[pos] = newitem;
		}
		_siftup(array, pos, cmp) {
			var childpos = 0, endpos = 0, newitem, rightpos = 0, startpos = 0;
			if (cmp == null) {
				cmp = this.defaultCmp;
			}
			endpos = array.length;
			startpos = pos;
			newitem = array[pos];
			childpos = 2 * pos + 1;
			while (childpos < endpos) {
				rightpos = childpos + 1;
				if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
					childpos = rightpos;
				}
				array[pos] = array[childpos];
				pos = childpos;
				childpos = 2 * pos + 1;
			}
			array[pos] = newitem;
			return this._siftdown(array, startpos, pos, cmp);
		}
	}
	exports.core = exports.core || {}
	exports.libs = exports.libs || {}
	exports.finders = exports.finders || {}
	exports.core.DiagonalMovement = DiagonalMovement;
	exports.core.Grid = Grid;
	exports.core.Heuristic = Heuristic;
	exports.core.Node = Node;
	exports.core.Util = Util;
	exports.finders.AStarFinder = AStarFinder;
	exports.finders.BestFirstFinder = BestFirstFinder;
	exports.libs.Heap = Heap;
	exports.libs.HeapFunction = HeapFunction;

	return exports;
}({}));