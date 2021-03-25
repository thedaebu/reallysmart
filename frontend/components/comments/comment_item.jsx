import React from 'react';

class CommentItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { comment, commentableType } = this.props;
        
        if (commentableType === "Track") {
            return (
                <li className='comment-list-track-item'>
                    <div className='comment-list-item-top'>
                        <img className='comment-list-item-baby' src="https://assets.genius.com/images/default_avatar_100.png" />
                        <p className='comment-list-item-commenter'>{comment.commenter}</p>
                    </div>
                    <p className='comment-list-item-body'>{comment.body}</p>
                </li>
            )
        } else {
            return (
                <li className='comment-list-anno-item'>
                    <div className='comment-list-item-top'>
                        <img className='comment-list-item-baby' src="https://assets.genius.com/images/default_avatar_100.png" />
                        <p className='comment-list-item-commenter'>{comment.commenter}</p>
                    </div>
                    <p className='comment-list-item-body'>{comment.body}</p>
                </li>
            )
        }
    }
}

export default CommentItem;

