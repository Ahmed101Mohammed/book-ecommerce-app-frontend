const baseUrl =
    NODE_ENV === 'production'
      ? window.location.origin // Use the production server's origin
      : BACKEND_BASE_URL

export default baseUrl