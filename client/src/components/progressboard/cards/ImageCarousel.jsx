import { alpha, Box, Typography } from '@mui/material'
import theme from '../../../styles/theme'

const ImageCarousel = ({ title, images = [] }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '8vh',
        overflowX: 'hidden',
        backgroundColor: alpha(theme.palette.background.paper, 0.5),
        mt: title === 'Sponsors' ? 1 : 0,
        mb: title === 'Charities' ? 1 : 0,
        px: 0.45,
      }}
    >
      {/* <Box sx={{ px: 1, backgroundColor: "background.paper", position: 'sticky', zIndex: 1 }}>
        <Typography
          variant="body2"
          color="primary.main"
          fontWeight="bold"
          textTransform="uppercase"
          fontStyle="italic"
          letterSpacing={'0.05rem'}
         sx={{fontSize: '.7rem'}}
        >
          {title}
        </Typography>
      </Box> */}
      <Box className="marquee__content"
        sx={{
          '--scroll-duration': `${images.length * 3}s`,
          '--scroll-direction': 'scroll-horizontal',
          height: '100%',
          objectFit: 'contain',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'row',
          gap: 0.45,
        }}
      >
        {[...images, ...images, ...images, ...images, ...images, ...images].map((img, i) => (
          <Box
            key={i}
            component="img"
            src={img.url}
            alt={img.logoName}
            sx={{
              backgroundColor: 'background.paper',
              objectFit: 'contain',
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default ImageCarousel
