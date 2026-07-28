function ItemImage({ imageUrl }) {
  return (
    <div className="item-image">
      {imageUrl ? (
        <img src={imageUrl} alt="Item preview" />
      ) : (
        <div className="item-image__placeholder">No image available</div>
      )}
    </div>
  )
}

export default ItemImage
