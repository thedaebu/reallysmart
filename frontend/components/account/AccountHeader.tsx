import React, { useEffect, useState } from "react";

type Props = {
    currentTab: string;
    handleCurrentTab: Function;
    username: string;
};

function AccountHeader(props: Props) {
    const { currentTab, handleCurrentTab, username } = props;

    const [tabItems, setTabItems] = useState<Array<JSX.Element>>([]);

    useEffect(() => {
        handleTabItems();
    }, [currentTab]);

    function handleTabItems() {
        const tabNames: Array<string> = ["Profile", "Annotations", "Comments"];
        const tabList: Array<JSX.Element> = tabNames.map((tabName: string, idx: number) => (
            <li
                className={currentTab === tabName ?
                    "account-header__tablist-item--highlighted" :
                    "account-header__tablist-item"
                }
                onClick={() => handleCurrentTab(tabName)}
                key={idx}
                data-testid={`account-header__tablist-item--${tabName}`}
            >
                {tabName}
            </li>
        ));
        
        setTabItems(tabList);
    }

    return (
        <div
            className="account-header__background" 
            style={{
                backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("https://assets.genius.com/images/default_avatar_300.png?1684337696")`
            }}
            data-testid="account-header"
        >
            <div className="account-header__shade">
                <div className="account-header__display">
                    <section className="account-header__left">
                        <div
                            className="account-header__image"
                            style={{
                                backgroundImage: `url("https://assets.genius.com/images/default_avatar_300.png?1684337696")`
                            }}
                        >
                        </div>
                        <p className="account-header__username">{username}</p>
                    </section>
                    <ul className="account-header__tablist">
                        {tabItems}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AccountHeader;