import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { SearchByName, SearchByIngrs } from '../';

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
    // init tabIndicator position
    const tabsNode = document.querySelectorAll('.search__tab');
    const activeTab = tabsNode[tabIndex] as HTMLUListElement;
    moveTabIndicator(activeTab);
  }, []);

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
          <TabPanel>
            <SearchByName />
          </TabPanel>
          <TabPanel>
            <SearchByIngrs />
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
};
