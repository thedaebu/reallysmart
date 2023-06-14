import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";

export const CLEAR_FLASH_MESSAGE: string = "CLEAR_FLASH_MESSAGE";

const removeFlashMessage: Function = () => ({
    type: CLEAR_FLASH_MESSAGE
});

export const deleteFlashMessage: Function = () => (dispatch: Dispatch<AnyAction>) => (
    dispatch(removeFlashMessage())
);