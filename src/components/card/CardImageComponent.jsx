const CardImageComponent = ({ imageURL, name }) => {
    return (
        <img
            src={imageURL}
            alt={name}
            style={{
                width: '100%',
                height: '240px',
                objectFit: 'contain',
                padding: '16px',
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.25))',
                transition: 'transform 0.3s ease',
            }}
        />
    )
}

export default CardImageComponent;