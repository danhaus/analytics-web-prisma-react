import { Flex, FlexProps, Icon, Link, useColorModeValue } from '@chakra-ui/react';
import React, {  ReactText} from 'react';
import { IconType } from 'react-icons';
import { Link as RouterLink } from 'react-router-dom';


interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, children, path, isActive, onClick, ...rest }: NavItemProps) => {
  const activeColor = useColorModeValue('teal.700', 'teal.200');
  const color = isActive ? activeColor : 'inherit';
  const activeBg = useColorModeValue('teal.50', 'rgba(48, 140, 122, 0.3)');
  const bg = isActive ? activeBg : 'inherit';
  const fontWeight = isActive ? 'semibold' : 'normal';
  return (
    <Link as={RouterLink} to={path} style={{ textDecoration: 'none' }} onClick={onClick}>
      <Flex
        align="center"
        bg={bg}
        color={color}
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        fontWeight={fontWeight}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" color={color} as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
