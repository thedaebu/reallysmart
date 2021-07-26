import React from "react";
import { Link } from "react-router-dom";
import AnnotationShowItem from "./annotation_show_item";

class Annotation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            createStatus: this.props.createStatus,
            body: ""      
        };
        
        this.annotationForm = this.annotationForm.bind(this);
        this.handleCreateAnnotation = this.handleCreateAnnotation.bind(this);
        this.handleSubmitAnnotation = this.handleSubmitAnnotation.bind(this);
        this.handleCancelAnnotation = this.handleCancelAnnotation.bind(this);   
    }

    annotationForm() {
        const { currentUser, yCoord, startIndex, endIndex } = this.props;

        if (currentUser && startIndex && startIndex !== endIndex && this.state.createStatus === false) {
            return (
                <div className="annotation-show-create-main" style={{position: "relative", top: yCoord-370}} >
                    <span className="annotation-show-create-begin" onClick={this.handleCreateAnnotation} >
                        <p className="annotation-show-create-h1">Start the Really Smart Annotation</p>
                        <p className="annotation-show-create-h2">(+5 RSQ)</p>
                    </span>
                </div>
            ) 
        } else if (currentUser && startIndex && this.state.createStatus === true){
            return (
                <div className="annotation-show-create-form-main" style={{position: "relative", top: yCoord-370}} >
                    <form id="annotation-show-create-form" onSubmit={this.handleSubmitAnnotation}>

                        <textarea 
                            className="annotation-show-create-form-top" 
                            placeholder="Everything you teach us is for a reason, but none of it is important."
                            value={this.state.body}
                            onChange={this.handleFormChange()}
                        >
                        </textarea>
                        
                        {/* <div className="annotation-show-create-form-middle">
                            <p className="annotation-show-create-form-middle-tools">Tools:</p>
                            
                            <div className="annotation-show-create-form-middle-items">    
                                <a className="annotation-show-create-form-middle-item" >
                                    Add Image
                                    <span class="tooltip">Link is for styling</span>
                                </a>
                                <a className="annotation-show-create-form-middle-item" >
                                    Formatting Help
                                    <span class="tooltip">Link is for styling</span>
                                </a>
                                <div>
                                    <a className="annotation-show-create-form-middle-item">
                                        How To Annotate
                                        <span class="tooltip">Link is for styling</span>
                                    </a>                       
                                </div>
                            </div>
                        </div> */}

                        <div className="annotation-show-create-form-bottom">

                            <button className="annotation-show-create-form-bottom-save-main"
                            type="submit"                        
                            >
                                <p className="annotation-show-create-form-bottom-save-word">Save</p>
                                <p className="annotation-show-create-form-bottom-save-score">(+5 RSQ)</p>
                            </button>
                            <button className="annotation-show-create-form-bottom-cancel" onClick={this.handleCancelAnnotation}>
                                Cancel
                            </button>
                        </div>
                    </form>         
                </div>
            );
        } else if (currentUser === undefined) {
            return (
                <div className="annotation-show-main-signup" style={{position: "relative", top: yCoord-370}} >
                    <Link to="/signup" className="annotation-show-signup">Sign Up to Start Really Smarting</Link>
                </div>
            );
        }
    }

    handleCreateAnnotation(e) {
        e.preventDefault();
        this.setState({createStatus: true});
        this.setState({openness: "b"});
    }

    handleFormChange() { 
        return e => this.setState({body: e.target.value});
    }

    handleSubmitAnnotation(e) {
        e.preventDefault();     
          
        const annotation = {
            body: this.state.body,
            annotator_id: this.props.currentUser.id,
            track_id: this.props.track.id,
            start_index: this.props.startIndex,
            end_index: this.props.endIndex
        };
            
        this.setState({body: ""});
        this.props.createAnnotation(annotation).then(() => this.props.fetchTrack(this.props.track.id));
        this.props.closeAnnotationModal();    
    }

    handleCancelAnnotation(e) {
        e.preventDefault();  

        this.setState({createStatus: false});
        this.setState({body: ""});
        this.props.closeAnnotationModal();    
    }

    render() {
        const { track, annotation, annotationModal, annoId, currentUser, yCoord, startIndex } = this.props;
        
        if (annotation) {
            return (
                <AnnotationShowItem 
                    annotation={annotation} 
                    yCoord={yCoord} 
                    currentUser={currentUser} 
                    annoId={annoId} 
                />
            );
        } else if (startIndex && annotationModal) {
            return (
                <div>
                    {this.annotationForm()}
                </div>
            );
        } else {
            return(
                <p>
                    About "{track.title}"
                </p>
            );
        }
    }
};

export default Annotation;