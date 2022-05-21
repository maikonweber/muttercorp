import { useState, useEffect } from 'react';
import { parseCookies, setCookie } from 'nookies';
import { Grid,Box, Flex, Text, Button, GridItem } from '@chakra-ui/react';
import {
  getAllResult,
  getTable
} from '../src/services/services';
import Image from 'next/image'
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'


function DashboardBlaze({ datax, datax2 }) {

    console.log(datax)
  return (
  <>
  <Grid
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        templateRows='repeat(auto-fit, minmax(300px, 1fr))'
        gap={1}
        width='90vw'
        height='100vh'
        bg='red.100'
        margin='40px'
     >
  <GridItem
    gridColumn={[1, 1, 1, 1, 1]}
    gridRow={[1, 1, 1, 1, 1]}
  
  >
  <StatGroup 
   m='5' >
  <Stat>
  <StatLabel>Numero de Entradas em Colunas e Bloco</StatLabel>
  <StatNumber>{datax.total}</StatNumber>

  </Stat>
  <Stat>
  <StatLabel> Red  </StatLabel>
  <StatNumber>{datax.false}</StatNumber>
  
  </Stat>
  <Stat>
  <StatLabel> Green </StatLabel>
  <StatNumber>{datax.true}</StatNumber>
 
  </Stat>
  </StatGroup>
  <StatGroup 
  m='4'>
  <Stat>
  <StatLabel>  Green 1 Martingale </StatLabel>
  <StatNumber>{datax.firstgale}</StatNumber>
  
  </Stat>
  <Stat>
  <StatLabel>  Green 2 Martingale </StatLabel>
  <StatNumber>{datax.secondgale}</StatNumber>
  </Stat>
  <Stat>
  <StatLabel>  Loss 2 Martingale </StatLabel>
  <StatNumber>{datax.secondGaleLoss}</StatNumber>
  </Stat>
  <Stat>
  <StatLabel>  Resultado Zero </StatLabel>
  <StatNumber>{datax.zero}</StatNumber>
  </Stat>
  </StatGroup>
  </GridItem>
  <GridItem
  gridColumn={[1, 1, 1, 1, 1]}
  gridRow={[2, 2, 2, 2, 2]}
  >
    <TableContainer>
  <Table variant='striped' overflowX='auto' overflowY='auto'   >
    <Thead>
      <Tr>
        <Th>  Sala </Th>
        <Th>Entrada </Th>
        <Th> Resultado </Th>
        <Th> Martingale </Th>
        <Th> 2 Martigale </Th>
        <Th> Zero </Th>
      </Tr>
    </Thead>
    <Tbody>
      {datax2.map((item, index) => (
        <Tr key={index}>
          <Td>{item.room}</Td>
          <Td>{item.aposta}</Td>
          <td>{`${item.result}`}</td>
          <Td>{`${item.firstgale}`}</Td>
          <Td>{`${item.secondgale}`}</Td>
          <Td>{`${item.zero}`}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
</TableContainer>
    </GridItem>
     </Grid>
        </>
  )
}

// get server side props
export async function getServerSideProps(ctx) {
  // get token of browser
  const { 'nextauth.token': token } = parseCookies(ctx)

  // get token of server
  return {
    props: {
      datax,
      datax2
    }
  }
}


export default DashboardBlaze;