import type { TextModalData } from "@/models/modal-types";

export const NOT_LOGGED_IN: TextModalData = {
  title: "Log In!",
  text: "To add new park you need to log in.<br>Log in  by clicking the icon in the top left corner.",
  confirmButtonText: "Continue",
};

export const ADD_PARK_DONE: TextModalData = {
  title: "Great!",
  text: "Workout park has been successfully registered.<br>When the park will be approved it will be visible to others.",
  confirmButtonText: "Continue",
};

export const ERROR_MODAL: TextModalData = {
  title: "Error!",
  text: "Unexpected error",
  confirmButtonText: "Continue",
};

export const DELETE_PARK: TextModalData = {
  title: "Delete the park?",
  text: "Are you sure you want to <strong>permanetly delete</strong> this image?",
  confirmButtonText: "Delete",
  cancelButtonText: "Cancel",
};

export const DELETE_IMAGE: TextModalData = {
  title: "Delete the image?",
  text: "Are you sure you want to <strong>permanetly delete</strong> this image?",
  confirmButtonText: "Delete",
  cancelButtonText: "Cancel",
};
