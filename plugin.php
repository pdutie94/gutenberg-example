<?php
/**
 * Plugin Name: Gutenberg Example
 * Description: Example blocks for Gutenberg
 * Author: TienPham
 */

if( ! defined( 'ABSPATH' ) ) {
    exit;
}

function gutenberg_example_regitser_block_type($block, $options = array()) {
    register_block_type(
        'gutenberg-example/' . $block,
        array_merge(
            array(
                'editor_script' => 'gutenberg-example-editor-script',
                'editor_style'  => 'gutenberg-example-editor-style',
                'script'        => 'gutenberg-example-script',
                'style'         => 'gutenberg-example-style',
            ),
            $options
        )
    );
}

function gutenberg_example_register() {

    wp_register_script( 
        'gutenberg-example-editor-script', 
        plugins_url('dist/editor.js', __FILE__),
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components', 'wp-data', 'wp-api-fetch')
    );
    wp_register_script( 
        'gutenberg-example-script', 
        plugins_url('dist/script.js', __FILE__),
        array('jquery')
    );

    wp_register_style( 
        'gutenberg-example-editor-style', 
        plugins_url('dist/editor.css', __FILE__),
        array('wp-edit-blocks')
    );
    wp_register_style( 
        'gutenberg-example-style', 
        plugins_url('dist/style.css', __FILE__)
    );
    gutenberg_example_regitser_block_type('recent-authors', array(
        'render_callback' => 'gutenberg_example_render_recent_authors_block',
        'attributes' => array(
            'alignment' => array (
                'type' => 'string',
                'default' => 'left',
            ),
            'columns' => array (
                'type' => 'number',
                'default' => 3
            ),
            'number_show' => array(
                'type' => 'number',
                'default' => 6
            )
        )
    ) );
}

add_action('init', 'gutenberg_example_register');

function gutenberg_example_render_recent_authors_block( $attributes ) {
    if(!is_admin()) {
        $blockClass = 'gexample-recent-authors columns-'.$attributes['columns'];
        $user_query = new WP_User_Query( array( 'role' => 'author' ) );
        $users = '';
        $users .= '<div class="wp-block-gutenberg-example-recent-authors">';
        $users .= '<div class="'.$blockClass.'">';
        if ( ! empty( $user_query->get_results() ) ) { 
            foreach ( $user_query->get_results() as $user ) {
                $users .= '<div class="gexample-recent-author-item" style="text-align: '.$attributes['alignment'].'">';
                    $users .= '<div class="gexample-recent-author-avatar">';
                        $users .= '<img src="http://2.gravatar.com/avatar/e76d2aec900744a4dc99ef937b6d3848?s=96&amp;d=mm&amp;r=g">';
                    $users .= '</div>';
                    $users .= '<h4 class="gexample-recent-author-name">'.$user->display_name.'</h4>';
                    $users .= '<p class="gexample-recent-author-desc">'.$user->description.'</p>';
                $users .= '</div>';
            }
        } else {
                return 'No users found.';
        }
        $users .=  '</div>';
        $users .=  '</div>';
        return $users;
    }
}