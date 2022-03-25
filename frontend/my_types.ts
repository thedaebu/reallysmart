// used for action files
export type CreatedAnnotation = {
    annotator_id: number,
    annotator_name: string,
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
    commenter_name: string
}
export type CreatedVote = {
    voteable_type: string,
    voteable_id: number,
    voter_id: number
}
export type ReceivedAnnotation = {
    annotation: Annotation
}
export type ReceivedComment = {
    comment: Comment
}
export type ReceivedSearches = {
    searches: {[key: number]: Track}
}
export type ReceivedTrack = {
    annotations: {[key:number]: Annotation},
    comments: {[key:number]: Comment}
    track: Track,
    votes: {[key:number]: Vote}
}
export type ReceivedTracks = {
    tracks: {[key: number]: IndexTrack}
}
export type ReceivedUser = {
    user: User
}
export type ReceivedVote = {
    vote: Vote
}
export type UpdatedAnnotation = {
    annotator_id: number,
    annotator_name: string,
    body: string,
    end_index: number,
    id: number,
    start_index: number,
    track_id: number
}
export type UpdatedComment = {
    body: string,
    commentable_id: number
    commentable_type: string,
    commenter_id: number,
    commenter_name: string,
    id: number
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
    annotationId: number,
    annotations: {[key: number]: Annotation},
    comment: Comment,
    commentId: number,
    comments: {[key: number]: Comment},
    errors: Array<string>,
    searches: {[key: number]: Track},
    track: Track,
    tracks: {[key: number]: Track},
    type: string,
    user: User,
    vote: Vote,
    votes:{[key: number]: Track},
    voteId: number
}

// main feature types
export type Annotation = {
    annotator_id: number,
    annotator_name: string,
    body: string,
    end_index: number,
    id: number,
    start_index: number,
    track_id: number
}
export type Comment = {
    body: string,
    commentable_id: number,
    commentable_type: string,
    commenter_id: number,
    commenter_name: string,
    id: number,
    updated_at: string
}
export type IndexTrack = {
    artist: string,
    artwork_path: string,
    id: number,
    title: string
}
export type SessionUser = {
    password: string,
    username: string
}
export type Track = {
    artist: string,
    artwork_path: string,
    id: number,
    lyrics: string,
    title: string
}
export type User = {
    id: number,
    username: string,
    votes_ids: Array<number>
}
export type Vote = {
    id: number,
    voteable_id: number,
    voteable_type: string,
    voter_id: number
}

// used for Window
export type Window = {
    angellist: string,
    currentUser: User,
    eyeIcon: string,
    fireIcon: string,
    getSelection: Function,
    github: string,
    linkedin: string,
    scrollTo: Function,
    website: string
}