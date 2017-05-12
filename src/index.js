const canvas = $( '#canvas' ).get( 0 );
const ctx = canvas.getContext( '2d' );
import original from './data/original.js';
original.setWidthElem($('#original-width'));
original.setHeightElem($('#original-height'));
import uploader from './uploader/uploader.js';
uploader.setOriginal( original );
uploader.setDragDrop( canvas );
import resize from './transform/resize.js';
import rotate from './transform/rotate.js';
import validation from './validation/validation.js';
import boundary from './Filter/boundary.js';
import linearFilter from './Filter/linearfilter.js';
import spatialFilter from './Filter/spatialfilter.js';
spatialFilter.setBoundary( boundary );
import filters from './Filter/filters.js';
filters.setLinearFilter( linearFilter );
filters.setSpatialFilter( spatialFilter );
import processing from './filter/processing.js';
processing.setFilter( filters );
import trim from './trim/trim.js';
import trimCircle from './trim/circle.js';
import lettering from './lettering/lettering.js';

/*
 * 画像アップロード
 */
$( '#uploader' ).bind( 'change', function () {
    const file = this.files[0];
    if ( uploader.checkFormat( file.type ) === false ) {
        return false;
    }
    uploader.drawFile( file, canvas );
} );

/*
 * オリジナル画像表示
 */
$( '#original' ).on( 'click', function () {
    let originalData = original.getOriginalData();
    canvas.width = originalData.width;
    canvas.height = originalData.height;
    ctx.clearRect( 0, 0, originalData.width, original.height );
    ctx.putImageData( originalData, 0, 0 );
    $( '#original-width' ).val( originalData.width );
    $( '#original-height' ).val( originalData.height );
} );

/*
 * アフィン変換
 */
$( '#resize' ).on( 'click', function () {
    // リサイズ
    const size = {
        "width": $( '#width' ).val(),
        "height": $( '#height' ).val()
    };
    const ratio = $( '#ratio' ).is( ':checked' );
    if ( !resize.validate( size, ratio, validation ) ) {
        return false;
    }
    resize.run( canvas, size, ratio );
    return false;
} );
$( '#rotate-right' ).on( 'click', function () {
    // 右90度回転
    rotate.run( 90, canvas );
    return false;
} );
$( '#rotate-left' ).on( 'click', function () {
    // 左90度回転
    rotate.run( -90, canvas );
    return false;
} );

/*
 * フィルター処理
 */
$( '.filtering' ).on('click', function () {
    const name = $( this ).attr( 'id' );
    const imageData = ctx.getImageData( 0, 0, canvas.width, canvas.height );
    imageData.data.set( processing.run( imageData, name ) );
    ctx.putImageData( imageData, 0, 0 );
    return false;
} );

/*
 * トリミング
 */
$( '#open-trim-selection' ).on( 'click', function () {
    trim.openSelection( $( "#trim-selection" ) );
    return false;
} );
$( '#close-trim-selection' ).on( function () {
    trim.closeSelection( $( "#trim-selection" ) );
    return false;
} );
$( '#trim-selection' ).on( 'resize', function () {
    trim.resizeSelection( $( "#trim-width" ), $( "#trim-height" ), $( "#trim-selection" ) );
    return false;
} );
$( '#trim-width' ).on( 'keyup', function () {
    trim.setWidth( $( this ), $( '#trim-selection' ) );
    return false;
} );
$( '#trim-height' ).on( 'keyup', function () {
    trim.setHeight( $( this ), $( '#trim-selection' ) );
    return false;
} );
$( '#trimming' ).on( 'click', function () {
    trim.run( canvas, $( "#trim-selection" ) );
    return false;
} );

$('#trimming-circle').on('click', function() {
    trimCircle.run(canvas);
    
});

/*
 * 文字入力
 */
$( '.lettering' ).on( 'click', function () {
    const letter = $('.lettering-input').val();
    const pos = {
        top: $( '.lettering-top' ).val(),
        left: $( '.lettering-left' ).val()
    };
    const size = $('.lettering-size').val();
    const color = $('.lettering-color').val();
    const family = 'sans-serif';
    lettering.draw( canvas, letter, pos, color, size, family );
    return false;
} );


/*
 * 保存
 */
$( '#save' ).on('click', function () {
    $( '#save-dialog img' ).remove();
    const canvasData = canvas.toDataURL();
    const width = canvas.width + 40;
    const height = canvas.height + 80;
    $( '#save-dialog' ).dialog( {
        width: width,
        height: height
    } );
    const img = $( '<img>' );
    img.width = canvas.width;
    img.height = canvas.height;
    img.appendTo( $( '#save-dialog' ) );
    img.get( 0 ).setAttribute( 'src', canvasData );
} );

