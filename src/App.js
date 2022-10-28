import styled from "styled-components";
import {useState} from "react";
import Git from '/home/kirito/Documents/React/hello/src/assests/git.svg';
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
  useToast
} from '@chakra-ui/react';

function App() {

  const [list]=useState(["Products","Demo Script","Customers","Sales Team","Demos","Settings"]);
  const [limit,setLimit]= useState(100);
  const [page,setPage] = useState(1);
  const toast = useToast();

  return (
   <Container>

        <NavBar>
          <NavBarLeft>
              <ImageContainer src={Git}/>
              <Text>My Application</Text>
          </NavBarLeft>
          <NavBarRight>
              <ImageContainer src={Git} right={"10px"}/>
              <Text>Bheemesh</Text>
          </NavBarRight>
        </NavBar>

        <MainBody>
            <LeftContainer>
              {
                list.map((data,index)=><Text key={index} left={"25px"} bottom={"40px"}>{data}</Text>)
              }
            </LeftContainer>

            <RightContainer>
              <Button>Add User</Button>

                <TableContainer>
                    <Table variant='striped' colorScheme='teal'>
                      <Thead>
                        <Tr>
                          <Th>#</Th>
                          <Th>Last Signed In</Th>
                          <Th>Role</Th>
                          <Th> </Th>
                        </Tr>
                      </Thead>
                    </Table>
              </TableContainer>

              <ButtonContainer>
              <Button right={"25px"} onClick={()=>{
                  if(limit>100)
                  {
                    setLimit(limit-100);
                    setPage(page-1);
                  }
                  else{
                    toast({
                      title: `This is the lest number of data can be shown per page`,
                      status: "info",
                      isClosable: true,
                    })
                  }
                }}>Previous</Button>

                <Button onClick={()=>{
                  setLimit(limit+100);
                  setPage(page+1);
                  toast({
                    title: `Table updated by ${limit} rows`,
                    status: "info",
                    isClosable: true,
                  })
                }}>Next</Button>

             </ButtonContainer>

            </RightContainer>

        </MainBody>

   </Container>
  );

}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: azure;
`;
const NavBar = styled.section`
  height: 50px;
  width: 100%;
  background-color: green;
  display: flex;
  justify-content: space-between;
`;

const Text = styled.p`
    font-size:${(p) => {
    return p.size? p.size:"25px";
    }};
    color:${(p) => {
    return p.color? p.color:"black";
    }};
    position: ${(p) => {
    return p.position? p.position:"none";
    }};
    margin: 0;
    margin-left:${(p) => {
    return p.left? p.left:"none";
    }};
    margin-bottom:${(p) => {
    return p.bottom? p.bottom:"none";
    }};
    
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`;

const NavBarLeft = styled.div`
  height: 100%;
  width: 20%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: aquamarine;
`;

const ImageContainer =styled.img`

  margin-right:${(p) => {
    return p.right? p.right:"none";
    }};
`;

const NavBarRight =  styled(NavBarLeft)`
  justify-content: center;
`;

const MainBody = styled.section`
  height:calc(100% - 50px);
  width: 100%;
  background-color: grey;
  display: flex;

`;

const LeftContainer = styled.section`
  height: 100%;
  width: 20%;
  background-color: blueviolet;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 20px;
`;

const RightContainer = styled.section`
  height: 100%;
  width: 80%;
  background-color: brown;
  padding-top: 40px;
`;

const ButtonContainer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
    margin-right:${(p) => {
    return p.right? p.right:"none";
    }};
`;
export default App;
