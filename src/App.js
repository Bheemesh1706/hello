import styled from "styled-components";
import {useState,useEffect} from "react";
import Icon from '../src/assests/Icon.png';
import Git from '../src/assests/git.svg';
import User from '../src/assests/add-user.png';
import Delete from '../src/assests/bin.png';
import Work from '../src/assests/work-in-progress.png' 

import {
  useToast,
  Modal,
  ModalContent,
  useDisclosure,
  Select
} from '@chakra-ui/react';

function App() {

 
  const [list]=useState(["Products","Demo Script","Customers","Sales Team","Demos","Settings"]);
  const [user,setUser]= useState([{
    id:0,
    name:"Bheemesh",
    signin:"1 Day ago",
    role:"Owner"
  },{id:1,
    name:"Danoosh",
    signin:"1 Day ago",
    role:"Sales"
  },{id:2,
    name:"Anajali",
    signin:"1 Day ago",
    role:"Admin"
  }]);

  const [name,setName]=useState('');
  const [role,setRole]=useState('Admin');
  const [menu,setMenu]=useState('');
  const [limit,setLimit]= useState(100);
  const [page,setPage] = useState(1);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [add,setAdd]=useState(false);
  useEffect(()=>{

    if(window.performance)
    { if(performance.navigation.type==1)
        {
          var stored_datas = JSON.parse(localStorage["user"]);
          setUser(stored_datas);
        }}
  },[]);

  useEffect(()=>{
  },[add]);


  return (

   <Container>

        <NavBar>
          <NavBarLeft>
              <ImageContainer src={Icon} height={"40px"}/>
              <Text weight={"400"} color={"#898989"} style={{borderLeft:"0.1px solid lightgrey" ,paddingLeft:"10px"}}>MY APPLICATION</Text>
          </NavBarLeft>
          <NavBarRight>
              <ImageContainer src={Git} right={"10px"} height={"40px"} style={{borderLeft:"1px solid lightgrey" ,paddingLeft:"20px"}}/>
              <Text size={"12px"} weight={"500"}>Bheemesh</Text>
          </NavBarRight>
        </NavBar>

        <MainBody>
            <LeftContainer>
              {
                list.map((data,index)=><ListSpan style={{backgroundColor:menu==data?"#00D676":""}} onClick={()=>{
                  setMenu(data);
                }}><Text key={index} weight={"500"} color={"#898989"} left={"25px"} bottom={"40px"} >{data}</Text></ListSpan>)
              }
            </LeftContainer>

            <RightContainer>

                  {menu==="Settings"?
                  <> <AddUserButton onClick={onOpen}>ADD USER</AddUserButton>

                  
                  <Table>
                    
                      <Tr>
                        <Th >#</Th>
                        <Th >User</Th>
                        <Th >Last Signed In</Th>
                        <Th >Role</Th>
                        <Th > </Th>
                      </Tr>
                    { user.map((data,index)=><Tr>
                        <Td>{index+1}</Td>
                        <Td>{data.name}</Td>
                        <Td>{data.signin}</Td>
                        <Td>{data.role}</Td>
                        <Td> <ImageContainer src={Delete} height={"25px"} style={{backgroundColor:"#32DC87",padding:"5px",borderRadius:"50%"}}
                        onClick={()=>{
                          var array_list = user;
                          if(array_list.length===1)
                            {
                              array_list.shift();
                            }
                          else{
                            array_list.splice(index,index);
                          }
                          localStorage.removeItem('user');
                          localStorage['user']=JSON.stringify(array_list);
                          setUser(array_list);
                          setAdd(!add);
                        }}
                        
                        /></Td>
                      </Tr>
                      )}
                  
                  </Table>
            

            {/* <ButtonContainer  left={"77%"}  top  bottom={"10"}>

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

          </ButtonContainer> */}

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalContainer>

                  <ModalContainerLeft>
                        <ImageContainer src={User} style={{height:"175px",width:"175px"}}/>
                          <Text size={"10px"} weight={"400"} style={{marginTop:"15px" , padding:"10px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</Text>
                  </ModalContainerLeft>

                  <ModalContainerRight>
                      <Text weight={"400"} bottom={"20px"}>User Information</Text>
                      <Text weight={"400"} bottom={"10px"} size={"15px"}>User Name</Text>
                      <Input bottom={"25px"} onChange={(e)=>{

                        setName(e.target.value);
                        
                      }}></Input>
                      <Text weight={"400"} size={"15px"} bottom={"15px"}>Role</Text>
                      <Select width={"50%"} onChange={(e)=>{
                        setRole(e.target.value);
                      }}>
                          <option value='Admin'>Admin</option>
                          <option value='Owner'>Owner</option>
                          <option value='Sales'>Sales</option>
                      </Select>

                      <ButtonContainer left={"35%"} style={{justifyContent:"space-between",width:"40%"}} top bottom={"50px"}>
                              <ModalButton backgroundcolor={"#FEC918"} onClick={onClose}>Cancel</ModalButton>
                              <ModalButton backgroundcolor={"#32DC87"} onClick={()=>{
                                var id =user.length;
                                var temp =user;
                                var current={
                                  id:id,
                                  name:name,
                                  signin:"1 Day ago",
                                  role:role
                                }
                                temp.push(current);
                                setUser(temp);
                                localStorage.removeItem('user');
                                localStorage['user']=JSON.stringify(user);
                                onClose();
                              }}>Add</ModalButton>
                      </ButtonContainer>
                  </ModalContainerRight>

                </ModalContainer>
              
            </ModalContent>
          </Modal></>:<Construction>
            <ImageContainer src={Work} height={"300px"}></ImageContainer>
          </Construction>
                 }

            </RightContainer>

        </MainBody>

   </Container>
  );

}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Construction = styled.div`
  display: flex;
  height: 80%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const NavBar = styled.section`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgrey;
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
    font-weight:${(p) => {
    return p.weight? p.weight:"100";
    }};
    &:hover{
      color: none;
    }
    
    font-family: 'Sans Serif';
`;

const ListSpan = styled.span`
      height: 50px;
      width:100%;
      padding: 15px 0 50px 0;
      &:hover {
        background-color: #00D676;
        color: white;
      }

`;


const Input = styled.input`
    border: 1px solid lightgrey;
    width: 80%;
    border-radius: 5px;
    outline: none;
    margin-bottom:${(p) => {
    return p.bottom? p.bottom:"none";
    }};
`;

const NavBarLeft = styled.div`
  height: 100%;
  width: 22%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ImageContainer =styled.img`

  margin-right:${(p) => {
    return p.right? p.right:"none";
    }};

  height:${(p) => {
    return p.height? p.height:"50px";
    }};
`;


const NavBarRight =  styled(NavBarLeft)`
  justify-content: center;
`;

const MainBody = styled.section`
  height:calc(100% - 50px);
  width: 100%;
  display: flex;
`;

const LeftContainer = styled.section`
  height: 100%;
  width: 22%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 20px;
  border-right: 1px solid lightgrey;
`;

const RightContainer = styled.section`
  height: 100%;
  width: 78%;
  padding-top: 40px;
  position: relative;
`;

const Table = styled.table`
  width:90%;
  margin-left: 50px;
`;

const Th = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const Td = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const Tr = styled.tr`

`;

const ButtonContainer = styled.div`
  height: 50px;
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding-top: 25px;
  left:${(p) => {
    return p.left? p.left:"0";
    }};
  top:${(p) => {
    return p.top? p.top:"0";
    }}; 
   bottom: ${(p) => {
    return p.bottom? p.bottom:"0";
    }};
`;

const Button = styled.button`
    margin-right:${(p) => {
    return p.right? p.right:"none";
    }};
`;

const AddUserButton = styled(Button)`
    border-radius: 25px;
    background-color: #32DC87;
    color:white ;
    padding: 5px 35px 5px 35px;
    font-weight:bold;
    margin: 30px 0 40px 50px;
    text-align: center;
`;

const ModalContainer = styled.div`
    height: 400px;
    width:  150%;
    background-color: blue;
    display: flex;
`;

const ModalContainerLeft = styled.section`
    height: 100%;
    width: 40%;
    background-color: #F87475;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top:25px;
`;

const ModalContainerRight = styled(ModalContainerLeft)`
    width:60%;
    background-color: white;
    align-items: flex-start;
    padding-left: 20px;
    position: relative;
`;

const ModalButton = styled(Button)`
    background-color:${(p) => {
    return p.backgroundcolor? p.backgroundcolor:"black";
    }};
    padding: 2.5px 15px 2.5px 15px;
`;

export default App;
