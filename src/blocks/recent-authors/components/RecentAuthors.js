import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { BlockControls, InspectorControls } from '@wordpress/editor';
import { PanelBody, RangeControl, Spinner, Placeholder } from '@wordpress/components';

class RecentAuthors extends Component {
    constructor() {
        super( ...arguments );
        this.state = {
            updating: false,
        }
    }

    onChangeAlignment(value) {
        this.props.setAttributes({alignment: value})
    }

    componentWillMount() {
        const { className, attributes, setAttributes } = this.props;
    }

    componentWillUpdate( nextProps ) {
        const { authors } = nextProps;
    }

    render() {
        const { className, authors, attributes, setAttributes } = this.props;
        const { alignment, columns, number_show } = attributes;
        console.log(authors);
        const blockControls = (
            <BlockControls
                controls={[
                    {
                        icon: 'editor-alignleft',
                        title: __('Left', 'gutenberg-example'),
                        onClick: () => this.onChangeAlignment('left')
                    },
                    {
                        icon: 'editor-aligncenter',
                        title: __('Center', 'gutenberg-example'),
                        onClick: () => this.onChangeAlignment('center')
                    },
                    {
                        icon: 'editor-alignright',
                        title: __('Right', 'gutenberg-example'),
                        onClick: () => this.onChangeAlignment('right')
                    }
                ]}
                >
            </BlockControls>
        );
        const inspectorControls = (
            <InspectorControls>
                <PanelBody title={ __( 'Display Settings' ) }>
                    <RangeControl
                        label={ __( 'Columns' ) }
                        value={ columns }
                        min={ 1 }
                        max={ 4 }
                        onChange={ (value) => setAttributes( { columns: value } ) }
                    />
                    <RangeControl
                        label={ __( 'Number of items to display' ) }
                        value={ number_show }
                        min={ 1 }
                        max={ 10 }
                        onChange={ (value) => setAttributes( { number_show: value } ) }
                    />
                </PanelBody>
            </InspectorControls>
        );
        const hasAuthors = Array.isArray( authors ) && authors.length;
        if ( ! hasAuthors ) {
            return (
                <>
                { inspectorControls }
                <Placeholder
                    label={ __( 'Recent Authors' ) }
                >
                    { ! Array.isArray( hasAuthors ) ?
                        <Spinner /> :
                        __( 'No authors found!' )
                    }
                </Placeholder>
                </>
            );
        }
        //'gexample-recent-authors columns-'.columns
        const blockClass = [
            'gexample-recent-authors',
            'columns-' + columns
        ].filter( Boolean ).join( ' ' );
        return (
            <>
            { blockControls }
            { inspectorControls }
            <div className={className} style={{textAlign: alignment}}>
                <div className={blockClass}>
                    {authors.map( ( author, index ) => (
                        // console.log(author)
                        <div key={index} className="gexample-recent-author-item">
                            <div className="gexample-recent-author-avatar">
                            <img src={author.avatar_urls[96]} />
                            </div>
                            <h4 className="gexample-recent-author-name">{author.name}</h4>
                            <p className="gexample-recent-author-desc">{author.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            </>
        );
    }
}

export default RecentAuthors;