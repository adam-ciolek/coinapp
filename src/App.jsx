import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Typography , Card, CardContent, CssBaseline, Grid, Container, Avatar,Input } from '@mui/material';
import millify from 'millify';
import { useStyles } from './style'

const  App = () => {

  const styles = useStyles();

  const [coins, setCoin] = useState([])
  const [search, setSearch] = useState('')

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false';

  useEffect(() => {
    axios.get(url)
    .then(res => {
      setCoin(res.data)
      console.log(res.data)
    })
    .catch(err => console.log(err))
  }, []);
  

  const handleSearch = e => setSearch(e.target.value)

  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

  return (  
    <div className={styles.container}>
      <CssBaseline />
      <div>
        <Container maxWidth='sm'>
          <Typography variant='h4' align='center' gutterBottom className={styles.title}>
            Cryptocurrency Finance 
          </Typography>
          <Input defaultValue="Search" sx={{mb: 4, minWidth:'100%',fontSize:'24px', color:'white'}} noValidate 
          onChange={handleSearch}/>
        </Container>
        <Container maxWidth='lg'>
          <Grid container rowSpacing={4} columnSpacing= {8} >
            {filteredCoins.map( coin => (
              <Grid item key={coin.id} xs={12} sm={6} md={4}  sx={{mb: 4}}> 
                <Card >
                  <CardContent  color='text.secondary'>
                      <Avatar
                        className={styles.avatar}
                        sx={{width: 80, height: 80}}
                        src={coin.image}
                      />
                      <Typography gutterBottom variant='h6' >
                        <p>{`${coin.market_cap_rank}. ${coin.name}`}</p>
                      </Typography>
                      <Typography component='div'>
                        <p>Symbol: {coin.symbol}</p> 
                        <p>Price: {millify(coin.current_price)}</p>
                        <p>Market Cap: {millify(coin.market_cap)}</p>
                        {coin.price_change_percentage_24h >= 0 ? 
                        <p className={styles.textGreen}>Daily Change: {millify(coin.price_change_percentage_24h)}</p> : 
                        <p className={styles.textRed}>Daily Change: {millify(coin.price_change_percentage_24h)}</p>
                        }
                      </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default App;