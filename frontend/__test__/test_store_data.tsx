import { Annotation, Comment, IndexTrack, State, Track, User, Vote } from "../my_types";

// test data
export const testAnnotationsData: { [key: number]: Annotation } = {
    1: {
        annotator_id: 1,
        annotator_name: "reallysmart",
        body: "She is singing about Selene, her alter-ego, who comes out when she becomes under the influence. She is claiming Selene is making her do things not of her own will but she is not trying to will herself against Selene.",
        end_index: 140,
        id: 1,
        start_index: 9,
        track_id: 1
    },
    2: {
        annotator_id: 1,
        annotator_name: "reallysmart",
        body: "She is allowing Selene to take over. She and Selene want the same thing.",
        end_index: 516,
        id: 2,
        start_index: 459,
        track_id: 1
    }
};
export const testCommentsData: { [key: number]: Comment } = {
    1: {
        body: "This is one of my new favorite songs now.",
        commentable_id: 1,
        commentable_type: "Track",
        commenter_id: 1,
        commenter_name: "reallysmart",
        id: 1,
        updated_at: "2022-03-20T17:56:15.610Z"
    },
    2: {
        body: "OOOOOHHHHHHH! Now I get it.",
        commentable_id: 1,
        commentable_type: "Annotation",
        commenter_id: 2,
        commenter_name: "notsosmart",
        id: 2,
        updated_at: "2022-03-20T17:56:15.624Z"
    },
    3: {
        body: "I wonder what these lyrics mean.",
        commentable_id: 1,
        commentable_type: "Track",
        commenter_id: 2,
        commenter_name: "notsosmart",
        id: 3,
        updated_at: "2022-03-20T17:56:15.629Z"
    }
};
export const testTrackData1: { [key: number]: Track } = {
    1: {
        artist: "NIKI",
        artwork_path: "https://i.ytimg.com/vi/GBqqoPSJ9GY/maxresdefault.jpg",
        id: 1,
        lyrics: "[Verse 1] She's taken over She's making me want your body closer Having a little trouble staying sober And she's got us all under her trance Oh, she's elusive (I know) She only rises with the music And all of my dreams, they're growing lucid That's how you know she's up to dance To dance, to dance, to dance [Pre-Chorus] And now she's taking over me A new notch on her belt, yeah And your face gleams like a prophecy I might just lose myself, yeah [Chorus] And I couldn't care less (Uh) I couldn't care less, baby Feeling just a little careless lately Push me back and pull me under (Ah-ah) She got me possessed (Uh) I'm looking to get hasty And I just want your body pressed against me Take me down to lift me high Take me down to lift me high Higher, higher, ooh [Verse 2] White flames on her torch, they're licking on the air tonight (Uh) Chariot skid marks all over the gravel behind my eyes Take my hand 'cause when this ends, I run No man's land sounds like a woman's fun We got all night long Oh, won't ya give it to me, give it to me, ah [Pre-Chorus] And oh, she's bubbling up again, and I do as I'm told May be losing all my self-control [Chorus] And I couldn't care less (Uh) I couldn't care less, baby Feeling just a little careless lately Push me back and pull me under (Ah-ah) She got me possessed (Uh) I'm looking to get hasty And I just want your body pressed against me Take me down to lift me high Take me down to lift me high Higher, higher, ooh [Outro] Higher, higher, ooh Higher, higher, ooh Take me down to lift me high Take me down to lift me high Higher, higher, ooh",
        spotify_path: "https://open.spotify.com/embed/track/0h11wE1hTwKMxYd1NACgNb?si=acc1559482e74faa",
        title: "Selene"
    }
};
export const testTrackData2: { [key: number]: Track } = {
    2: {
        artist: "Modjo",
        artwork_path: "https://i.ytimg.com/vi/Z0V4CtdXlhk/maxresdefault.jpg",
        id: 2,
        lyrics: "[Chorus] Lady, hear me tonight 'Cause my feeling, is just so right As we dance, by the moonlight Can't you see, you're my delight Lady, I just feel like I won't get you, out of my mind I feel love, for the first time And I know that it's true, I can tell by the look in your eyes", spotify_path: "https://open.spotify.com/embed/track/49X0LAl6faAusYq02PRAY6?si=f26ecb25d41d4182",
        title: "Lady"
    }
};
export const testTracksData: { [key: number]: IndexTrack } = {
    1:  {
        artist: "NIKI",
        artwork_path: "https://i.ytimg.com/vi/GBqqoPSJ9GY/maxresdefault.jpg",
        id: 1,
        title: "Selene"
    },
    2:  {
        artist: "Modjo",
        artwork_path: "https://i.ytimg.com/vi/Z0V4CtdXlhk/maxresdefault.jpg",
        id: 2,
        title: "Lady"
    },
    3:  {
        artist: "Drake",
        artwork_path: "https://images.genius.com/65dacc63f81321a1cee1435f303a1bf5.1000x1000x1.jpg",
        id: 3,
        title: "Fake Love"
    },
    4:  {
        artist: "Bishop Briggs",
        artwork_path: "https://images.genius.com/2f7cccb4dfe4cd619758a9d436faa5eb.1000x1000x1.png",
        id: 4,
        title: "River"
    },
    5:  {
        artist: "Lea Salonga",
        artwork_path: "https://i.ytimg.com/vi/RxUmbraYDcE/hqdefault.jpg",
        id: 5,
        title: "Reflection"
    },
    6:  {
        artist: "Ne-Yo",
        artwork_path: "https://images-na.ssl-images-amazon.com/images/I/516J-AHuqOL._SY355_.jpg",
        id: 6,
        title: "Stay"
    }
};
export const testUserData: { [key: number]: User } = {
    1: {
        id: 1,
        username: "reallysmart",
        vote_ids: [1]
    }
}
export const testVotesData: { [key: number]: Vote } = {
    1: {
        id: 1,
        voteable_id: 1,
        voteable_type: "Annotation",
        voter_id: 1,
    },
    2: {
        id: 2,
        voteable_id: 1,
        voteable_type: "Comment",
        voter_id: 2
    }
};

// test stores
export const testDefaultStore: State = {
    entities: {
        annotations: {},
        comments: {},
        searches: {},
        tracks: {},
        user: {},
        votes: {}
    },
    errors: {
        annotationErrors: [],
        sessionErrors: []
    },
    modal: {
        annotationModal: false
    },
    session: {
        id: null
    }
};
export const testIndexStore: State = {
    entities: {
        annotations: {},
        comments: {},
        searches: {},
        tracks: testTracksData,
        user: {},
        votes: {}
    },
    errors: {
        annotationErrors: [""],
        sessionErrors: [""]
    },
    modal: {
        annotationModal: false
    },
    session: {
        id: null
    }
};
export const testShowStore: State = {
    entities: {
        annotations: testAnnotationsData,
        comments: testCommentsData,
        searches: testTracksData,
        tracks: testTrackData1,
        user: {},
        votes: testVotesData
    },
    errors: {
        annotationErrors: [""],
        sessionErrors: [""]
    },
    modal: {
        annotationModal: false
    },
    session: {
        id: null
    }
};
export const testShowStoreWithUser: State = {
    entities: {
        annotations: testAnnotationsData,
        comments: testCommentsData,
        searches: testTracksData,
        tracks: testTrackData1,
        user: testUserData,
        votes: testVotesData
    },
    errors: {
        annotationErrors: [""],
        sessionErrors: [""]
    },
    modal: {
        annotationModal: false
    },
    session: {
        id: 1
    }
}

// test match
export const testMatch = {
    isExact: true,
    params: {
        trackId: '1'
    },
    path: "/tracks/:trackId",
    url: "/tracks/1"
};