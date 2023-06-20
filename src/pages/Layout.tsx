import { Box, Container, Flex, useBreakpointValue } from '@chakra-ui/react'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    // const isDesktop = true

  return (
    <Flex
    as="section"
    direction={({ base: "column", lg: "row" })}
    height="100vh"
    bg="bg-canvas"
    overflowY="auto"
    w="full"
    >
        {isDesktop ? <Sidebar /> : <Navbar />}

        <Box bg="bg-accent" pt={{base: 0, lg: 3 }} flex="1">
            <Box 
            bg="bg-canvas"
            borderTopLeftRadius={{ base: "none", lg: "2rem" }}
            height="full"
            >
                <Container py="8" height="full" maxW="100%">
                    <Outlet />
                </Container>
            </Box>
        </Box>
    </Flex>
  )
}

export default Layout
