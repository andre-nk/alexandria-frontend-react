export const useFormatError = () => {
  const formatAuthError = (errorMessage) => {
    var result = errorMessage.substring(22, errorMessage.length - 2);
    result = "Error: " + result.replace(/-/g, " ");

    return result;
  };

  return { formatAuthError }
};
