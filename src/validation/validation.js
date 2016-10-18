/**
 * 入力検証
 *
 * @module Validation
 * @class validation
 */
export default (function () {

    /**
     * undefined, null, 空文字''のときはfalse。
     *
     * @param values  スカラー値または配列です。
     * 引数なしで呼び出されたときはfalseを返す。
     * ネストは考慮しない。
     */
    function isNotEmpty( values ) {
        let operands = [];
        // 引数なし
        if ( typeof values === 'undefined' ) {
            return false;
        }
        // scalar値は配列へ変換
        if ( (values instanceof Array) === false ) {
            operands.push( values );

        } else {
            operands = values;
        }
        for ( var i = 0; i < operands.length; i++ ) {
            if ( typeof operands[i] === 'undefined' ) {
                return false;
            }
            if ( operands[i] === null ) {
                return false;
            }
            if ( operands[i] === '' ) {
                return false;
            }
        }
        return true;
    }

    /**
     * 0より大きい整数
     *
     * @param {Number} num
     * 0より大きい整数true。それ以外はfalseを返します。
     * 引数なしで呼び出したときはfalse
     */
    function isMoreThan0( num ) {
        // キャスト失敗はNaNを返します(エラーではない)。
        // undefined, 空文字, nullはNaNを返します。
        const result = parseInt( num, 10 );
        // 数字以外
        if ( isNaN( result ) ) {
            return false;
        }
        // 0以下
        if ( (num <= 0) === true ) {
            return false;
        }
        return true;
    }

    // 公開メソッド
    return {
        isNotEmpty: isNotEmpty,
        isMoreThan0: isMoreThan0
    }

}());
