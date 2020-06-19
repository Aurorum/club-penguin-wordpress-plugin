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
 * Description:       Currently offers a playercard generator based on Club Penguin's assets.
 * Version:           1.0.0
 * Author:            Aurorum
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       puffles
 */

function pufflesPlayercardGeneratorShortcode($content = null)
{
    $data = array(
        'directory' => plugins_url('/assets/', __FILE__)
    );
    
    wp_register_script('puffles_scripts', plugin_dir_url(__FILE__) . 'scripts.js', '', '', true);
    wp_localize_script('puffles_scripts', 'pufflesPlayercardItems', $data);
    wp_enqueue_script('puffles_scripts');
    
    wp_register_script('puffles-items', plugin_dir_url(__FILE__) . 'items.json', '', '', true);
    wp_enqueue_script('puffles-items');
    
    $pufflesEmptyFile = plugins_url('assets/empty.png', __FILE__);
    
    return '
<div style="display:none">
   <img id="puffles-1-item-image"  src="' . plugins_url('/assets/15.png', __FILE__) . '">
   <img id="puffles-2-item-image"  src="' . $pufflesEmptyFile . '">
   <img id="puffles-3-item-image"  src="' . $pufflesEmptyFile . '">
   <img id="puffles-4-item-image"  src="' . $pufflesEmptyFile . '">
   <img id="puffles-5-item-image"  src="' . $pufflesEmptyFile . '">
   <img id="puffles-6-item-image"  src="' . $pufflesEmptyFile . '">
   <img id="puffles-7-item-image"  src="' . $pufflesEmptyFile . '">
   <img id="puffles-8-item-image"  src="' . $pufflesEmptyFile . '">
   <img id="puffles-9-item-image"  src="' . $pufflesEmptyFile . '">
   <img id="puffles-10-item-image"  src="' . $pufflesEmptyFile . '">
</div>
<div class="puffles-playercard-generator is-loading" id="puffles-playercard">
   <div class="puffles-playercard-generator-loading-placeholder"></div>
   <div class="puffles-playercard-generator-wrapper">
      <div class="puffles-playercard-generator-item-search">
         <label for="puffles-item-search">Search item by name or ID:</label>
         <input type="search" id="puffles-item-search" name="puffles-item-search">
         <button onclick="pufflesSearchItem(false)">Search</button>
         <button onclick="pufflesSearchItem(true)">Add</button>
         <p id="puffles-item-search-result" class="puffles-playercard-item-search-result"></p>
         <p id="puffles-item-search-error" class="puffles-playercard-item-search-error"></p>
      </div>
      <canvas id="puffles-canvas" class="puffles-playercard-canvas" width="600" height="600">
         Your browser does not support this generator - sorry!
      </canvas>
      <a onclick="pufflesGenerateRandomPlayercard()" class="puffles-playercard-random">Generate random playercard</a>
   </div>
   <div class="puffles-playercard-generator-items">
      <select id="puffles-1-item" onchange="pufflesUpdateItem(1)" size="4">
      </select>
      <select id="puffles-2-item" onchange="pufflesUpdateItem(2)" size="4">
      </select>
      <select id="puffles-3-item" onchange="pufflesUpdateItem(3)" size="4">
      </select>
      <select id="puffles-4-item" onchange="pufflesUpdateItem(4)" size="4">
      </select>
      <select id="puffles-5-item" onchange="pufflesUpdateItem(5)" size="4">
      </select>
      <select id="puffles-6-item" onchange="pufflesUpdateItem(6)" size="4">
      </select>
      <select id="puffles-7-item" onchange="pufflesUpdateItem(7)" size="4">
      </select>
      <select id="puffles-8-item" onchange="pufflesUpdateItem(8)" size="4">
      </select>
      <select id="puffles-9-item" onchange="pufflesUpdateItem(9)" size="4">
      </select>
      <div class="puffles-playercard-generator-download-button-wrapper">
         <a
            id="puffles-playercard-download"
            download="club-penguin-playercard"
            href=""
            class="puffles-playercard-generator-download-button"
            >Download playercard</a
            >
      </div>
   </div>
</div>';
}
add_shortcode('playercard-generator', 'pufflesPlayercardGeneratorShortcode');

function pufflesEnqueuePlayercardStyling()
{
    wp_enqueue_style('puffles-styles', plugin_dir_url(__FILE__) . 'style.css');
}

add_action('wp_enqueue_scripts', 'pufflesEnqueuePlayercardStyling');