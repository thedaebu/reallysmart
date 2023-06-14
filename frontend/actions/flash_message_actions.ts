import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";

export const CLEAR_FLASH_MESSAGE: string = "CLEAR_FLASH_MESSAGE";

const removeFlashMessage: Function = () => ({
    type: CLEAR_FLASH_MESSAGE
});

export const deleteFlashMessage: Function = () => (dispatch: Dispatch<AnyAction>) => (
    dispatch(removeFlashMessage())
);