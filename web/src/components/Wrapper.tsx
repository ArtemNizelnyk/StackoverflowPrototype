import { Box } from '@chakra-ui/react';
import React, { Component } from 'react';

export interface IWrapperProps {
    variant?: 'small'|'regular'
    
}
export interface IWrapperState {
    
}

export const Wrapper: React.FC<IWrapperProps> = ({children,variant='regular'})=>{
  
        return (
            <Box 
            maxW={variant === "regular"?"800px": "400px" }
            w="100%"
            mt={8}
            mx="auto">
                {children}
            </Box>
           
        );
    }


