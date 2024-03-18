import React, {useEffect, useState, useCallback} from 'react';
import {SQL} from '../../storage/sql';
import {MenuType} from '../../types/menu';
import MenuLayout from './menu.screen';

const MenuScreen = ({}) => {
  const [menu, setMenu] = useState<MenuType[]>([]);
  const [showAdd, setShowAdd] = useState<boolean>(false);

  const [currentItem, setCurrentItem] = useState<MenuType>();

  const getMenu = useCallback(async () => {
    const data = await SQL.getMenu();
    if (data) {
      console.log('Menu', data);
      setMenu(data);
    }
  }, []);

  useEffect(() => {
    getMenu();
  }, []);

  const onPressAdd = useCallback(() => {
    setCurrentItem(undefined);
    setShowAdd(true);
  }, []);
  const onSave = useCallback(
    async (values: MenuType) => {
      setCurrentItem(undefined);
      setShowAdd(false);
      if (currentItem) {
        await SQL.updateMenuItem(values);
      } else {
        await SQL.addMenuItem(values);
      }
      getMenu();
    },
    [currentItem],
  );

  const onDismiss = useCallback(() => {
    setShowAdd(false);
    setCurrentItem(undefined);
  }, []);
  const onPressEdit = useCallback((item: MenuType) => {
    setCurrentItem(item);
    setShowAdd(true);
  }, []);
  const onPressDelete = useCallback(async (item: MenuType) => {
    await SQL.deleteMenuItem(item);
    getMenu();
  }, []);

  return (
    <MenuLayout
      onPressAdd={onPressAdd}
      onSave={onSave}
      showAdd={showAdd}
      currentItem={currentItem}
      onDismiss={onDismiss}
      menu={menu}
      onPressEdit={onPressEdit}
      onPressDelete={onPressDelete}
    />
  );
};
export default MenuScreen;
