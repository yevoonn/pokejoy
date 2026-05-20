import { Card, CardOverflow } from '@mui/joy'
import CardImageComponent from './CardImageComponent'
import CardTitleComponent from './CardTitleComponent'
import CardOverflowContentComponent from './CardOverflowContentComponent'

const CardComponent = ( { imageURL, name, types = [] } ) => {
    return (
        <Card
            sx={{
                bgcolor: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                borderRadius: '24px',
                transition: 'all 0.35s ease',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                transformStyle: 'preserve-3d',
                '&:hover': {
                    transform:
                        'perspective(1000px) rotateX(6deg) rotateY(-6deg) translateY(-12px) scale(1.03)',

                    boxShadow:
                        '0 25px 50px rgba(0,0,0,0.35)',
                }
            }}
        >
            <CardImageComponent imageURL={imageURL} name={name} />
            <CardTitleComponent name={name} />
            <CardOverflow sx={{ bgcolor: 'background.level2' }}>
                <CardOverflowContentComponent label="Type" options={types} />
            </CardOverflow>
        </Card>
    )
}

export default CardComponent