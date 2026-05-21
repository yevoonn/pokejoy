import { Grid } from '@mui/joy'
import CardComponent from './CardComponent'

const CardListComponent = ({ cards = [] }) => {
    return (
        <Grid 
            container
            spacing={2}
            sx={{
                flexGrow: 1
            }}>
            {cards.map((card) => (
                <Grid xs={12} sm={6} md={4} lg={3} key={card.name}>
                    <CardComponent
                        imageURL={card.image}
                        name={card.name}
                        types={card.types}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default CardListComponent;