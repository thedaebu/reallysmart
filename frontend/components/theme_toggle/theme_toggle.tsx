import React, { MouseEvent, useContext, useState } from "react";
import { BiMoon, BiSun} from "react-icons/bi";
import { ThemeContext } from "../../contexts/theme_context";

function ThemeToggle() {
    const { theme, changeTheme } = useContext(ThemeContext);

    const [checkedStatus, setCheckedStatus] = useState<boolean>(theme === "light"
        ? false
        : true
    );

    function handleChangeTheme(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        changeTheme();
        setCheckedStatus(!checkedStatus);
    }

    return (
        <button className="theme-toggle" onClick={handleChangeTheme}>
            {theme === "light"
                ? <BiMoon size={18} />
                : <BiSun size={18} />
            }
        </button>
    );
}
export default ThemeToggle;