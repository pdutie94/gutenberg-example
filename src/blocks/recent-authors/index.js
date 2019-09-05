import './style.editor.scss';

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { registerStore, withSelect } from '@wordpress/data';

import RecentAuthors from './components/RecentAuthors';


registerBlockType('gutenberg-example/recent-authors', {
    title: __('Recent Authors'),
    description: __('Show the latest authors'),
    category: 'layout',
    icon: 'admin-users',
    keywords: [__('recent'), __('author'), __('authors')],
    attributes: {
        alignment: {
            type: 'string',
            default: 'left',
        },
        columns: {
            type: 'number',
            default: 3
        },
        number_show: {
            type: 'number',
            default: 6
        }
    },
    edit: withSelect( ( select, props ) => {
        const { alignment, columns, number_show } = props.attributes;
        let authors1 = {};
        wp.apiFetch( { path: '/wp/v2/users?roles=author' } ).then( function( users ){ authors1 = users; } );
        
        // console.log(select( 'gutenberg-example/blocks/recent-authors' ).receiveUserRoles());
        return {
            authors: authors1
        };
    } )(RecentAuthors),
    save: () => {
        return null;
    }
})