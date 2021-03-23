import React from 'react';
import { Link } from 'react-router-dom';

class Annotation extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            createStatus: this.props.createStatus,
            body: '',
            
        };

        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);   
    }

    componentDidMount () {
    }

    componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
        if (this.props !== prevProps) {
            this.setState({
                createStatus: this.props.createStatus,
            })
        }
    }

    handleOnClick(e) {
        e.preventDefault;
        this.setState({['createStatus']: true})     
        this.setState({['openness']: 'b'})     
    }

    handleFormChange() { 
        return e => this.setState({['body']: e.target.value})
    }

    handleFormSubmit(e) {
        e.preventDefault;
        
        const annotation = Object.assign({},
            {
                body: this.state.body,
                annotator_id: this.props.currentUser.id,
                track_id: this.props.track.id,
                start_index: this.props.startIndex,
                end_index: this.props.endIndex,
            })
            

        this.props.createAnnotation(annotation).then(() => this.props.fetchTrack(this.props.track.id));
        this.props.closeModal();
        
    }

    handleCancel(e) {
        e.preventDefault;
        this.setState({['createStatus']: false})
        this.props.closeModal();
        
        
    }

    render() {
        const {annotation, currentUser, openModal, closeModal, track, yCoord, startIndex, endIndex, annotationStatus, fetchAnnotation, createAnnotation, annotationId} = this.props;
       
        if (annotation) {
            return (
                
                <div className='annotation-show-main' style={{position: 'relative', top: yCoord-370}} >
                    <div>
                        {startIndex}:{endIndex}
                    </div>
                    <p className='annotation-show-name'>Really Smart Annotation by {annotation.annotator}</p>
                    <p className='annotation-show-body'>{annotation.body}</p>
                </div>
            )
        } else if (currentUser && startIndex && annotationStatus === true && startIndex !== endIndex && this.state.createStatus === false && this.props.modal){
            return (
                <div className='annotation-show-create-main' style={{position: 'relative', top: yCoord-370}} >
                    <div>
                        {startIndex}:{endIndex}
                    </div>
                    <span className='annotation-show-create-begin' onClick={this.handleOnClick} >
                        <p className='annotation-show-create-h1'>Start the Really Smart Annotation</p>
                        <p className='annotation-show-create-h2'>(+5 RSQ)</p>
                    </span>
                </div>
            )
        } else if (currentUser && startIndex && annotationStatus === true && this.state.createStatus === true && this.props.modal){
            return (
                <div className='annotation-show-create-form-main' style={{position: 'relative', top: yCoord-370}} >
                    <form id='annotation-show-create-form' onSubmit={this.handleFormSubmit}>

                        <textarea 
                        className='annotation-show-create-form-top' 
                        placeholder="Everything you teach us is for a reason, but none of it is important."
                        value={this.state.body}
                        onChange={this.handleFormChange()}
                        >

                        </textarea>
                        
                        <div className='annotation-show-create-form-middle'>
                            <p className='annotation-show-create-form-middle-tools'>Tools:</p>
                            
                            <div className='annotation-show-create-form-middle-items'>    
                                <a href='/' className='annotation-show-create-form-middle-item' >Add Image</a>
                                <a href='/' className='annotation-show-create-form-middle-item' >Formatting Help</a>
                                <div>
                                    <a href='/' className='annotation-show-create-form-middle-item'>How To Annotate</a>                       
                                </div>
                            </div>
                        </div>

                        <div className='annotation-show-create-form-bottom'>

                            <button className='annotation-show-create-form-bottom-save-main'
                            type='submit'                        
                            >
                                <p className='annotation-show-create-form-bottom-save-word'>Save</p>
                                <p className='annotation-show-create-form-bottom-save-score'>(+5 RSQ)</p>
                            </button>
                            <button className='annotation-show-create-form-bottom-cancel' onClick={this.handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>         
                </div>
            )
        } else if (currentUser === undefined && startIndex && annotationStatus === true) {
            return (
                <div className='annotation-show-main-signup' style={{position: 'relative', top: yCoord-370}} >
                    <Link to='/signup' className='annotation-show-signup'>Sign Up to Start Really Smarting</Link>
                </div>
            )
        } else {
            return(
                null
            )
        }
    }
};

export default Annotation;