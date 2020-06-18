<?php
/**
 * Puffles - for Club Penguin Bloggers
 * 
 * @author            Aurorum
 * @package           Puffles
 * @license           GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       Puffles - for Club Penguin Bloggers
 * Plugin URI:        https://github.com/Aurorum/club-penguin-wordpress-plugin
 * Description:       WIP
 * Version:           1.0.0
 * Author:            Aurorum
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       puffles
 */

function pufflesPlayercardGeneratorShortcode($atts, $content = null) {
	$data = shortcode_atts(
        array (
            'placeholder' => 'a',
        ),
    );
	
	wp_register_script( 'member-of-parliament-profile_scripts', plugin_dir_url( __FILE__ ) . 'scripts.js', '','',true  ); 

	   wp_localize_script(
        'member-of-parliament-profile_scripts',
        'memberOfParliamentData',
        $data
    );
	
	wp_enqueue_script( 'member-of-parliament-profile_scripts' );
	
        return '
<div class="images">

<img id="puffles-1-item-image"  src="./assets/2.png">
<img id="puffles-2-item-image"  src="./assets/empty.png">
<img id="puffles-3-item-image"  src="./assets/empty.png">
<img id="puffles-4-item-image"  src="./assets/empty.png">
<img id="puffles-5-item-image"  src="./assets/empty.png">
<img id="puffles-6-item-image"  src="./assets/empty.png">
<img id="puffles-7-item-image"  src="./assets/empty.png">
<img id="puffles-8-item-image"  src="./assets/empty.png">
<img id="puffles-9-item-image"  src="./assets/empty.png">
<img id="puffles-10-item-image"  src="./assets/empty.png">
</div>
<p>Canvas:</p>
<div>
 <canvas id="puffles-canvas" width="600" height="600">
Your browser does not support the HTML5 canvas tag.
</canvas>
<div>
<select id="puffles-1-item" onchange="pufflesUpdateItem(1)" size="8">
  </select>
  <select id="puffles-2-item" onchange="pufflesUpdateItem(2)" size="8">
  </select>
    <select id="puffles-3-item" onchange="pufflesUpdateItem(3)" size="8">
  </select>
  <select id="puffles-4-item" onchange="pufflesUpdateItem(4)" size="8">
  </select>
  <select id="puffles-5-item" onchange="pufflesUpdateItem(5)" size="8">
  </select>
  <select id="puffles-6-item" onchange="pufflesUpdateItem(6)" size="8">
  </select>
  <select id="puffles-7-item" onchange="pufflesUpdateItem(7)" size="8">
  </select>
   <select id="puffles-8-item" onchange="pufflesUpdateItem(8)" size="8">
  </select>
  <select id="puffles-9-item" onchange="pufflesUpdateItem(9)" size="8">
  </select>
  </div>
  </div>';
	}
add_shortcode('playercard-generator', 'pufflesPlayercardGeneratorShortcode');