import React, { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/theme_context";

function ThemeToggle() {
    const { theme, changeTheme } = useContext(ThemeContext);

    const [checkedStatus, setCheckedStatus] = useState<boolean>(theme === "light" ? false : true);

    function handleChangeTheme() {
        changeTheme();
        setCheckedStatus(!checkedStatus);
    }

    return (
        <label className="theme-toggle">
            <input
                type="checkbox"
                defaultChecked={checkedStatus}
                onClick={handleChangeTheme}
            />
            <span className="slider"></span>
        </label>
    );
}
export default ThemeToggle;