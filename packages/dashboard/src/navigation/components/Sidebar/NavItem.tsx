import { Flex, FlexProps, Icon, Link, useColorModeValue } from '@chakra-ui/react';
import React, { ReactText } from 'react';
import { IconType } from 'react-icons';
import { Link as RouterLink } from 'react-router-dom';

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  path: string;
}

const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
  const color = useColorModeValue('teal.700', 'teal.200')
  return (
    <Link as={RouterLink} to={path} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue('teal.50', 'rgba(48, 140, 122, 0.3)'),
          color,
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
