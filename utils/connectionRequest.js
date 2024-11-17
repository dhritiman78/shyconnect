export const connReq = async (id) => {
    try {
      // Send the connection request
      const response = await fetch(`/api/user/connection/request/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("refreshToken")}`,
          "Content-Type": "application/json",
        },
      });
  
      // Handle HTTP response
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send connection request.");
      }
  
      // Parse the successful response
      const data = await response.json();
      return data;
    } catch (error) {
      // Log or handle the error
      console.error("Error in sending connection request:", error.message);
      throw error;
    }
  };
  