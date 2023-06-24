import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import * as FlashMessageActions from "../../actions/flash_message_actions";
import { RiCheckboxIndeterminateFill } from "react-icons/ri";

function FlashMessage({ flashMessage }: { flashMessage: string; }) {
    const dispatch: Dispatch<AnyAction> = useDispatch();
    const deleteFlashMessage: Function = () => dispatch(FlashMessageActions.deleteFlashMessage());

    useEffect(() => {
        setTimeout(deleteFlashMessage, 5000);
    }, [flashMessage]);

    return (
        <div className="flash-message" data-testid="flash-message">
            <section className="flash-message__container">
                <span className="flash-message__message" data-testid="flash-message__message">{flashMessage}</span>
                <RiCheckboxIndeterminateFill 
                    className="flash-message__exit"
                    size={16}
                    onClick={() => deleteFlashMessage()}
                />
                <div className="flash-message__timer"></div>
            </section>
        </div>
    );
}

export default FlashMessage;