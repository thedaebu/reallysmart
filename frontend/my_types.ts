// used for action files
export type CreatedAnnotation = {
    annotator_id: number,
    body: string,
    end_index: number,
    start_index: number,
    track_id: number
}
export type CreatedComment = {
    body: string,
    commentable_id: number
    commentable_type: string,
    commenter_id: number,
}
export type CreatedVote = {
    voteable_type: string,
    voteable_id: number,
    voter_id: number
}
export type ReceivedAnnotation = {
    annotation: Annotation,
    comments: ReceivedComments
}
export type ReceivedComments = {
    comments: {[key:number]: Comment}
}
export type ReceivedTrack = {
    track: Track,
    annotations: {[key:number]: Annotation},
    comments: {[key:number]: Comment}
}
export type ReceivedTracks = {
    [key: number]: Track
}
export type ReceivedVote = {
    user: User,
    vote: Vote
}

// used for container files
export type State = {
    entities: Entities,
    errors: Errors,
    modal: AnnotationModal,
    session: SessionId
}
type Entities = {
    annotations: {[key:number]: Annotation},
    comments: {[key:number]: Comment},
    searches: {[key:number]: Track},
    tracks: {[key:number]: Track},
    user: {[key:number]: User},
    votes: {[key:number]: Vote}
}
type Errors = {
    annotationErros: Array<string>,
    sessionErrors: Array<string>
}
type AnnotationModal = {
    annotationModal: boolean
}
type SessionId = {
    id: number
}

// used for reducer files
export type Action = {
    annotation: Annotation,
    annotations: {[key: number]: Annotation},
    comment: Comment,
    comments: {[key: number]: Comment},
    errors: Array<string>,
    searches: {[key: number]: Track},
    track: Track,
    tracks: {[key: number]: Track},
    type: string,
    user: User,
    vote: Vote,
    voteId: number
}

// main feature types
export type Annotation = {
    annotator: string,
    annotator_id: number,
    body: string,
    comment_ids: Array<number>,
    end_index: number,
    id: number,
    start_index: number,
    track_id: number,
    votes: number,
    vote_ids: Array<number>
}
export type Comment = {
    body: string,
    commentable_id: number,
    commenter: string,
    commenter_id: number,
    id: number,
    updated_at: string,
    votes: number,
    vote_ids: Array<number>
}
export type Searches = {
    [key: number]: SearchItem
}
export type SearchItem = {
    track: Track
}
export type SessionUser = {
    password: string,
    username: string
}
export type Track = {
    annotation_ids: Array<number>,
    artist: string,
    artwork_path: string,
    comment_ids: Array<number>,
    id: number,
    lyrics: string,
    title: string
}
export type User = {
    id: number,
    username: string,
    vote_ids: Array<number>
}
export type Vote = {
    id: number,
    voteable_id: number,
    voteable_type: string,
    voter_id: number
}