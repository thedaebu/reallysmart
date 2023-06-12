import React, { useEffect, useState } from "react";

type Props = {
    currentTab: string;
    handleCurrentTab: Function;
    username: string;
};

function AccountShowHeader(props: Props) {
    const { currentTab, handleCurrentTab, username } = props;

    const [tabItems, setTabItems] = useState<Array<JSX.Element>>([]);

    useEffect(() => {
        handleTabItems();
    }, [currentTab]);

    function handleTabItems() {
        const tabNames: Array<string> = ["Profile", "Annotations", "Comments"];
        const tabList: Array<JSX.Element> = tabNames.map((tabName: string, idx: number) => (
            <li
                className={currentTab === tabName
                    ? "account-tabdisplay-item__highlighted"
                    : "account-tabdisplay-item"
                }
                onClick={() => handleCurrentTab(tabName)}
                key={idx}
            >
                {tabName}
            </li>
        ));
        setTabItems(tabList);
    }

    return (
        <div
            className="account-show-header__background" 
            style={{
                backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("https://assets.genius.com/images/default_avatar_300.png?1684337696")`
            }}
            data-testid="account-show-header"
        >
            <div className="account-show-header__shade">
                <div>
                    <section className="account-show-header__left">
                        <div
                            className="account-show-header__image"
                            style={{
                                backgroundImage: `url("https://assets.genius.com/images/default_avatar_300.png?1684337696")`
                            }}
                        >
                        </div>
                        <div className="account-show-header__text">
                            <p className="account-show-header__username">{username}</p>

                        </div>
                    </section>
                    <ul className="account-tabdisplay">
                        {tabItems}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AccountShowHeader;