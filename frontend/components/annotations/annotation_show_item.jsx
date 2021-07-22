import React from "react";
import CommentShowContainer from "../comments/comment_show_container";
import VotesShowContainer from "../votes/votes_show_container";

class AnnotationShowItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { annotation, yCoord, currentUser, annoId } = this.props;
        return (
            <div className='annotation-show-main' style={{position: 'relative', top: yCoord-370}} >
                <p className='annotation-show-name'>Really Smart Annotation by {annotation.annotator}</p>
                <p className='annotation-show-body'>{annotation.body}</p>
                <VotesShowContainer 
                    parent={annotation} 
                    voteableType="Annotation" 
                    voteableId={annotation.id} 
                    numberOfVotes={annotation.votes} 
                />
                <CommentShowContainer 
                    parent={annotation} 
                    currentUser={currentUser} 
                    commentableType="Annotation" 
                    commentableId={annoId} 
                />
            </div>
        )
    }
}

export default AnnotationShowItem;