import axios from "axios";

async function add_to_cart(ajax_url, cart_data, nonce, redirectToCheckOut) {
  try {
    const response = await axios.post(
      ajax_url,
      {
        action: "aso_add_custom_design_to_cart",
        data: cart_data,
        redirectToCheckOut: redirectToCheckOut,
        nonce: nonce,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data.cart_item_key) {
      window.location.href = response.data.url;
    }
    return response.data;
  } catch (error) {
    console.error("Erreur :", error);
  }
}
function formatPrice(price) {
  let formattedPrice = parseFloat(
    price + parseFloat(aso_configurator_data.regularPrice)
  ).toFixed(aso_configurator_data.decimals);

  switch (aso_configurator_data.currency_pos) {
    case "left":
      formattedPrice = aso_configurator_data.currencySymbol + formattedPrice;
      break;
    case "right":
      formattedPrice = formattedPrice + aso_configurator_data.currencySymbol;
      break;
    case "left_space":
      formattedPrice =
        aso_configurator_data.currencySymbol + " " + formattedPrice;
      break;
    case "right_space":
      formattedPrice =
        formattedPrice + " " + aso_configurator_data.currencySymbol;
      break;
  }

  // Remplacez le séparateur décimal et des milliers
  formattedPrice = formattedPrice.replace(
    ".",
    aso_configurator_data.decimalSep
  );
  formattedPrice = formattedPrice.replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    "$1" + aso_configurator_data.thousandSep
  );

  return formattedPrice;
}

function setScrollColor(color) {
  document.documentElement.style.setProperty("--aso-scrollBar-color", color);
}

export { add_to_cart, formatPrice, setScrollColor };
