import React, {useCallback} from 'react';
import {View, Modal} from 'react-native';
import {Colors} from '../../theme/Colors';
import BPSText from '../../components/BPSText';
import BPSButton from '../../components/BPSbutton';
import {TextInput, HelperText} from 'react-native-paper';
import {MenuType} from '../../types/menu';
import {useFormik, FormikHelpers} from 'formik';
import * as Yup from 'yup'

interface MenuModalProps {
  show: boolean;
  item?: MenuType;
  onSave: (values: MenuType) => void;
  onDismiss: () => void;
}

const Schema = Yup.object().shape({
    item_name: Yup.string().required('Please enter item name'),
    price: Yup.number().required('Please enter item price')
})

const MenuModal = ({show, item, onSave,onDismiss}: MenuModalProps) => {


  const onSubmit = useCallback(
    (values: MenuType, formikHelpers: FormikHelpers<MenuType>) => {
      onSave(values);
      formikHelpers.resetForm();
    },
    [onSave],
  );

  const {values, handleChange, handleSubmit, errors} = useFormik({
    initialValues: {
      ...item,
    } as MenuType,
    validationSchema: Schema,
    onSubmit: (values, helpers) => onSubmit(values, helpers),
    enableReinitialize: true
  });

  return (
    <Modal visible={show} transparent={true} onRequestClose={onDismiss} collapsable >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#000000B3',
        }}>
        <View
          style={{
            backgroundColor: Colors.white,
            padding: 16,
            margin: 16,
            borderRadius: 4,
          }}>
          <BPSText text={item ? 'Edit Item' : 'Add Item'} fontSize={18} fontWeight='bold'/>
          <TextInput
            label={'Name'}
            value={values?.item_name}
            onChangeText={handleChange('item_name')}
            error={Boolean(errors?.item_name)}
            style={{
              marginTop: 16,
            }}
          />
          {errors?.item_name && (
            <HelperText type="error">{errors?.item_name}</HelperText>
          )}
          <TextInput
            label={'Price'}
            keyboardType="number-pad"
            value={values?.price?.toString()}
            onChangeText={handleChange('price')}
            error={Boolean(errors?.price)}
            style={{
              marginTop: 16,
            }}
          />
          {errors?.price && (
            <HelperText type="error">{errors?.price}</HelperText>
          )}
          <BPSButton
            text={'Save'}
            onPress={handleSubmit}
            containerStyle={{
              marginTop: 16,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
export default MenuModal;
