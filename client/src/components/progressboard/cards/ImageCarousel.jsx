import React from 'react'
import { Box, alpha } from '@mui/material'
import theme from '../../../styles/theme'

const ImageCarousel = ({ title, images = [] }) => {
  const repeatedImages = [...images, ...images]

  return (
    <Box
      sx={{
        width: '100%',
        height: '10vh',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: alpha(theme.palette.background.paper, 0.35),
        mb: title === 'Sponsors' ? 1 : 0,
        mt: title === 'Charities' ? 1 : 0,
        py: 0.75,
        '--scroll-duration': '30s',
        '--scroll-direction':
          title === 'Sponsors'
            ? 'scroll-horizontal'
            : 'scroll-horizontal-reverse',
      }}
    >
      <Box
        className="marquee__content"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '200vw',
        }}
      >
        {repeatedImages.map((img, i) => (
          <Box
            key={i}
            component="img"
            src={img.url}
            alt={img.logoName}
            sx={{
              height: '100%',
              width: 'auto',
              minWidth: `calc(${100 / images.length}vw - ${8 * (images.length - 1) / images.length}px)`,
              objectFit: 'contain',
              backgroundColor: 'background.paper',
              mr: 1, 
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default ImageCarousel
