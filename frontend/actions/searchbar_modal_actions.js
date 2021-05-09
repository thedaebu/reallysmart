export const OPEN_SEARCHBAR_MODAL = "OPEN_SEARCHBAR_MODAL";
export const CLOSE_SEARCHBAR_MODAL = "CLOSE_SEARCHBAR_MODAL";

export const openSearchbarModal = data => {
    return ({
        type: OPEN_SEARCHBAR_MODAL,
        data
    });
};

export const closeSearchbarModal = () => {
    return ({
        type: CLOSE_SEARCHBAR_MODAL
    })
}