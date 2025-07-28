import { alpha, Box, Typography } from '@mui/material'
import theme from '../../../styles/theme'

const ImageCarousel = ({ title, images = [] }) => {
  return (
    <Box
      sx={{
        width: '5%',
        backgroundColor: alpha(theme.palette.background.paper, 0.5),
        ml: title === 'Sponsors' ? 1 : 0,
        mr: title === 'Charities' ? 1 : 0,
      }}
    >
      {/* <Box sx={{ px: 1, backgroundColor: 'primary.main', position: 'sticky', zIndex: 1 }}>
        <Typography
          variant="h6"
          color="secondary.main"
          fontWeight="bold"
          textTransform="uppercase"
          fontStyle="italic"
          letterSpacing={'0.05rem'}
         
        >
          {title}
        </Typography>
      </Box> */}
      <Box className="marquee__content"
        sx={{
           '--scroll-duration': `${(images.length * 3 )}s`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {[...images, ...images, ...images, ...images].map((img, i) => (
          <Box
            key={i}
            component="img"
            src={img.url}
            alt={img.logoName}
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default ImageCarousel
