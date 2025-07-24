import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NavigationCard = ({
  cardTitle,
  cardIcon: CardIcon,
  link,
  bgColor,
  iconSize,
  iconColor,
  iconYPosition,
  iconXPosition,
}) => {
  const navigate = useNavigate()
  return (
    <Card
      sx={{
        position: 'relative',
        width: '14rem',
        height: '9rem',
        bgcolor: bgColor,
        borderRadius: '6px',
        mx: '2rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
      }}
    >
      <CardActionArea onClick={() => navigate(link)} sx={{ height: '100%' }}>
        {CardIcon && (
          <Box
            sx={{
              position: 'absolute',
              top: iconYPosition,
              left: iconXPosition,
              opacity: '75%',
              zIndex: 1,
            }}
          >
            <CardIcon sx={{ color: iconColor, fontSize: iconSize }} />
          </Box>
        )}
        <CardContent
          sx={{
            position: 'relative',
            height: '100%',
            zIndex: 2,
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Typography
            variant="h4"
            fontSize="1.5rem"
            component="div"
            color="background.paper"
            align="start"
            textTransform="uppercase"
            fontWeight="bold"
            letterSpacing="0.1rem"
          >
            {cardTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default NavigationCard
