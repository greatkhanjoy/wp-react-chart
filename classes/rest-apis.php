<?php

class WPCR_Rest_API{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_route']);
    }

    public function create_rest_route() {
        register_rest_route('wpcr/v2', '/settings/', [
            'methods'   => 'GET',
            'callback'  => [$this, 'get_settings'],
            'permission_callback'   => [$this, 'get_settings_permission']
        ]);

        register_rest_route('wpcr/v2', '/last-n-days/(?P<days>\d+)/', [
            'methods'   => 'GET',
            'callback'  => [$this, 'get_last_n_days_data'],
            'permission_callback'   => [$this, 'get_settings_permission']
        ]);

        register_rest_route('wpcr/v2', '/settings/', [
            'methods'   => 'POST',
            'callback'  => [$this, 'add_new'],
            'permission_callback'   => [$this, 'get_settings_post_permission']
        ]);
        register_rest_route('wpcr/v2', '/settings/(?P<id>\d+)', [
            'methods'   => 'DELETE',
            'callback'  => [$this, 'delete_item'],
            'permission_callback'   => [$this, 'get_settings_post_permission']
        ]);
    }

    /**
     * callback
     */
    public function get_settings(){
       global $wpdb;
       $table_name = $wpdb->prefix . 'wpcr_table';
       $all_qu = $wpdb->get_results(
        $wpdb->prepare(
            "SELECT * FROM {$table_name} ORDER BY id DESC"
        ), ARRAY_A
       );


       return $all_qu;
    }

    /**
     * Add new 
     */

     public function add_new($request){
        global $wpdb;
        $table_name = $wpdb->prefix . 'wpcr_table';
    
        $data = array(
            'name' => sanitize_text_field($request['name']),
            'uv' => absint($request['uv']),
            'pv' => absint($request['pv']),
            'amt' => absint($request['amt']),
            'dateT' => sanitize_text_field($request['date']),
        );
    
        $format = array('%s', '%d', '%d', '%d', '%s');
    
        $result = $wpdb->insert($table_name, $data, $format);
    
        return $result;
    }

    /**
     * Delete
     */
    public function delete_item($request){
        global $wpdb;
        $table_name = $wpdb->prefix . 'wpcr_table';
    
        // Assuming 'id' is the primary key
        $id_to_delete = absint($request['id']);
    
        $result = $wpdb->delete(
            $table_name,
            array('id' => $id_to_delete),
            array('%d')
        );
    
        return $result;
    }
    
    

    /**
     * callback
     */
    public function get_last_n_days_data($request){
        $days = $request['days'];
        return $this->get_data_for_days($days);
    }

    public function get_data_for_days($days){
       global $wpdb;
       $table_name = $wpdb->prefix . 'wpcr_table';
       $query = "SELECT * FROM $table_name WHERE dateT >= DATE_SUB(NOW(), INTERVAL $days DAY)";

       $result = $wpdb->get_results($query);


       return $result;
    }

    /**
     * Permissions
     */
    public function get_settings_permission(){
        return true;
    }
    public function get_settings_post_permission(){
        return is_user_logged_in() && current_user_can('edit_others_posts');
    }
}

new WPCR_Rest_API();