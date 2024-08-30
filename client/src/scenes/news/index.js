import React, { useState } from 'react'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Header from 'components/Header';
import { useGetNewsQuery } from 'state/api';

const News = () => {
  const {data, isLoading} = useGetNewsQuery();
  const shortenedData = data ? [...data].splice(0, 100) : [];
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const NewsCard = ({
    _id,
    sector,
    topic,
    insight,
    region,
    published,
    relevance,
    pestle,
    source,
    title,
    likelihood,
  }) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <Card
        sx={{
          backgroundImage: 'none',
          backgroundColor: theme.palette.background.alt,
          borderRadius: '0.55rem',
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: '14px' }} color={theme.palette.secondary[700]} gutterBottom>
            {pestle}
          </Typography>
          <Typography variant='h5' component='div'>
            {insight}
          </Typography>
          <Typography sx={{ mb: '1.5rem'}} color={theme.palette.secondary[400]}>
            {sector}-{topic}
          </Typography>
          <Rating value={likelihood}/>
          <Typography variant='body2'>
            {title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button 
            variant='primary'
            size='small'
            onClick={() => setIsExpanded(!isExpanded)}
          >
            See More...
          </Button>
        </CardActions>
        <Collapse
          in={isExpanded}
          timeout='auto'
          unmountOnExit
          sx={{
            color: theme.palette.neutral[300]
          }}
        >
          <CardContent>
            <Typography>id: {_id}</Typography>
            <Typography>relevance: {relevance}</Typography>
            <Typography>source {source}</Typography>
            <Typography>published {published}</Typography>
            <Typography>Region {region}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    )
  }

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='News' subTitle='See your list of News.' />
      {shortenedData || !isLoading ? (<Box
        mt='20px'
        display='grid'
        gridTemplateColumns='repeat(4, minmax(0, 1fr))'
        justifyContent='space-between'
        rowGap='20px'
        columnGap='1.33%'
        sx={{
          '&>div': { gridColumn: isNonMobile ? undefined : 'span 4'}
        }}  
      >
      {
        shortenedData.map(item => (
          <NewsCard
            _id={item._id}
            sector={item.sector}
            topic={item.topic}
            insight={item.insight}
            region={item.region}
            published={item.published}
            relevance={item.relevance}
            pestle={item.pestle}
            source={item.source}
            title={item.title}
            likelihood={item.likelihood}
          />
        ))}
      </Box>) : (
        <>Loading...</>
      )}
    </Box>
  )
}

export default News