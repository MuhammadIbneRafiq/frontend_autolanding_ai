import Swal from "sweetalert2";

export const deleteAlert = async () => {
  return await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
};

export const simpleAlert = async (text: string) => {
  return await Swal.fire({
    html: `<b>${text}</b>`,
    icon: "question",
    toast: true,
  });
};
