import { Select as SelecteAntd, SelectProps } from 'antd';
import { Container } from './styles';

interface Props extends SelectProps<string> {
  data: string[];
  placeholder?: string | undefined;
  defaultValue?: string | undefined;
}

export const Select = ({ data, placeholder, defaultValue, ...rest }: Props) => {
  const { Option } = SelecteAntd;

  const renderOptions = () => {
    return data.map((element: string) => (
      <Option value={element} key={element}>
        {element}
      </Option>
    ));
  };

  return (
    <Container>
      <SelecteAntd
        listHeight={1000}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...rest}
      >
        {renderOptions()}
      </SelecteAntd>
    </Container>
  );
};