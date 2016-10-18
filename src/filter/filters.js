/**
 * フィルター
 *
 * @module Filter
 */
/**
 * フィルター
 *
 * @class filters
 */
export default (function () {
    /**
     * 線形フィルター
     *
     * @property linearFilter
     * @private
     * @type {Object}
     */
    let linearFilter;

    /**
     * 線形フィルター設定
     *
     * @method run
     * @param {Object} filter 空間フィルターオブジェクトです。
     */
    function setLinearFilter( filter ) {
        linearFilter = filter;
    }

    /**
     * 空間フィルター
     *
     * @property linearFilter
     * @private
     * @type {Object}
     */
    let spatialFilter;

    /**
     * 空間フィルター設定
     *
     * @method run
     * @param {Object} filter 空間フィルターオブジェクトです。
     */
    function setSpatialFilter( filter ) {
        spatialFilter = filter;
    }

    /**
     * フィルター処理
     *
     * @method run
     * @param {String} name filter name
     * @param {Number} k ImageData.dataの処理rgbaのred値に対応するインデックス<br>
     * @param {ImageData} imageData canvasの描画情報を持つImageDataオブジェクトです。
     * @return {Object | Boolean} rgbaの値を格納したオブジェクト。フィルターがないときはfalseを返す。
     */
    function run( k, imageData, name ) {
        if ( linearFilter.is( name ) === true ) {
            return linearFilter.run( k, imageData, name );
        }
        if ( spatialFilter.is( name ) === true ) {
            return spatialFilter.run( k, imageData, name );
        }
        return false;
    }
    return {
        setLinearFilter: setLinearFilter,
        setSpatialFilter: setSpatialFilter,
        run: run
    }
}());

