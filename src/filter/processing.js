/**
 * フィルター
 *
 * @module Filter
 */
/**
 * 画像の各ピクセルへフィルターを提要
 *
 * @class processing
 */
export default (function () {
    /**
     * フィルターオブジェクト
     *
     * @property filter
     * @private
     * @type {Object}
     */
    let filter;

    /**
     * フィルター設定
     *
     * @method setFilter
     * @public
     * @param {Object} target filterオブジェクトです。
     */
    function setFilter( target ) {
        filter = target;
    }

    /**
     * フィルターを適用したデータを返す
     *
     * @method run
     * @public
     * @param {ImageData} imageData フィルター適用するImageDataです。
     * @param {String} name 適用するフィルター名です。
     * @return {Array} フィルター適用後のRGBA値を持つデータ配列です。
     */
    function run( imageData, name ) {
        // 全ピクセルを走査しピクセルごとにフィルター処理を呼び出す
        var i, j, k, rgba = {}, data = [];
        // 行
        for ( i = 0; i < imageData.height; i++ ) {
            // 列
            for ( j = 0; j < imageData.width; j++ ) {
                k = (i * imageData.width + j) * 4;
                rgba = filter.run( k, imageData, name );
                data[k] = rgba.r;
                data[k + 1] = rgba.g;
                data[k + 2] = rgba.b;
                data[k + 3] = rgba.a;
            }
        }
        return data;
    }

    return {
        setFilter: setFilter,
        run: run
    }
}());
