import { Box, Flex, Image } from '@chakra-ui/react'
import WalletBalance from './WalletBalance';



const Header = (props) => {
    return (   
        <> 
        <Flex
        width='100vw'
        height={['110px', '110px', '110px', '110px', '110px']}
        alignItems='center'
        justifyContent='center'
        bg='white'
        boxShadow={'2px 2px 2px 2px rgba(1, 0, 0, 1.0)'}
        >
        <Image 
        w={['210px', '210px', '210px', '210px', '210px']}
        src='/MutterCorp2.png' ></Image>
        </Flex>  
        <WalletBalance />
        </>
    )
       
}

export default Header;