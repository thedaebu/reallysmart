import React, { useContext, useState } from "react";
import { BiMoon, BiSun} from "react-icons/bi";
import { ThemeContext } from "../../contexts/theme_context";

function ThemeToggle() {
    const { theme, changeTheme } = useContext(ThemeContext);

    const [checkedStatus, setCheckedStatus] = useState<boolean>(theme === "light" ? false : true);

    function handleChangeTheme() {
        changeTheme();
        setCheckedStatus(!checkedStatus);
    }

    return (
        <div className="theme-toggle" onClick={handleChangeTheme}>
            {theme === "light"
                ? <BiMoon size={18} />
                : <BiSun size={18} />
            }
        </div>
    );
}
export default ThemeToggle;