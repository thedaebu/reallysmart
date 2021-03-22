import React from 'react';

class AnnotationShow extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount () {
        this.props.fetchAnnotation(this.props.annotationId);
    }

    render() {
        const {annotation, yCoord, fetchAnnotation, annotationId} = this.props;
        
        if (annotationId) {
            return (
                <div className='annotation-show-main' style={{position: 'relative', top: yCoord-370}} >
                    <p className='annotation-show-name'>Really Smart Annotation by {annotation.annotator}</p>
                    <p className='annotation-show-body'>{annotation.body}</p>
                </div>
            )
        } else {
            return (
                <div>
                
                </div>
            )
        }
    }
};

export default AnnotationShow;