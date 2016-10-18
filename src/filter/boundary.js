/**
 * フィルター
 * 
 * @module Filter
 */
/**
 * 空間フィルター境界処理
 *
 * @class boundary
 */

export default (function () {
    /**
     * 境界処理
     *
     * 境界で近傍のピクセルがないときは対角のピクセルを処理します。そのためのカウンタを返します。
     * 境界処理は左上端, 左下端, 右上端, 右下端, 左端、右端、上端、下端で処理を分ける。
     *
     * @method expandedIndex
     * @param {Number} k 注目ピクセルのRGBAのRed値インデックス
     * @param {Number} i 空間フィルターの行方向カウンタ
     * @param {Number} j 空間フィルターの列方向カウンタ
     * @param {ImageData} {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
     * @return {Object}
     *
     */
    function expandedIndex( k, i, j, imageData ) {

        // imageData.data配列の長さ
        var length = imageData.width * imageData.height * 4;

        // 左上端
        if ( k === 0 ) {
            if ( i === -1 && j === -1 ) {
                return {
                    i: -i,
                    j: -j
                };
            }
            if ( i === -1 && j === 0 ) {
                return {
                    i: -i,
                    j: j
                };
            }
            if ( i === -1 && j === 1 ) {
                return {
                    i: -i,
                    j: j
                };
            }
            if ( i === 0 && j === -1 ) {
                return {
                    i: i,
                    j: -j
                };
            }
            if ( i === 1 && j === -1 ) {
                return {
                    i: i,
                    j: -j
                };
            }
            // 境界じゃないのでそのまま返す
            return {
                i: i,
                j: j
            };
        }
        // 左下端
        if ( k === (length - imageData.width * 4) ) {
            if ( i === -1 && j === -1 ) {
                return {
                    i: i,
                    j: -j
                };
            }
            if ( i === 0 && j === -1 ) {
                return {
                    i: i,
                    j: -j
                };
            }
            if ( i === 1 && j === -1 ) {
                return {
                    i: -i,
                    j: -j
                };
            }
            if ( i === 1 && j === 0 ) {
                return {
                    i: -i,
                    j: j
                };
            }
            if ( i === 1 && j === 1 ) {
                return {
                    i: -i,
                    j: j
                };
            }
            // 境界じゃないのでそのまま返す
            return {
                i: i,
                j: j
            };
        }
        // 右上端
        if ( k === (imageData.width - 1) * 4 ) {
            if ( i === -1 && j === -1 ) {
                return {
                    i: -i,
                    j: j
                };
            }
            if ( i === -1 && j === 0 ) {
                return {
                    i: -i,
                    j: j
                };
            }
            if ( i === -1 && j === 1 ) {
                return {
                    i: -i,
                    j: -j
                };
            }
            if ( i === 0 && j === 1 ) {
                return {
                    i: i,
                    j: -j
                };
            }
            if ( i === 1 && j === 1 ) {
                return {
                    i: i,
                    j: -j
                };
            }
            return {
                i: i,
                j: j
            };
        }
        // 右下端
        if ( k === length - 4 ) {
            if ( i === -1 && j === 1 ) {

                return {
                    i: i,
                    j: -j
                };
            }
            if ( i === 0 && j === 1 ) {
                return {
                    i: i,
                    j: -j
                };
            }
            if ( i === 1 && j === -1 ) {
                return {
                    i: -i,
                    j: j
                };
            }
            if ( i === 1 && j === 0 ) {
                return {
                    i: -i,
                    j: j
                };
            }
            if ( i === 1 && j === 1 ) {
                return {
                    i: -i,
                    j: -j
                };
            }
            // 境界じゃないのでそのまま返す
            return {
                i: i,
                j: j
            };
        }
        // 左端
        if ( k % (imageData.width * 4) === 0 ) {
            if ( j === -1 ) {
                return {
                    i: i,
                    j: -j
                };
            }
            return {
                i: i,
                j: j
            };
        }
        // 右端
        if ( ((length - 4) - k) % imageData.width * 4 === 0 ) {
            if ( j === 1 ) {
                return {
                    i: i,
                    j: -j
                };
            }
            return {
                i: i,
                j: j
            };
        }
        // 上端
        if ( k < imageData.width * 4 ) {
            if ( i === -1 ) {
                return {
                    i: -i,
                    j: j
                };
            }
            return {
                i: i,
                j: j
            };
        }
        // 下端
        if ( k > (length - 1) - imageData.width * 4 ) {
            if ( i === 1 ) {
                return {
                    i: -i,
                    j: j
                };
            }
            return {
                i: i,
                j: j
            };
        }

        // 境界ではないのでインデックス変わらない
        return {
            i: i,
            j: j
        };
    }
    return {
        expandedIndex: expandedIndex
    }
}());
