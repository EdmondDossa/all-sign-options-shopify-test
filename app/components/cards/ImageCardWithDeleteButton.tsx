import React, { useState, useEffect } from "react";
import { DeleteIcon } from "../icons";

// Définir les types des props
interface ImageCardWithDeleteButtonProps {
  imageSrc: string; // Source de l'image
  onDelete: () => void; // Fonction de suppression
  styles?: React.CSSProperties; // Styles dynamiques pour toute la carte
  deleteButtonStyles?: React.CSSProperties; // Styles dynamiques pour le bouton de suppression
}

const ImageCardWithDeleteButton: React.FC<ImageCardWithDeleteButtonProps> = ({
  imageSrc,
  onDelete,
  styles = {}, // Si pas de styles passés, utiliser un objet vide
  deleteButtonStyles = {}, // Styles par défaut pour le bouton de suppression
}) => {
  const [imageUrl, setImageUrl] = useState(imageSrc);

  // Mise à jour de l'URL de l'image si elle change
  useEffect(() => {
    setImageUrl(imageSrc);
  }, [imageSrc]);

  return (
    <div className="imagecardwidthDeleteBtn" style={styles}>
      {" "}
      {/* Appliquer les styles dynamiques à la carte entière */}
      <div className="image-container">
        <img
          src={
            imageUrl && imageUrl.trim() != ""
              ? imageUrl
              : "/images/im_default-selected.png"
          }
          className="card-image"
        />
      </div>
      <div className="delete-icon" style={deleteButtonStyles}>
        {" "}
        {/* Appliquer les styles dynamiques au bouton */}
        <button className="delete-btn" onClick={onDelete} type="button">
          <DeleteIcon stroke="white" width="15" height="15" />
        </button>
      </div>
    </div>
  );
};

export default ImageCardWithDeleteButton;
