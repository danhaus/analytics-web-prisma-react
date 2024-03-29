// Take from https://chakra-templates.dev/navigation/sidebar
// Modified by Daniel Hausner
import React, { ReactNode, useState } from "react";
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
} from '@chakra-ui/react';
import { FiFile, FiHome, FiUsers } from 'react-icons/fi';
import { IconType } from 'react-icons';
import MobileNav from './MobileNav';
import NavItem from './NavItem';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';

export enum NavItemName {
  HOME = 'Home',
  USERS = 'Users',
  FILES = 'Files',
}

interface LinkItemProps {
  name: NavItemName;
  icon: IconType;
  path: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: NavItemName.HOME, icon: FiHome, path: '/' },
  { name: NavItemName.USERS, icon: FiUsers, path: '/users' },
  { name: NavItemName.FILES, icon: FiFile, path: '/files' },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [activeNavItem, setActiveNavItem] = useState(NavItemName.HOME);

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Dashboard
        </Text>
        <ColorModeSwitcher />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path} isActive={link.name === activeNavItem} onClick={() => setActiveNavItem(link.name)}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};
