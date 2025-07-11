const BASE_URL = "http://localhost:8080";

export const addToCartAPI = async (productId) => {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ productId, quantity: 1 }),
  });

  if (!res.ok) {
    throw new Error("Failed to add to Cart");
  }

  return await res.json();
};

export const removeFromCartAPI = async (productId) => {
  try {
    const res = await fetch(`${BASE_URL}/cart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ action: "decrement" }),
    });

    if (!res.ok) {
      throw new Error("Failed to remove from cart");
    }

    const result = await res.json();

    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const getCartAPI = async () => {
  const res = await fetch(`${BASE_URL}/cart`, {
    credentials: "include", // send cookies (if using auth)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cart items");
  }

  return await res.json();
};

export const clearCartAPI = async () => {
  const res = await fetch(`${BASE_URL}/cart/clear`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to clear cart");
  }

  return await res.json();
};
