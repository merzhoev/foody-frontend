import React from 'react';
import clsx from 'clsx';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export const Search = () => {
  const tabs: Array<string> = ['Поиск по названию', 'Поиск по ингредиентам'];
  const [tabIndex, setTabIndex] = React.useState<number>(0);
  const tabIndicatorRef = React.useRef<HTMLSpanElement>(null);

  const moveTabIndicator = (currentTab: HTMLUListElement) => {
    const left = currentTab.offsetLeft;
    const width = currentTab.offsetWidth;

    const tabIndicator = tabIndicatorRef.current as HTMLSpanElement;
    tabIndicator.style.cssText = `left: ${left}px; width: ${width}px;`;
  };

  const handleTabClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLUListElement;

    if (target.classList.contains('search__tab')) {
      moveTabIndicator(target);
    }
  };

  React.useEffect(() => {
    // set tabIndicator position
    const tabsNode = document.querySelectorAll('.search__tab');
    const activeTab = tabsNode[tabIndex] as HTMLUListElement;
    moveTabIndicator(activeTab);
  }, []);

  const [isChecked, setIsChecked] = React.useState(true);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <section className="search">
      <div className="search__content">
        <h1 className="search__title">Поиск рецептов</h1>
        <p className="search__subtitle">
          В нашей базе более <span className="search__subtitle--primary">100 тысяч блюд</span> и мы
          точно найдем то, что вы сможете приготовить
        </p>
        <Tabs
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
          focusTabOnClick={false}>
          <TabList onClick={handleTabClick} className="search__tab-list">
            {tabs.map((tab, index) => (
              <Tab key={index} className="search__tab">
                {tab}
              </Tab>
            ))}
            <span ref={tabIndicatorRef} className="search__tab-indicator"></span>
          </TabList>
          <TabPanel className="search__by-name">
            <label htmlFor="search__by-name-text-field" className="search__by-name-label label">
              Название блюда
            </label>
            <input
              id="search__by-name-text-field"
              className="search__by-name-input"
              placeholder="Введите название блюда"
              autoComplete="off"
              type="text"
            />
            <button className="search__by-name-btn btn-primary">Найти рецепты</button>
          </TabPanel>
          <TabPanel className="search__by-ingrs">
            <label htmlFor="search__by-ingrs-text-field" className="search__by-ingrs-label label">
              Ингредиенты
            </label>
            <div className="search__by-ingrs-input-container">
              <ul className="search__by-ingrs-ingrs-list">
                {['Яблоко', 'Апельсин', 'Мандарин'].map((ingrt, index) => (
                  <li key={index} className="search__by-ingrs-ingrt">
                    <span className="search__by-ingrs-ingrt-name">{ingrt}</span>
                    <button className="search__by-ingrs-ingrt-btn">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M2.35352 1.64648L1.64648 2.35352L5.29297 6L1.64648 9.64648L2.35352 10.3535L6 6.70703L9.64648 10.3535L10.3535 9.64648L6.70703 6L10.3535 2.35352L9.64648 1.64648L6 5.29297L2.35352 1.64648Z"
                          fill="#027A48"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
                <li className="search__by-ingrs-list-input">
                  <input
                    id="search__by-ingrs-text-field"
                    className="search__by-ingrs-input"
                    placeholder="Введите ингредиент"
                    type="text"
                  />
                </li>
              </ul>
              <ul
                className={clsx(
                  'search__autocomplete',
                  [].length && 'search__autocomplete--visible',
                )}>
                {[
                  'Яблоко',
                  'Апельсин',
                  'Мандарин',
                  'Яблоко',
                  'Апельсин',
                  'Мандарин',
                  'Яблоко',
                  'Апельсин',
                  'Мандарин',
                ].map((ingrt, index) => (
                  <li key={index} className="search__autocomplete-item">
                    <span className="search__autocomplete-text">{ingrt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <label className="search__by-ingrs-checkbox-label">
              <input
                className="search__by-ingrs-checkbox"
                type="checkbox"
                name="pantryIgnore"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span className="search__by-ingrs-checkbox-text">
                Игнорировать типичные ингредиенты, такие как вода, соль, мука и т. д.
              </span>
            </label>
            <button className="search__by-ingrs-btn btn-primary">Найти рецепты</button>
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
};
