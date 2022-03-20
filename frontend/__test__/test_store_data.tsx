import { IndexTrack } from "../my_types";

export const testMatch = {
    isExact: true,
    params: {
        trackId: '1'
    },
    path: "/tracks/:trackId",
    url: "/tracks/1"
};
export const testIndexStore = {
    entities: {
        tracks: {
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
        }
    }
};
export const testTrackStore = {
    entities: {
        annotations: {
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
        },
        comments: {
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
            },
        },
        tracks: {
            1: {
                artist: "NIKI",
                artwork_path: "https://i.ytimg.com/vi/GBqqoPSJ9GY/maxresdefault.jpg",
                id: 1,
                lyrics: "[Verse 1]\nShe's taken over\nShe's making me want your body closer\nHaving a little trouble staying sober\nAnd she's got us all under her trance",
                title: "Selene"
            }
        },
        user: {
        },
        votes: {
            1: {
                id: 1,
                voteable_id: 1,
                voteable_type: "Annotation",
                voter_id: 2,
            },
            6: {
                id: 6,
                voteable_id: 1,
                voteable_type: "Comment",
                voter_id: 2
            }
        }
    },
    modal: {
        annotationModal: false
    },
    session: {
        id: {}
    }
}