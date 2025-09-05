import { FaCheck } from 'react-icons/fa';

import boxImg from '../../assets/box/box2.png';

import { Boxes } from '../../hooks/Boxes';
import {
  AmountButton,
  AmountInput,
  BottomSection,
  BoxFooter,
  BoxImage,
  BoxName,
  BoxSubText,
  Container,
  IconWrapper,
  ImageWrapper,
} from './styles';

interface Props {
  box: Boxes;
  amount: number;
  onChangeAmount: (newAmount: number) => void;
}

export const BoxAmount = ({ box, amount, onChangeAmount }: Props) => {
  const handleDecrease = () => {
    if (amount <= 0) {
      return;
    }

    onChangeAmount(amount - 1);
  };

  const handleIncrease = () => {
    onChangeAmount(amount + 1);
  };

  return (
    <Container isSelected={amount > 0}>
      <ImageWrapper>
        <BoxImage
          src={box.image_url || boxImg}
          onError={(e) => {
            e.currentTarget.src = boxImg;
          }}
          alt={box.name}
        />
      </ImageWrapper>

      <BottomSection>
        <BoxName>{box.name}</BoxName>
        <BoxSubText>
          {box.cubage}m³ - {box.utilization} usos
        </BoxSubText>

        <BoxFooter>
          <AmountButton type="button" onClick={handleDecrease}>
            -
          </AmountButton>

          <AmountInput
            type="number"
            min={0}
            value={amount ? amount.toString() : ''}
            onChange={(e) => {
              if (e.target.value) {
                if (Number(e.target.value) >= 0) {
                  onChangeAmount(Number(e.target.value));
                }
              } else {
                onChangeAmount(0);
              }
            }}
            onBlur={(e) => {
              if (!e.target.value || Number(e.target.value) < 0) {
                e.target.value = '0';
              }
            }}
            placeholder="0"
          />

          <AmountButton type="button" onClick={handleIncrease}>
            +
          </AmountButton>
        </BoxFooter>
      </BottomSection>

      <IconWrapper isSelected={amount > 0}>
        <FaCheck />
      </IconWrapper>
    </Container>
  );
};
