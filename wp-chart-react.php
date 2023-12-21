<?php
/*
Plugin Name: WordPress Chart Plugin with React
Author: Imran Hosein Khan Joy
Author URI: https://greatkhanjoy.netlify.app
Version: 1.0.0
Description: Simple Chart plugin with React js.
*/

if (!defined('ABSPATH')) {
    exit(); // Exit if accessed directly.
}

/**
 * Define Plugins Constants
 */

 define ('WPCR_PATH', trailingslashit( plugin_dir_path(__FILE__)));
 define ('WPCR_URL', trailingslashit( plugins_url('/', __FILE__)));


/**
 * Load Scripts
 */
function load_scripts() {
     wp_enqueue_script('wp-chart-react', WPCR_URL . 'dist/bundle.js', ['jquery', 'wp-element'], wp_rand(), true);
     wp_register_style('wpcr-style', WPCR_URL . 'dist/style.css');
    
     wp_localize_script('wp-chart-react', 'appLocalizer', [
         'apiUrl'   => home_url('/wp-json'),
         'rest_url'  => get_rest_url(null, '/wpcr/v2'),
         'nonce'    => wp_create_nonce('wp_rest')
        ]);
}
add_action('admin_enqueue_scripts', 'load_scripts');


/**
 * Dashboard Chart Widget
 */
function wpcr_chart_widget(){
    wp_add_dashboard_widget( 
        'wpcr_chart_widget', 
        'Graph Widget', 
        'render_wpcr_widget',
    );
}
add_action('wp_dashboard_setup', 'wpcr_chart_widget');

/**
 * Render Widget
 */
function render_wpcr_widget(){
    echo '<div id="wpcr-graph-container" class="half-width"></div>';
 }


 /**
  * Admin Menu
  */
  function wpcr_admin_menu(){
    add_menu_page(
        __('WPCR', 'wpcr'),
        __('WPCR', 'wpcr'),
        'manage_options',
        'wpcr',
        'wpcr_setting_page',
        'dashicons-clipboard'
    );
  }
  add_action('admin_menu', 'wpcr_admin_menu');

/**
 * Render Settings Page
 */
  function wpcr_setting_page(){
    wp_enqueue_style('wpcr-style');
    echo '<div id="wpcr-settings"></div>';
  }

 /**
  * Create Chart Table on activation
  */
 function table_init() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'wpcr_table';
    $sql = "CREATE TABLE {$table_name} (
        id INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(250),
        uv INT,
        pv INT,
        amt INT,
        dateT DATE,
        PRIMARY KEY (id)
    )";

    require_once ABSPATH . "wp-admin/includes/upgrade.php";
    dbDelta($sql);

    $insert_query = "INSERT into ".$table_name." (name, uv, pv, amt, dateT) VALUES
    ('Page A',4000,2000,2400,'2023-03-01'),
    ('Page B',2000,4000,3000,'2023-03-13'),
    ('Page C',6000,3000,2000,'2023-03-06'),
    ('Page D',1000,2000,5000,'2023-03-01'),
    ('Page E',6000,1000,4000,'2023-02-16')";

    $wpdb->query($insert_query);
}

register_activation_hook(__FILE__, "table_init");


require_once WPCR_PATH . 'classes/rest-apis.php';