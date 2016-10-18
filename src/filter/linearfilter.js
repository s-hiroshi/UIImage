/**
 * フィルター
 *
 * @module Filter
 */
/**
 * 線形フィルター
 *
 * @class linearFilter
 */
export default (function () {
    const filters = {};
    /**
     * 反転
     *
     * @method reverse
     * @private
     * @param {Number} i 画像データ(ImageData.data)のインデックスです。
     *     + Red   i
     *     + Green i + 1
     *     + Blue  i + 2
     *     + Alpha i + 3
     * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
     * @return {Object} rgbaの値を持つオブジェクトです。
     */
    filters['reverse'] = function ( i, imageData ) {
        var rgba = {};
        rgba.r = 255 - imageData.data[i];
        rgba.g = 255 - imageData.data[i + 1];
        rgba.b = 255 - imageData.data[i + 2];
        rgba.a = imageData.data[i + 3];
        return rgba;
    };

    /**
     * 2値画像
     *
     * @method mono
     * @private
     * @param {Number} i 画像データ(ImageData.data)のインデックスです。
     *     + Red   i
     *     + Green i + 1
     *     + Blue  i + 2
     *     + Alpha i + 3
     * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
     * @return {Object} rgbaの値を持つオブジェクトです。
     */
    filters['mono'] = function ( i, imageData ) {
        var rgba = {};
        var color = parseInt( (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3, 10 );
        color = (color < 128) ? 0 : 255;
        rgba.r = rgba.g = rgba.b = color;
        rgba.a = imageData.data[i + 3];
        return rgba;
    };

    /**
     * グレースケール(単純平均)
     *
     * @method simpleGrayscale.
     * @private
     * @param {Number} i 画像データ(ImageData.data)のインデックスです。
     *     + Red   i
     *     + Green i + 1
     *     + Blue  i + 2
     *     + Alpha i + 3
     * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
     * @return {Object} rgbaの値を持つオブジェクトです。
     */
    filters['simpleGrayscale'] = function ( i, imageData ) {
        var rgba = {};
        var average = parseInt( (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3, 10 );
        rgba.r = rgba.g = rgba.b = average;
        rgba.a = imageData.data[i + 3];
        return rgba;
    };

    /**
     * グレースケール(NTSC系加重平均法)
     *
     * @method grayscale
     * @private
     * @param {Number} i 画像データ(ImageData.data)のインデックスです。
     *     + Red   i
     *     + Green i + 1
     *     + Blue  i + 2
     *     + Alpha i + 3
     * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
     * @return {Object} rgbaの値を持つオブジェクトです。
     */
    filters['grayscale'] = function ( i, imageData ) {
        var rgba = {};
        var color = parseInt( (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3, 10 );
        rgba.r = rgba.g = rgba.b = color;
        rgba.a = imageData.data[i + 3];
        return rgba;
    };

    /**
     * 明るく
     *
     * @method bright
     * @private
     * @param {Number} i 画像データ(ImageData.data)のインデックスです。
     *     + Red   i
     *     + Green i + 1
     *     + Blue  i + 2
     *     + Alpha i + 3
     *     alpha i + 3
     * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
     * @return {Object} rgbaの値を持つオブジェクトです。
     */
    filters['bright'] = function ( i, imageData ) {
        var rgba = {};
        var inc = 4;
        rgba.r = ((imageData.data[i] + inc) < 255) ? imageData.data[i] + inc : 255;
        /* Red */
        rgba.g = ((imageData.data[i + 1] + inc) < 255) ? imageData.data[i + 1] + inc : 255;
        /* Green */
        rgba.b = ((imageData.data[i + 2] + inc) < 255) ? imageData.data[i + 2] + inc : 255;
        /* Blue */
        rgba.a = imageData.data[i + 3];
        /* alpha */
        return rgba;
    };

    /**
     * sepia セピア
     *
     * @method filters.sepia.
     * @private
     * @param {Number} i 画像データ(ImageData.data)のインデックスです。
     *     + Red   i
     *     + Green i + 1
     *     + Blue  i + 2
     *     + Alpha i + 3
     * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
     * @return {Object} rgbaの値を持つオブジェクトです。
     */
    filters['sepia'] = function ( i, imageData ) {
        var rgba = {};
        // グレースケールへ
        var average = parseInt( imageData.data[i] * 0.298912 + imageData.data[i + 1] * 0.586611 + imageData.data[i + 2] * 0.114478, 10 );
        rgba.r = rgba.g = rgba.b = average;
        rgba.a = imageData.data[i + 3];
        // セピアへ
        rgba.r *= 0.9;
        rgba.g *= 0.7;
        rgba.b *= 0.4;
        return rgba;
    };

    /**
     * 赤を増やす
     *
     * @method red
     * @private
     * @param {Number} i 画像データ(ImageData.data)のインデックスです。
     *     + Red   i
     *     + Green i + 1
     *     + Blue  i + 2
     *     + Alpha i + 3
     * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
     * @return {Object} rgbaの値を持つオブジェクトです。
     */
    filters['red'] = function ( i, imageData ) {
        var rgba = {};
        rgba.r = imageData.data[i];
        rgba.r = (rgba.r < 250) ? rgba.r + 5 : 255;
        rgba.g = imageData.data[i + 1];
        rgba.b = imageData.data[i + 2];
        rgba.a = imageData.data[i + 3];
        return rgba;
    };

    /**
     * グリーンを増やす
     *
     * @method green
     * @private
     * @param {Number} i 画像データ(ImageData.data)のインデックスです。
     *     + Red   i
     *     + Green i + 1
     *     + Blue  i + 2
     *     + Alpha i + 3
     * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
     * @return {Object} rgbaの値を持つオブジェクトです。
     */
    filters['green'] = function ( i, imageData ) {
        var rgba = {};
        rgba.r = imageData.data[i];
        rgba.g = imageData.data[i + 1];
        rgba.g = (rgba.g < 250) ? rgba.g + 5 : 255;
        rgba.b = imageData.data[i + 2];
        rgba.a = imageData.data[i + 3];
        return rgba;
    };

    /**
     * 青を増やす
     *
     * @method blue
     * @private
     * @param {Number} i 画像データ(ImageData.data)のインデックスです。
     *     + Red   i
     *     + Green i + 1
     *     + Blue  i + 2
     *     + Alpha i + 3
     * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
     * @return {Object} rgbaの値を持つオブジェクトです。
     */
    filters['blue'] = function ( i, imageData ) {
        var rgba = {};
        rgba.r = imageData.data[i];
        rgba.g = imageData.data[i + 1];
        rgba.b = imageData.data[i + 2];
        rgba.b = (rgba.b < 250) ? rgba.b + 5 : 255;
        rgba.a = imageData.data[i + 3];
        return rgba;
    };

    /**
     * フィルターの存在を確認
     * @method is
     * @param {String} name フィルター名です。
     * @return {Boolean} フィルターがあればtrue、フィルターがないときはfalseを返します。
     */
    function is( name ) {
        return typeof filters[name] === 'function';
    }

    /**
     * フィルター呼び出し処理
     * @method perform
     * @private
     * @param {Number} i 画像データ(ImageData.data)のインデックスです。
     * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
     * @param {String} name フィルター名です。
     * @return {Object} rgbaの値を持つオブジェクトです。
     */
    function perform( i, imageData, name ) {
        return filters[name]( i, imageData );
    }

    /**
     * フィルター処理
     *
     * @method run
     * @param {Number} i 画像データ(ImageData.data)のインデックスです。
     * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
     * @param {String} name フィルター名です。
     * @return {Object} rgbaの値を持つオブジェクトです。
     */
    function run( i, imageData, name ) {
        return perform( i, imageData, name );
    }

    return {
        is: is,
        run: run
    };
}());
