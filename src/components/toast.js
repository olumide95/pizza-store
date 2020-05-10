export const toast = (type, message) => {
  switch (type) {
    case "success":
      window.M.toast({
        html: message,
        displayLength: 5000,
        classes: "toastr-green",
      });
      break;
    case "error":
      window.M.toast({
        html: message,
        displayLength: 5000,
        classes: "toastr-red",
      });
      break;
    default:
      window.M.toast({
        html: message,
        displayLength: 5000,
      });
      break;
  }
};

export default toast;
