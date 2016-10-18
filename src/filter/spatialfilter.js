/**
 * フィルター
 *
 * @module Filter
 */
/**
 * 空間フィルター
 *
 * @class spatialFilter
 */
export default (function () {
    /**
     * 境界処理
     *
     * @property boundary
     * @private
     * @type {Object}
     */
    let boundary;

    /**
     * 境界処理設定
     *
     * @method setBoundary
     * @public
     * @param {Object} target 境界判定オブジェクトです。
     */
    function setBoundary( target ) {
        boundary = target;
    }

    /**
     * 空間フィルターのオペレーター
     *
     * @property operator
     * @private
     * @type {Object}
     */
    const operator = {
        smooth: [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9],            // 平滑化
        mean: [1 / 16, 2 / 16, 1 / 16, 2 / 16, 4 / 16, 2 / 16, 1 / 16, 2 / 16, 1 / 16],     // 平滑化(加重平均)
        sharpen: [0, -1, 0, -1, 5, -1, 0, -1, 0],                                           // 先鋭化
        sharpen2: [-1, -1, -1, -1, 9, -1, -1, -1, -1],                                      // 先鋭化2
        differentialH: [0, 0, 0, 0, -1, 1, 0, 0, 0],                                        // 横方向一次微分フィルター
        differentialV: [0, 1, 0, 0, -1, 0, 0, 0, 0],                                        // 横方向一次微分フィルター
        prewitt: [-1, 0, 1, -1, 0, 1, -1, 0, 1],                                            // Prewittフィルター
        sobel: [-1, 0, 1, -2, 0, 2, -1, 0, 1],                                              // Sobelフィルター
        emboss: [1, 0, 0, 0, -1, 0, 0, 0, 0]                                                // Embossフィルター
    };

    /**
     * 空間フィルター
     *
     * @method filter
     * @param {Number} k 画像データ(ImageData.data)のインデックスです。
     *     + red   k 注目ピクセルのRed値に対応するImageData.dataのインデックス<br>
     *     + green k + 1
     *     + blue  k + 2
     *     + alpha k + 3
     * @param {Object} imageData
     * @param {String} name フィルター名
     * @return {Object}
     */
    function filter( k, imageData, name ) {
        if ( operator[name] instanceof Array === false ) {
            throw new Error( 'フィルターがありません。' );
        }
        var rgba = {};
        rgba.r = rgba.g = rgba.b = 0;
        var i, j, n, count = 0, index = {};
        for ( i = -1; i <= 1; i++ ) {
            for ( j = -1; j <= 1; j++ ) {
                index = boundary.expandedIndex( k, i, j, imageData );
                n = k + (index.i * 3 + index.j) * 4;
                rgba.r += parseInt( operator[name][count] * imageData.data[n], 10 );
                rgba.g += parseInt( operator[name][count] * imageData.data[n + 1], 10 );
                rgba.b += parseInt( operator[name][count] * imageData.data[n + 2], 10 );
                count++;
            }
        }
        rgba.a = imageData.data[k + 3];
        return rgba;
    }
    
    /**
     * フィルター存在確認
     *
     * @method is
     * @public
     * @param {String} name フィルター名です。
     * @return {Boolean} フィルターがあればtrue、フィルターがないときはfalseを返します。
     */
    function is( name ) {
        return $.inArray( name, operator ) !== false;
    }

    /**
     * フィルター実行
     *
     * @method run
     * @public
     *
     * @param {String} name フィルター名です。
     * @param {Number} i ImageData.dataの処理。rgbaのred値に対応するインデックスです。
     * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
     * @return {Object} rgba値を持つオブジェクトです。
     */
    function run( i, imageData, name ) {
        return filter( i, imageData, name );
    }

    return {
        setBoundary: setBoundary,
        is: is,
        run: run
    }
}());

