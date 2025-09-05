import { Select as SelecteAntd, SelectProps } from 'antd';
import { HTMLAttributes } from 'react';
import { Container } from './styles';

type rolesItens = {
  id: string;
  name: string;
}

interface Props extends SelectProps<string> {
  data: rolesItens[];
  placeholder: string;
  defaultValue?: string | undefined;
}

export const SelectRoles = ({ data, placeholder, defaultValue,...rest }: Props) => {
  const { Option } = SelecteAntd;

  const renderOptions = () => {
    return data.map((element: rolesItens) => (
      <Option value={element.id} key={element.id}>
        <span>{element.name}</span>
      </Option>
    ));
  };

  return (
    <Container>
      <SelecteAntd
        placeholder={placeholder}
        {...rest}
        defaultValue={defaultValue}
      >
        {renderOptions()}
      </SelecteAntd>
    </Container>
  );
};
