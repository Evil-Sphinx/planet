import React, { useState } from 'react';

import { Layout, Menu } from 'antd';

import sideMenu from 'src/configs/sidemenu';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
  const [collapsed] = useState(false);
  return (
    <Sider collapsed={collapsed}>
      <Menu
        theme="dark"
        //   selectedKeys={[state.highlight || selectedMatched[selectedMatched.length - 1]]}
        mode="inline"
        defaultOpenKeys={sideMenu.map((i) => i.key)}
        //   onOpenChange={this.handleFooter}
      >
        {sideMenu.map((item) => {
          const { key, name, icon, url, child, shortName } = item;
          if (Array.isArray(child) && child.length) {
            return (
              <SubMenu
                key={key}
                title={
                  <span className="sider__menu__title">
                    {/* <i className={iconClass} /> */}
                    <span>{collapsed ? shortName : name}</span>
                  </span>
                }>
                {child.map((childItem) => {
                  return (
                    <Menu.Item key={`${childItem.key}`}>
                      {
                        <a href={childItem.url} className="sider__menu__child">
                          <span>{childItem.name}</span>
                        </a>
                      }
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          }
          return (
            <Menu.Item key={key} title={name}>
              <a href={url} className="sider__menu__title">
                <i className={`icon-biomart-admin ${icon}`} />
                <span>{collapsed ? shortName : name}</span>
              </a>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
