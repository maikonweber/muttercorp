import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
const { create } =  require('ipfs-http-client');
import { useRouter } from 'next/router';
import NFT from '../../artifacts/contracts/nft.sol/gatoXadrezNFT.json';
import Market from '../../artifacts/contracts/MarketXadrez.sol/gatoXadrezMarket.json';
import Web3Modal from 'web3modal';
import {nftaddress, nftmarketaddres } from '../../config/configWallet';
const client = create('https://ipfs.infura.io:5001/api/v0');
import { Grid, Box,Button, Input, Textarea  ,SimpleGrid, Flex, Text } from '@chakra-ui/react';

import Image from 'next/image';

const l = (arg) => (console.log(arg))

export function CreateItem() {
    const [fileUrl, setFileUrl] = useState(null);
    const [formInput, updateFormInput] = useState({price: '', description: '', name: ''});
    const router =  useRouter();

    async function onChange(e) {
        const file = e.target.files[0]
        console.log(file);
        try {
                const added = await client.add(
                    file,
                    {
                        progress: (prog) => console.log(`received: ${prog}`)
                    }

                    );
                    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
                    setFileUrl(url);
                } catch (err) {
                    console.log(err)
                }
        }

      async function createItem() {
          const { name, description, price } = formInput;
            const file = fileUrl;
             console.log(formInput)

          if(!name || !description || !price || !fileUrl) {
              alert('error');
            return     
          }
            const data = JSON.stringify({
                    name,
                    description,
                    image: fileUrl
                });

                console.log(data)
            
                try {
                    const added = await client.add(data);

                    console.log(added)

                    const url = `https://ipfs.infura.io:5001/${added.path}`;
                    console.log(url)
                    createSale(url)
                } catch (err) {
                    console.log("Error: ", err)
                    }
                }

        async function createSale() {
            l("createSale")
            const web3 = new Web3Modal( )
            l(web3)
            const connection = await web3.connect()
            
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()
            let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
            let transaction = await contract.createToken(fileUrl);
            let tx = await transaction.wait();
            console.log('Transaction', tx)
            let event = tx.events[0];
            let value = event.args[2];
            let tokenId = value.toNumber();

            const price =  ethers.utils.parseUnits(formInput.price, 'ether');
          
            contract = new ethers.Contract(nftmarketaddres, Market.abi, signer);

            let listingPrice = await contract.getListingPrice();
            listingPrice = listingPrice.toString();
            console.log('listingPrice', listingPrice)
            transaction = await contract.createMarketItem(nftaddress, tokenId, price, {value: listingPrice})

            const res = await transaction.wait();
            console.log('res', res)

            router.push('/');
    }
        return  (
            <>
            <Flex

                justifyContent="top"
                alignItems="center"
                height="80vh"
                flexDirection = {'column'}

            >
           
                <Input 
                    bg="white"
                    placeholder='Asset Name'
                    onChange={e => updateFormInput({...formInput, name: e.target.value})}
                    mt={2}
                    boxShadow={'2px 1px 2px 2px rgba(0, 0, 0, 0.2)'}
               >
                </Input>
                <Textarea
                    bg="white" 
                    placeholder='Description'
                    onChange={e => updateFormInput({...formInput, description: e.target.value})}
                    mt={7}
                    boxShadow={'2px 1px 2px 2px rgba(0, 0, 0, 0.2)'}
                >

                </Textarea>
                <Input
                    bg="white" 
                    placeholder='Price'
                    onChange={e => updateFormInput({...formInput, price: e.target.value})}
                    mt={7}
                    boxShadow={'2px 1px 2px 2px rgba(0, 0, 0, 0.2)'}
                >
                </Input>
                <Input 
                    border="1px solid #E2E8F0"
                    boxShadow={'2px 1px 2px 2px rgba(0, 0, 0, 0.2)'}
                    placeholder='Image'
                    bg="white" 
                    padding={1}
                    type='file'
                    name='Asset'
                    onChange={onChange}
                    mt={7}
                                    >
                </Input>
                {
                    fileUrl && (
                    <Box mt={7}
                    boxShadow={'2px 1px 2px 2px rgba(0, 0, 0, 0.2)'}
                    border="1px solid #E2E8F0"
                    >
                    <Image 
                    src={fileUrl} 
                    width='450px'
                    height='450p'
                    />
                    </Box>
                    )
                }
                <Button 
                    onClick= {() => {
                        createItem()
                    }}
                    bg='blue.500'
                    width='100%'
                    mt={7}
            
                    >
                        Create NFT
                    </Button>
            </Flex>
            </>
        )
}

export default CreateItem;

