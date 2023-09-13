// import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment/moment';
import { TextField,Box, Container,IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function createData(
  nro: string,
  dni: string,
  cli: string,
  produ: string,
  canti: string,
  origen: string,
  destino:string,
  date_Beg: Date,
  date_End: Date
) {
  return { nro, dni, cli, produ, canti,origen,destino,date_Beg,date_End };
}


function App() {
  const [pedidos,setPedidos] = useState([]);

  async function listar(){
    axios.get('http://localhost:5259/api/Pedido/Listar', {
      headers: { "Content-Type": "application/json" },
      data:  {}
  }).then
  (response =>{
    let a = [];
    let x;
    for(let i = 0;i<response.data.response.length;i++){
      //console.log(moment(response.data.response[i].date_Beg, "YYYY-MM-DD HH:mm").toDate());
       x = new Date(response.data.response[i].date_Beg);
        a.push(createData(
          response.data.response[i].orderNr,
          response.data.response[i].dni,
          response.data.response[i].name + " " + response.data.response[i].lastname ,
          response.data.response[i].brand,
          response.data.response[i].quantity,
          response.data.response[i].origin,
          response.data.response[i].destiny,
          moment(x).format('D/MM/YYYY h:mm:ss a'),
          response.data.response[i].date_End,
          ))
    }
      setPedidos(a);
  }).catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
   
  });

}

 function handleChange(){


 }

useEffect(()=>
{
  listar();
}
,[]);

  return (
    <div className="App">
      <header className="App-header">

    <Container align="left">
      <TextField sx={{ mr: 5 }} id="outlined-basic" label="DNI" variant="outlined"/>
      <TextField sx={{ mr: 2 }} id="outlined-basic" label="Nro. Pedido" variant="outlined"/>
      <IconButton aria-label="delete">
        <SearchIcon fontSize="large"/>
      </IconButton>
     </Container>

      <br/>

      <TableContainer component={Paper} >
      <Table sx={{ minWidth: 410 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nro. Pedido</TableCell>
            <TableCell align="center">DNI Cliente</TableCell>
            <TableCell align="center">Cliente</TableCell>
            <TableCell align="center">Producto</TableCell>
            <TableCell align="center">Cantidad</TableCell>
            <TableCell align="center">Origen</TableCell>
            <TableCell align="center">Destino</TableCell>
            <TableCell align="center">Fecha de compra</TableCell>
            <TableCell align="center">Fecha de entrega</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pedidos.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
                {row.nro}
              </TableCell>
              <TableCell align="center">{row.dni}</TableCell>
              <TableCell align="center">{row.cli}</TableCell>
              <TableCell align="center">{row.produ}</TableCell>
              <TableCell align="center">{row.canti}</TableCell>
              <TableCell align="center">{row.origen}</TableCell>
              <TableCell align="center">{row.destino}</TableCell>
              <TableCell align="center">{row.date_Beg}</TableCell>
              <TableCell align="center">Sin entregar</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </header>
    </div>
  );
}

export default App;
