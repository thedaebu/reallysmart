import React from 'react';

class CommentItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleTime(dateTime){
        let oldDate = new Date(Date.parse(dateTime));
        let currentDate = new Date();
        let yearDiff = oldDate.getFullYear() - currentDate.getFullYear();
        let monthDiff = oldDate.getMonth() - currentDate.getMonth();
        let dayDiff = oldDate.getDate() - currentDate.getDate();

        if (yearDiff > 1) {
            return `${yearDiff} years ago`
        } else if (yearDiff === 1) {
            return `1 year ago`
        } else if (monthDiff > 1) {
            return `${monthDiff} months ago`
        } else if (monthDiff === 1) {
            return `1 month ago`
        } else if (dayDiff > 1) {
            return `${dayDiff} days ago`
        } else {
            return `1 day ago`
        }
    }

    render() {
        const { comment, commentableType } = this.props;
        
        if (commentableType === "Track") {
            return (
                <li className='comment-list-track-item'>
                    <div className='comment-list-item-top'>
                        <div className='comment-list-item-top-top'>
                            <img className='comment-list-item-baby' src="https://assets.genius.com/images/default_avatar_100.png" />
                            <p className='comment-list-item-commenter'>{comment.commenter}</p>

                        </div>
                        <p className='comment-list-item-time'>{this.handleTime(comment.updated_at)}</p>
                    </div>
                    <p className='comment-list-item-body'>{comment.body}</p>
                </li>
            )
        } else {
            return (
                <li className='comment-list-anno-item'>
                    <div className='comment-list-item-top'>
                        <div className='comment-list-item-top-top'>
                            <img className='comment-list-item-baby' src="https://assets.genius.com/images/default_avatar_100.png" />
                            <p className='comment-list-item-commenter'>{comment.commenter}</p>

                        </div>
                        <p className='comment-list-item-time'>{this.handleTime(comment.updated_at)}</p>
                    </div>
                    <p className='comment-list-item-body'>{comment.body}</p>
                </li>
            )
        }
    }
}

export default CommentItem;

