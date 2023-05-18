// used for create/update actions
export type CreatedAnnotation = Omit<
    Annotation,
    "annotator_name" | "created_at" | "id" | "updated_at" | "votes"
>;
export type CreatedComment = Omit<
    Comment,
    "commenter_name" | "created_at" | "id" | "updated_at" | "votes"
>;
export type CreatedVote = Omit<
    Vote,
    "id"
>;
export type ReceivedAnnotation = {
    annotation: Annotation
};
export type ReceivedComment = {
    comment: Comment
};
export type ReceivedSearches = {
    searches: {[key: number]: IndexTrack}
};
export type ReceivedTrack = {
    annotations: {[key:number]: Annotation},
    comments: {[key:number]: Comment},
    track: {[key:number]: Track}
};
export type ReceivedTracks = {
    tracks: {[key: number]: IndexTrack}
};
export type ReceivedUser = {
    user: User
};
export type UpdatedAnnotation = Omit<
    Annotation,
    "annotator_name" | "created_at" | "updated_at" | "votes"
>;
export type UpdatedComment = Omit<
    Comment,
    "commenter_name" | "created_at" | "updated_at" | "votes"
>;
export type UpdatedNotification = {
    id: number,
    type: "AnnotationAlert" | "Mention"
};

// used for redux store
export type State = {
    entities: Entities
};
type Entities = {
    annotations: {[key:number]: Annotation},
    comments: {[key:number]: Comment},
    indexTracks: {[key: number]: IndexTrack},
    searches: {[key:number]: IndexTrack},
    track: Track,
    user: User
};

// used for reducer files
export type AccountAction = {
    account: Account,
    type: "RECEIVE_ACCOUNT"
};
export type AnnotationAction = {
    annotation: Annotation,
    annotationId: number,
    errors: Array<string>,
    type: "RECEIVE_ANNOTATION" | "REMOVE_ANNOTATION" | "RECEIVE_ANNOTATION_ERRORS"
};
export type CommentAction = {
    comment: Comment,
    commentId: number,
    errors: Array<string>,
    type: "RECEIVE_COMMENT" | "REMOVE_COMMENT" | "RECEIVE_COMMENT_ERRORS"
};
export type SearchAction = {
    searches: {[key: number]: IndexTrack},
    type: "RECEIVE_SEARCHES"
};
export type SessionAction = {
    errors: Array<string>,
    type: "RECEIVE_CURRENT_USER" | "LOGOUT_CURRENT_USER" | "RECEIVE_SESSION_ERRORS",
    user: User
};
export type TrackAction = {
    annotations: {[key: number]: Annotation},
    comments: {[key: number]: Comment},
    track: Track,
    type: "RECEIVE_TRACK"
};
export type TracksAction = {
    tracks: {[key: number]: IndexTrack},
    type: "RECEIVE_TRACKS"
};

// main feature types
export type Account = {
    annotations: Array<{
        body: string,
        track: {
            artist: string,
            title: string
        }
    }>,
    comments: Array<{
        body: string,
        commentable_body: string,
        commentable_type: "Track" | "Annotation",
        track: {
            artist: string,
            title: string
        }
    }>,
    id: number,
    username: string
};
export type Annotation = {
    annotator_id: number,
    annotator_name: string,
    body: string,
    created_at: string,
    end_index: number,
    id: number,
    start_index: number,
    track_id: number,
    updated_at: string,
    votes: {[key: number]: Vote}
};
export type AnnotationAlert = {
    body: string,
    commenter_name: string,
    created_at: string,
    id: number,
    read: boolean
    track: {
        artist: string,
        title: string
    },
    type: "AnnotationAlert"
};
export type Comment = {
    body: string,
    commentable_id: number,
    commentable_type: "Track" | "Annotation",
    commenter_id: number,
    commenter_name: string,
    created_at: string,
    id: number,
    updated_at: string,
    votes: {[key: number]: Vote}
};
export type IndexTrack = Omit<
    Track,
    "lyrics" | "spotify_path"
>;
export type Mention = {
    body: string,
    created_at: string,
    id: number,
    mentioner_name: string,
    read: boolean,
    track: {
        artist: string,
        title: string
    },
    type: "Mention"
};
export type Notification = AnnotationAlert | Mention;
export type SessionUser = {
    password: string,
    username: string
};
export type Track = {
    artist: string,
    artwork_path: string,
    id: number,
    lyrics: string,
    spotify_path: string,
    title: string
};
export type User = {
    annotation_alerts: Array<AnnotationAlert>,
    id: number,
    mentions: Array<Mention>,
    username: string
};
export type Vote = {
    id: number,
    voteable_id: number,
    voteable_type: "Annotation" | "Comment",
    voter_id: number
};

// used for Window
export type Window = {
    currentUser: { session_token: string },
    eyeIcon: string,
    fireIcon: string,
    getSelection: Function,
    github: string,
    linkedin: string,
    scrollTo: Function,
    website: string
};