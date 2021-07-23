import React from "react";
import { Link } from "react-router-dom";
import CommentItem from "./comment_item";

class CommentShow extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            createTrackStatus: false,
            createAnnoStatus: false,
            body: ''
        };
        
        this.commentForm = this.commentForm.bind(this);
        this.commentItems = this.commentItems.bind(this);
        this.handleTrackStatus = this.handleTrackStatus.bind(this);
        this.handleAnnoStatus = this.handleAnnoStatus.bind(this);
        this.handleTrackCancel = this.handleTrackCancel.bind(this);
        this.handleAnnoCancel = this.handleAnnoCancel.bind(this);
        this.handleTrackSubmit = this.handleTrackSubmit.bind(this);
        this.handleAnnoSubmit = this.handleAnnoSubmit.bind(this);
    }

    componentDidMount() {
        this.props.parent.comment_ids.forEach(id => {
            this.props.fetchComment(id);
        });
    }

    commentForm() {
        const { currentUser, commentableType, commentMessage } = this.props;
        const { createTrackStatus, createAnnoStatus } = this.state;

        if (currentUser && createTrackStatus === true && commentableType === "Track") {
            return (
                <form className='comment-show-create-end-main' onSubmit={this.handleTrackSubmit} >
                    <textarea 
                        className='comment-show-create-end-track-text' 
                        placeholder={commentMessage} 
                        onChange={this.handleChange('body')} 
                    >
                    </textarea>
                    <div className='comment-show-create-end-buttons'>
                        <button className='comment-show-create-end-submit'>
                            <p className='comment-show-create-end-submit-button'>Submit</p>
                        </button>
                        <button className='comment-show-create-end-cancel' onClick={this.handleTrackCancel}>
                            <p className='comment-show-create-end-cancel-button'>Cancel</p>
                        </button>
                    </div>
                </form>
            );
        } else if (currentUser && createAnnoStatus === true && commentableType === "Annotation") {
            return (
                <form className='comment-show-create-end-main' onSubmit={this.handleAnnoSubmit} >
                    <textarea 
                        className='comment-show-create-end-anno-text' 
                        placeholder={commentMessage} 
                        onChange={this.handleChange('body')} 
                    >
                    </textarea>
                    <div className='comment-show-create-end-buttons'>
                        <button className='comment-show-create-end-submit'>
                            <p className='comment-show-create-end-submit-button'>Submit</p>
                        </button>
                        <button className='comment-show-create-end-cancel' onClick={this.handleAnnoCancel}>
                            <p className='comment-show-create-end-cancel-button'>Cancel</p>
                        </button>
                    </div>
                </form>
            );
        } else if (currentUser && createTrackStatus === false && commentableType === "Track") {
            return (
                <div className='comment-show-create-begin-main'>
                    <img className='comment-show-create-baby' src="https://assets.genius.com/images/default_avatar_100.png" />
                    <textarea 
                        className='comment-show-create-begin-text' 
                        placeholder={commentMessage} 
                        onClick={this.handleTrackStatus}
                    >
                    </textarea>
                </div>
            );
        } else if (currentUser && createAnnoStatus === false && commentableType === "Annotation") {
            return (
                <div className='comment-show-create-begin-main'>
                    <img className='comment-show-create-baby' src="https://assets.genius.com/images/default_avatar_100.png" />
                    <textarea className='comment-show-create-begin-text' placeholder={commentMessage} onClick={this.handleAnnoStatus}></textarea>
                </div>
            );
        } else {
            return (
                <div className='comment-session-main'>     
                    <p className='comment-session-text'>Please</p>
                    <Link to='/signup' className='comment-session-go'>Sign Up</Link>
                    <p className='comment-session-text'>or</p>
                    <Link to='/login' className='comment-session-go'>Log In</Link>
                    <p className='comment-session-text'> to comment.</p>
                </div>
            );
        }
    }

    commentItems() {
        const { comments, parent, commentableType, fetchAction } = this.props;
        
        if (comments[0] !== undefined) {
            return (
                <ul className='comment-list-main'>
                    {comments.map(comment => {
                        return <CommentItem 
                            parent={parent} 
                            fetchAction={fetchAction} 
                            comment={comment} 
                            commentableType={commentableType} 
                            key={comment.id} 
                        />
                    })}
                </ul>
            );
        } else {
            return (
                null
            );
        }
    }

    handleTrackStatus(e) {
        e.preventDefault();
        this.setState({['createTrackStatus'] : true});
    }

    handleAnnoStatus(e) {
        e.preventDefault();
        this.setState({['createAnnoStatus'] : true});
    }

    handleTrackCancel(e) {
        e.preventDefault();
        this.setState({['createTrackStatus'] : false});
    }

    handleAnnoCancel(e) {
        e.preventDefault();
        this.setState({['createAnnoStatus'] : false});
    }

    handleChange(type) {
        return e => this.setState({ [type]: e.target.value });
    }

    handleTrackSubmit(e) {
        e.preventDefault();

        const { currentUser, commentableType, parent, createComment, fetchAction } = this.props;
        const comment = {
            body: this.state.body,
            commenter_id: currentUser.id,
            commentable_type: commentableType,
            commentable_id: parent.id
        };

        createComment(comment).then(() => fetchAction(parent.id))
        this.setState({['createTrackStatus'] : false});
    }

    handleAnnoSubmit(e) {
        e.preventDefault();

        const { currentUser, commentableType, parent, createComment, fetchAction } = this.props;
        const comment = {
            body: this.state.body,
            commenter_id: currentUser.id,
            commentable_type: commentableType,
            commentable_id: parent.id
        };

        createComment(comment).then(() => fetchAction(parent.id))
        this.setState({['createAnnoStatus'] : false});
    }

    render() {
        return (
            <div className='comment-main'>
                {this.commentForm()} 
                {this.commentItems()}
            </div>
        );               
    }
};

export default CommentShow;