const Card = ({ image, title, description, price, button }) => {
    const imageUrl = image && image.startsWith('/uploads')
        ? `http://localhost:5000${image}`
        : image;

    return (
        <div className="card">
            <img src={imageUrl} alt={title} />
            <h3>{title}</h3>
            {description && <h3>{description}</h3>}
            {price && <p className="price">{price} DT</p>}
            {button && button}
        </div>
    );
};

export default Card;
